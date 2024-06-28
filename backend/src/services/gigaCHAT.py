from langchain.chat_models import GigaChat
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    AIMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from src.services.get_users import clean_text
from langchain.schema import AIMessage, HumanMessage, SystemMessage
from src.services.giga_utils import get_giga_creds

def get_giga_token():
    Token = str(get_giga_creds())
    print(Token)
    return Token


def giga_free_answer(question):
    """Функция для ответа на произвольный вопрос"""
    chat = GigaChat(temperature=0.5, access_token=get_giga_token(), verify_ssl_certs=False)
    messages = [
        SystemMessage(
        content=f'Ты банковский работник, ответь на заданный вопрос максимально лаконично'),
        HumanMessage(
        content=question
        ),
        ]
    response = chat(messages).content
   
    result = response
    return result


def _giga_get_result_psyhologic(text, meeting_topic):
    """внутренняя функция которая результирует психологический портрет участников"""
    chat = GigaChat(temperature=0, access_token=Token, verify_ssl_certs=False)
    messages = [
    SystemMessage(
        content=f'Ты психолог в команде, тебе дается на анализ сформулированные тобой характеристики участников стенограммы совещания по теме "{meeting_topic}", ты составляешь психологический портрет участников по заданной теме и результат выдаешь в формате json, где ключ это имя участника, а значение это подробный психологический портрет участника по итогам встречи в виде строки'),
    HumanMessage(
        content=text
        ),
        ]

    result = chat(messages).content
    return result


def _giga_get_result_links(text):
    """внутренняя функция которая результирует распознанные ссылки"""
    chat = GigaChat(temperature=0, access_token=Token, verify_ssl_certs=False)
    messages = [
        SystemMessage(
        content=f'ты парсер данных, тебе нужно выделить из представленного текста ссылки. вывод сделай с форматированием json,где ключ = links, а значение это список ссылок'),
        HumanMessage(
        content=text
        ),
        ]

    response = chat(messages).content
    print('result_links:'+response)
    result = response
    return result


def _split_text_into_chunks(text, lines_per_chunk):
    """внутренняя функция которая генерирует части файла"""
    optimized_text = clean_text(text)
    lines = optimized_text.strip().split("\n")
    for i in range(0, len(lines), lines_per_chunk):
        yield "\n".join(lines[i : i + lines_per_chunk])


def _giga_get_result_ideas(analysis_result, meeting_topic):
    """внутренняя функция которая результирует распознанные идеи"""
    chat = GigaChat(temperature=0, access_token=Token, verify_ssl_certs=False)
    messages = [
        SystemMessage(
        content=f'Ты аналитик в команде, тебе даются на анализ идеи, сформулированные chatgpt из фразы стенограммы совещания по теме "{meeting_topic}", тебе нужно выделить из распознанных идей относящиеся к теме разговора  и сгруппировать по авторам. вывод сделай с форматированием json, где ключ это имя участника а значение список идей'),
        HumanMessage(
        content=analysis_result
        ),
        ]
    response = chat(messages).content
   
    result = response
    return result


def giga_get_ideas(content_text, meeting_topic):
    """функция которая распознает ссылки"""
    chat = GigaChat(temperature=0, access_token=Token, verify_ssl_certs=False)
    analysis_result = ""
    for chunk in _split_text_into_chunks(content_text, 40):
        messages = [
        SystemMessage(
        content=f'Ты аналитик, тебе даются на анализ  фразы из стенограммы совещания по теме "{meeting_topic}", ты выделяешь идеи участников по заданной теме и создаешь список идей или основных тем с указанием автора в виде - (автор) - (идея)'),
        HumanMessage(
        content="2023-09-29 12:10:20 - Рома (распознано): Да да, вот 1 плашка, да?\n2023-09-29 12:10:38 - Рома (распознано): Да вот много не успеем конечно сделать много функционалов, но вот допустим 1 по центру плашку, где допустим сверху будет загрузить json кнопка будет вот в стиле, как когда Сбера jazz заходишь создать встречу там такая зелёного цвета.\n2023-09-29 12:10:40 - Евгений (распознано): Угу.\n2023-09-29 12:10:52 - Рома (распознано): Такую же кнопку сделаю вот json грузиш loading какой-то идёт и потом всю информацию, которую вот с бэком мы сейчас придумываем взаимодействие, я её буду всю вниз кидать, вот пока я просто че сделаю.\n2023-09-29 12:10:57 - Рома (распознано): Вот эту плашку и Чёрный фон и кнопку сразу загрузить данные сделаю.\n2023-09-29 12:11:00 - Евгений (распознано): А может просто типа 1 страничка.\n2023-09-29 12:11:02 - Евгений (распознано): Есть какой-нибудь, то есть.\n2023-09-29 12:11:07 - Рома (распознано): Это это будет одностраничник, вот это 100% будет одностраничник.\n2023-09-29 12:11:10 - Рома (распознано): Вот.\n2023-09-29 12:11:12 - Евгений (распознано): Не такую.\n2023-09-29 12:11:14 - Рома (распознано): Никаких переходов, как в том, как это не будет.\n2023-09-29 12:11:20 - Евгений (распознано): То есть смотри, ты, допустим, подгру вот открываешь.\n2023-09-29 12:11:22 - Евгений (распознано): Набор плашек даже.\n2023-09-29 12:11:23 - Евгений (распознано): Пускай.\n2023-09-29 12:11:24 - Евгений (распознано): Ну там.\n2023-09-29 12:11:24 - Евгений (распознано): С таким.\n2023-09-29 12:11:27 - Евгений (распознано): Ты вгружаешь.\n2023-09-29 12:11:29 - Рома (распознано): Ага че.\n2023-09-29 12:11:31 - Евгений (распознано): И это все плашки начинают.\n2023-09-29 12:11:34 - Евгений (распознано): Ну там, после там какой-то работы.\n2023-09-29 12:11:54 - Рома (распознано): Ну да, грубо говоря, я не знаю, сколько их вот смотри экран, я собираюсь че сделать вот этот Чёрный фон, просто вот эту пашку большую, где будет вот тут вот тут кнопка где-то вот тут и после вывода вот тут информация и как нам её будет визуальная?\n2023-09-29 12:12:01 - Рома (распознано): Разбить удобнее так и сделаем, может, какие-то эти создам, а может, все и вот в этом основном окне будет все ниже.\n2023-09-29 12:12:04 - Евгений (распознано): Да, да.\n2023-09-29 12:12:04 - Евгений (распознано): Поня.\n2023-09-29 12:12:08 - Рома (распознано): Ты понял, вот тут кнопка ты грузишь и вот тут вся информация вот я так думаю.\n2023-09-29 12:12:10 - Евгений (распознано): Ну да.\n2023-09-29 12:12:19 - Рома (распознано): Ну можно, конечно, если, допустим, смотри, если какие-то ссылки на confluence будут прикладываться, можно сделать так, что здесь допустим.\n2023-09-29 12:12:25 - Рома (распознано): Ты можешь пролистать, проскроллить основные моменты встречи с сокращённой стенограммы, да?\n2023-09-29 12:12:26 - Евгений (распознано): Угу.\n2023-09-29 12:12:33 - Рома (распознано): А вот тут, допустим может так вот сюда выезжать и тут вопрос и ссылка на конфлюенс вопрос ссылка на confluence.\n2023-09-29 12:12:39 - Рома (распознано): Можно вот так сделать вот, допустим, вот здесь конфлюенс будет вопросы.\n2023-09-29 12:12:41 - Рома (распознано): Че ещё?\n2023-09-29 12:12:45 - Евгений (распознано): Угу, то есть в принципе, как бы итог нашего разговора, да какого.\n2023-09-29 12:12:48 - Евгений (распознано): Ну, не нашего вообще.\n2023-09-29 12:12:51 - Евгений (распознано): В котором мы подгрузим, то есть.\n2023-09-29 12:12:55 - Евгений (распознано): Любые моменты будут сопровождаться ссылками правильно, я понял.\n2023-09-29 12:13:07 - Рома (распознано): Ну да, на конфлюенс да, есть какие-то вот в ходе конфе, если возникают какие-то вопросы, если там распознаем мы эти вопросы, туда можно будет искать ссылки и вот.\n2023-09-29 12:13:26 - Рома (распознано): Вот сюда их вставлять ещё можно, знаешь, распознавать, допустим ну это если все успеем, можем не успеть, но хотя бы показать, когда если распознаем, что они захотят, типа встречу завести, вот тут, допустим, сделать вот тут сделать окно, завести встречу или нет.\n2023-09-29 12:13:35 - Рома (распознано): Вот я думаю, как ну короче, чтобы заводилась встреча, и тут ты какие-то данные вбиваешь и заводится, хотя нет смысла.\n2023-09-29 12:13:39 - Рома (распознано): Не знаю, вот как-нибудь ещё встречу заводить.\n2023-09-29 12:13:49 - Евгений (распознано): Тут видишь, пока не у нас. Jason, да с чем работать мы не можем, как бы это более конкретно там описать, как это все будет выглядеть.\n2023-09-29 12:13:58 - Евгений (распознано): Угу.\n2023-09-29 12:14:04 - Рома (распознано): Да, вот поэтому я сейчас поставил расшифровку вот и сейчас протестим хотя бы на этих, чтобы 30 минут было типа вот на фразы какие-нибудь, может, встречи заведём или, может, встретимся в понедельник, обсудим вот мы такие, чтоб промты были.\n2023-09-29 12:14:11 - Рома (распознано): Сейчас мы как раз это наговорим и нормально будет, но там сказано, что нужно 3 участника минимум.\n",
        ),
        AIMessage(
            content="{\"Рома\": [\"создать MVP продукта по анализу стенограммы онлайн совещания\", \" добавить функционал, включающий загрузку json файла и вывод информации на странице\",\"сделать одностраничное приложение без переходов\",\" добавить возможность добавления ссылок на Confluence и эскиз стенограммы на страницу\"],\n\"Евгений\": \"Поддерживает идею одностраничного приложения\",\"предлагает добавить функционал подгрузки плашек с информацией\", \"Соглашается с использованием ссылок на Confluence для подробной информации\", \"Отмечает, что требуется уточнить детали работы с json файлом\"}\n"
        
        )
        ]
        response = chat(messages).content
        
        
        analysis_result += "\n" + response
    return _giga_get_result_ideas(analysis_result, meeting_topic)


def giga_get_psyhologic(content_text, meeting_topic):
    """функция которая распознает психологические портреты участников"""
    result = ""
    chat = GigaChat(temperature=0, access_token=Token, verify_ssl_certs=False)

    for chunk in _split_text_into_chunks(content_text, 20):
        messages = [
        SystemMessage(
        content=f'Ты психолог в команде, тебе дается на анализ сформулированные тобой характеристики  и  очередные фразы из стенограммы совещания по теме "{meeting_topic}", ты составляешь психологический портрет участников по заданной теме и кратко формулируешь таким образом, чтобы подавать тебе в качестве контекста со следующим сообщением'),
        HumanMessage(
        content=result + "\n" + chunk
        ),
        ]
        response = chat(messages).content
        result += "\n" + response
    return _giga_get_result_psyhologic(result, meeting_topic)


def giga_get_links(content_text):
    links_result = ""
    chat = GigaChat(temperature=0, access_token=Token, verify_ssl_certs=False)
    for chunk in _split_text_into_chunks(content_text, 20):

        messages = [
        SystemMessage(
        content=f'тебе даются на анализ фразы из стенограммы совещания, только если в фразе есть ссылка какой-либо ресурс, то ты выделяешь ссылку и создаешь список ссылок с указанием автора в виде - (автор) - (ссылка), если ссылок нет, то ты просто пропускаешь фразу'),
        HumanMessage(
        content=chunk
        ),
        ]
        response = chat(messages).content

        links_result += "\n" + response
        print('chank_links:'+links_result)
    return _giga_get_result_links(links_result)