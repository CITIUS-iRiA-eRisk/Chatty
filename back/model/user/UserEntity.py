from pydantic import BaseModel
from bson.objectid import ObjectId

class UserEntity(BaseModel):
    # id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    username: str
    password: str
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
               "username": "example",
               "password": "password",
            }
        }