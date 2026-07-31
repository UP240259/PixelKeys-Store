# ⚙️ PixelKeys Store - Backend (API REST)

Este módulo contiene la API RESTful encargada de la lógica de negocio, validaciones y acceso a datos para la plataforma **PixelKeys Store**.

---

## 🛠️ Tecnologías Utilizadas

* **NestJS:** Framework progresivo de Node.js estructurado en módulos, controladores y servicios.
* **TypeScript:** Lenguaje tipado para mayor mantenibilidad y control de errores.
* **TypeORM / Driver MySQL:** Mapeo objeto-relacional para interactuar con la base de datos MySQL.
* **CORS Middleware:** Configurado para recibir peticiones cruzadas desde la aplicación React.

---

## ⚙️ Configuración del Entorno

Asegúrate de contar con la base de datos estructurada e indicar las variables de conexión necesarias en el archivo de módulo principal (`app.module.ts`) o archivo `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=pixelkeys_db
PORT=3000
