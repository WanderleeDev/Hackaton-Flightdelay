from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from src.core import _global_error_handler, limiter
from src.health_check import health_router
from src.predict import predict_router


app = FastAPI(description="API for predicting individual or batch flights")
origins = ["*"]

app.state.limiter = limiter
app.middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_exception_handler(Exception, _global_error_handler)

@app.get("/", response_class=Response, tags=["root"])
def root() -> Response:
    return Response("Welcome to the Flight Delay Prediction API!", media_type="text/plain")

app.include_router(health_router)
app.include_router(predict_router)
