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
nombre_empresa varchar(50) not null,
codigo_modelo varchar(3) not null,
codigo_droides varchar(3) not null,
codigo_vehiculos varchar(3) not null,
codigo_estado varchar(3) not null,
codigo_tipo_producto varchar(3) not null,
primary key(idempresas)
);
alter table stockst.empresas change column nombre_empresa nombre_empresa varchar(50) not null;
select * from stockst.empresas;
-- drop table stockst.empresas;


-- tabla Droides
create table droides(
id_droides int not null auto_increment,
nombre_droides varchar(100) not null,
primary key(id_droides)
);
alter table droides add column codigo varchar(50) not null;
alter table stockst.droides change column codigo codigo varchar(3) not null;
-- tabla vehiculos
create table vehiculos(
id_vehiculos int not null auto_increment,
nombre_vehiculos varchar(100) not null,
primary key (id_vehiculos)
);
alter table stockst.vehiculos change column codigo codigo varchar(3) not null;

-- tabla estados
create table estados(
id_estados int not null auto_increment,
nombre_estados varchar(100) not null,
primary key (id_estados)
);
alter table  stockst.estados change column codigo codigo varchar(50) not null;

-- tabla modelos
create table modelos(
id_modelos int not null auto_increment,
nombre_modelos varchar(100) not null,
primary key (id_modelos)
);
alter table stockst.modelos change column codigo codigo varchar(50) not null;

-- tabla tipo_productos
create table tipo_productos(
id_tipo_productos int not null auto_increment,
nombre_tipo_productos varchar(100) not null,
primary key (id_tipo_productos)
);
alter table stockst.tipo_productos change column codigo codigo varchar(50) not null;


-- las consultas a usar para traer los registros usando los codigos para traer los nombres de los droides, etc..

select * from stockst.empresas;

select emp.nombre_empresa, modelo.nombre_modelos, droide.nombre_droides, vehiculo.nombre_vehiculos,
	   estado.nombre_estados, tipo_producto.nombre_tipo_productos from stockst.empresas as emp
       
		left join stockst.modelos as modelo on modelo.codigo = emp.codigo_modelo
        left join stockst.droides as droide on droide.codigo = emp.codigo_droides
        left join stockst.vehiculos as vehiculo on vehiculo.codigo = emp.codigo_vehiculos
        left join stockst.estados as estado on estado.codigo = emp.codigo_estado 
        left join stockst.tipo_productos as tipo_producto on tipo_producto.codigo = emp.codigo_tipo_producto;
        
-- select * from stockst.tipo_productos;
        
-- update stockst.tipo_productos set codigo = '002' where id_tipo_productos = 3;