from settings.config import ACCESS_TOKEN
from fastapi.security.api_key import APIKeyHeader
from fastapi import Security, HTTPException
from starlette.status import HTTP_403_FORBIDDEN

access_token = APIKeyHeader(name="access_token", auto_error=False)


async def get_api_key(access_token: str = Security(access_token)):
    print(f'Acces token = {ACCESS_TOKEN}')
    if access_token == ACCESS_TOKEN:
        return access_token
    else:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN, detail="Could not validate API KEY"
        )
