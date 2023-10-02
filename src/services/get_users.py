import re

def get_unique_participants(filename):
    # Чтение содержимого файла
    with open(filename, 'r', encoding='utf-8') as file:
        text = file.read()

    # Регулярное выражение для поиска имен участников
    regex = re.compile(r'- ([\w\s]+) \(распознано\):')

    # Поиск всех имен и добавление их в множество для удаления дубликатов
    participants = set(regex.findall(text))
    res = {v: k for v, k in enumerate(participants)}


    return res



