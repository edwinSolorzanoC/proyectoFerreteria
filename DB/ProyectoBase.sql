-- Creación de la base de datos
CREATE DATABASE FerreMax;
USE FerreMax;

-- Tabla de Proveedores
CREATE TABLE Proveedores (
    id_proveedor INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    contacto VARCHAR(50),
    telefono VARCHAR(20),
    direccion TEXT
);

-- Tabla de Productos
CREATE TABLE Productos (
    id_producto INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    cantidad_stock INT NOT NULL,
    id_proveedor INT NOT NULL,
    FOREIGN KEY (id_proveedor) REFERENCES Proveedores(id_proveedor)
);

-- Tabla de Clientes
CREATE TABLE Clientes (
    id_cliente INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100),
    telefono VARCHAR(20),
    direccion TEXT
);

-- Tabla de Personas (Información de usuarios que pueden tener múltiples cuentas)
CREATE TABLE Personas (
    id_persona INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    direccion TEXT
);

-- Tabla de Roles
CREATE TABLE Roles (
    id_rol INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de Usuarios
CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    id_persona INT NOT NULL,
    id_rol INT NOT NULL,
    FOREIGN KEY (id_persona) REFERENCES Personas(id_persona),
    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol)
);

-- Tabla de Permisos
CREATE TABLE Permisos (
    id_permiso INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de Relación entre Roles y Permisos
CREATE TABLE Roles_Permisos (
    id_rol INT NOT NULL,
    id_permiso INT NOT NULL,
    PRIMARY KEY (id_rol, id_permiso),
    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol),
    FOREIGN KEY (id_permiso) REFERENCES Permisos(id_permiso)
);

-- Tabla de Facturas
CREATE TABLE Facturas (
    id_factura INT PRIMARY KEY IDENTITY(1,1),
    id_cliente INT NOT NULL,
    fecha DATE NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

-- Tabla de Detalles de Facturas
CREATE TABLE Detalles_Facturas (
    id_detalle INT PRIMARY KEY IDENTITY(1,1),
    id_factura INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_factura) REFERENCES Facturas(id_factura),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);

-- Tabla de Entradas y Salidas de Inventario
CREATE TABLE Movimientos_Inventario (
    id_movimiento INT PRIMARY KEY IDENTITY(1,1),
    id_producto INT NOT NULL,
    tipo VARCHAR(10) CHECK (tipo IN ('entrada', 'salida')) NOT NULL,
    cantidad INT NOT NULL,
    fecha DATETIME NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);

-- Tabla de Órdenes de Compra
CREATE TABLE Ordenes_Compra (
    id_orden INT PRIMARY KEY IDENTITY(1,1),
    id_proveedor INT NOT NULL,
    fecha DATE NOT NULL,
    estado VARCHAR(15) CHECK (estado IN ('pendiente', 'completado', 'cancelado')) NOT NULL,
    FOREIGN KEY (id_proveedor) REFERENCES Proveedores(id_proveedor)
);

-- Tabla de Detalles de Órdenes de Compra
CREATE TABLE Detalles_Ordenes (
    id_detalle INT PRIMARY KEY IDENTITY(1,1),
    id_orden INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_orden) REFERENCES Ordenes_Compra(id_orden),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);

-- Tabla de Reportes de Ventas
CREATE VIEW Reporte_Ventas AS
SELECT 
    f.id_factura, 
    f.fecha, 
    c.nombre AS cliente, 
    SUM(d.subtotal) AS total_venta
FROM Facturas f
JOIN Clientes c ON f.id_cliente = c.id_cliente
JOIN Detalles_Facturas d ON f.id_factura = d.id_factura
GROUP BY f.id_factura, f.fecha, c.nombre;

-- Tabla de Productos más Vendidos
CREATE VIEW Productos_Mas_Vendidos AS
SELECT p.id_producto, p.nombre, SUM(d.cantidad) AS total_vendido
FROM Detalles_Facturas d
JOIN Productos p ON d.id_producto = p.id_producto
GROUP BY p.id_producto, p.nombre;


SELECT * FROM Productos_Mas_Vendidos ORDER BY total_vendido DESC;
