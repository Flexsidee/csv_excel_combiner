# File Processing API

This is a simple Flask-based API that allows you to process and combine CSV and Excel files. It provides an endpoint `/process_files` for uploading files and generating a combined output file in either CSV or Excel format.

## Requirements

- Python 3.x
- Flask
- pandas
- openpyxl
- xlsxwriter

## Installation

1. Clone the repository: ```git clone https://github.com/Flexsidee/file-processing-api.git```
2. Install the required dependencies: ```pip install flask pandas openpyxl xlsxwriter```
3. Start the server: ```python app.py```

## Usage

### Endpoint
<b>`POST /process_files`</b>

### Request Parameters
- `files[]` (multipart/form-data): List of files to be processed. You can include multiple files by using the same key 
`files[]` for each file.
- `response_format` (optional, default: "csv"): The desired format of the response file. Supported values are "csv" and 
  "xlsx".

### Response
The API responds with a JSON object containing the processed file data. The response includes the following properties:
``
- `result` (string): The processed file data as a string.
- `content_type` (string): The MIME type of the response file.
- `file_extension` (string): The file extension of the response file.


## Examples
Example 1: Combine CSV files and get the response as CSV
```
curl -X POST -F "files[]=@file1.csv" -F "files[]=@file2.csv" -F "response_format=csv" http://localhost:5000/process_files
```

Example 2: Combine Excel files and get the response as Excel
```
curl -X POST -F "files[]=@file1.xlsx" -F "files[]=@file2.xlsx" -F "response_format=xlsx" http://localhost:5000/process_files
```


## Author
- Daniel Somade
- [GitHub](https://www.github.com/flexsidee)
- [Portfolio](https://somadedaniel.netlify.app)
- [Email](mailto:flexsidee@gmail.com)
