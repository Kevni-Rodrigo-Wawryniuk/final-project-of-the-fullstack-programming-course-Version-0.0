-- Crear Schema
create schema stockST;

-- usar la tabla
use stockst;

-- ver los regitros de la tabla usuarios
select * from stockst.usuario;

-- talba usuario
create table usuario(

idusuario int not null auto_increment,
nombre varchar(100) not null,
apellido varchar(100) not null,
edad int not null,
usuario varchar(100) not null,
correo varchar(200) not null,
contraseña varchar(200) not null,

primary key (idusuario)
);

-- estos son los roles de usuario 
-- el 0 es de usuario normal
-- el 1 de administrador
-- el 2 de desarrollador
alter table stockst.usuario add column roles int not null default(0);

-- tabla Empresas
create table empresas(
idempresas int not null auto_increment,
nombre_empresa varchar(100) not null,
codigo_modelo varchar(50) not null,
codigo_droides varchar(50) not null,
codigo_vehiculos varchar(50) not null,
codigo_estado varchar(50) not null,
codigo_tipo_producto varchar(50) not null,
primary key(idempresas)
);
drop table stockst.empresas;


-- tabla Droides
create table droides(
id_droides int not null auto_increment,
nombre_droides varchar(100) not null,
primary key(id_droides)
);
alter table droides add column codigo varchar(50) not null;

-- tabla vehiculos
create table vehiculos(
id_vehiculos int not null auto_increment,
nombre_vehiculos varchar(100) not null,
primary key (id_vehiculos)
);
alter table vehiculos change column codigos codigo varchar(50) not null;

-- tabla estados
create table estados(
id_estados int not null auto_increment,
nombre_estados varchar(100) not null,
primary key (id_estados)
);
alter table estados change column codigos codigo varchar(50) not null;

-- tabla modelos
create table modelos(
id_modelos int not null auto_increment,
nombre_modelos varchar(100) not null,
primary key (id_modelos)
);
alter table modelos change column codigos codigo varchar(50) not null;

-- tabla tipo_productos
create table tipo_productos(
id_tipo_productos int not null auto_increment,
nombre_tipo_productos varchar(100) not null,
primary key (id_tipo_productos)
);
alter table tipo_productos change column codigos codigo varchar(50) not null;