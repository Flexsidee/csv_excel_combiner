from flask import Flask, request, jsonify
import csv
import pandas as pd
from io import StringIO, BytesIO

app = Flask(__name__)


@app.route('/process_files', methods=['POST'])
def process_files():
    # Process the uploaded files
    if 'files[]' not in request.files:
        return jsonify({'error': 'No files found in the request.'})

    files = request.files.getlist('files[]')
    response_format = request.form.get('response_format', 'csv')

    # Initialize a list to store all the rows
    combined_rows = []

    for file in files:
        filename = file.filename.lower()
        if filename.endswith('.csv'):
            # Read CSV file
            csv_file = StringIO(file.stream.read().decode('utf-8'))
            csv_reader = csv.reader(csv_file)

            # Skip the header if it's not the first file
            if len(combined_rows) > 0:
                next(csv_reader)

            # Append each row to the combined_rows list
            for row in csv_reader:
                combined_rows.append(row)

        elif filename.endswith('.xlsx') or filename.endswith('.xls'):
            # Read Excel file
            excel_data = BytesIO(file.stream.read())
            df = pd.read_excel(excel_data)

            # Convert DataFrame to list of rows
            rows = df.values.tolist()

            # Append each row to the combined_rows list
            combined_rows.extend(rows)

    # Generate the response in the specified format
    if response_format.lower() == 'csv':
        # Write the combined rows to a CSV file in memory
        output_data = StringIO()
        csv_writer = csv.writer(output_data)
        csv_writer.writerows(combined_rows)
        response_data = output_data.getvalue()
        content_type = 'text/csv'
        file_extension = 'csv'
    elif response_format.lower() == 'xlsx':
        # Create an Excel file in memory using pandas
        df = pd.DataFrame(combined_rows)
        output_data = BytesIO()
        with pd.ExcelWriter(output_data, engine='xlsxwriter') as writer:
            df.to_excel(writer, sheet_name='Combined Data', index=False)
        response_data = output_data.getvalue()
        content_type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        file_extension = 'xlsx'
    else:
        return jsonify({'error': 'Invalid response format specified.'})

    # Return the processed result to the client
    return jsonify(
        {'result': response_data.decode('utf-8'), 'content_type': content_type, 'file_extension': file_extension})


if __name__ == '__main__':
    app.run()
