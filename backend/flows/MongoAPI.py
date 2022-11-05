import os

from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv

# Load env variables
load_dotenv(find_dotenv())


class MongoAPI:
    def __init__(self, data):
        self.client = MongoClient('localhost', 27017, username=os.environ.get('MONGO_USER'), password=os.environ.get('MONGO_PASS'))

        database = data['database']
        collection = data['collection']
        cursor = self.client[database]

        self.collection = cursor[collection]
        self.data = data
