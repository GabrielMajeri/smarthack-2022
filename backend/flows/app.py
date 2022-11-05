import os

from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())

app = Flask(__name__)
mongo_client = MongoClient('localhost', 27017, username=os.environ.get('MONGO_USER'), password=os.environ.get('MONGO_PASS'))


@app.route('/')
def ping():
    return "Hello world!"


if __name__ == "__main__":
    app.run(debug=True)
