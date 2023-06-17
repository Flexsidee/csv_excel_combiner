from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import pandas as pd
from io import StringIO, BytesIO

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5173"}})


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
            combined_df.to_csv(output, index=False)

        return output.getvalue(), 200, {'Content-Type': f'application/{format}', 'Content-Disposition': 'attachment; filename=combined_file.' + format}
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run()
