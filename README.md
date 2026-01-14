![banner](/Assets/banner.jpg)

<h2><b> Flujo del Modelo de Machine Learning</b><h2>

<ol>
<li>
    <h3>1. Ingreso de datos:</h3>
</li>
<li>
    <h3>2. Validación de los datos:</h3>
</li>
    
<li>
    <h3>3. Preprocesamiento de los datos:</h3>
</li>

<li>
    <h3>4. Carga del Modelo:</h3>
</li>

<li>
    <h3>5. Predicción:</h3>
</li>

<li>
    <h3>6. Respuesta:</h3>
</li>
</ol>

---
## **Uso del sistema de Predicción**
El modelo está desplegado como un servicio web utilizando FastAPI. Esto permite realizar predicciones enviando peticiones HTTP desde cualquier aplicación.

---
1. Requisitos Previos
Antes de comenzar, asegúrate de tener instaladas las dependencias necesarias que se encuentran en requirements.txt y el modelo descargado en la carpeta /model.

```text
pip install fastapi uvicorn pandas joblib scikit-learn==1.6.1
```
2. Ejecución del Servidor
Para levantar la API en tu máquina local, ejecuta el siguiente comando en la raíz del proyecto:

```text
uvicorn main:app --reload
```

* La API estará disponible en: http://127.0.0.1:8000
* Puedes acceder a la documentación interactiva (Swagger UI) en: http://127.0.0.1:8000/docs

3. Formato de Entrada (Input)
Para obtener una predicción, el sistema espera los datos en un formato específico (basado en schemas.py) los datos deben enviarse como un objeto JSON o una lista con el siguiente orden:

4. Ejemplo de Ejecución en Python
Puedes cargar el modelo predictor_delay.pkl y realizar una predicción de la siguiente manera:
import requests

```text
import requests
url = "http://127.0.0.1:8000/predict"
data = {
    "airline":"AA",
    "origin": "SFO",
    "destination":"LAX",
    "distance_km": 4000,
    "day_of_week": 0,
    "hour": 18 

}

response = requests.post(url, json=data)
print(response.json())
```
**Detalles Técnicos Importantes:**
*Carga del Modelo:* Utilizamos joblib para cargar el archivo predictor_delay.pkl de forma eficiente dentro de main.py.

*Consistencia:* Es obligatorio usar scikit-learn==1.6.1 tanto en el entrenamiento como en el servicio para evitar errores de incompatibilidad al deserializar el modelo.

---
```text
Hackthon-FlightDelay - Data Science/
├── 📂 data/  
|    └── [cleaned_data](https://drive.google.com/file/d/1_8Uzy9vxZr8Vl1328jWufiw4NsK_XxjN/view?usp=drive_link)
├── 📂 notebooks/
│   ├── complete_ML.ipynb
│   ├── flights_analysis.ipynb
|   └── 📂 modelos adicionales/
|	      ├── xgboost_training.ipynb
|	      └── catboost_training
|	
├── 📂 model/
│   ├── predictor_delay.pkl
|	├── main.py
|	└──  schemas.py
|
├── README.md
├── requirements.txt

```
