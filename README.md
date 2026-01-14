![banner](/Assets/banner.jpg)

## **Flujo del Modelo de Machine Learning**

1. ### **Ingreso de datos:**

   Los datos pueden ser recibidos de dos formas:

   - De manera **unitaria:** Es decir, una sola predicción  
   - De manera **compuesta:** Es decir, múltiples predicciones de manera simultánea a través de un archivo `.CSV`

   Cada nuevo registro deberá contener información relevante como:

   - **Aerolínea**
   - **Origen**
   - **Destino**
   - **Día de la semana**
   - **Hora**
   - **Distancia en KM**

2. ### **Validación de los datos:**

   Antes de poder procesar la información obtenida, se verifica lo siguiente:

   - Que **todas las columnas requeridas** se encuentren presentes dentro del documento
   - Que los **tipos de datos** utilizados sean los correctos
   - Que los **valores estén bien definidos** dentro de los rangos asignados

   Esta validación se gestiona a través del archivo **`schemas.py`**.

3. ### **Preprocesamiento de los datos:**

   Los datos correctamente validados pasan por el mismo proceso utilizado durante el entrenamiento del modelo de Machine Learning, el cual se distribuye de la siguiente forma:

   - Codificación de las **variables categóricas**
   - Aplicación de **escalado de datos**, ya que el modelo seleccionado es **Regresión Logística**
   - Correcto **formato y orden** de las variables

   De esta manera, se garantiza la **consistencia** entre los datos utilizados en el entrenamiento y los datos usados para la predicción.

4. ### **Carga del modelo:**

   Se carga el modelo de Machine Learning (**Logistic Regression**), el cual fue previamente entrenado y almacenado en un archivo con formato `.pkl` para su uso posterior.

5. ### **Predicción:**

   El modelo calcula la **probabilidad de retraso** del o los vuelos asignados, en función de la información de entrada, generando dos posibles resultados:

   - **Delay**
   - **No delay**

6. ### **Respuesta:**

   El servicio de predicción devuelve la respuesta en formato `.JSON`, el cual incluye:

   - **Probabilidad de retraso** (expresada en porcentaje)
   - **Resultado final de la predicción** (binario), donde:
     - **0** = No retraso  
     - **1** = Retraso
   - **Información adicional de utilidad** para su posterior consumo en el backend

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
