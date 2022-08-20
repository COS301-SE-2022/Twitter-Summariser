try:
    import unzip_requirements
except ImportError:
    pass

import json
import pandas as pd
# import tweepy


# CONSUMER_KEY = "consumer key"
# CONSUMER_SECRET = "consumer secret"
# ACCESS_KEY = "access key"
# ACCESS_SECRET = "access secret"

# auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
# auth.set_access_token(ACCESS_KEY, ACCESS_SECRET)
# api = tweepy.API(auth, wait_on_rate_limit=True)


def hello(event, context):
    df = pd.DataFrame({
        'A': [1, 2, 3, 4],
        'B': [10, 20, 30, 40],
        'C': [100, 200, 300, 400]
    })

    print(df)

    return {
        "statusCode": 200,
        "body": json.dumps({"message": "Hello!"})
    }
