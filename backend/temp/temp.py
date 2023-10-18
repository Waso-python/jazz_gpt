import re


def clean_text(filename):
    # Регулярное выражение для удаления технической информации
    with open(filename, "r", encoding="utf-8") as file:
        text = file.read()
    pattern = r"\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} - (.*?) \(распознано\)"
    replacement = r"\1"

    modified_text = re.sub(pattern, replacement, text)

    return modified_text


def get_unique_participants(filename):
    # Чтение содержимого файла
    with open(filename, "r", encoding="utf-8") as file:
        text = file.read()

    # Регулярное выражение для поиска имен участников
    regex = re.compile(r"- ([\w\s]+) \(распознано\):")

    # Поиск всех имен и добавление их в множество для удаления дубликатов
    participants = set(regex.findall(text))
    res = {v: k for v, k in enumerate(participants)}

    return res


sample_text = "2023-09-29 12:10:38 - Рома (распознано): Да вот много не успеем конечно сделать много функционалов, но вот допустим 1 по центру плашку, где допустим сверху будет загрузить json кнопка будет вот в стиле, как когда Сбера jazz заходишь создать встречу там такая зелёного цвета.\n2023-09-29 12:34:19 - Евгений (распознано): Либо там вообще на мини, либо на минималках как-то там.\n2023-09-29 12:34:25 - Василий Колмачевский (распознано): Либо даже мы будем какими-то джейсонами хранить даже то, что у нас получается, и ещё там и bass."

print(clean_text(sample_text))