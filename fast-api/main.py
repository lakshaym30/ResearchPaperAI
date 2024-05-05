from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from typing import List
import PyPDF2
from io import BytesIO
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Milvus
from langchain_community.embeddings import OctoAIEmbeddings
from langchain_community.llms.octoai_endpoint import OctoAIEndpoint
import os
from pymilvus import connections, utility


app = FastAPI()

CHUNK_SIZE = 1024
CHUNK_OVERLAP = 128

OCTOAI_API_TOKEN = os.environ["OCTOAI_API_TOKEN"]


@app.post('/upload')
async def upload_document(file_name: str, document: UploadFile = File(...)):
    content = await document.read()

    #replace with edgar's logic
    reader = PyPDF2.PdfReader(BytesIO(content))
    document_text = ""
    for page in reader.pages:
        document_text += page.extract_text()
    print(document_text)
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
    )
    splits = text_splitter.split_text(document_text)
    print(splits)

    embeddings = OctoAIEmbeddings(endpoint_url="https://text.octoai.run/v1/embeddings")

    vector_store = Milvus.from_documents(
        splits,
        embedding=embeddings,
        connection_args={"host": "localhost", "port": 19530},
        collection_name=file_name
    )
        
    #parse document using pypdf
    #chunk document using langchain
    #embed chunk
    #post chunk to milvus


@app.post('/search')
async def search_document(query: str):
    embed = OctoAIEmbeddings(endpoint_url="https://text.octoai.run/v1/embeddings")
    embedded_query = embed.embed_query("Why did the octopus cross the road")
    print(embedded_query)

    return {"Success": "Document Searched Successfully"}

@app.get('/collection-names')
async def get_collection_names():
    connections.connect("default", host='localhost', port='19530')
    
    # Get list of all collection names
    collection_names = utility.list_collections()
    
    # Disconnect from the server
    connections.disconnect("default")
    
    return collection_names

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)