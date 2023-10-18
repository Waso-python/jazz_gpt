from fastapi import APIRouter, Depends, UploadFile, HTTPException
from fastapi.security.api_key import APIKey
from src.services.chatGPT import get_ideas, get_links, get_psyhologic
from src.services.gigaCHAT import giga_get_ideas, giga_get_links, giga_get_psyhologic
from src.services import auth
from src.services.file_utils import save_file, generate_file_id
from src.services.get_users import get_unique_participants, replace_id_by_name
from src.db.db_utils import Database
from src.services.text_analyzer.detector_bad_word import BadThemeAnalyzer
from src.services.text_analyzer.main_emotion import EmotitonAnalyzer
from src.services.text_analyzer.mat_detection import ClearMatJazz
from src.services.text_analyzer.parasit_detection import ClearParazitWord
import json
import traceback
from settings.config import DB_NAME

router = APIRouter()


@router.post("/upload_file")
async def upload_file(file: UploadFile, api_key: APIKey = Depends(auth.get_api_key)):
    try:
        file_id = generate_file_id()
        await save_file(file, file_id)
        db_users = Database(DB_NAME)
        db_users.open()
        unique_users = get_unique_participants(file_id)
        for k, v in unique_users.items():
            db_users.insert_data(file_id, k, v)
        db_users.close()
        return {"file_id": file_id, "users": unique_users}
    except Exception as ex:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(ex))


@router.post("/get_ideas")
async def ideas(
    file_id: str, meeting_topic: str = None, api_key: APIKey = Depends(auth.get_api_key)
):
    try:
        if not meeting_topic:
            meeting_topic = "обсуждение рабочих вопросов"
        with open(file_id, "r") as file:
            content = file.read()
        ideas = json.loads(get_ideas(content, meeting_topic))
        result = replace_id_by_name(ideas, file_id)

        return {"ideas": result or []}
    except Exception as ex:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(ex))


@router.post("/detector_bad_theme")
async def bad_theme(file_id: str, api_key: APIKey = Depends(auth.get_api_key)):
    try:
        theme = BadThemeAnalyzer()
        result = theme.file_analyz(file_id)

        return result
    except Exception as ex:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(ex))


@router.post("/emotion")
async def bad_theme(file_id: str, api_key: APIKey = Depends(auth.get_api_key)):
    """Получение эмоционального настроя участников в течении разговора"""
    try:
        emotions = EmotitonAnalyzer()
        result = emotions.file2info(file_id)

        return result
    except Exception as ex:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(ex))


@router.post("/mat_detect")
async def bad_theme(file_id: str, api_key: APIKey = Depends(auth.get_api_key)):
    """Определение нецензурной лексики"""
    try:
        mat_detects = ClearMatJazz()
        result = mat_detects.clear_file(file_id)

        return result
    except Exception as ex:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(ex))


@router.post("/parasit")
async def bad_theme(file_id: str, api_key: APIKey = Depends(auth.get_api_key)):
    """Определение слов паразитов"""
    try:
        parasits = ClearParazitWord()
        result = parasits.clear_file(file_id)

        return result
    except Exception as ex:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(ex))


@router.post("/get_psyhologic")
async def psyhologic(
    file_id: str, meeting_topic: str = None, api_key: APIKey = Depends(auth.get_api_key)
):
    try:
        if not meeting_topic:
            meeting_topic = "обсуждение рабочих вопросов"
        with open(file_id, "r") as file:
            content = file.read()
        psyhologic = json.loads(get_psyhologic(content, meeting_topic))
        result = replace_id_by_name(psyhologic, file_id)

        return {"psyhologic": result or []}
    except Exception as ex:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(ex))


@router.post("/get_links")
async def links(file_id: str, api_key: APIKey = Depends(auth.get_api_key)):
    try:
        with open(file_id, "r") as file:
            content = file.read()
        links = json.loads(get_links(content)).get("links")

        return {"links": links or []}
    except Exception as ex:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(ex))

@router.post("/get_links_giga")
async def links_giga(file_id: str, api_key: APIKey = Depends(auth.get_api_key)):
    try:
        with open(file_id, "r") as file:
            content = file.read()
        links = json.loads(giga_get_links(content)).get("links")

        return {"links": links or []}
    except Exception as ex:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(ex))
    
@router.post("/get_psyhologic_giga")
async def psyhologic_giga(file_id: str, meeting_topic: str = None, api_key: APIKey = Depends(auth.get_api_key)):
    try:
        if not meeting_topic:
            meeting_topic = "обсуждение рабочих вопросов"
        with open(file_id, "r") as file:
            content = file.read()
        
        psyhologic = json.loads(giga_get_psyhologic(content, meeting_topic))
        result = replace_id_by_name(psyhologic, file_id)
        return {"psyhologic": result or []}
    except Exception as ex:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(ex))