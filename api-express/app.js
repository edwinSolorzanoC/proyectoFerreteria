const express = require("express");
const cors = require("cors");
const clienteRoutes = require("./routes/clienteRoutes");
const productoRoutes = require("./routes/productoRoutes"); // 👈 Nuevo
const proveedorRoutes = require("./routes/proveedorRoutes");
const reporteRoutes = require("./routes/reporteRoutes"); // 👈 Nuevo
const authRoutes = require("./routes/authRoutes"); // 👈 Nuevo
const ventaRoute = require("./routes/ventaRoutes"); // 👈 Nuevo
const facturaRoute = require("./routes/facturaRoutes"); // 👈 Nuevo
const ordenesRoute = require("./routes/ordenRoutes"); // 👈 Nuevo

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/clientes", clienteRoutes);
app.use("/api/productos", productoRoutes); // 👈 Nuevo
app.use("/api/proveedores", proveedorRoutes); // 👈 Nuevo
app.use("/api/reportes", reporteRoutes); // 👈 Nuevo
app.use("/api/auth", authRoutes); // 👈 Nuevo
app.use("/api/ventas", ventaRoute); // 👈 Nuevo
app.use("/api/factura", facturaRoute); // 👈 Nuevo
app.use("/api/ordenes", ordenesRoute); // 👈 Nuevo

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
