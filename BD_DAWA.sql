CREATE SCHEMA DAWA;
USE DAWA;

CREATE TABLE `cliente` (
  `id_cliente` varchar(20) PRIMARY KEY,
  `nombre` varchar(25),
  `telefono` varchar(10),
  `email` varchar(25)
);

CREATE TABLE `equipos` (
  `id_equipo` int PRIMARY KEY,
  `id_cliente` varchar(20),
  `marca` varchar(25),
  `modelo` varchar(25),
  `numero_serie` varchar(25),
  `descripcion_problema` varchar(50)
);

CREATE TABLE `reparacion` (
  `id_reparacion` int PRIMARY KEY,
  `id_equipo` int,
  `fecha_recepcion` datetime,
  `fecha_entrega_estimada` datetime,
  `estado` varchar(20),
  `costo_servicio` float,
  `id_tecnico` int
);

CREATE TABLE `tecnico` (
  `id_tecnico` int PRIMARY KEY,
  `nombre` varchar(25),
  `telefono` varchar(10),
  `email` varchar(25),
  `especialidad` varchar(25)
);

CREATE TABLE `repuesto` (
  `id_repuesto` int PRIMARY KEY,
  `nombre_repuesto` varchar(25),
  `descripcion` varchar(50),
  `costo` float
);

CREATE TABLE `reparacion_repuesto` (
  `id_reparacion` int PRIMARY key,
  `id_repuesto` int,
  `cantidad` int
);

CREATE TABLE `factura` (
  `id_factura` int PRIMARY KEY,
  `id_cliente` varchar(20),
  `fecha_emision` datetime,
  `monto_total` float
);

CREATE TABLE `usuario` (
  `id_usuario` varchar(20) PRIMARY KEY,
  `nombre_usuario` varchar(25),
  `password` varchar(25),
  `rol` int
);

CREATE TABLE `roles` (
  `id_rol` int PRIMARY KEY,
  `nombre` varchar(40)
);

ALTER TABLE `equipos` ADD FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`);

ALTER TABLE `reparacion` ADD FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`);

ALTER TABLE `factura` ADD FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`);

ALTER TABLE `cliente` ADD FOREIGN KEY (`id_cliente`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `tecnico` ADD FOREIGN KEY (`id_tecnico`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`rol`) REFERENCES `roles` (`id_rol`);

ALTER TABLE `reparacion` ADD FOREIGN KEY (`id_tecnico`) REFERENCES `tecnico` (`id_tecnico`);

ALTER TABLE `reparacion_repuesto` ADD FOREIGN KEY (`id_reparacion`) REFERENCES `reparacion` (`id_reparacion`);

ALTER TABLE `reparacion_repuesto` ADD FOREIGN KEY (`id_repuesto`) REFERENCES `repuesto` (`id_repuesto`);

