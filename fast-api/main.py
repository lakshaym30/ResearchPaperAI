from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from typing import List

# import PyPDF2
from io import BytesIO
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Milvus
from langchain_community.embeddings import OctoAIEmbeddings
from langchain_community.llms.octoai_endpoint import OctoAIEndpoint
import os
from pymilvus import connections, utility
from unstructured.partition.pdf import partition_pdf
from langchain.docstore.document import Document
from langchain.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
import re


app = FastAPI()

CHUNK_SIZE = 1024
CHUNK_OVERLAP = 128

OCTOAI_API_TOKEN = os.environ["OCTOAI_API_TOKEN"]

embeddings = OctoAIEmbeddings(endpoint_url="https://text.octoai.run/v1/embeddings")
llm = OctoAIEndpoint(
    model="llama-2-13b-chat-fp16",
    max_tokens=1024,
    presence_penalty=0,
    temperature=0.1,
    top_p=0.9,
)


def clean_string(input_string):
    # Regex to find any character not a number, letter, or underscore
    pattern = re.compile(r"[^a-zA-Z0-9_]")
    # Replace these characters with empty string
    return pattern.sub("", input_string)


def get_parsed_document_text(elements):
    texts = []
    for ele in elements:
        obj = ele.to_dict()
        obj_type = obj["type"]
        if obj_type == "Table":
            texts.append(obj["metadata"]["text_as_html"])
        else:
            texts.append(obj["text"])
    return "\n".join(texts)


@app.post("/upload")
async def upload_document(document: UploadFile = File(...)):
    filename = document.filename
    content = await document.read()
    file_like_object = BytesIO(content)

    elements = partition_pdf(
        file=file_like_object,
        infer_table_structure=True,
        strategy="hi_res",
    )
    document_text = get_parsed_document_text(elements)

    doc = Document(page_content=document_text)
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
    )
    splits = text_splitter.split_documents([doc])
    # print(splits)
    collection_name = clean_string(filename)
    vector_store = Milvus(
        embeddings,
        connection_args={"host": "localhost", "port": 19530},
        collection_name=collection_name,
        auto_id=True,
    )

    vector_store.add_documents(splits)

    return {
        "Success": "Document Uploaded Successfully",
        "collection_name": collection_name,
    }
    # parse document using pypdf
    # chunk document using langchain
    # embed chunk
    # post chunk to milvus


@app.post("/search")
async def search_document(query: str, collection_name: str):

    vector_store = Milvus(
        embeddings,
        connection_args={"host": "localhost", "port": 19530},
        collection_name=collection_name,
        auto_id=True,
    )
    retriever = vector_store.as_retriever(k=5)

    template = """You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.
Question: {question} 
Context: {context} 
Answer:"""
    prompt = ChatPromptTemplate.from_template(template)
    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    answer = chain.invoke(query)

    return {"Success": "Document Searched Successfully", "content": answer}


@app.get("/collection-names")
async def get_collection_names():
    connections.connect("default", host="localhost", port="19530")

    # Get list of all collection names
    collection_names = utility.list_collections()

    # Disconnect from the server
    connections.disconnect("default")

    return collection_names


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
