import { db_pool_connection } from "../database/db.js";
import { response_bad_request, response_error, response_not_found, response_success, response_created } from '../responses/responses.js';

export const ObtenerCliente = async (req, res) => {
    try {

        const [clientes] = await db_pool_connection.query('SELECT * FROM usuarios WHERE rol = 3');
        if (clientes.length <= 0) {
            return res.status(404).json(response_not_found("No se encontraron registros de clientes"));
        }
        return res.status(200).json(response_success(clientes, "Consulta de clientes exitosa"));
    } catch (error) {
        console.error('Error en la base de datos:', error);
        const errorMessage = error.sqlMessage ? error.sqlMessage : error.message;
        return res.status(500).json(response_error(500, "Error en la base de datos: " + errorMessage));
    }
};
export const insertFactura = async (req, res) => {
    try {
        const { cliente_id, reparacion_id, fecha_emision, subtotal, iva, monto_total, items } = req.body;
        if (!cliente_id || !reparacion_id || !fecha_emision || !subtotal || !iva || !monto_total || !items) {
            return res.status(400).json({
                error: 'Todos los campos son requeridos.'
            });
        }
        const [insertFacturaResult] = await db_pool_connection.query(
            'INSERT INTO factura (cliente_id, reparacion, fecha_emision, subtotal, iva, monto_total) VALUES (?, ?, ?, ?, ?, ?)',
            [cliente_id, reparacion_id, fecha_emision, subtotal, iva, monto_total]
        );
        const facturaId = insertFacturaResult.insertId;
        for (const item of items) {
            await db_pool_connection.query(
                'INSERT INTO item_factura (factura_id, repuesto_id, cantidad, valor_unitario, valor_total) VALUES (?, ?, ?, ?, ?)',
                [facturaId, item.repuesto_id, item.cantidad, item.valor_unitario, item.valor_total]
            );
        }
        return res.status(201).json({
            message: 'Factura ingresada exitosamente.',
            factura_id: facturaId
        });
    } catch (error) {
        console.error('Error al insertar factura:', error);
        return res.status(500).json({
            error: 'Error interno al insertar factura.'
        });
    }
};