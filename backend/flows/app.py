from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from MongoAPI import MongoAPI
from utils import parse_flow_object, hash_flow_object
from bson import ObjectId
import os
import datetime

# Setup clients for server and db
app = Flask(__name__)

app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER')
app.config['MAIL_PORT'] = os.environ.get('MAIL_PORT')
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_USE_SSL'] = os.environ.get('MAIL_USE_SSL')

mail_api = Mail(app)
mongo_api = MongoAPI({'database': 'smarthack', 'collection': 'flows'})
mongo_api_2 = MongoAPI(
    {'database': 'smarthack', 'collection': 'flows_instances'})


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


@app.route('/flows/<id>', methods=['GET', 'DELETE', 'PUT'])
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

    if request.method == 'PUT':
        flow_query = mongo_api.collection.find_one(ObjectId(id))

        if not flow_query:
            return 'Not found', 404

        mongo_api.collection.update_one(
            {'_id': ObjectId(id)}, {"$set": request.json})
        return jsonify("Updated")


@app.route('/flows/<id>/hash', methods=['GET'])
def flow_hash(id):
    flow_query = mongo_api.collection.find_one(ObjectId(id))

    if not flow_query:
        return 'Not found', 404

    return jsonify({'hash': hash_flow_object(flow_query)})


@app.route('/flows/<id>/instances', methods=['GET', 'POST'])
def flows_instances(id):
    if request.method == 'GET':
        flows_query = list(mongo_api_2.collection.find({"parentFlowId": id}))
        flows = []

        for flow in flows_query:
            flows.append(parse_flow_object(flow))

        return jsonify(flows)

    if request.method == 'POST':
        request_data = request.json
        request_data['createdAt'] = datetime.datetime.timestamp(
            datetime.datetime.now())

        result = mongo_api_2.collection.insert_one(request.json).inserted_id
        return jsonify({'id': str(result)})


@app.route('/mail', methods=['POST'])
def send_email():
    if request.method == 'POST':
        mail_data = request.json

        msg = Message(
            mail_data.get('message_title'),
            sender=mail_data.get('sender'),
            recipients=mail_data.get('recipients')
        )

        msg.body = mail_data.get('message_body')
        mail_api.send(msg)

        return jsonify('Sent')


if __name__ == '__main__':
    app.run(host='::', debug=True)
