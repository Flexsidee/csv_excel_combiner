from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from io import StringIO, BytesIO
import csv
import pandas as pd
import tempfile
import os
import string
import random
import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5173"}})

# Set the temporary directory path
temp_dir = tempfile.gettempdir()

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


if __name__ == '__main__':
    app.run()
