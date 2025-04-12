

IF EXISTS (SELECT name FROM sys.databases WHERE name = 'Ferremax')
BEGIN
  ALTER DATABASE Ferremax SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  DROP DATABASE Ferremax;
END;
GO

CREATE DATABASE Ferremax;
GO

USE Ferremax;
GO

-- Tabla clientes
CREATE TABLE clientes (
  id_cliente INT IDENTITY(1,1) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  direccion VARCHAR(255) NOT NULL
);
GO

-- Tabla facturas
CREATE TABLE facturas (
  id_factura INT IDENTITY(1,1) PRIMARY KEY,
  fecha DATE NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  clientes_id_cliente INT NOT NULL,
  FOREIGN KEY (clientes_id_cliente) REFERENCES clientes(id_cliente)
);
GO

-- Tabla proveedores
CREATE TABLE proveedores (
  id_proveedor INT IDENTITY(1,1) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  contacto VARCHAR(50) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  direccion VARCHAR(255) NOT NULL
);
GO

-- Tabla productos
CREATE TABLE productos (
  id_producto INT IDENTITY(1,1) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  cantidad_stock INT NOT NULL,
  stock_minimo INT NOT NULL,
  id_proveedor INT NOT NULL,
  FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor)
);
GO

-- Tabla detalles_facturas
CREATE TABLE detalles_facturas (
  id_detalle INT IDENTITY(1,1) PRIMARY KEY,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  facturas_id_factura INT NOT NULL,
  productos_id_producto INT NOT NULL,
  FOREIGN KEY (facturas_id_factura) REFERENCES facturas(id_factura),
  FOREIGN KEY (productos_id_producto) REFERENCES productos(id_producto)
);
GO

-- Tabla movimientos_inventario
CREATE TABLE movimientos_inventario (
  id_movimiento INT IDENTITY(1,1) PRIMARY KEY,
  id_producto INT NOT NULL,
  tipo VARCHAR(200) NOT NULL,
  cantidad INT NOT NULL,
  fecha DATE NOT NULL,
  FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);
GO

-- Tabla personas
CREATE TABLE personas (
  id_persona INT IDENTITY(1,1) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  telefono VARCHAR(20) NOT NULL,
  direccion VARCHAR(255) NOT NULL
);
GO

-- Tabla usuarios
CREATE TABLE usuarios (
  id_usuario INT IDENTITY(1,1) PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  id_persona INT NOT NULL,
  FOREIGN KEY (id_persona) REFERENCES personas(id_persona)
);
GO

  -- Tabla ordenesDeCompra
CREATE TABLE ordenesDeCompra (
  id_orden INT IDENTITY(1,1) PRIMARY KEY,
  fecha DATE NOT NULL,
  cantidad INT NOT NULL,
  estado BIT NOT NULL DEFAULT 1,
  proveedores_id_proveedor INT NOT NULL,
  productos_id_producto INT NOT NULL,
  FOREIGN KEY (productos_id_producto) REFERENCES productos(id_producto),
  FOREIGN KEY (proveedores_id_proveedor) REFERENCES proveedores(id_proveedor)
);
GO

-- Tabla historialCompras_clientes
CREATE TABLE historialCompras_clientes (
  idhistorialCompras_clientes INT IDENTITY(1,1) PRIMARY KEY,
  clientes_id_cliente INT NOT NULL,
  factura_id_factura INT NOT NULL,
  fecha DATE NOT NULL,
  FOREIGN KEY (clientes_id_cliente) REFERENCES clientes(id_cliente),
  FOREIGN KEY (factura_id_factura) REFERENCES facturas(id_factura)
);
GO

-- Trigger para insertar en historialCompras_clientes después de una nueva factura
CREATE TRIGGER trg_InsertHistorialComprasClientes
ON facturas
AFTER INSERT
AS
BEGIN
SET NOCOUNT ON;

-- Insertar en historialCompras_clientes cada nueva factura
INSERT INTO historialCompras_clientes (clientes_id_cliente, factura_id_factura, fecha)
SELECT 
  clientes_id_cliente, 
  id_factura,
  fecha
FROM inserted;
END;
GO

-- Trigger actualizar stock después de insertar en detalles_facturas
CREATE TRIGGER tr_descuento_stock
ON detalles_facturas
AFTER INSERT
AS
BEGIN
  -- Evitar errores de muchos inserts a la vez
  SET NOCOUNT ON;

  -- Actualiza el stock de los productos afectados
  UPDATE p
  SET p.cantidad_stock = p.cantidad_stock - i.cantidad
  FROM productos p
  INNER JOIN inserted i ON p.id_producto = i.productos_id_producto;
END;
GO

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