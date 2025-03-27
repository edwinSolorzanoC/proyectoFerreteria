const express = require("express");
const clienteRoutes = require("./routes/clienteRoutes");

const app = express();

app.use(express.json());

app.use("/api/clientes", clienteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});