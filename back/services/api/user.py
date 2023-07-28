from typing import Optional

from model.user.UserDao import UserDao
from model.user.UserEntity import  UserEntity

from fastapi import APIRouter
import traceback

router = APIRouter(
    prefix="/user",
    tags=["user"],
    responses={404: {"description": "Not found"}},
)

@router.get('/{user_name}', response_model=Optional[UserEntity])
def get_querie(user_name:str):
    return UserDao.find_by_username(user_name)

@router.post('/new')
def new_user(user:UserEntity):
    try:
        result = UserDao.create(user)
        return {"ok":True}
    except Exception as ex:
        print(traceback.format_exc())
        return {"ok":False}