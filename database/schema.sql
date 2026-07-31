CREATE DATABASE IF NOT EXISTS pixelkeys_db;
USE pixelkeys_db;

-- 1. Categorías / Géneros
CREATE TABLE IF NOT EXISTS categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

-- 2. Desarrolladores / Publishers
CREATE TABLE IF NOT EXISTS desarrolladores (
    id_desarrollador INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    pais VARCHAR(50)
);

-- 3. Catálogo de Juegos (Con carátulas)
CREATE TABLE IF NOT EXISTS juegos (
    id_juego INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    descuento INT DEFAULT 0,
    stock INT NOT NULL DEFAULT 0,
    imagen_url VARCHAR(500) NOT NULL,
    plataforma VARCHAR(50) DEFAULT 'Steam (PC)',
    id_desarrollador INT,
    FOREIGN KEY (id_desarrollador) REFERENCES desarrolladores(id_desarrollador) ON DELETE SET NULL
);

-- 4. Relación N:M Juegos <-> Categorías
CREATE TABLE IF NOT EXISTS juegos_categorias (
    id_juego INT,
    id_categoria INT,
    PRIMARY KEY (id_juego, id_categoria),
    FOREIGN KEY (id_juego) REFERENCES juegos(id_juego) ON DELETE CASCADE,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) ON DELETE CASCADE
);

-- 5. Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('Admin', 'Cliente') DEFAULT 'Cliente',
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Ventas
CREATE TABLE IF NOT EXISTS ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_venta DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- 7. Detalle de Venta
CREATE TABLE IF NOT EXISTS detalles_venta (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT NOT NULL,
    id_juego INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta) ON DELETE CASCADE,
    FOREIGN KEY (id_juego) REFERENCES juegos(id_juego) ON DELETE RESTRICT
);