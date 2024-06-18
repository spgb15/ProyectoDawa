import { Router } from "express";
import { login } from "../controllers/login_controller.js";
import { ActualizarProducto, EliminarProducto, InsertarProducto, ObtenerMarcas, ObtenerModelos, ObtenerRepuestos } from "../controllers/productos_controller.js";

const routes = new Router();

routes.post('/api/login', login);
routes.get('/api/marcas', ObtenerMarcas);
routes.get('/api/modelos/:id', ObtenerModelos);
routes.post('/api/repuestos', ObtenerRepuestos); 
routes.post('/api/repuestos/insertar', InsertarProducto);
routes.put('/api/repuestos/actualizar', ActualizarProducto); 
routes.delete('/api/repuestos/eliminar/:id', EliminarProducto); 

export default routes;
