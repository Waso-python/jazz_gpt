import re
from src.db.db_utils import get_users_by_file_id

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

def replace_id_by_name(data_dict, file_id):

	user_list = get_users_by_file_id(file_id)

	# Создание словаря для отображения имен пользователей на их ID
	
	user_dict = {user[1]: user[0] for user in user_list}
	# Исходный словарь
	original_dict = user_dict

	updated_dict = {user_dict[key]: value for key, value in data_dict.items() if key in user_dict}
	# Замена имен пользователей на их ID в исходном словаре

	return updated_dict





