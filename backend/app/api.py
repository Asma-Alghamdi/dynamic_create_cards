from fastapi import FastAPI, File, UploadFile, Depends, status, Form, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import io
from base64 import b64decode
from .config.db import conn 
from .schemas.card import cardEntity, cardsEntity
from bson import ObjectId

######################################-----API-----######################################
app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

######################################-----Defult Get-----######################################
        
@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to the Cards API."}

######################################-----GET and POST cards information-----######################################

#Get all cards from the database.
@app.get("/card", tags=["card"])
async def get_cards() -> dict:
    n=cardsEntity(conn.test.cards.find())
    m=[]
    for x in n:
        m.append(x)
    return m
   
#Insert a new card.
@app.post("/card", tags=["card"])
async def add_card(card: dict) -> dict:
    conn.test.cards.insert_one(card)


#Get a list of different titles of the cards that existed in the database.
@app.get("/title", tags=["card"])
async def get_titles() -> dict:
    titles=conn.test.cards.distinct("title")
    item = ["title"]

    titlesList=[]
    for x in titles:
        j=[]
        j.append(x)
        title_dictionary = dict(zip(item, j))
        titlesList.append(title_dictionary)
      
    return titlesList
    
    

