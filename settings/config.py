import os, dotenv

dotenv.load_dotenv()

PORT = int(os.environ.get('PORT'))
HOST = os.environ.get('HOST')
CHATGPT_TOKEN = os.environ.get('CHATGPT_TOKEN')
ACCESS_TOKEN = os.environ.get('ACCESS_TOKEN')
DB_NAME = os.environ.get('DB_NAME')
