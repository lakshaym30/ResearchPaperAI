from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from typing import List
from langchain_community.document_loaderes import PyPDFLoader

app = FastAPI()


@app.post('/upload')
async def upload_document(document: UploadFile = File(...)):
    return {"Success": "Document Uploaded Successfully"}
    #parse document using pypdf
    #chunk document using langchain


@app.get('/search')
async def search_document():
    return {"Success": "Document Searched Successfully"}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)