from flask import Flask, request, jsonify
from MongoAPI import MongoAPI
from utils import parse_flow_object, hash_flow_object
from bson import ObjectId


# Setup clients for server and db
app = Flask(__name__)
mongo_api = MongoAPI({'database': 'smarthack', 'collection': 'flows'})


@app.route('/')
def ping():
    return "Hello world!"


@app.route('/flows', methods=['GET', 'POST'])
def flows():
    if request.method == 'GET':
        flows_query = list(mongo_api.collection.find({}))
        flows = []

        for flow in flows_query:
            flows.append(parse_flow_object(flow))

        return jsonify(flows)

    if request.method == 'POST':
        result = mongo_api.collection.insert_one(request.json).inserted_id
        return jsonify({'id': str(result)})


@app.route('/flows/<id>', methods=['GET', 'DELETE'])
def flow(id):
    if request.method == 'GET':
        flow_query = mongo_api.collection.find_one(ObjectId(id))

        if not flow_query:
            return 'Not found', 404

        return jsonify(parse_flow_object(flow_query))

    if request.method == 'DELETE':
        flow_query = mongo_api.collection.find_one(ObjectId(id))
        
        if not flow_query:
            return 'Not found', 404

        mongo_api.collection.delete_one({'_id': ObjectId(id)})
        return 'Deleted.', 200


@app.route('/flows/<id>/hash', methods=['GET'])
def flow_hash(id):
    flow_query = mongo_api.collection.find_one(ObjectId(id))

    if not flow_query:
        return 'Not found', 404

    return jsonify({'hash': hash_flow_object(flow_query)})


if __name__ == "__main__":
    app.run(debug=True)
