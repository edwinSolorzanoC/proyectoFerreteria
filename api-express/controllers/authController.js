const { poolPromise } = require("../db/config");
const bcrypt  = require("bcrypt");

const getLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "username y password son requeridos" });
        }
        const pool = await poolPromise;
        const result = await pool.request()
            .input("user", username)
            .query(`
            SELECT u.*, p.nombre, p.correo, p.telefono, p.direccion 
            FROM usuarios u
            INNER JOIN personas p ON u.id_persona = p.id_persona
            WHERE u.username = @user
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        const userData = result.recordset[0];
        const isMatch = await bcrypt.compare(password, userData.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const { password_hash, ...userWithoutPassword } = userData;
        res.status(200).json({ ...userWithoutPassword });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

const registerNewUser = async (req, res) => {
    try{
        const { username, password, nombre, correo, telefono, direccion } = req.body;
        if (!username || !password || !nombre || !correo || !telefono || !direccion) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }
        const pool = await poolPromise;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.request()
            .input("username", username)
            .input("password", hashedPassword)
            .input("nombre", nombre)
            .input("correo", correo)
            .input("telefono", telefono)
            .input("direccion", direccion)
            .query(`
                DECLARE @id_persona TABLE (id INT);
        
                INSERT INTO personas (nombre, correo, telefono, direccion)
                OUTPUT INSERTED.id_persona INTO @id_persona(id)
                VALUES (@nombre, @correo, @telefono, @direccion);
        
                INSERT INTO usuarios (username, password_hash, id_persona)
                VALUES (@username, @password, (SELECT id FROM @id_persona));
            `);
        
        if (result.rowsAffected[0] === 0) {
            return res.status(500).json({ message: "Error al registrar el usuario" });
        }
        res.status(201).json({ message: "Usuario registrado exitosamente" });

    }catch(error){
        res.status(500).json({ error: error.message });
    }

}

module.exports = { getLogin, registerNewUser };
