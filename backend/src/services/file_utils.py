import uuid
import shutil
from pathlib import Path
from fastapi import UploadFile


def generate_file_id():
    return str(uuid.uuid4())


async def save_file(file: UploadFile, file_id: str):
    path = Path(f"{file_id}")
    with path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
