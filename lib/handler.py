import json
import torch
import re
from transformers import T5Tokenizer, T5ForConditionalGeneration


tokenizer = T5Tokenizer.from_pretrained("./model")
model = T5ForConditionalGeneration.from_pretrained("./model")
device = torch.device("cpu")


def summarise(event, _context):
    try:
        #   Get the parameters from the event
        try:
            text = event["text"]
            minWords = event["min"]
            maxWords = event["max"]
        except KeyError:
            event = json.dumps(event)
            jsonEvent = json.loads(event)
            body = json.loads(jsonEvent['body'])
            text = body["text"]
            minWords = body["min"]
            maxWords = body["max"]

        # Clean the text
        TEXT_CLEANING_RE = "@\S+|https?:\S+|http?:\S|[^A-Za-z0-9]+"
        text = re.sub(TEXT_CLEANING_RE, ' ', str(text).lower()).strip()
        text = text.replace("\n", "")
        preprocessedText = "summarize: " + text

        #   Tokenize the text
        tokenizedText = tokenizer.encode(preprocessedText, return_tensors="pt", max_length=512, truncation=True).to(device)

        #   Generate the summary
        summary_ids = model.generate(
            tokenizedText,
            min_length=minWords,
            max_length=maxWords,
            num_beams=4,
            length_penalty=4.0,
            early_stopping=True)

        #   Decode the summary
        summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

        #   Return the summary
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
	            "Access-Control-Allow-Methods": "*",
	            "Access-Control-Allow-Origin": "https://d3qb059d3osm13.cloudfront.net",
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
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Credentials": True
            },
            "body": json.dumps({"error": repr(e)})
        }
        