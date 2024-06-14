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
  id_marca int not null,
  id_modelo int not null,
  `fecha_ingreso` datetime,
  `usuario_id` int,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`),
FOREIGN KEY (id_marca) references marca(id_marca),
  FOREIGN KEY (id_modelo) references modelo(id_modelo)
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

CREATE TABLE marca(
id_marca int primary key auto_increment,
descripcion varchar(30)
);

CREATE TABLE modelo(
id_modelo int primary key auto_increment,
id_marca int not null,
descripcion varchar(30),
FOREIGN KEY (id_marca) references marca(id_marca)
);

CREATE TABLE `repuesto` (
  `repuesto_id` int PRIMARY KEY auto_increment,
  id_marca int,
  id_modelo int,
  `descripcion` varchar(50) NOT NULL,
  `costo` float,
  FOREIGN KEY (id_marca) references marca(id_marca),
  FOREIGN KEY (id_modelo) references modelo(id_modelo)
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

INSERT INTO MARCA(DESCRIPCION) VALUES ('SAMSUNG'),('APPLE'),('XIAOMI');
INSERT INTO modelo(id_marca, descripcion) values
 (1, 'Galaxy S21 Ultra'), (1, 'Galaxy note 20 Ultra'), (1, 'Galaxy A52'), (1,'Galaxy Z Fold 2'), (1, 'Galaxy A72'),
 (2, 'iPhone 12 Pro Max'), (2, 'iPhone SE (2020)'), (2,'iPhone 11'), (2, 'iPhone XR'), (2, 'iPhone 12 Mini'), 
 (3,'Xiaomi Mi 11 Ultra'),(3,'Redmi Note 10 Pro'),(3,'Xiaomi Mi 10T Pro'),(3,'Redmi Note 9S'),(3,'Xiaomi Poco X3 NFC');
 
INSERT INTO repuesto(id_marca, id_modelo, descripcion, costo) VALUES 
(1,1,'Batería', 35.00), (1,1,'Pantalla', 95.00), (1,1,'Camara', 50.00), (1,1,'Marco', 25.00), (1,1,'Altavoz', 65.00), (1,1,'Pin de carga', 15.00), (1,1,'Boton encendido', 10.00), (1,1,'Boton de volumen', 40.00), (1,1,'Sensor de huellas', 120.00), (1,1,'Auricular', 30.00),
(1,2,'Batería', 80.00), (1,2,'Pantalla', 20.00), (1,2,'Camara', 70.00), (1,2,'Marco', 60.00), (1,2,'Altavoz', 55.00), (1,2,'Pin de carga', 35.00), (1,2,'Boton encendido', 50.00), (1,2,'Boton de volumen', 15.00), (1,2,'Sensor de huellas', 110.00), (1,2,'Auricular', 45.00),
(1,3,'Batería', 40.00), (1,3,'Pantalla', 85.00), (1,3,'Camara', 30.00), (1,3,'Marco', 90.00), (1,3,'Altavoz', 20.00), (1,3,'Pin de carga', 75.00), (1,3,'Boton encendido', 60.00), (1,3,'Boton de volumen', 25.00), (1,3,'Sensor de huellas', 100.00), (1,3,'Auricular', 50.00),
(1,4,'Batería', 50.00), (1,4,'Pantalla', 40.00), (1,4,'Camara', 85.00), (1,4,'Marco', 35.00), (1,4,'Altavoz', 70.00), (1,4,'Pin de carga', 90.00), (1,4,'Boton encendido', 20.00), (1,4,'Boton de volumen', 55.00), (1,4,'Sensor de huellas', 25.00), (1,4,'Auricular', 80.00),
(1,5,'Batería', 75.00), (1,5,'Pantalla', 30.00), (1,5,'Camara', 60.00), (1,5,'Marco', 50.00), (1,5,'Altavoz', 95.00), (1,5,'Pin de carga', 45.00), (1,5,'Boton encendido', 70.00), (1,5,'Boton de volumen', 15.00), (1,5,'Sensor de huellas', 85.00), (1,5,'Auricular', 55.00),

(2,6,'Batería', 65.00), (2,6,'Pantalla', 40.00), (2,6,'Camara', 120.00), (2,6,'Marco', 35.00), (2,6,'Altavoz', 80.00), (2,6,'Pin de carga', 20.00), (2,6,'Boton encendido', 95.00), (2,6,'Boton de volumen', 30.00), (2,6,'Sensor de huellas', 85.00), (2,6,'Auricular', 70.00),
(2,7,'Batería', 90.00), (2,7,'Pantalla', 25.00), (2,7,'Camara', 60.00), (2,7,'Marco', 55.00), (2,7,'Altavoz', 15.00), (2,7,'Pin de carga', 100.00), (2,7,'Boton encendido', 50.00), (2,7,'Boton de volumen', 10.00), (2,7,'Sensor de huellas', 75.00), (2,7,'Auricular', 95.00),
(2,8,'Batería', 25.00), (2,8,'Pantalla', 75.00), (2,8,'Camara', 85.00), (2,8,'Marco', 30.00), (2,8,'Altavoz', 50.00), (2,8,'Pin de carga', 45.00), (2,8,'Boton encendido', 20.00), (2,8,'Boton de volumen', 95.00), (2,8,'Sensor de huellas', 65.00), (2,8,'Auricular', 110.00),
(2,9,'Batería', 50.00), (2,9,'Pantalla', 90.00), (2,9,'Camara', 40.00), (2,9,'Marco', 25.00), (2,9,'Altavoz', 95.00), (2,9,'Pin de carga', 85.00), (2,9,'Boton encendido', 55.00), (2,9,'Boton de volumen', 15.00), (2,9,'Sensor de huellas', 35.00), (2,9,'Auricular', 60.00),
(2,10,'Batería', 110.00), (2,10,'Pantalla', 70.00), (2,10,'Camara', 55.00), (2,10,'Marco', 100.00), (2,10,'Altavoz', 20.00), (2,10,'Pin de carga', 60.00), (2,10,'Boton encendido', 25.00), (2,10,'Boton de volumen', 85.00), (2,10,'Sensor de huellas', 75.00), (2,10,'Auricular', 40.00),

(3,11,'Batería', 55.00), (3,11,'Pantalla', 110.00), (3,11,'Camara', 40.00), (3,11,'Marco', 70.00), (3,11,'Altavoz', 35.00), (3,11,'Pin de carga', 65.00), (3,11,'Boton encendido', 25.00), (3,11,'Boton de volumen', 80.00), (3,11,'Sensor de huellas', 50.00), (3,11,'Auricular', 75.00),
(3,12,'Batería', 75.00), (3,12,'Pantalla', 50.00), (3,12,'Camara', 95.00), (3,12,'Marco', 40.00), (3,12,'Altavoz', 65.00), (3,12,'Pin de carga', 25.00), (3,12,'Boton encendido', 85.00), (3,12,'Boton de volumen', 35.00), (3,12,'Sensor de huellas', 55.00), (3,12,'Auricular', 90.00),
(3,13,'Batería', 100.00), (3,13,'Pantalla', 30.00), (3,13,'Camara', 65.00), (3,13,'Marco', 75.00), (3,13,'Altavoz', 45.00), (3,13,'Pin de carga', 15.00), (3,13,'Boton encendido', 90.00), (3,13,'Boton de volumen', 60.00), (3,13,'Sensor de huellas', 70.00), (3,13,'Auricular', 85.00),
(3,14,'Batería', 95.00), (3,14,'Pantalla', 60.00), (3,14,'Camara', 25.00), (3,14,'Marco', 110.00), (3,14,'Altavoz', 55.00), (3,14,'Pin de carga', 50.00), (3,14,'Boton encendido', 35.00), (3,14,'Boton de volumen', 70.00), (3,14,'Sensor de huellas', 85.00), (3,14,'Auricular', 40.00),
(3,15,'Batería', 65.00), (3,15,'Pantalla', 20.00), (3,15,'Camara', 75.00), (3,15,'Marco', 85.00), (3,15,'Altavoz', 95.00), (3,15,'Pin de carga', 45.00), (3,15,'Boton encendido', 70.00), (3,15,'Boton de volumen', 15.00), (3,15,'Sensor de huellas', 85.00), (3,15,'Auricular', 55.00);


