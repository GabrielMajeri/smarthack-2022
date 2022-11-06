from dotenv import load_dotenv
from flask import Flask, request
import requests
import os
import json


app = Flask(__name__)

load_dotenv()

FLOWS_ENDPOINT_URL = os.environ.get('FLOWS_ENDPOINT_URL')
EXECUTOR_ENDPOINT_URL = os.environ.get('EXECUTOR_ENDPOINT_URL')


@app.post('/executor/onNodeExecutionFinish')
def on_node_execution_finish():
    content = request.json

    flowId = content['flowId']
    flowInstanceId = content['flowInstanceId']
    currentNodeId = content['nodeId']
    result = content['result']
    status = result['status']
    flowOutput = result['output']

    print('Node', currentNodeId, 'finished executing with status', status)

    # Read the flow's data
    req = requests.get(FLOWS_ENDPOINT_URL + '/flows/' + flowId)
    flow = json.loads(req.content)

    successorNodeIds = set()

    data = flow['date']

    edges = data['edges']
    for edge in edges:
        if edge['source'] == currentNodeId:
            successorNodeIds.add(edge['target'])

    print('Found', len(successorNodeIds), 'successor nodes')

    # Check if this was the flow's last step
    if False:
        requests.put(FLOWS_ENDPOINT_URL + '/flows/' + flowId +
                     '/instances/' + flowInstanceId, params={'status': 'finished'})

    successorNodes = []

    nodes = data['nodes']
    for node in nodes:
        if node['id'] in successorNodeIds:
            successorNodes.append(node)

    for node in successorNodes:
        nodeId = node['id']
        print('Beginning execution of successor node', nodeId)
        params = {
            'flowId': flowId,
            'flowInstanceId': flowInstanceId,
            'nodeId': nodeId,
            'input': flowOutput
        }
        requests.post(EXECUTOR_ENDPOINT_URL +
                      '/executor/execute', json=params)

    return 'OK'


@app.post('/executor/execute')
def execute_node():
    content = request.json

    flowId = content['flowId']
    flowInstanceId = content['flowInstanceId']
    nodeId = content['nodeId']
    input = content['input']

    print('Node', nodeId, 'started executing')

    # Read the flow's data
    req = requests.get(FLOWS_ENDPOINT_URL + '/flows/' + flowId)
    flow = json.loads(req.content)

    data = flow['date']
    nodes = data['nodes']

    # Get the current node
    currentNode = None
    for node in nodes:
        if node['id'] == nodeId:
            currentNode = node
            break

    if not currentNode:
        return 'Error: cannot find node to be executed', 404

    currentNodeData = currentNode['data']
    nodeType = currentNodeData['nodeType']

    if nodeType == 'sendMailNode':
        destinationAddress = currentNodeData['destinationAddress']
        params = {
            'message_title': 'Mesaj de test',
            'message_body': 'Scuze am uitat să pun un mesaj',
            'sender': 'Autoflow Executor',
            'recipients': [destinationAddress]
        }
        res = requests.post(FLOWS_ENDPOINT_URL + '/mail', json=params)
        # TODO check response
        print(res)
    else:
        raise NotImplementedError(f"unknown node type: '{nodeType}'")

    params = {
        'flowId': flowId,
        'flowInstanceId': flowInstanceId,
        'nodeId': nodeId,
        'result': {
            'status': 'success',
            'output': {}
        }
    }
    requests.post(EXECUTOR_ENDPOINT_URL +
                  '/executor/onNodeExecutionFinish', json=params)

    return 'OK'


if __name__ == '__main__':
    app.run(host='::', port=5010, debug=True)
