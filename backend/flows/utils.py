def parse_flow_object(obj):
    obj['id'] = str(obj['_id'])
    obj.pop('_id', None)
    return obj