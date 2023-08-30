-- Crear Schema
create schema stockST;

-- usar la tabla
use stockst;

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

-- tabla Empresas
create table empresas(
idempresas int not null auto_increment,
nombre_empresa varchar(100) not null,
id_modelo int not null,
id_droides int not null,
id_vehiculos int not null,
id_estado int not null,
id_tipo_producto int not null,
primary key(idempresas)
);

-- tabla Droides
create table droides(
id_droides int not null auto_increment,
nombre_droides varchar(100) not null,
primary key(id_droides)
);

-- tabla vehiculos
create table vehiculos(
id_vehiculos int not null auto_increment,
nombre_vehiculos varchar(100) not null,
primary key (id_vehiculos)
);

-- tabla estados
create table estados(
id_estados int not null auto_increment,
nombre_estados varchar(100) not null,
primary key (id_estados)
);

-- tabla modelos
create table modelos(
id_modelos int not null auto_increment,
nombre_modelos varchar(100) not null,
primary key (id_modelos)
);

-- tabla tipo_productos
create table tipo_productos(
id_tipo_productos int not null auto_increment,
nombre_tipo_productos varchar(100) not null,
primary key (id_tipo_productos)
);