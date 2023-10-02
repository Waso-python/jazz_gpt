import openai
import textwrap
import os
from settings.config import CHATGPT_TOKEN

openai.api_key = CHATGPT_TOKEN

max_token_count = 3096

def _split_text_into_chunks(text, lines_per_chunk):
    lines = text.strip().split('\n')
    for i in range(0, len(lines), lines_per_chunk):
        yield '\n'.join(lines[i:i + lines_per_chunk])

def get_result_ideas(analysis_result):
    result = ''
    messages = [
                {
                    "role": "system",
                    "content": "Ты аналитик в команде разработчиков, тебе даются на анализ идеи, сформулированные chatgpt из фразы стенограммы совещания по теме \"проектирование MVP продукта для анализа стенограмм совещания\", тебе нужно проанализировать распознанные идеи  и сгруппировать по авторам. вывод сделай с форматированием html для вставки во фронтенд"
                },
                {
                    "role": "user",
                    "content": analysis_result
                }
            ]
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=messages,
        temperature=1,
        max_tokens=max_token_count,
        frequency_penalty=0,
        presence_penalty=0	
    )
    result = response['choices'][0]['message']['content']
    print(result)
    return result

def get_ideas(content_text, meeting_topic):
    analysis_result = ""
    for chunk in _split_text_into_chunks(content_text, 40):
        messages = [
            {
                "role": "system",
                "content": f"Ты аналитик в команде разработчиков, тебе даются на анализ  фразы из стенограммы совещания по теме \"{meeting_topic}\", ты выделяешь идеи участников по заданной теме и создаешь список идей с указанием автора в виде - (автор) - (идея)"
            },
            {
                "role": "user",
                "content": chunk
            }
        ]
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-16k",
            messages=messages,
            temperature=0.5,
            max_tokens=max_token_count,
            frequency_penalty=0,
            presence_penalty=0	
        )
        analysis_result += ('\n'+ response['choices'][0]['message']['content'])
        print(analysis_result)
        print(response['usage']['prompt_tokens'])
        print(response['usage']['completion_tokens'])
        print(response['usage']['total_tokens'])
    return get_result_ideas(analysis_result)


def get_psyhologic(content_text, meeting_topic):
    result = ""
    for chunk in _split_text_into_chunks(content_text, 80):
        messages = [
            {
                "role": "system",
                "content": f"Ты психолог в команде, тебе дается на анализ сформулированные тобой характеристики  и  очередные фразы из стенограммы совещания по теме \"{meeting_topic}\", ты составляешь психологический портрет участников по заданной теме и кратко формулируешь таким образом, чтобы подавать тебе в качестве контекста со следующим сообщением"
            },
            {
                "role": "user",
                "content": result + '\n' + chunk
            }
        ]
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-16k",
            messages=messages,
            temperature=1,
            max_tokens=max_token_count,
            frequency_penalty=0,
            presence_penalty=0	
        )
        result += ('\n'+ response['choices'][0]['message']['content'])
        print(result)
        print(response['usage']['prompt_tokens'])
        print(response['usage']['completion_tokens'])
        print(response['usage']['total_tokens'])
    return result

def get_links(content_text):
    links_result = ""
    for chunk in _split_text_into_chunks(content_text, 80):
        messages = [
            {
                "role": "system",
                "content": "тебе даются на анализ фразы из стенограммы совещания, только если в фразе есть ссылка какой-либо ресурс, то ты выделяешь ссылку и создаешь список ссылок с указанием автора в виде - (автор) - (ссылка), если ссылок нет, то ты просто пропускаешь фразу"
            },
            {
                "role": "user",
                "content": chunk
            }
        ]
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-16k",
            messages=messages,
            temperature=1,
            max_tokens=max_token_count,
            frequency_penalty=0,
            presence_penalty=0	
        )
        links_result += ('\n'+ response['choices'][0]['message']['content'])
        print(links_result)
        print(response['usage']['prompt_tokens'])
        print(response['usage']['completion_tokens'])
        print(response['usage']['total_tokens'])
    return links_result





