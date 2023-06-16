from flask import Flask, request, jsonify, send_file
import os
import csv
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/process_csv', methods=['POST'])
def process_csv():
    # Variables needed for the process
    output_dir = 'output'
    directory = os.path.join(app.config['UPLOAD_FOLDER'], "files_to_join")
    os.makedirs(output_dir, exist_ok=True)
    output_file = f"{output_dir}/combined_file.csv"

    # Process the uploaded files
    if 'files[]' not in request.files:
        return jsonify({'error': 'No files found in the request.'})

    files = request.files.getlist('files[]')

    # Create the directory if it doesn't exist
    os.makedirs(directory, exist_ok=True)

    for file in files:
        filename = secure_filename(file.filename)
        file.save(os.path.join(directory, filename))

    # Set the directory containing the CSV files
    directory = directory  # Update the directory path to the uploaded files

    # Initialize a list to store all the rows
    combined_rows = []

    # Get a list of all CSV files in the directory
    csv_files = [file for file in os.listdir(directory) if file.endswith(".csv")]

    # Loop through each CSV file
    for file in csv_files:
        file_path = os.path.join(directory, file)

        # Read the CSV file
        with open(file_path, "r") as csv_file:
            csv_reader = csv.reader(csv_file)

            # Skip the header if it's not the first file
            if csv_files.index(file) > 0:
                next(csv_reader)

            # Append each row to the combined_rows list
            for row in csv_reader:
                combined_rows.append(row)

    # Write the combined rows to the output file
    with open(output_file, "w", newline="") as csv_file:
        csv_writer = csv.writer(csv_file)

        # Write the header
        csv_writer.writerow(combined_rows[0])

        # Write the data rows
        csv_writer.writerows(combined_rows[1:])

    # Return the processed file to the client
    return send_file(output_file, as_attachment=True)

if __name__ == '__main__':
    app.run()
