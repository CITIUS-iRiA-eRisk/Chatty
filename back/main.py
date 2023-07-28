import ssl
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

from app.app import MainApp

MainApp()

from services.api import user


app = MainApp.APP

app.include_router(user.router)