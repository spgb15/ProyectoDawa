import { db_pool_connection } from "../database/db.js";
import { response_bad_request, response_error, response_not_found, response_success, response_created } from '../responses/responses.js';


export const ObtenerMarcas = async(req, res) => {
    try{
        const [marcas] = await db_pool_connection.query('Select * from marca');
        if(marcas.length <=0){
            return res.status(404).json(response_not_found("No se encontraron registros"));
        }
        return res.status(200).json(response_success(marcas,"Consulta exitosa"));
    }
    catch(error){
        console.error('Error en la base de datos:', error);
        const errorMessage = error.sqlMessage ? error.sqlMessage : error.message;
        return res.status(500).json(response_error(500, "Error en la base de datos: " + errorMessage));    }
}

export const ObtenerModelos = async(req,res) => {
    try{
        const marca = req.params.id;
        if(marca ===  null){
            return res.status(400).json(response_bad_request("Parametro Id no valido"));
        }

        const [modelos] = await db_pool_connection.query("Select * from modelo where id_marca = ?",[marca])
        if(modelos.length <= 0){
            return res.status(404).json(response_not_found("Recurso no encontrado"));
        }
        return res.status(200).json(response_success(modelos, "Consulta exitosa"));
    }catch(error){
        return res.status(500).json(response_error(500, "Error al obtener los datos"));
    }
}

export const ObtenerRepuestos = async (req, res) => {
    try {
        const marca = req.body.id_marca; 
        const modelo = req.body.id_modelo; 

        if (marca === null || modelo === null) {
            return res.status(400).json(response_bad_request("Parámetro Id no válido"));
        }

        const [repuestos] = await db_pool_connection.query("SELECT * FROM repuesto WHERE id_marca = ? AND id_modelo = ?", [marca, modelo]);

        if (repuestos.length === 0) {
            return res.status(404).json(response_not_found("Recurso no encontrado"));
        }

        return res.status(200).json(response_success(repuestos, "Consulta exitosa"));

    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return res.status(500).json(response_error(500, "Error al obtener los datos"));
    }
}

export const InsertarProducto = async (req, res) => {
    try {
        const { marca, modelo, descripcion, precio } = req.body;
        
        if (!marca || !modelo || !descripcion || !precio) {
            return res.status(400).json(response_bad_request(400, "Todos los campos son requeridos"));
        }

        const [resp] = await db_pool_connection.query(
            "INSERT INTO REPUESTO (id_marca, id_modelo, descripcion, costo) VALUES (?,?,?,?)",
            [marca, modelo, descripcion, precio]
        );

        return res.status(201).json(response_created(resp.insertId, "Producto ingresado con éxito"));
    } catch (error) {
        console.error('Error al insertar producto:', error);

        return res.status(500).json(response_error(500, "Error al insertar producto: " + error.message));
    }
}

export const ActualizarProducto = async(req,res) => {
    try{
        const {repuesto_id ,marca, modelo, descripcion, precio } = req.body;
        
        if (!id || !marca || !modelo || !descripcion || !precio) {
            return res.status(400).json(response_bad_request(400, "Todos los campos son requeridos"));
        }

        const [resp] = await db_pool_connection.query(
            "UPDATE REPUESTO SET id_marca = ?, id_modelo = ?, descripcion = ?, costo = ? WHERE repuesto_id = ?",
            [marca, modelo, descripcion, precio, repuesto_id]
        );
        return res.status(200).json(response_success(resp.affectedRows, "Producto editado con exito"));
    }catch(error){
        return res.status(500).json(response_error(500, "Estudiante no ha sido actualizado"));
    }
}

export const EliminarProducto = async (req, res) => {
    try{
        const id_producto = req.params.id;
        
        if(!id_producto){
            return res.status(400).json(response_bad_request(400, "Todos los campos son requeridos"));
        }

        const [resp] = await db_pool_connection.query("Delete from repuesto where repuesto_id = ?", [id_producto])
        if (resp.affectedRows === 0) {
            return res.status(404).json(response_error(404, "Producto no encontrado"));
        }
        return res.status(200).json(response_success(resp.affectedRows, "Producto eliminado con exito"));

    }catch(error){
        return res.status(500).json(response_error(500, "Error al eliminar el producto"))
    }
}


