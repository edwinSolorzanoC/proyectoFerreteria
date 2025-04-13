-- Insertar 3 clientes
INSERT INTO clientes (nombre, correo, telefono, direccion) VALUES
('Juan Pérez', 'juanperez@example.com', '555-1234', 'Calle 1 #123'),
('Ana Gómez', 'anagomez@example.com', '555-5678', 'Calle 2 #456'),
('Carlos Ruiz', 'carlosruiz@example.com', '555-9876', 'Calle 3 #789');

-- Insertar 3 proveedores
INSERT INTO proveedores (nombre, contacto, telefono, direccion) VALUES
('Proveedor A', 'Luis Torres', '555-1111', 'Av. Principal #101'),
('Proveedor B', 'Marta Sánchez', '555-2222', 'Av. Secundaria #202'),
('Proveedor C', 'José López', '555-3333', 'Av. Industrial #303');

-- Insertar 3 productos para cada proveedor
-- Productos del Proveedor A (id_proveedor = 1)
INSERT INTO productos (nombre, precio, cantidad_stock, stock_minimo, id_proveedor) VALUES
('Martillo', 150.00, 50, 10, 1),
('Desarmador', 75.00, 100, 15,  1),
('Llave Inglesa', 200.00, 30, 5,  1);

-- Productos del Proveedor B (id_proveedor = 2)
INSERT INTO productos (nombre, precio, cantidad_stock, stock_minimo, id_proveedor) VALUES
('Taladro', 1200.00, 20, 5, 2),
('Sierra Eléctrica', 2500.00, 10, 2, 2),
('Pulidora', 1800.00, 15, 3, 2);

-- Productos del Proveedor C (id_proveedor = 3)
INSERT INTO productos (nombre, precio, cantidad_stock, stock_minimo, id_proveedor) VALUES
('Pintura Blanca', 350.00, 40, 10, 3),
('Rodillo de Pintura', 80.00, 60, 10, 3),
('Brocha', 45.00, 80, 10, 3);