import { db_pool_connection } from '../database/db.js';
import { response_bad_request, response_error, response_not_found, response_sucess } from '../responses/responses.js';

export const login = async (req, res) => {
    try {
        const { cedula, password } = req.body;

        if (!cedula || !password) {
            return res.status(400).json(response_bad_request("Se requiere completar los datos para ingresar"));
        }

        const [respuesta] = await db_pool_connection.query("SELECT cedula, nombre, rol FROM usuarios WHERE cedula = ? AND password = ?", [cedula, password]);

        if (respuesta.length > 0) {
            const user = respuesta[0];
            return res.status(200).json(response_sucess({
                cedula: user.cedula,
                nombre: user.nombre,
                rol: user.rol
            }, 'Login Exitoso'));
        } else {
            return res.status(401).json(response_error(401, 'Credenciales incorrectas'));
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json(response_error(500, "Error al conectar la base de datos"));
    }
};
