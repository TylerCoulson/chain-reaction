from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


templates = Jinja2Templates("app/templates")


app = FastAPI()
app.mount("/static", StaticFiles(directory="app/static"), name="static")

@app.get("/")
async def root(request: Request):
    context = {
        "request":request,
    }
    return templates.TemplateResponse("index.html", context)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host='0.0.0.0', port=8000, reload=True)