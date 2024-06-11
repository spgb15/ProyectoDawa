CREATE SCHEMA DAWA; /*CREA LA BASE DE DATOS*/
USE DAWA; /*SELECCIONA LA BASE DE DATOS*/

/*CREACION DE TABLAS*/
CREATE TABLE `rol` (
  `id_rol` int PRIMARY KEY auto_increment,
  `descripcion` varchar(30) NOT NULL
);

CREATE TABLE `usuarios` (
  `usuario_id` int PRIMARY KEY auto_increment,
  `cedula` varchar(25) NOT NULL,
  `password` varchar(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `email` varchar(30),
  `direccion` varchar(50),
  `rol` int NOT NULL,
  `especialidad` varchar(30),
  `estado` char,
  FOREIGN KEY (`rol`) REFERENCES `rol` (`id_rol`)
);
CREATE TABLE `equipos` (
  `equipo_id` int PRIMARY KEY auto_increment,
  `marca` varchar(30) NOT NULL,
  `modelo` varchar(30)NOT NULL,
  `fecha_ingreso` datetime,
  `usuario_id` int NOT NULL,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`)
);

CREATE TABLE `estado_reparacion` (
  `id_estado` int PRIMARY KEY auto_increment,
  `descripcion` varchar(30) NOT NULL
);

CREATE TABLE `reparacion` (
  `id_reparacion` int PRIMARY KEY auto_increment,
  `equipo_id` int NOT NULL,
  `cliente_id` int NOT NULL,
  `tecnico_id` int NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `fecha_inicio` datetime,
  `estado` int NOT NULL,
  `costo_repuestos` float,
  `costo_servicio` float,
  `costo_total` float,
  FOREIGN KEY (`equipo_id`) REFERENCES `equipos` (`equipo_id`),
  FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`usuario_id`),
  FOREIGN KEY (`tecnico_id`) REFERENCES `usuarios` (`usuario_id`),
  FOREIGN KEY (`estado`) REFERENCES `estado_reparacion` (`id_estado`)
);

CREATE TABLE `repuesto` (
  `repuesto_id` int PRIMARY KEY auto_increment,
  `descripcion` varchar(50) NOT NULL,
  `costo` float
);

CREATE TABLE `factura` (
  `factura_id` int PRIMARY KEY auto_increment,
  `cliente_id` int NOT NULL,
  `reparacion` int NOT NULL,
  `fecha_emision` datetime,
  `subtotal` float,
  `iva` float,
  `monto_total` float,
  FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`usuario_id`),
  FOREIGN KEY (`reparacion`) REFERENCES `reparacion` (`id_reparacion`)
);

CREATE TABLE `item_factura` (
  `item_id` int PRIMARY KEY auto_increment,
  `factura_id` int,
  `repuesto_id` int,
  `descripcion` varchar(255),
  `cantidad` int,
  `valor_unitario` float,
  `valor_total` float,
  FOREIGN KEY (`factura_id`) REFERENCES `factura` (`factura_id`),
  FOREIGN KEY (`repuesto_id`) REFERENCES `repuesto` (`repuesto_id`)
);

CREATE TABLE `reparacion_repuestos` (
  `id` int PRIMARY KEY auto_increment,
  `reparacion_id` int NOT NULL,
  `repuesto_id` int NOT NULL,
  `cantidad` int,
  FOREIGN KEY (`reparacion_id`) REFERENCES `reparacion` (`id_reparacion`),
  FOREIGN KEY (`repuesto_id`) REFERENCES `repuesto` (`repuesto_id`)
);

/*CREACION DE DATOS*/
insert into rol(descripcion) values('Administrador'), ('Tecnico'), ('Cliente');
insert into estado_reparacion(descripcion) values('Ingresado'), ('En revisión'), ('Pausado'), ('Finalizado');

/*Usuarios*/
INSERT INTO `usuarios` (`cedula`, `password`, `nombre`, `telefono`, `email`, `direccion`, `rol`, `especialidad`, `estado`)
VALUES
('1234567890', 'admin', 'Juan Perez', '0987654321', 'juan@example.com', 'Calle 123', 1, 'Reparación de pantallas', 'A'),
('0987654321', 'tec123', 'Ana Gomez', '0987654322', 'ana@example.com', 'Calle 456', 2, 'Reparación de baterías', 'A'),
('9876543210', 'tec123', 'Mario Lopez', '0987654323', 'mario@example.com', 'Calle 789', 2, 'Reparación de software', 'A'),
('8765432109', 'cli123', 'Laura Torres', '0987654324', 'laura@example.com', 'Calle 012', 3,'', 'A'),
('7654321098', 'cli123', 'Carlos Rivera', '0987654325', 'carlos@example.com', 'Calle 345', 3, '', 'A');



