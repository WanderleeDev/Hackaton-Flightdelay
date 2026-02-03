# ⚡ FlightOnTime - AI Microservice

A high-performance Python microservice designed to serve the flight delay prediction model.

## 🛠️ Tech Stack

- **Language**: Python 3.11+
- **Framework**: FastAPI
- **Package Manager**: [uv](https://github.com/astral-sh/uv)
- **Containerization**: Docker
- **Libraries**: Scikit-learn, Pandas, Joblib

## 🚀 Getting Started

### Installation

Using `uv` (recommended):

```bash
uv sync
```

Or with `pip`:

```bash
pip install -r requirements.txt
```

### Running the Service

```bash
uv run uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Endpoints

- `POST /predict`: Submit flight data for a delay probability prediction.
- `GET /health`: Check service status.

## 📂 Structure

- `main.py`: API entry point and routes.
- `model/`: Directory containing the serialized `.pkl` models.
- `src/`: Data validation schemas and utility functions.

---

_Part of the FlightOnTime Hackathon ecosystem._
