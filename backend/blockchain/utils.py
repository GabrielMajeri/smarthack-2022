import json

def load_data(data_string):
    return json.loads(data_string)


def parse_data(data_json):
    return json.dumps(data_json)
