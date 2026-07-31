# 🧪 Pruebas de API con Bruno Client

Esta carpeta contiene la colección completa de peticiones HTTP para probar y validar todos los endpoints de la API REST de **PixelKeys Store**.

---

## 🛠️ Herramienta Utilizada

* **Bruno API Client:** Cliente de pruebas de API de código abierto y basado en archivos de texto plano (`.bru`).

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

---

## 🚀 Instrucciones de Uso

1. Abre la aplicación **Bruno**.
2. Selecciona la opción **Open Collection**.
3. Navega hasta el repositorio y selecciona esta carpeta (`bruno/`).
4. Asegúrate de que el servidor backend en NestJS esté en ejecución (`http://localhost:3000`).
5. Ejecuta cada petición para revisar el código de respuesta HTTP (`200 OK`, `201 Created`, `204 No Content`).