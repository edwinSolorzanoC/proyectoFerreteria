const express = require("express");
const clienteRoutes = require("./routes/clienteRoutes");
const productoRoutes = require("./routes/productoRoutes"); // 👈 Nuevo
const proveedorRoutes = require("./routes/proveedorRoutes");
const reporteRoutes = require("./routes/reporteRoutes"); // 👈 Nuevo

const app = express();

app.use(express.json());

// Rutas
app.use("/api/clientes", clienteRoutes);
app.use("/api/productos", productoRoutes); // 👈 Nuevo
app.use("/api/proveedores", proveedorRoutes); // 👈 Nuevo
app.use("/api/reportes", reporteRoutes); // 👈 Nuevo

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
