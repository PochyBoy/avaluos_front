create database dbavaluos;


-- Completado
CREATE TABLE aut_usuario(
   id_usuario SERIAL PRIMARY KEY,
   codigo char(30) NOT NULL,
   nombre char(80) NULL,
   email varchar(80),
   rol char(30) NULL,
   estado boolean,
   fecha_alta  date NULL,
   fecha_modi date NULL,
   fecha_baja date NULL
);

comment on column aut_usuario.codigo is 'Registro codigo de usuario';

-- Completado
CREATE TABLE cat_asignacion(
   id_asignacion SERIAL PRIMARY KEY,
   codigo char(30) NOT NULL,
   descripcion char(80) NULL,
   estado boolean,
   fecha_alta  date NULL,
   fecha_modi date NULL,
   fecha_baja date NULL
);
-- Completado
CREATE TABLE cat_bien(
   id_bien SERIAL PRIMARY KEY,
   codigo char(30) NOT NULL,
   descripcion char(80) NULL,
   estado boolean,
   fecha_alta  date NULL,
   fecha_modi date NULL,
   fecha_baja date NULL
);
-- Completado
CREATE TABLE cat_banca(
   id_banca SERIAL PRIMARY KEY,
   codigo char(30) NOT NULL,
   descripcion char(80) NULL,
   estado boolean,
   fecha_alta  date NULL,
   fecha_modi date NULL,
   fecha_baja date NULL
);
-- Completado
CREATE TABLE cat_profesion(
   id_profesion SERIAL PRIMARY KEY,
   codigo char(30) NOT NULL,
   descripcion char(80) NULL,
   estado boolean,
   fecha_alta  date NULL,
   fecha_modi date NULL,
   fecha_baja date NULL
);
-- Completado
CREATE TABLE cat_municipio(
   id_municipio SERIAL PRIMARY KEY,
   codigo char(30) NOT NULL,
   descripcion char(80) NULL,
   estado boolean,
   fecha_alta  date NULL,
   fecha_modi date NULL,
   fecha_baja date NULL
);

-- Completado
CREATE TABLE cat_tipodebien(
   id_tipodebien SERIAL PRIMARY KEY,
   codigo char(30) NOT NULL,
   descripcion char(80) NULL,
   estado boolean,
   fecha_alta  date NULL,
   fecha_modi date NULL,
   fecha_baja date NULL
);


-- Completado
CREATE TABLE cat_solicitante (
   id_solicitante SERIAL PRIMARY KEY,
   fecha_inicio date NULL,
   fecha_fin date NULL,
   nombre  varchar(80),
   domicilio  varchar(80),
   municipio  varchar(80),
   profesion  varchar(80),
   correo_electronico  varchar(80),
   telefono_oficina varchar(20),
   telefono_celular varchar(20),
   ci varchar(20),
   nit varchar(20),
   estado boolean,
   fecha_alta  date NULL,
   fecha_modi date NULL,
   fecha_baja date NULL
);

-- Completado
CREATE TABLE cat_avaluador (
   id_avaluador SERIAL PRIMARY KEY,
   fecha_inicio date NULL,
   fecha_fin date NULL,
   nombre  varchar(80),
   representante_legal  varchar(80),
   domicilio_legal  varchar(80),
   domicilio  varchar(80),
   municipio  varchar(80),
   profesion  varchar(80),
   especialidad_valuacion  varchar(80),
   tiempo_experiencia  integer,
   contrato  varchar(80),
   correo_electronico  varchar(80),
   telefono_oficina varchar(20),
   telefono_celular varchar(20),
   ci varchar(20),
   nit varchar(20),
   capacidad_avaluos  integer,
   estado boolean,
   fecha_alta  date NULL,
   fecha_modi date NULL,
   fecha_baja date NULL
);

comment on column cat_avaluador.fecha_inicio is 'Fecha de Inicio';
comment on column cat_avaluador.fecha_fin is 'Fecha Fin';
comment on column cat_avaluador.nombre is 'Nombre y Apellido o Razón social';
comment on column cat_avaluador.Representante_legal is 'Representante_legal';
comment on column cat_avaluador.domicilio_legal is 'Domicilio';
comment on column cat_avaluador.domicilio is 'Domicilio';
comment on column cat_avaluador.municipio is 'Municipio';
comment on column cat_avaluador.profesion is 'profesion';
comment on column cat_avaluador.especialidad_valuacion is 'Especialidad de valuación';
comment on column cat_avaluador.tiempo_experiencia is 'Tiempo de experiencia en avalúos (años)';
comment on column cat_avaluador.contrato is 'Contrato';
comment on column cat_avaluador.correo_electronico is 'Correo electrónico';
comment on column cat_avaluador.telefono_oficina is 'Teléfono oficina';
comment on column cat_avaluador.telefono_celular is 'Teléfono celular';
comment on column cat_avaluador.ci is 'CI';
comment on column cat_avaluador.nit is 'NIT';
comment on column cat_avaluador.capacidad_avaluos is 'Capacidad de avalúos al mes';


-- Completado
CREATE TABLE cat_asignacionsla (
   id_asignacionsla SERIAL PRIMARY KEY,
   codigo varchar(20),
   actividad varchar(20),
   regla varchar(20),
   tiempo integer,
   observacion varchar(20),
   estado boolean,
   fecha_alta  date NULL,
   fecha_modi date NULL,
   fecha_baja date NULL
);


comment on column cat_asignacionsla.codigo is 'Codigo de SLA';
comment on column cat_asignacionsla.actividad is 'Actividad de SLA';
comment on column cat_asignacionsla.regla is 'Condiciones';
comment on column cat_asignacionsla.tiempo is 'Tiempo';
comment on column cat_asignacionsla.observacion is 'Observaciones';




CREATE TABLE mov_solicitud (
   id_solicitud SERIAL PRIMARY KEY,
   numero_solicitud varchar(20),
   solicitante varchar(20),
   fecha_solicitud  date NULL,
   hora_solicitud  time NULL,
   tipo_banca varchar(20),
   tipo_bien varchar(20),
   persona_referencia varchar(60),
   agencia varchar(20),
   municipio varchar(20),
   cod_cliente varchar(20),
   nombre_cliente varchar(150),
   telefono_celular varchar(20),
   correo_electronico varchar(80),
   tipo_requerimiento varchar(20),
   convenio  varchar(20),
   tipo_asignacion varchar(20),
   perito_asignado varchar(5)
);

comment on column mov_solicitud.numero_solicitud is 'Número de solicitud';
comment on column mov_solicitud.solicitante is 'Solicitante';
comment on column mov_solicitud.fecha_solicitud is 'Fecha de solicitud';
comment on column mov_solicitud.hora_solicitud is 'hora_solicitud';
comment on column mov_solicitud.tipo_banca is 'Tipo de banca';
comment on column mov_solicitud.agencia is 'Agencia';
comment on column mov_solicitud.municipio is 'Municipio del bien';
comment on column mov_solicitud.cod_cliente is 'Código del cliente';
comment on column mov_solicitud.nombre_cliente is 'Nombre / razón social';
comment on column mov_solicitud.telefono_celular is 'Teléfono celular';
comment on column mov_solicitud.correo_electronico is 'Correo electrónico';
comment on column mov_solicitud.tipo_requerimiento is 'Tipo de requerimiento';
comment on column mov_solicitud.convenio is 'Convenio';
comment on column mov_solicitud.tipo_asignacion is 'tipo de asignacion';
comment on column mov_solicitud.perito_asignado is 'Perito que realizó el primer avalúo';

-- Completado
CREATE TABLE mov_convenios (
   id SERIAL PRIMARY KEY,
   municipio varchar(20),
   perito varchar(20),
   nombre_proyecto varchar(80),
   fecha_inicio date NULL,
   fecha_fin date NULL
);


comment on column mov_convenios.municipio is 'Municipio';
comment on column mov_convenios.perito is 'Perito';
comment on column mov_convenios.nombre_proyecto is 'Nombre del proyecto';
comment on column mov_convenios.fecha_inicio is 'Fecha de inicio';
comment on column mov_convenios.fecha_fin is 'Fecha fin';



