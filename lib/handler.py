try:
    import unzip_requirements
except ImportError:
    pass


import os
import json
import re
import tweepy
from transformers import T5Tokenizer, T5ForConditionalGeneration
from dotenv import load_dotenv

load_dotenv()
model = T5ForConditionalGeneration.from_pretrained('t5-base')
tokenizer = T5Tokenizer.from_pretrained('t5-base')


CONSUMER_KEY = os.environ['CONSUMER_KEY']
CONSUMER_SECRET = os.environ['CONSUMER_SECRET']
ACCESS_KEY = os.environ['ACCESS_KEY']
ACCESS_SECRET = os.environ['ACCESS_SECRET']

AUTH = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
AUTH.set_access_token(ACCESS_KEY, ACCESS_SECRET)
API = tweepy.API(AUTH, wait_on_rate_limit=True)


def hello(event, context):
    searchWords = "Elon"
    searchWords = searchWords + " -filter:retweets"

    tweetNew = tweepy.Cursor(API.search_tweets, q=searchWords,
                             lang="en", result_type='popular').items(100)

    tweetData = [tweet.text for tweet in tweetNew]
    text = " ".join(tweetData)
    TEXT_CLEANING_RE = "@\S+|https?:\S+|http?:\S|[^A-Za-z0-9]+"
    text = re.sub(TEXT_CLEANING_RE, ' ', str(text).lower()).strip()
    Preprocessed_text = "summarize: " + text
    tokens_input = tokenizer.encode(
        Preprocessed_text, return_tensors="pt", max_length=512, truncation=True)
    summary_ids = model.generate(
        tokens_input, min_length=120, max_length=240, length_penalty=4.0)
    summary = tokenizer.decode(summary_ids[0])

    return {
        "statusCode": 200,
        "body": json.dumps({"text": summary})
    }
