### Requirement

- Make sure you are using python 3.6 or above
- Install flask using `pip install flask`

### How to run

In the terminal, run the following command: `python app.py`

### How to use

The app will be running on `http://localhost:5000/` and it will be listening to the endpoint: 'process_csv' with a POST method.
The endpoint expect a list of csv files in the body of the request. The csv files should all have the same headers and the same order of columns.
