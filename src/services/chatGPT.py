import openai
import textwrap
import os
from settings.config import CHATGPT_TOKEN
from src.services.settings_gpt import max_token_count

openai.api_key = CHATGPT_TOKEN


def _get_result_psyhologic(text, meeting_topic):
    '''внутренняя функция которая результирует психологический портрет участников'''
    result = ""
    
    messages = [
        {
            "role": "system",
            "content": f"Ты психолог в команде, тебе дается на анализ сформулированные тобой характеристики участников стенограммы совещания по теме \"{meeting_topic}\", ты составляешь психологический портрет участников по заданной теме и результат выдаешь в формате json, где ключ это имя участника, а значение это подробный психологический портрет участника по итогам встречи в виде строки"
        },
        {
            "role": "user",
            "content": text
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
    print(response['usage']['prompt_tokens'])
    print(response['usage']['completion_tokens'])
    print(response['usage']['total_tokens'])
    return result

def _get_result_links(text):
    '''внутренняя функция которая результирует распознанные ссылки'''
    result = ''
    messages = [
                {
                    "role": "system",
                    "content": f"ты парсер данных, тебе нужно выделить из представленного текста ссылки. вывод сделай с форматированием json,где ключ = links, а значение это список ссылок"
                },
                {
                    "role": "user",
                    "content": text
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
    return result


def _split_text_into_chunks(text, lines_per_chunk):
    '''внутренняя функция которая генерирует части файла'''
    lines = text.strip().split('\n')
    for i in range(0, len(lines), lines_per_chunk):
        yield '\n'.join(lines[i:i + lines_per_chunk])

def _get_result_ideas(analysis_result, meeting_topic):
    '''внутренняя функция которая результирует распознанные идеи'''
    result = ''
    messages = [
                {
                    "role": "system",
                    "content": f"Ты аналитик в команде, тебе даются на анализ идеи, сформулированные chatgpt из фразы стенограммы совещания по теме \"{meeting_topic}\", тебе нужно выделить из распознанных идей относящиеся к теме разговора  и сгруппировать по авторам. вывод сделай с форматированием json, где ключ это имя участника а значение список идей"
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
    return result

def get_ideas(content_text, meeting_topic):
    '''функция которая распознает ссылки'''
    analysis_result = ""
    for chunk in _split_text_into_chunks(content_text, 40):
        messages = [
            {
                "role": "system",
                "content": f"Ты аналитик, тебе даются на анализ  фразы из стенограммы совещания по теме \"{meeting_topic}\", ты выделяешь идеи участников по заданной теме и создаешь список идей или основных тем с указанием автора в виде - (автор) - (идея)"
            },
            {
                "role": "user",
                "content": chunk
            }
        ]
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-16k",
            messages=messages,
            temperature=0,
            max_tokens=max_token_count,
            frequency_penalty=0,
            presence_penalty=0	
        )
        analysis_result += ('\n'+ response['choices'][0]['message']['content'])
    return _get_result_ideas(analysis_result, meeting_topic)


def get_psyhologic(content_text, meeting_topic):
    '''функция которая распознает психологические портреты участников'''
    result = ""
    for chunk in _split_text_into_chunks(content_text, 40):
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
            temperature=0,
            max_tokens=max_token_count,
            frequency_penalty=0,
            presence_penalty=0	
        )
        result += ('\n'+ response['choices'][0]['message']['content'])
    return _get_result_psyhologic(result, meeting_topic)

def get_links(content_text):
    links_result = ""
    for chunk in _split_text_into_chunks(content_text, 40):
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
            temperature=0,
            max_tokens=max_token_count,
            frequency_penalty=0,
            presence_penalty=0	
        )
        links_result += ('\n'+ response['choices'][0]['message']['content'])
    return _get_result_links(links_result)





