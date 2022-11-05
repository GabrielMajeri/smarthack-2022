import json
import hashlib

def parse_flow_object(obj):
    obj['id'] = str(obj['_id'])
    obj.pop('_id', None)
    return obj


def hash_flow_object(obj):
    flow_json = parse_flow_object(obj)
    return hashlib.sha256(json.dumps(flow_json).encode('utf-8')).hexdigest()
