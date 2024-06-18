import { db_pool_connection } from "../database/db.js";
import { response_bad_request, response_error, response_not_found, response_success, response_created } from '../responses/responses.js';

export const obtenerEstado = async (req, res) => {
    const id_usuario = req.params.id_usuario;

    if (!id_usuario) {
        return res.status(400).json(response_bad_request(400, "Todos los campos son requeridos"));
    }

    try {
        const [estado] = await db_pool_connection.query(`
            SELECT 
                r.id_reparacion,
                equipos.equipo_id AS id_equipo,
                marca.descripcion AS nombre_marca,
                modelo.descripcion AS nombre_modelo,
                r.cliente_id,
                u.nombre AS nombre_tecnico,
                r.descripcion,
                r.fecha_inicio,
                er.descripcion AS estado,
                r.costo_repuestos,
                r.costo_servicio,
                r.costo_total
                FROM reparacion r
                LEFT JOIN equipos ON r.equipo_id = equipos.equipo_id
                LEFT JOIN marca ON equipos.id_marca = marca.id_marca
                LEFT JOIN modelo ON equipos.id_marca = modelo.id_marca AND equipos.id_modelo = modelo.id_modelo
                LEFT JOIN usuarios u ON r.tecnico_id = u.usuario_id AND u.rol = 2
                LEFT JOIN estado_reparacion er ON r.estado = er.id_estado
                WHERE r.cliente_id = ?;

        `, [id_usuario]);
        if (estado.length <= 0) {
            return res.status(404).json(response_not_found("No se encontraron registros"));
        }

        return res.status(200).json(response_success(estado, "Consulta exitosa"));


    } catch (error) {
        return res.status(500).json(response_error(500, "Error al obtener los datos"));
    }
}

export const obtenerUsuarios = async (req, res) => {
    try {
        const [filas] = await db_pool_connection.query('Select * from usuarios where rol = 3');
        if (filas.length <= 0) {
            return res.status(404).json(response_not_found("No se encontraron registros"));
        }
        return res.status(200).json(response_success(filas, "Consulta exitosa"));
    } catch (error) {
        return res.status(500).json(response_error(500, "Error al obtener los datos"));
    }
}

export const obtenerDatos = async (req, res) => {
    try {
        const [filas] = await db_pool_connection.query('select * from estado_reparacion');
        if (filas.length <= 0) {
            return res.status(404).json(response_not_found("No se encontraron registros"));
        }
        return res.status(200).json(response_success(filas, "Consulta exitosa"));
    } catch (error) {
        return res.status(500).json(response_error(500, "Error al obtener los datos"));
    }
}

export const ingresarCliente = async (req, res) => {
    try {
        const { cedula, id_marca, id_modelo, estado, cedula_tecnico, valor_total } = req.body;

        if (!cedula || !id_marca || !id_modelo || !estado || !valor_total) {
            return res.status(400).json({ error: 'Bad Request', message: 'Todos los campos son requeridos' });
        }

        const [equipoRows] = await db_pool_connection.query(`
            INSERT INTO EQUIPOS (ID_MARCA, ID_MODELO) VALUES(
            ID_MARCA = ?, ID_MODELO = ?)

        `, [id_marca, id_modelo]);

        if (equipoRows.length <= 0) {
            return res.status(404).json({ error: 'Not Found', message: 'No se encontró el equipo con la marca y modelo especificados' });
        }

        const [resp] = await db_pool_connection.query('Select equipo_id from equipos')

        const equipo_id = resp[0].equipo_id;

        const [clienteRows] = await db_pool_connection.query(`
            SELECT usuario_id
            FROM usuarios
            WHERE cedula = ? and rol = 3
        `, [cedula]);

        if (clienteRows.length === 0) {
            return res.status(404).json({ error: 'Not Found', message: 'No se encontró el cliente con la cédula especificada' });
        }

        const cliente_id = clienteRows[0].usuario_id;

        const [tecnicoRows] = await db_pool_connection.query(`
            SELECT usuario_id
            FROM usuarios
            WHERE cedula = ? and rol = 2;
        `, [cedula_tecnico]);

        if (tecnicoRows.length === 0) {
            return res.status(404).json({ error: 'Not Found', message: 'No se encontró el técnico con la cédula especificada' });
        }

        const tecnico_id = tecnicoRows[0].usuario_id;

        const [result] = await db_pool_connection.query(`
            INSERT INTO reparacion (equipo_id, cliente_id, tecnico_id,  fecha_inicio, estado, costo_total)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?)
        `, [equipo_id, cliente_id, tecnico_id,  estado, valor_total]);

        const nuevaReparacion = {
            id_reparacion: result.insertId,
            equipo_id: equipo_id,
            cliente_id: cliente_id,
            tecnico_id: tecnico_id,
            descripcion: descripcion,
            fecha_inicio: new Date().toISOString(),
            estado: estado,
            costo_total: valor_total
        };

        return res.status(200).json({ message: 'Reparación ingresada correctamente', reparacion: nuevaReparacion });
    } catch (error) {
        console.error('Error al ingresar los datos:', error);
        return res.status(500).json({ error: 'Error interno del servidor', message: error.message });
    }
};


export const obtenerTecnicos = async (req, res) => {
    try {
        const [filas] = await db_pool_connection.query('select * from usuarios where rol = 2');
        if (filas.length <= 0) {
            return res.status(404).json(response_not_found("No se encontraron registros"));
        }
        return res.status(200).json(response_success(filas, "Consulta exitosa"));
    } catch (e) {
        return res.status(500).json(response_error(500, "Error al obtener los datos"));

    }
}

