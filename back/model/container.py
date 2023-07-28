from typing import Any, Dict, Type
from pymongo import MongoClient
import pprint
from dotenv import load_dotenv

import os

load_dotenv()

class ModelContainer:
    DAOS: Dict[str, Any] = dict()
    client: MongoClient[Dict[str, Any]] = MongoClient(os.environ["HOST"])
    
    def __init__(self):
        self.pp = pprint.PrettyPrinter(indent=4)
        self.main_window = None
        self.max_dock_heigh = 0
        self._storage = dict()
        self.runs = []
        
    @staticmethod
    def register_dao(collection):
        def fun_decorator(fun):
            fun()(ModelContainer.client['pooling-eval'][collection])
            ModelContainer.DAOS[fun.__name__] = fun 
            return fun
        return fun_decorator
    
   



