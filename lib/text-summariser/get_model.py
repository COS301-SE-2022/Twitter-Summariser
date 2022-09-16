from transformers import T5Tokenizer, T5ForConditionalGeneration


def get_model_and_tokenizer(model, tokenizer):
    """Loads model & tokenizer from Hugginface model hub"""
    try:
        model = T5ForConditionalGeneration.from_pretrained(model)
        model.save_pretrained('./model')

        tokenizer = T5Tokenizer.from_pretrained(tokenizer)
        tokenizer.save_pretrained('./model')
    except Exception as e:
        raise (e)


get_model_and_tokenizer('t5-base', 't5-base')
