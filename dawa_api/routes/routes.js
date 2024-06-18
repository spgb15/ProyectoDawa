import { Router } from "express";
import { login } from "../controllers/login_controller.js";
import { ActualizarProducto, EliminarProducto, InsertarProducto, ObtenerMarcas, ObtenerModelos, ObtenerRepuestos } from "../controllers/productos_controller.js";
import { obtenerDatos, obtenerEstado, obtenerTecnicos, obtenerUsuarios, ingresarCliente } from "../controllers/estado_controllers.js";

const routes = new Router();

routes.post('/api/login', login);
routes.get('/api/marcas', ObtenerMarcas);
routes.get('/api/modelos/:id', ObtenerModelos);
routes.post('/api/repuestos', ObtenerRepuestos); 
routes.post('/api/repuestos/insertar', InsertarProducto);
routes.put('/api/repuestos/actualizar', ActualizarProducto); 
routes.delete('/api/repuestos/eliminar/:id', EliminarProducto); 

routes.get('/api/usuarios/estado/:id_usuario', obtenerEstado);
routes.get('/api/usuarios/users', obtenerUsuarios);
routes.get('/api/usuarios/datos' , obtenerDatos);
routes.get('/api/usuarios/tecnicos', obtenerTecnicos);
routes.post('/api/usuarios/insertar', ingresarCliente);

export default routes;
