from fastapi import FastAPI
from dotenv import load_dotenv
from model.container import ModelContainer
import os

load_dotenv()

class MainApp:
    APP: FastAPI
    MODEL_CONTAINER: ModelContainer
    
    def __init__(self):
        MainApp.MODEL_CONTAINER = ModelContainer()
        MainApp.APP = FastAPI()

        


                
    