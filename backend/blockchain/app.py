from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from dotenv import load_dotenv, find_dotenv
from sqlhelpers import *
import os
import json

# Load env variables
load_dotenv(find_dotenv())

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = os.environ.get('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.environ.get('MYSQL_PASS')
app.config['MYSQL_DB'] = os.environ.get('MYSQL_DB')
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

mysql_api = MySQL(app)


@app.route('/')
def ping():
    return jsonify('Hello world!')


@app.route('/blockchain', methods=['GET', 'POST'])
def blockchain():
    if request.method == 'GET':
        blockchain = get_blockchain()
        blockchain_dict = {}

        for b in blockchain.chain:
            block_dict = {
                'number': b.number,
                'previous_hash': b.previous_hash,
                'nonce': b.nonce,
                'data': json.loads(b.data.replace("\'", "\""))
            }

            blockchain_dict[b.number] = block_dict

        return jsonify(blockchain_dict)

    if request.method == 'POST':
        request_data = request.json

        submit_flow_data(
            flow_id=request_data.get('flow_id'),
            instance_id=request_data.get('instance_id'),
            flow_step_id=request_data.get('flow_step_id'),
            flow_hash=request_data.get('flow_hash'),
            input_hash=request_data.get('input_hash')
        )

        return 'created', 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)
