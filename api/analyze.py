from http.client import HTTPResponse
from typing import Dict
import os
from openai import OpenAI
from typing import Union
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

class AnalyzeRequest(BaseModel):
    questions: list[str]
    answers: list[str]

@app.post("/api/analyze")
async def analyze(request: AnalyzeRequest):
    try:
        # Print received data
        print("Received questions:", request.questions)
        print("Received answers:", request.answers)
        
        # Echo back the data
        return {
            "received": {
                "questions": request.questions,
                "answers": request.answers
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 