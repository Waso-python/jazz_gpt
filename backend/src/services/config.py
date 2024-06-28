import os, dotenv

dotenv.load_dotenv()

PORT = int(os.environ.get("PORT"))
HOST = os.environ.get("HOST")
CHATGPT_TOKEN = os.environ.get("CHATGPT_TOKEN")
ACCESS_TOKEN = os.environ.get("ACCESS_TOKEN", "my-token")
DB_NAME = os.environ.get("DB_NAME")
GIGA_CHAT_CLIENT_ID=os.environ.get("GIGA_CHAT_CLIENT_ID")
GIGA_CHAT_AUTH_DATA=os.environ.get("GIGA_CHAT_AUTH_DATA")
GIGA_CHAT_SCOPE=os.environ.get("GIGA_CHAT_SCOPE","GIGACHAT_API_CORP")