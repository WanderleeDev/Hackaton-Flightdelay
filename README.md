![banner](/Assets/banner.jpg)

<h2>
<b> 
Flujo del Modelo de Machine Learning
</b>
<h2>

<ol>

<li>

<h3>
Ingreso de datos:
</h3>

<p>
Los datos pueden ser recibidos de dos formas: 
</p>
- De manera **unitaria:** Es decir una sola predicción
- De manera **compuesta:** Es decir multiples predicciones de manera simultanea a través de un archivo ".CSV"

<p>
Cada nuevo registro deberá contener información relevante como:
</p>

- **Aerolinea**
- **Origen**
- **Destino**
- **Día de la semana**
- **Hora**
- **Distancia en KM**

</li>

<li>

<h3>
Validación de los datos:
</h3>

<p>
Antes de poder procesar la información obtenida tendremos que verificar lo siguiente: 
</p>

- Que **Todas las columnas requeridas** se encuentren presentes dentro del documento
- Los tipos de datos utilizados sean los correctos
- Que los valores esten bien definidos dentro de los rangos asignados 

<p> Esta validación se gestiona a través del archivo 
<b>
schemas.py
</b>
</p>

</li>
    
<li>

<h3>
Preprocesamiento de los datos:
</h3>

<p>
Los datos correctamente validados pasan por el mismo proceso que utilizamos durante el entrenamiento de machine learning. Se encuentra distrubuido de la siguente forma:
</p>

- Se codifican las **variables categoricas**
- En nuestro caso, al ser elegido el modelo de **Regresión Logisitica** le aplicamos un escalado de datos
- Un correcto formato y orden de nuestras variables

<p>
De esta manera podemos garantizar una consitencia entre lo que fue entrenado y nuestra predicción
</p>

</li>

<li>

<h3>
Carga del Modelo:
</h3>

<p>
Se carga nuestro modelo de Machine Learning (Logistic Regression) el cual fue previamente entrenado y posteriormente almacenado para su uso en un formato ".pkl"
</p>
</li>

<li>

<h3>
Predicción:
</h3>

<p>
Nuesto modelo calcula la probabilidad de restraso, del o los vuelos asignados, 
esto en base a una entrada definida, donde se genera dos posibles respuestas:
</p>

- **Delay**
- **No delay**

</li>

<li>

<h3>
Respuesta:
</h3>

<p>
El servicio de predicción de delay devuelve la predicción en un formato ".JSON" el cual incluye lo siguiente:
</p>

- **Probabilidad de retraso** (en porcentaje)
- **Resultado final de la prediccion** (Binario) donde **0** es no retraso y **1** es retraso
- **Información adicional de utilidad** para su posterior consumo en backend

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
