# 🗄️ Módulo de Base de Datos - PixelKeys

## 📌 Motor Utilizado
* **DBMS:** MySQL

## 📄 Contenido de la carpeta
* `schema.sql`: Definición de tablas, llaves primarias, llaves foráneas y restricciones.
* `seeds.sql`: Inserción de datos iniciales para pruebas.
* `modelo_relacional.png`: Diagrama Entidad-Relación de la base de datos.

## 🔍 Consultas Relacionales (Requisito 7)
1. **Top de Juegos más Vendidos:** Consulta que une `detalles_venta`, `juegos` y `categorias` agrupando por juego y categoría.
2. **Historial de Compras por Usuario:** Consulta que une `ventas`, `detalles_venta` y `juegos` filtrando por el ID de un usuario específico.