from fastapi import APIRouter, Depends, UploadFile, HTTPException
from fastapi.security.api_key import APIKey
from src.services.chatGPT import get_ideas, get_links, get_psyhologic
from src.services import auth
from src.services.file_utils import save_file, generate_file_id
from src.services.get_users import get_unique_participants
import json
router = APIRouter()


@router.get("/secure", status_code=200)
async def info(api_key: APIKey = Depends(auth.get_api_key)):
    return {"default variable": api_key}

@router.post("/upload_file/")
async def upload_file(file: UploadFile, api_key: APIKey = Depends(auth.get_api_key)):
    try:
        file_id = generate_file_id()
        await save_file(file, file_id)
        return {"file_id": file_id, "users":get_unique_participants(file_id)}
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))

@router.post("/analyze_text/")
async def analyze_text(file_id: UploadFile, meeting_topic: str = None, api_key: APIKey = Depends(auth.get_api_key)):
    try:
        if not meeting_topic:
            meeting_topic = 'обсуждение рабочих вопросов'
        content = await file.read()
        content_text = content.decode()
        ideas = json.loads(get_ideas(content_text, meeting_topic))
        links = json.loads(get_links(content_text)).get("links")
        psyhologic = get_psyhologic(content_text, meeting_topic)
        
        return {"ideas": ideas or [], 
                "links": links or [],
                "psyhologic": psyhologic or []}
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))

@router.post("/get_ideas/")
async def get_ideas(file_id: str, meeting_topic: str = None, api_key: APIKey = Depends(auth.get_api_key)):
    try:
        if not meeting_topic:
            meeting_topic = 'обсуждение рабочих вопросов'
        with open(file_id) as file:
            content = await file.read()
        content_text = content.decode()
        ideas = json.loads(get_ideas(content_text, meeting_topic))

        
        return {"ideas": ideas or []}
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))