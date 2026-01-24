# ============================================
# Etapa 1: Build
# ============================================
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

# Copiar pom.xml primero para aprovechar cache de Docker
COPY pom.xml .

# Descargar dependencias (se cachea si pom.xml no cambia)
RUN mvn dependency:go-offline -B

# Copiar código fuente
COPY src ./src

# Compilar aplicación
RUN mvn clean package -DskipTests -B

# ============================================
# Etapa 2: Runtime (Producción)
# ============================================
FROM eclipse-temurin:21-jre-alpine

# Crear usuario no-root (seguridad)
RUN addgroup -S spring && adduser -S spring -G spring

WORKDIR /app

# Copiar JAR desde etapa de build
COPY --from=builder /app/target/*.jar app.jar

# Cambiar permisos
RUN chown spring:spring app.jar

# Usar usuario no-root
USER spring:spring

# Exponer puerto
EXPOSE 8080

# Variables de entorno para producción
ENV JAVA_OPTS="-Xmx512m -Xms256m -XX:+UseG1GC -XX:MaxGCPauseMillis=200"

# Ejecutar aplicación
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]