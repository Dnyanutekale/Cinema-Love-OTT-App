import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from google.genai import types
from google.genai.errors import APIError

# Load environment variables
load_dotenv()

app = FastAPI(title="StreamSphere AI Chatbot API")

# Add CORS Middleware to allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For local development, allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    role: str  # 'user' or 'model'
    text: str

class ChatRequest(BaseModel):
    message: str
    history: List[ChatMessage] = []

class ChatResponse(BaseModel):
    response: str
    error: Optional[str] = None

# Initialize Client
def get_client() -> genai.Client:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key.strip() == "" or api_key == "your_gemini_api_key_here":
        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY is not configured in .env file."
        )
    return genai.Client(api_key=api_key.strip())

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        client = get_client()
        
        # Prepopulate the chat history for Gemini
        gemini_history = []
        for msg in request.history:
            # Standard API roles for Gemini: 'user' and 'model'
            role = "user" if msg.role.lower() in ("user", "human") else "model"
            gemini_history.append(
                types.Content(
                    role=role,
                    parts=[types.Part.from_text(text=msg.text)]
                )
            )
            
        system_instruction = (
            "You are the Cinema Love AI Assistant, a friendly and helpful movie recommendation expert "
            "for the StreamSphere streaming platform. Help users find movies and TV shows, answer questions "
            "about actors, genres, and directors, and offer personalized watch suggestions. "
            "Keep your responses concise, conversational, and format them nicely in markdown (e.g. bold titles, list recommendations)."
        )
        
        # Create chat session with historical messages
        chat = client.chats.create(
            model="gemini-2.5-flash",
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.7,
            ),
            history=gemini_history
        )
        
        # Send the user's message to get a response
        response = chat.send_message(request.message)
        
        return ChatResponse(response=response.text)
        
    except APIError as e:
        # Handle API errors gracefully
        return ChatResponse(
            response="I'm sorry, I encountered a Google Gemini API error. Please check your credentials.",
            error=str(e)
        )
    except Exception as e:
        # Catch-all
        return ChatResponse(
            response="I'm sorry, an unexpected error occurred while processing your request.",
            error=str(e)
        )

@app.get("/api/health")
async def health_check():
    api_key_set = bool(os.getenv("GEMINI_API_KEY"))
    return {
        "status": "healthy",
        "api_key_configured": api_key_set
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="127.0.0.1", port=8000, reload=True)
