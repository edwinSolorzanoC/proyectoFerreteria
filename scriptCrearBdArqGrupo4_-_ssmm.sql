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