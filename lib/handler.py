try:
    import unzip_requirements
except ImportError:
    pass

import json
import pandas as pd
import tweepy


def hello(event, context):
    df = pd.DataFrame({
        'A': [1, 2, 3, 4],
        'B': [10, 20, 30, 40],
        'C': [100, 200, 300, 400]
    })

    print(df)

    return {
        "statusCode": 200,
        "body": json.dumps({"message": "Testing Done. Lambda was a success!"})
    }
