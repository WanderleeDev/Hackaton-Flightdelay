![banner](/Data-science/Assets/banner.jpg)

# ✈️ FlightOnTime - Flight Delay Predictor

Executive summary of the project for the **Flight Delay Hackathon**. This system integrates Artificial Intelligence to predict whether a flight will be delayed based on historical and real-time data.

## 🚀 Project Architecture

The project is divided into four main modules:

### 1. 📂 Data Science (`/Data-science`)

- **Objective**: Exploratory Data Analysis (EDA) and model training.
- **Models**: Logistic Regression, Random Forest, XGBoost, and CatBoost.
- **Stack**: Python, Scikit-Learn, Pandas, Jupyter Notebooks.

### 2. ⚡ AI Microservice (`/microservice`)

- **Objective**: Serve predictions from the trained model.
- **Tech Stack**: FastAPI (Python), UV (package manager), Docker.
- **Endpoints**: Unit and batch predictions via REST API.

### 3. ☕ Backend (`/backend`)

- **Objective**: Data orchestration, user management, and prediction history.
- **Tech Stack**: Java 21, Spring Boot 4, Flyway, PostgreSQL (Docker).
- **Documentation**: Swagger/OpenAPI integration.

### 4. 🎨 Frontend (`/frontend`)

- **Objective**: Intuitive user interface for queries and metrics visualization.
- **Tech Stack**: Next.js 16 (App Router), React 19, Tailwind CSS 4, TanStack Query.
- **Features**: Prediction dashboard, interactive history, and AI assistant chat.

## 🛠️ Quick Installation

1.  **Requirements**: Docker, Java 21, Python 3.11+, Node.js 20+.
2.  **Configuration**:
    ```bash
    # Clone the repo and install frontend dependencies
    cd frontend && npm install
    # Start database and backend
    cd ../backend && ./mvnw spring-boot:run
    # Start AI microservice
    cd ../microservice && pip install -r requirements.txt && python main.py
    ```

## 📈 Impact

Optimizing passenger experience and airport operational management through accurate predictions based on airline, origin, destination, and distance.

---

_Developed for the 2026 Flight Delay Hackathon._
