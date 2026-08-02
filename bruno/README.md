# 🧪 Pruebas de API con Bruno Client

Esta carpeta contiene la colección completa de peticiones HTTP parametrizadas para probar y validar todos los endpoints de la API REST de **PixelKeys Store**.

---

## 🛠️ Herramienta Utilizada

* **Bruno API Client:** Cliente de pruebas de API de código abierto, *Git-friendly* y basado en archivos de texto plano (`.bru`).

---

## 📂 Peticiones Incluidas en la Colección

1. **GET - Obtener todos los juegos:**
   `GET http://localhost:3000/juegos`
2. **GET - Obtener juego por ID:**
   `GET http://localhost:3000/juegos/1`
3. **POST - Crear un juego:**
   `POST http://localhost:3000/juegos`
4. **PUT - Actualizar un juego:**
   `PUT http://localhost:3000/juegos/1`
5. **DELETE - Eliminar un juego:**
   `DELETE http://localhost:3000/juegos/1`
6. **GET - Obtener juegos con desarrollador (Consulta Relacional 1):**
   `GET http://localhost:3000/juegos/con-desarrollador`
7. **GET - Obtener juego por ID con desarrollador (Consulta Relacional 2):**
   `GET http://localhost:3000/juegos/1/con-desarrollador`

---

## 🚀 Instrucciones de Uso (Cómo abrir la colección)

1. Abre la aplicación **Bruno**.
2. En el panel superior izquierdo, haz clic en **Open Collection** (o selecciona *Collection -> Open Collection*).
3. En la ventana del explorador, navega dentro del repositorio local hasta la carpeta `bruno/PixelKeys API`.
4. Selecciona dicha carpeta y confirma para cargar todas las solicitudes automáticamente en la barra lateral.
5. Asegúrate de que el servidor backend en NestJS esté en ejecución (`http://localhost:3000`).
6. Ejecuta cada petición para revisar el código de respuesta HTTP (`200 OK`, `201 Created`, etc.).

---

> ℹ️ **Nota para la Evaluación del Proyecto:**
> A diferencia de otros clientes que compilan las pruebas en un solo archivo `.json`, **Bruno API Client** almacena las peticiones directamente como artefactos de código en archivos `.bru` dentro de este directorio (`/bruno`). Esto permite un control de versiones nativo en Git y la ejecución directa importando la carpeta mediante la opción **Open Collection**.