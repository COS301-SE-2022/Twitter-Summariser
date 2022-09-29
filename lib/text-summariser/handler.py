import os
import json
import torch
import re
from transformers import T5Tokenizer, T5ForConditionalGeneration


tokenizer = T5Tokenizer.from_pretrained("./model")
model = T5ForConditionalGeneration.from_pretrained("./model")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def summarise(event, _context):
    url = "https://d23exbau77kw0b.cloudfront.net"

    try:
        #   Get the parameters from the event
        try:
            text = event["text"]
        except KeyError:
            event = json.dumps(event)
            jsonEvent = json.loads(event)
            body = json.loads(jsonEvent['body'])
            text = body["text"]

        # Clean the text
        TEXT_CLEANING_RE = "@\S+|https?:\S+|http?:\S|[^A-Za-z0-9]+"
        text = re.sub(TEXT_CLEANING_RE, ' ', str(text).lower()).strip()
        text = text.replace("\n", "")
        preprocessedText = "summarize: " + text

        #   Tokenize the text
        tokenizedText = tokenizer.encode(
            preprocessedText, return_tensors="pt", max_length=2048).to(device)

        #   Generate the summary
        summary_ids = model.generate(
            tokenizedText,
            min_length=30,
            max_length=200,
            num_beams=4,
            no_repeat_ngram_size=3,
            length_penalty=2.0
        )

        #   Decode the summary
        summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

        #   Return the summary
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Origin": url,
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Credentials": True
            },
            "body": json.dumps({'text': summary})
        }
    except Exception as e:
        print(repr(e))
        return {
            "statusCode": 500,
            "headers": {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': url,
                "Access-Control-Allow-Credentials": True
            },
            "body": json.dumps({"error": repr(e)})
        }
