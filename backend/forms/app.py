from flask import Flask, request, jsonify
from MongoAPI import MongoAPI

app = Flask(__name__)

mongo_api = MongoAPI({'database': 'smarthack', 'collection': 'forms'})


@app.route('/forms/submit', methods=['POST'])
def submit_form():
    if request.method == 'POST':
        result = mongo_api.collection.insert_one(request.json).inserted_id
        return jsonify({'id': str(result)})


if __name__ == "__main__":
    app.run(debug=True, host='::', port=5003)
