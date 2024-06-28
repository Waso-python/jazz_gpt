import os
import subprocess
import requests
import uuid
from settings.config import GIGA_CHAT_AUTH_DATA, GIGA_CHAT_CLIENT_ID, GIGA_CHAT_SCOPE
import json
import datetime


def save_to_env(json_response):
    data = json.loads(json_response)
    os.environ['GIGA_ACCESS_TOKEN'] = data.get('access_token', '')
    os.environ['GIGA_EXPIRES_AT'] = str(data.get('expires_at', ''))

def is_token_expired():
    expires_at_timestamp = int(os.environ.get('GIGA_EXPIRES_AT', 0))
    current_timestamp = int(datetime.datetime.now().timestamp() * 1000)  # convert to milliseconds
    return current_timestamp >= expires_at_timestamp


def generate_id():
    return str(uuid.uuid4())


def create_or_check_pem_file(pem_file_path):
    if os.path.exists(pem_file_path) and os.path.getsize(pem_file_path) > 0:
        return True
    else:
        prom_server = "ngw.devices.sberbank.ru"
        prom_cmd = f"echo quit | openssl s_client -showcerts -servername {prom_server} -connect {prom_server}:9443 > {pem_file_path}"
        prom_result = subprocess.run(prom_cmd, shell=True)
        return prom_result.returncode == 0



def get_creds():
    prom_pem = 'giga_pem'
    if create_or_check_pem_file(prom_pem):
        headers = {
            'Authorization': f'Bearer {GIGA_CHAT_AUTH_DATA}',
            'RqUID': f'{generate_id()}',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        data = {'scope': f'{GIGA_CHAT_SCOPE}'}
        r = requests.post('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', headers=headers, data=data, verify=prom_pem)
        json_response = r.text
        print(json_response)
        return json_response
    else:
        print("service prom not access!!!")

def get_giga_creds():
    print('get giga creds')
    if is_token_expired():
        save_to_env(get_creds())
        creds = os.environ.get('GIGA_ACCESS_TOKEN')
    else:
        creds = os.environ.get('GIGA_ACCESS_TOKEN')
    return creds

