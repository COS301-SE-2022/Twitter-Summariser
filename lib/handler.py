try:
    import unzip_requirements
except ImportError:
    pass


import os
import json
import pandas as pd



def hello(event, context):

    df = pd.DataFrame({
        'a': [1, 2, 3],
        'b': [4, 5, 6],
        'c': [7, 8, 9]
    })

    print(df)

    return {
        "statusCode": 200,
        "body": json.dumps({"text": "Success"})
    }
