from fastapi import FastAPI
import uvicorn
from settings.config import HOST, PORT
from src.server import app

if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=PORT)
