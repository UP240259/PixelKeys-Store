USE pixelkeys_db;

INSERT INTO categorias (nombre, descripcion) VALUES 
('Acción', 'Juegos de combate y ritmo rápido'),
('RPG', 'Juegos de rol y desarrollo de personajes'),
('Supervivencia', 'Gestión de recursos y supervivencia'),
('Indie', 'Juegos independientes');

INSERT INTO desarrolladores (nombre, pais) VALUES 
('FromSoftware', 'Japón'),
('CD Projekt Red', 'Polonia'),
('ReLogic', 'EE.UU.'),
('The Fun Pimps', 'EE.UU.');

INSERT INTO juegos (titulo, descripcion, precio, descuento, stock, imagen_url, plataforma, id_desarrollador) VALUES 
('Elden Ring', 'Álzate, Sinluz, para hacerte con el poder del Círculo de Elden.', 1199.00, 15, 45, 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg', 'Steam (PC)', 1),
('Terraria', 'Cava, lucha, explora y construye en este mundo 2D.', 179.99, 50, 100, 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg', 'Steam (PC)', 3),
('Project Zomboid', 'El simulador definitivo de supervivencia zombi.', 229.00, 0, 30, 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/108600/header.jpg', 'Steam (PC)', 4),
('Cyberpunk 2077', 'RPG de acción y aventura ambientado en Night City.', 999.00, 30, 20, 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg', 'GOG (PC)', 2);

INSERT INTO juegos_categorias (id_juego, id_categoria) VALUES 
(1, 1), (1, 2),
(2, 3), (2, 4),
(3, 3), (3, 4),
(4, 1), (4, 2);

INSERT INTO usuarios (username, email, password, rol) VALUES 
('admin', 'admin@pixelkeys.com', 'admin123', 'Admin'),
('pepe_gamer', 'pepe@gmail.com', 'cliente123', 'Cliente');