from flask import Flask, request, jsonify
from MongoAPI import MongoAPI


# Setup clients for server and db
app = Flask(__name__)
mongo_api = MongoAPI({'database': 'smarthack', 'collection': 'flows'})

@app.route('/')
def ping():
    return "Hello world!"


@app.route('/flows/', methods=['GET', 'POST'])
def flows():
    if request.method == 'GET':
        flows_query = list(mongo_api.collection.find({}))
        flows = []

        for flow in flows_query:
            flow['id'] = str(flow['_id'])
            flow.pop('_id', None)
            flows.append(flow)

        return jsonify(flows)


    if request.method == 'POST':
        mongo_api.collection.insert_one({'a': 'b'})


if __name__ == "__main__":
    app.run(debug=True)
