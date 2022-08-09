import json


def hello(event, context):
    body = {
        "message": "Testing of text summarisation"
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response
