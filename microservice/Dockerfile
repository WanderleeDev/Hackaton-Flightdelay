FROM python:3.12-slim-trixie

RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*

COPY --from=ghcr.io/astral-sh/uv:0.5.8 /uv /uvx /bin/

WORKDIR /app

COPY pyproject.toml uv.lock /app/
RUN uv sync --frozen --no-install-project

COPY . /app

RUN mkdir -p /app/model && \
    wget https://huggingface.co/WanderleedDev/flight-delay-predictor/resolve/main/predictor_delay.pkl -O /app/model/predictor_delay.pkl

RUN uv sync --locked

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]