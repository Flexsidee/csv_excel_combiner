from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from io import StringIO, BytesIO
from email.mime.text import MIMEText
from dotenv import load_dotenv
import smtplib
import csv
import pandas as pd
import tempfile
import os
import string
import random
import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5173"}})

# Load environment variables from .env file
load_dotenv()

# Set the temporary directory path
temp_dir = tempfile.gettempdir()

# get the time and date of email
now = datetime.datetime.now()
time = now.strftime("%H:%M")
day = now.strftime("%d/%m/%Y")

def generate_unique_filename():
    # Generate a random string of characters
    random_string = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))

    # Get the current timestamp
    timestamp = datetime.datetime.now().timestamp()

    # Combine the random string and timestamp to create a unique filename
    filename = f"result_{random_string}_{timestamp}"

    return filename

@app.route('/process_files', methods=['POST'])
def process_files():
    try:
        # Get the format parameter from the request
        format = request.args.get('format', 'csv')

        # Process the uploaded files
        if 'files[]' not in request.files:
            return jsonify({'error': 'No files found in the request.'}), 400

        files = request.files.getlist('files[]')

        # Convert files to pandas DataFrames
        dfs = []
        for file in files:
            df = pd.read_excel(file) if format == 'xlsx' else pd.read_csv(file)
            dfs.append(df)

        # Combine DataFrames
        combined_df = pd.concat(dfs)

        # Convert the combined DataFrame to the desired format
        output = ''
        if format == 'xlsx':
            output = BytesIO()
            with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
                combined_df.to_excel(writer, index=False, sheet_name='Combined')
            output.seek(0)
        elif format == 'csv':
            output = StringIO()
            combined_df.to_csv(output, index=False, quoting=csv.QUOTE_NONNUMERIC)

        # Generate a unique filename
        filename = generate_unique_filename()

        # Save the file to the temporary directory
        file_path = os.path.join(temp_dir, filename)
        with open(file_path, 'w' if format == 'csv' else 'wb', newline='\r\n') as f:
            f.write(output.getvalue())

        return send_file(file_path, as_attachment=True,
                         download_name=f'combined_file.{format}',
                         mimetype=f'application/{format}')
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/send_email', methods=['POST'])
def send_email():
    # Get the message data from the request
    data = request.json

    # Extract the necessary information from the data
    sender_name = data.get('sender_name')
    sender_email = data.get('sender_email')
    message = data.get('message_body')

    # Compose the email to be sent to developer email
    dev_email_subject = "New message from your CSVExcelCombiner App!"
    dev_email_body = f"Sender Name: {sender_name}\nSender Email: {sender_email}\nTime: {time} {day}\n\nMessage: {message}"

    # Compose the email to be sent to user email
    user_email_subject = "CSVExcelCombiner Received your message"
    user_email_body = f"Hi {sender_name}, \n\nYour message below has been recieved: \n{message}\n\nThank you for feedback and for using CSVExcelCombiner App!\n\nTime: {time} {day}"

    # Email configuration (replace with your own SMTP server details)
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = os.environ.get('SMTP_PORT')
    smtp_username = os.environ.get('SMTP_USERNAME')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    recipient_email = [ sender_email, os.environ.get('SMTP_USERNAME')]

    subject = [user_email_subject, dev_email_subject]
    body = [user_email_body, dev_email_body]

    for index, item in enumerate(recipient_email):
         # Create the email message
        email = MIMEText(body[index])
        email['Subject'] = subject[index]
        email['From'] = smtp_username
        email['To'] = recipient_email[index]

        # Send the email
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.send_message(email)

    return 'Email sent!'


if __name__ == '__main__':
    app.run()
