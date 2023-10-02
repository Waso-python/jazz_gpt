from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from src.routers import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "https://localhost:3000",
    "http://10.53.171.212:3020",
]

# Allow these methods to be used
methods = ["GET", "POST", "PUT", "DELETE"]

# Only these headers are allowed
headers = ["Content-Type", "Authorization"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=methods,
    allow_headers=headers,
)


app.include_router(router)




