# ☕ FlightOnTime - Backend API

This is the core orchestration service for the **FlightOnTime** platform, responsible for handling business logic, user data, and prediction history.

## 🛠️ Tech Stack

- **Language**: Java 21
- **Framework**: Spring Boot 4.0.1
- **Database**: PostgreSQL
- **Migration**: Flyway
- **Build Tool**: Maven
- **Docs**: Swagger UI (OpenAPI 3)

## 🚀 Getting Started

### Prerequisites

- JDK 21
- Docker & Docker Compose (for the database)

### Running Locally

1. **Start the database**:
   ```bash
   docker-compose up -d
   ```
2. **Run the application**:
   ```bash
   ./mvnw spring-boot:run
   ```

### API Documentation

Once running, explore the endpoints at:
`http://localhost:8080/swagger-ui.html`

## 📂 Structure

- `src/main/java`: Domain logic, controllers, and services.
- `src/main/resources/db/migration`: SQL scripts for database schema.
- `compose.yaml`: Docker setup for local development.

---

_Part of the FlightOnTime Hackathon ecosystem._
