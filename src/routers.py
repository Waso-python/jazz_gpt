from fastapi import APIRouter, Depends, UploadFile, HTTPException
from fastapi.security.api_key import APIKey
from src.services.chatGPT import get_ideas, get_links, get_psyhologic
from src.services import auth

router = APIRouter()


@router.get("/secure", status_code=200)
async def info(api_key: APIKey = Depends(auth.get_api_key)):
    return {"default variable": api_key}

@router.post("/analyze_text/")
async def analyze_text(file: UploadFile, meeting_topic: str = None):
    try:
        if not meeting_topic:
            meeting_topic = 'проектирование MVP продукта для анализа стенограмм совещания'
        content = await file.read()
        content_text = content.decode()
        return {"ideas": get_ideas(content_text, meeting_topic), 
                "links": get_links(content_text),
                "psyhologic": get_psyhologic(content_text, meeting_topic)}
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))