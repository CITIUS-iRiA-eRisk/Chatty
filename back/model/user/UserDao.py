from model.BaseDao import BaseDao
from model.container import ModelContainer

@ModelContainer.register_dao('classifier_model')
class UserDao(BaseDao):
    database = None
    