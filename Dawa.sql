CREATE SCHEMA DAWA; /*CREA LA BASE DE DATOS*/
USE DAWA; /*SELECCIONA LA BASE DE DATOS*/

/*CREACION DE TABLAS*/
CREATE TABLE rol (
  id_rol int PRIMARY KEY AUTO_INCREMENT,
  descripcion varchar(30) NOT NULL
);

CREATE TABLE usuarios (
  usuario_id int PRIMARY KEY AUTO_INCREMENT,
  cedula varchar(25) NOT NULL,
  password varchar(20) NOT NULL,
  nombre varchar(50) NOT NULL,
  telefono varchar(10) NOT NULL,
  email varchar(30),
  direccion varchar(50),
  rol int NOT NULL,
  especialidad varchar(30),
  estado char,
  FOREIGN KEY (rol) REFERENCES rol (id_rol)
);

CREATE TABLE equipos (
  equipo_id int PRIMARY KEY AUTO_INCREMENT,
  id_marca int NOT NULL,
  id_modelo int NOT NULL,
  fecha_ingreso datetime,
  usuario_id int,
  FOREIGN KEY (usuario_id) REFERENCES usuarios (usuario_id),
  FOREIGN KEY (id_marca) REFERENCES marca (id_marca),
  FOREIGN KEY (id_modelo) REFERENCES modelo (id_modelo)
);

CREATE TABLE estado_reparacion (
  id_estado int PRIMARY KEY AUTO_INCREMENT,
  descripcion varchar(30) NOT NULL
);

CREATE TABLE reparacion (
  id_reparacion int PRIMARY KEY AUTO_INCREMENT,
  equipo_id int NOT NULL,
  cliente_id int NOT NULL,
  tecnico_id int NOT NULL,
  descripcion varchar(50) NOT NULL,
  fecha_inicio datetime,
  estado int NOT NULL,
  costo_repuestos float,
  costo_servicio float,
  costo_total float,
  FOREIGN KEY (equipo_id) REFERENCES equipos (equipo_id),
  FOREIGN KEY (cliente_id) REFERENCES usuarios (usuario_id),
  FOREIGN KEY (tecnico_id) REFERENCES usuarios (usuario_id),
  FOREIGN KEY (estado) REFERENCES estado_reparacion (id_estado)
);

CREATE TABLE marca (
  id_marca int PRIMARY KEY AUTO_INCREMENT,
  descripcion varchar(30)
);

CREATE TABLE modelo (
  id int PRIMARY KEY AUTO_INCREMENT,
  id_modelo int,
  id_marca int NOT NULL,
  descripcion varchar(30),
  FOREIGN KEY (id_marca) REFERENCES marca (id_marca)
);

CREATE TABLE repuesto (
  repuesto_id int PRIMARY KEY AUTO_INCREMENT,
  id_marca int,
  id_modelo int,
  descripcion varchar(50) NOT NULL,
  costo float NOT NULL,
  stock int NOT NULL,
  FOREIGN KEY (id_marca) REFERENCES marca (id_marca),
  FOREIGN KEY (id_modelo) REFERENCES modelo (id_modelo)
);

CREATE TABLE factura (
  factura_id int PRIMARY KEY AUTO_INCREMENT,
  cliente_id int NOT NULL,
  reparacion int NOT NULL,
  fecha_emision datetime,
  subtotal float,
  iva float,
  monto_total float,
  FOREIGN KEY (cliente_id) REFERENCES usuarios (usuario_id),
  FOREIGN KEY (reparacion) REFERENCES reparacion (id_reparacion)
);

CREATE TABLE item_factura (
  item_id int PRIMARY KEY AUTO_INCREMENT,
  factura_id int,
  repuesto_id int,
  cantidad int,
  valor_unitario float,
  valor_total float,
  FOREIGN KEY (factura_id) REFERENCES factura (factura_id),
  FOREIGN KEY (repuesto_id) REFERENCES repuesto (repuesto_id)
);

CREATE TABLE reparacion_repuestos (
  id int PRIMARY KEY AUTO_INCREMENT,
  reparacion_id int NOT NULL,
  repuesto_id int NOT NULL,
  cantidad int,
  FOREIGN KEY (reparacion_id) REFERENCES reparacion (id_reparacion),
  FOREIGN KEY (repuesto_id) REFERENCES repuesto (repuesto_id)
);

/*CREACION DE DATOS*/
INSERT INTO rol (descripcion) VALUES ('Administrador'), ('Tecnico'), ('Cliente');
INSERT INTO estado_reparacion (descripcion) VALUES ('Ingresado'), ('En revisión'), ('Pausado'), ('Finalizado');

/*Usuarios*/
INSERT INTO usuarios (cedula, password, nombre, telefono, email, direccion, rol, especialidad, estado)
VALUES
(1234567890, 'admin', 'Juan Perez', '0987654321', 'juan@example.com', 'Calle 123', 1, 'Reparación de pantallas', 'A'),
(9876543210, 'tec123', 'Ana Gomez', '0987654322', 'ana@example.com', 'Calle 456', 2, 'Reparación de baterías', 'A'),
(8765432109, 'tec123', 'Mario Lopez', '0987654323', 'mario@example.com', 'Calle 789', 2, 'Reparación de software', 'A'),
(7654321098, 'cli123', 'Laura Torres', '0987654324', 'laura@example.com', 'Calle 012', 3, '', 'A'),
(6543210987, 'cli123', 'Carlos Rivera', '0987654325', 'carlos@example.com', 'Calle 345', 3, '', 'A');

INSERT INTO marca (descripcion) VALUES ('SAMSUNG'), ('APPLE'), ('XIAOMI');
INSERT INTO modelo (id_modelo, id_marca, descripcion) VALUES
(1, 1, 'Galaxy S21 Ultra'), (2, 1, 'Galaxy note 20 Ultra'), (3, 1, 'Galaxy A52'), (4, 1, 'Galaxy Z Fold 2'), (5, 1, 'Galaxy A72'),
(1, 2, 'iPhone 12 Pro Max'), (2, 2, 'iPhone SE (2020)'), (3, 2, 'iPhone 11'), (4, 2, 'iPhone XR'), (5, 2, 'iPhone 12 Mini'), 
(1, 3, 'Xiaomi Mi 11 Ultra'), (2, 3, 'Redmi Note 10 Pro'), (3, 3, 'Xiaomi Mi 10T Pro'), (4, 3, 'Redmi Note 9S'), (5, 3, 'Xiaomi Poco X3 NFC');

INSERT INTO repuesto (id_marca, id_modelo, descripcion, costo, stock) VALUES
(1, 1, 'Batería', 35.00, 100), 
(1, 1, 'Pantalla', 95.00, 80), 
(1, 1, 'Cámara', 50.00, 120), 
(1, 1, 'Marco', 25.00, 50), 
(1, 1, 'Altavoz', 65.00, 90), 
(1, 1, 'Pin de carga', 15.00, 150), 
(1, 1, 'Botón encendido', 10.00, 200), 
(1, 1, 'Botón de volumen', 40.00, 70), 
(1, 1, 'Sensor de huellas', 120.00, 30), 
(1, 1, 'Auricular', 30.00, 110),

(1, 2, 'Batería', 80.00, 85), 
(1, 2, 'Pantalla', 20.00, 95), 
(1, 2, 'Cámara', 70.00, 75), 
(1, 2, 'Marco', 60.00, 60), 
(1, 2, 'Altavoz', 55.00, 100), 
(1, 2, 'Pin de carga', 35.00, 120), 
(1, 2, 'Botón encendido', 50.00, 80), 
(1, 2, 'Botón de volumen', 15.00, 110), 
(1, 2, 'Sensor de huellas', 110.00, 65), 
(1, 2, 'Auricular', 45.00, 95),

(1, 3, 'Batería', 40.00, 95), 
(1, 3, 'Pantalla', 85.00, 70), 
(1, 3, 'Cámara', 30.00, 100), 
(1, 3, 'Marco', 90.00, 45), 
(1, 3, 'Altavoz', 20.00, 85), 
(1, 3, 'Pin de carga', 75.00, 60), 
(1, 3, 'Botón encendido', 60.00, 75), 
(1, 3, 'Botón de volumen', 25.00, 110), 
(1, 3, 'Sensor de huellas', 100.00, 40), 
(1, 3, 'Auricular', 50.00, 95),

(1, 4, 'Batería', 50.00, 80), 
(1, 4, 'Pantalla', 40.00, 90), 
(1, 4, 'Cámara', 85.00, 65), 
(1, 4, 'Marco', 35.00, 100), 
(1, 4, 'Altavoz', 70.00, 55),
(1, 4, 'Pin de carga', 90.00, 70),
(1, 4, 'Boton encendido', 20.00, 85),
(1, 4, 'Boton de volumen', 55.00, 50),
(1, 4, 'Sensor de huellas', 25.00, 95),
(1, 4, 'Auricular', 80.00, 60),

(1, 5, 'Batería', 75.00, 70),
(1, 5, 'Pantalla', 30.00, 80),
(1, 5, 'Camara', 60.00, 55),
(1, 5, 'Marco', 50.00, 90),
(1, 5, 'Altavoz', 95.00, 40),
(1, 5, 'Pin de carga', 45.00, 100),
(1, 5, 'Boton encendido', 70.00, 75),
(1, 5, 'Boton de volumen', 15.00, 110),
(1, 5, 'Sensor de huellas', 85.00, 30),
(1, 5, 'Auricular', 55.00, 85),

(2, 1, 'Batería', 65.00, 95),
(2, 1, 'Pantalla', 40.00, 70),
(2, 1, 'Camara', 120.00, 85),
(2, 1, 'Marco', 35.00, 60),
(2, 1, 'Altavoz', 80.00, 100),
(2, 1, 'Pin de carga', 20.00, 120),
(2, 1, 'Boton encendido', 95.00, 80),
(2, 1, 'Boton de volumen', 30.00, 110),
(2, 1, 'Sensor de huellas', 85.00, 45),
(2, 1, 'Auricular', 70.00, 95),

(2, 2, 'Batería', 90.00, 80),
(2, 2, 'Pantalla', 25.00, 100),
(2, 2, 'Camara', 60.00, 75),
(2, 2, 'Marco', 55.00, 60),
(2, 2, 'Altavoz', 15.00, 85),
(2, 2, 'Pin de carga', 100.00, 70),
(2, 2, 'Boton encendido', 50.00, 90),
(2, 2, 'Boton de volumen', 10.00, 55),
(2, 2, 'Sensor de huellas', 75.00, 95),
(2, 2, 'Auricular', 95.00, 40),

(2, 3, 'Batería', 25.00, 100),
(2, 3, 'Pantalla', 75.00, 65),
(2, 3, 'Camara', 85.00, 90),
(2, 3, 'Marco', 30.00, 55),
(2, 3, 'Altavoz', 50.00, 80),
(2, 3, 'Pin de carga', 45.00, 110),
(2, 3, 'Boton encendido', 20.00, 75),
(2, 3, 'Boton de volumen', 95.00, 100),
(2, 3, 'Sensor de huellas', 65.00, 70),
(2, 3, 'Auricular', 110.00, 85),

(2, 4, 'Batería', 50.00, 90),
(2, 4, 'Pantalla', 90.00, 70),
(2, 4, 'Camara', 40.00, 85),
(2, 4, 'Marco', 25.00, 65),
(2, 4, 'Altavoz', 95.00, 80),
(2, 4, 'Pin de carga', 85.00, 95),
(2, 4, 'Boton encendido', 55.00, 50),
(2, 4, 'Boton de volumen', 15.00, 100),
(2, 4, 'Sensor de huellas', 35.00, 75),
(2, 4, 'Auricular', 60.00, 110),

(2, 5, 'Batería', 110.00, 85),
(2, 5, 'Pantalla', 70.00, 60),
(2, 5, 'Camara', 55.00, 95),
(2, 5, 'Marco', 100.00, 80),
(2, 5, 'Altavoz', 20.00, 70),
(2, 5, 'Pin de carga', 60.00, 85),
(2, 5, 'Boton encendido', 25.00, 65),
(2, 5, 'Boton de volumen', 85.00, 90),
(2, 5, 'Sensor de huellas', 75.00, 55),
(2, 5, 'Auricular', 40.00, 100),

(3, 1, 'Batería', 55.00, 90),
(3, 1, 'Pantalla', 110.00, 70),
(3, 1, 'Camara', 40.00, 85),
(3, 1, 'Marco', 70.00, 60),
(3, 1, 'Altavoz', 35.00, 80),
(3, 1, 'Pin de carga', 65.00, 95),
(3, 1, 'Boton encendido', 25.00, 75),
(3, 1, 'Boton de volumen', 80.00, 100),
(3, 1, 'Sensor de huellas', 50.00, 70),
(3, 1, 'Auricular', 75.00, 85),

(3, 2, 'Batería', 75.00, 80),
(3, 2, 'Pantalla', 50.00, 90),
(3, 2, 'Camara', 95.00, 65),
(3, 2, 'Marco', 40.00, 85),
(3, 2, 'Altavoz', 65.00, 70),
(3, 2, 'Pin de carga', 25.00, 95),
(3, 2, 'Boton encendido', 85.00, 55),
(3, 2, 'Boton de volumen', 35.00, 80),
(3, 2, 'Sensor de huellas', 55.00, 75),
(3, 2, 'Auricular', 90.00, 85),

(3, 3, 'Batería', 100.00, 75),
(3, 3, 'Pantalla', 30.00, 110),
(3, 3, 'Camara', 65.00, 45),
(3, 3, 'Marco', 75.00, 100),
(3, 3, 'Altavoz', 45.00, 55),
(3, 3, 'Pin de carga', 15.00, 80),
(3, 3, 'Boton encendido', 90.00, 95),
(3, 3, 'Boton de volumen', 60.00, 70),
(3, 3, 'Sensor de huellas', 70.00, 85),
(3, 3, 'Auricular', 85.00, 40),

(3, 4, 'Batería', 95.00, 90),
(3, 4, 'Pantalla', 60.00, 70),
(3, 4, 'Camara', 25.00, 85),
(3, 4, 'Marco', 110.00, 65),
(3, 4, 'Altavoz', 55.00, 80),
(3, 4, 'Pin de carga', 50.00, 95),
(3, 4, 'Boton encendido', 35.00, 50),
(3, 4, 'Boton de volumen', 70.00, 100),
(3, 4, 'Sensor de huellas', 85.00, 75),
(3, 4, 'Auricular', 40.00, 110),

(3, 5, 'Batería', 65.00, 85),
(3, 5, 'Pantalla', 20.00, 60),
(3, 5, 'Camara', 75.00, 95),
(3, 5, 'Marco', 85.00, 80),
(3, 5, 'Altavoz', 95.00, 70),
(3, 5, 'Pin de carga', 45.00, 85),
(3, 5, 'Boton encendido', 70.00, 65),
(3, 5, 'Boton de volumen', 15.00, 90),
(3, 5, 'Sensor de huellas', 85.00, 55),
(3, 5, 'Auricular', 55.00, 100);


