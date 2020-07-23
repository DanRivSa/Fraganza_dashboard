CREATE TABLE ada_pais(
id_pais SMALLINT,
iso CHAR(2) NOT NULL,
nombre_pais VARCHAR(60) NOT NULL UNIQUE,
continente  VARCHAR(10) NOT NULL,
CONSTRAINT PK_id_pais PRIMARY KEY (id_pais),
CONSTRAINT CK_continente CHECK (continente in('Ams','Amn','Af','Eu','As','Oc','Ca'))
);


CREATE TABLE ada_esencia_perfume(
cas_ep INTEGER,
nombre VARCHAR(75) NOT NULL UNIQUE,
tipo VARCHAR(10) NOT NULL,
CONSTRAINT PK_esencia_p PRIMARY KEY (cas_ep),
CONSTRAINT CK_cas_ep CHECK (cas_ep > 0),
CONSTRAINT CK_tipo_ep CHECK (tipo in('natural','sintetico'))
);


CREATE TABLE ada_ingrediente_p(
cas_ip INTEGER,
nombre VARCHAR(50) NOT NULL UNIQUE,
tipo VARCHAR(10) NOT NULL,
CONSTRAINT PK_cas_ip PRIMARY KEY (cas_ip),
CONSTRAINT CK_cas_ep CHECK (cas_ip > 0),
CONSTRAINT CK_tipo_ep CHECK (tipo in('componente','otro'))
);



CREATE TABLE ada_familia_olfativa(
id_familia SMALLINT,
nombre_familia VARCHAR(10) NOT NULL UNIQUE,
CONSTRAINT PK_fo PRIMARY KEY (id_familia)
);

CREATE TABLE ada_palabra_clave(
id_pc SMALLINT,
palabra_unica VARCHAR(12) NOT NULL UNIQUE,
CONSTRAINT PK_pc PRIMARY KEY (id_pc)
);

CREATE TABLE ada_criterio_eval(
id_criterio SMALLINT,
nombre_criterio VARCHAR(30) NOT NULL UNIQUE,
tipo_uso CHAR(1) NOT NULL,
CONSTRAINT pk_criterio_eval PRIMARY KEY (id_criterio),
CONSTRAINT CK_tipo_uso CHECK (tipo_uso in ('a','i'))
);


CREATE TABLE ada_prohibidas(
cas_ph INTEGER,
nombre_ph VARCHAR(40) NOT NULL,
CONSTRAINT PK_cas_ph PRIMARY KEY (cas_ph)
);


CREATE TABLE ada_asoc_nacional(
id_asoc SMALLINT,
nombre_asoc VARCHAR(50) NOT NULL,
region CHAR(2) NOT NULL,
descripcion VARCHAR(150),
CONSTRAINT PK_asoc_nac PRIMARY KEY (id_asoc),
CONSTRAINT CK_region CHECK (region in ('Ap','Eu','Al','Na'))
);





--Tablas con FK

CREATE TABLE ada_esencia (
  cas INTEGER,
  nombre_comercial VARCHAR(45) NOT NULL UNIQUE,
  nombre_quimico VARCHAR (75) NOT NULL,
  id_prov SMALLINT,
  estado_fisico CHAR(1),
  solubilidad VARCHAR(20),
  flashpoint SMALLINT,
  duracion SMALLINT,
  apariencia VARCHAR(70),
  fema_number INTEGER,
  retcs_number INTEGER,
  einecs_number INTEGER,
  proc_extraccion CHAR(1),
  CONSTRAINT PK_esencia PRIMARY KEY (cas),
  CONSTRAINT CK_estado_fisico CHECK (estado_fisico in('l','s')),
  CONSTRAINT CK_proc_extraccion CHECK (proc_extraccion in('m','e','d','f')),
  CONSTRAINT CK_cas CHECK (cas >=0),
  CONSTRAINT CK_duracion CHECK (duracion > 0)
);

CREATE TABLE ada_otros_ing(
  cas_oi INTEGER,
  nombre_comercial VARCHAR(30) NOT NULL UNIQUE,
  nombre_quimico VARCHAR(75) NOT NULL,
  id_prov SMALLINT NOT NULL,
  tipo VARCHAR(10) NOT NULL,
  desc_olfativ VARCHAR(254),
  desc_uso VARCHAR (254),
  fema_number INTEGER,
  retcs_number INTEGER,
  einecs_number INTEGER,
  CONSTRAINT PK_oi PRIMARY KEY (cas_oi),
  CONSTRAINT CK_tipo CHECK (tipo in('componente','otro'))
);


CREATE TABLE ada_perfumista(
  id_perfumista SMALLINT,
  primer_nombre VARCHAR(15) NOT NULL,
  segundo_nombre VARCHAR(15),
  primer_apellido VARCHAR(15) NOT NULL,
  segundo_apellido VARCHAR(15),
  id_pais SMALLINT NOT NULL,
  CONSTRAINT PK_perfumista PRIMARY KEY (id_perfumista)
);


CREATE TABLE ada_productor(
id_prod SMALLINT,
nombre_prod VARCHAR(70) NOT NULL,
id_asoc SMALLINT,
telefono INTEGER NOT NULL,
direccion_fiscal VARCHAR(70) NOT NULL,
calle VARCHAR(50) NOT NULL,
cod_postal SMALLINT NOT NULL,
avenida VARCHAR(50) NOT NULL,
email VARCHAR(254) UNIQUE,
CONSTRAINT PK_prod PRIMARY KEY (id_prod)
);

CREATE TABLE ada_proveedor(
id_prov SMALLINT,
nombre_prov VARCHAR(70) NOT NULL,
id_pais SMALLINT NOT NULL,
id_asoc SMALLINT,
telefono INTEGER NOT NULL,
direccion_fiscal VARCHAR(70) NOT NULL,
calle VARCHAR(50) NOT NULL,
cod_postal SMALLINT NOT NULL,
avenida VARCHAR(50) NOT NULL,
email VARCHAR(254) UNIQUE,
CONSTRAINT PK_prov PRIMARY KEY (id_prov)
);


CREATE TABLE ada_perfume (
id_perfume SMALLINT,
nombre VARCHAR(25) NOT NULL UNIQUE,
genero CHAR(1) NOT NULL,
preferencia_uso CHAR(1) NOT NULL,
fecha_creacion SMALLINT NOT NULL,
edad VARCHAR(10) NOT NULL,
id_prod SMALLINT NOT NULL,
CONSTRAINT PK_perfume PRIMARY KEY (id_perfume),
CONSTRAINT CK_genero CHECK (genero in ('m','f','u')),
CONSTRAINT CK_preferencia_uso CHECK (preferencia_uso in ('d','t','s')),
CONSTRAINT CK_edad CHECK (edad in ('adulto','joven','infantil','atemporal'))
);



CREATE TABLE ada_intensidad(
id_int SMALLINT NOT NULL,
id_perfume SMALLINT NOT NULL,
tipo CHAR(3) NOT NULL,
porc_concentracion SMALLINT NOT NULL,
descripcion VARCHAR(254),
CONSTRAINT PK_intensidad PRIMARY KEY (id_int,id_perfume),
CONSTRAINT CK_porc_concentracion CHECK (porc_concentracion > 0 and porc_concentracion <=100),
CONSTRAINT CK_tipo_p CHECK (tipo in ('p','edp','edt','edc','eds'))
);


CREATE TABLE ada_presentacion_p(
id_present SMALLINT NOT NULL,
id_int SMALLINT NOT NULL,
id_perfume SMALLINT NOT NULL,
capacidad_ml SMALLINT NOT NULL,
CONSTRAINT PK_pre_p PRIMARY KEY (id_present,id_int,id_perfume),
CONSTRAINT CK_capacidad_ml CHECK (capacidad_ml > 0)
);



CREATE TABLE ada_resutado_eval(
fecha DATE NOT NULL default CURRENT_DATE,
id_prod SMALLINT NOT NULL,
id_prov SMALLINT NOT NULL,
resultado SMALLINT NOT NULL,
tipo_eval CHAR(1) NOT NULL,
CONSTRAINT PK_resultado_eval PRIMARY KEY (fecha,id_prod,id_prov),
CONSTRAINT CK_result CHECK (resultado >= 0),
CONSTRAINT CK_tipo_eval CHECK (tipo_eval in ('a','i'))
);


CREATE TABLE ada_origen(
id_pais SMALLINT NOT NULL,
cas INTEGER NOT NULL,
CONSTRAINT PK_origen PRIMARY KEY (id_pais,cas)
);


CREATE TABLE ada_monolitico(
id_perfume SMALLINT NOT NULL,
cas_ep INTEGER NOT NULL,
CONSTRAINT PK_monolitico PRIMARY KEY (id_perfume,cas_ep)
);


CREATE TABLE ada_familia_esencia(
id_familia SMALLINT NOT NULL,
cas INTEGER NOT NULL,
CONSTRAINT PK_flia_esencia PRIMARY KEY (id_familia,cas)
);


CREATE TABLE ada_perfume_familia(
id_perfume SMALLINT NOT NULL,
id_familia SMALLINT NOT NULL,
CONSTRAINT PK_perflia PRIMARY KEY (id_perfume,id_familia)
);


CREATE TABLE ada_perfume_nota(
id_perfume SMALLINT NOT NULL,
cas_ep INTEGER NOT NULL,
tipo CHAR(1) NOT NULL,
CONSTRAINT PK_perfnota PRIMARY KEY (id_perfume,cas_ep),
CONSTRAINT CK_tipo_pn CHECK (tipo in ('s','c','f'))
);


CREATE TABLE ada_perf_ing(
id_perfume SMALLINT NOT NULL,
cas_ip INTEGER NOT NULL,
CONSTRAINT PK_otrosp PRIMARY KEY (id_perfume,cas_ip)
);


CREATE TABLE ada_prod_pais(
id_prod SMALLINT NOT NULL,
id_pais SMALLINT NOT NULL,
CONSTRAINT FK_prod_pais PRIMARY KEY (id_prod,id_pais)
);


CREATE TABLE ada_contrato(
id_prod SMALLINT NOT NULL,
id_prov SMALLINT NOT NULL,
numero_contrato SMALLINT NOT NULL,
fecha_emision DATE NOT NULL default CURRENT_DATE,
exclusivo BOOLEAN,
descuento SMALLINT,
acuerdo BOOLEAN NOT NULL DEFAULT FALSE,
cancelado BOOLEAN,
fecha_cancelac DATE,
motivo_cancelac VARCHAR(200),
CONSTRAINT PK_contrato PRIMARY KEY(id_prod,id_prov,numero_contrato),
CONSTRAINT CK_descuento CHECK (descuento >= 1 and descuento <=100)
);

CREATE TABLE ada_renueva(
id_ren SMALLINT NOT NULL,
id_prod SMALLINT NOT NULL,
id_prov SMALLINT NOT NULL,
numero_contrato SMALLINT NOT NULL,
fecha date NOT NULL default CURRENT_DATE,
CONSTRAINT PK_renueva PRIMARY KEY (id_ren,id_prod,id_prov,numero_contrato)
);

CREATE TABLE ada_creador_perfume(
id_perfumista SMALLINT NOT NULL,
id_perfume SMALLINT NOT NULL,
CONSTRAINT PK_creador_p PRIMARY KEY (id_perfumista,id_perfume)
);


CREATE TABLE ada_membresia(
id_m SMALLINT,
fecha_inicio DATE NOT NULL,
fecha_fin DATE,
id_prov SMALLINT,
id_prod SMALLINT,
tipo CHAR(3) NOT NULL,
CONSTRAINT CK_tipo_m CHECK (tipo in ('PRI','SEC','ASC')),
CONSTRAINT PK_membresia PRIMARY KEY (id_m),
CONSTRAINT CK_fecha_fin CHECK (fecha_fin > fecha_inicio)
);


CREATE TABLE ada_alternativa_pago(
id_prov SMALLINT NOT NULL,
metodo_pago CHAR(1) NOT NULL,
CONSTRAINT PK_apago PRIMARY KEY (id_prov,metodo_pago),
CONSTRAINT CK_metodo_pago check (metodo_pago in ('p','c'))
);


CREATE TABLE ada_cuota(
id_cuota SMALLINT,
id_prov SMALLINT NOT NULL,
porc_cuota decimal(3) NOT NULL,
metodo_pago CHAR(1) NOT NULL,
periodo_vigencia numeric(3) NOT NULL,
CONSTRAINT PK_ada_cuota PRIMARY KEY (id_prov,id_cuota,metodo_pago),
CONSTRAINT CK_metodo_pago check (metodo_pago in ('p','c')),
CONSTRAINT CK_porc_cuota CHECK (porc_cuota >= 0 and porc_cuota <= 100),
CONSTRAINT CK_periodo_vigencia CHECK (periodo_vigencia > 0)
);


CREATE TABLE ada_presentacion_e(
sku SMALLINT,
nombre_etiqueta VARCHAR(50) NOT NULL,
precio numeric(7,2) NOT NULL,
cantidad_perpack numeric(3) NOT NULL,
unidad_medida CHAR(2) NOT NULL,
contenido_neto SMALLINT NOT NULL,
tipo_empaque CHAR(3) NOT NULL,
cas INTEGER,
cas_oi INTEGER,
CONSTRAINT PK_presentacion_e PRIMARY KEY (sku),
CONSTRAINT CK_precio_pe CHECK (precio > 0),
CONSTRAINT CK_cantidadpk CHECK (cantidad_perpack > 0),
CONSTRAINT CK_tipo_empaque CHECK (tipo_empaque in('IBC','GRG','KTC')),
CONSTRAINT CK_contenido CHECK (contenido_neto > 0),
CONSTRAINT CK_unidad CHECK (unidad_medida in ('kg','g','mg','ml','l')),
CONSTRAINT CK_cas CHECK (cas > 0)
);



CREATE TABLE ada_alternativa_envio(
id_prov SMALLINT NOT NULL,
id_pais SMALLINT NOT NULL,
porc_base decimal(3) NOT NULL,
tipo_envio CHAR(1) NOT NULL,
CONSTRAINT PK_altenvio PRIMARY KEY (id_prov,id_pais,tipo_envio),
CONSTRAINT CK_porc_base CHECK (porc_base >= 0 and porc_base <= 100),
CONSTRAINT CK_tipo_envio CHECK (tipo_envio in ('a','m','t'))
);


CREATE TABLE ada_modificador_envio(
id_prov SMALLINT NOT NULL,
id_pais SMALLINT NOT NULL,
id_modif SMALLINT NOT NULL,
tipo_envio CHAR (1) NOT NULL,
nombre_carac VARCHAR (20) NOT NULL,
porc_extra decimal(3) NOT NULL,
CONSTRAINT PK_modif_e PRIMARY KEY (id_prov,id_pais,id_modif,tipo_envio),
CONSTRAINT CK_tipo_envio_mf CHECK (tipo_envio in ('a','m','t')),
CONSTRAINT CK_porcext CHECK (porc_extra >0 AND porc_extra <=100)
);


CREATE TABLE ada_contratacion_prod(
id_pcont SMALLINT,
id_prod SMALLINT NOT NULL,
id_prov SMALLINT NOT NULL,
numero_contrato SMALLINT NOT NULL,
cas INTEGER,
cas_oi INTEGER,
CONSTRAINT PK_contrac_pro PRIMARY KEY(id_prod,id_prov,numero_contrato,id_pcont),
CONSTRAINT CK_cas CHECK (cas > 0),
CONSTRAINT CK_cas_oi CHECK (cas_oi > 0)
);


CREATE TABLE ada_contratacion_ap(
id_prod SMALLINT NOT NULL,
id_prov SMALLINT NOT NULL,
numero_contrato SMALLINT NOT NULL,
id_prov2 SMALLINT NOT NULL,
metodo_pago CHAR(1) NOT NULL,
CONSTRAINT CK_metodo_pago check (metodo_pago in ('p','c')),
CONSTRAINT PK_contrac_ap PRIMARY KEY (id_prod,id_prov,numero_contrato,id_prov2,metodo_pago)
);


CREATE TABLE ada_contratacion_me(
id_prod SMALLINT NOT NULL,
id_prov SMALLINT NOT NULL,
tipo_envio CHAR(1) NOT NULL,
numero_contrato SMALLINT NOT NULL,
id_prov2 SMALLINT NOT NULL,
id_pais SMALLINT NOT NULL,
porc_contratado decimal(3) NOT NULL,
CONSTRAINT PK_contrac_me PRIMARY KEY (id_prod,id_prov,numero_contrato,id_prov2,id_pais,tipo_envio),
CONSTRAINT CK_tipo_envio CHECK (tipo_envio in ('a','m','t')),
CONSTRAINT CK_porc_contrac CHECK (porc_contratado > 0)
);


CREATE TABLE ada_escala(
fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
id_prod SMALLINT NOT NULL,
rango_inicial decimal(3) NOT NULL,
rango_final decimal(3) NOT NULL,
fecha_fin DATE,
tipo_uso CHAR(1),
rango_aprob SMALLINT NOT NULL,
CONSTRAINT pk_escala PRIMARY KEY (fecha_inicio,id_prod),
CONSTRAINT CK_rangoi CHECK (rango_inicial >= 0),
CONSTRAINT CK_tipo_uso_escala CHECK (tipo_uso in ('a','i')),
CONSTRAINT CK_rango_aprob CHECK (rango_aprob > 0 and rango_aprob <=100),
CONSTRAINT CK_rangof CHECK (rango_final > rango_inicial)
);


CREATE TABLE ada_eval_criterio(
fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
id_prod SMALLINT NOT NULL,
id_criterio SMALLINT NOT NULL,
tipo_uso CHAR(1) NOT NULL,
peso decimal(3) NOT NULL,
fecha_fin DATE,
CONSTRAINT PK_eval_criterio PRIMARY KEY (fecha_inicio,id_prod,id_criterio),
CONSTRAINT CK_peso CHECK (peso >= 0 and peso <=100),
CONSTRAINT CK_tipo_uso CHECK (tipo_uso in ('a','i'))
);


CREATE TABLE ada_pedido(
id_pedido SMALLINT,
--FK Contratacion Metodo de Pago
id_prov1 SMALLINT NOT NULL,
id_prod1 SMALLINT NOT NULL,
numero_contrato1 SMALLINT NOT NULL,
id_prov2 SMALLINT NOT NULL,
metodo_pago CHAR(1) NOT NULL,
--FK Contratacion Metodo de Envio
id_prod3 SMALLINT NOT NULL,
id_prov3 SMALLINT NOT NULL,
numero_contrato2 SMALLINT NOT NULL,
id_prov4 SMALLINT NOT NULL,
id_pais SMALLINT NOT NULL,
tipo_envio CHAR(1) NOT NULL,
--Atributos propios de pedido
fecha_emision DATE NOT NULL,
estatus VARCHAR(10) NOT NULL,
descripcion VARCHAR(255),
fecha_confirmacion DATE,
nro_factura SMALLINT,
total decimal(7,2),
CONSTRAINT PK_pedido PRIMARY KEY (id_pedido),
CONSTRAINT CK_estatus_p
CHECK (estatus in ('pendiente','rechazado','enviado','recibido')),
CONSTRAINT CK_metodo_pago check (metodo_pago in ('p','c')),
CONSTRAINT CK_tipo_envio CHECK (tipo_envio in ('a','m','t')),
CONSTRAINT CK_total_p CHECK (total >= 0)
);


CREATE TABLE ada_det_pedido(
id_renglon SMALLINT,
id_pedido SMALLINT NOT NULL,
cantidad numeric(2) NOT NULL,
sku SMALLINT NOT NULL,
CONSTRAINT PK_det_pedido PRIMARY KEY (id_renglon,id_pedido),
CONSTRAINT CK_cantidad_p CHECK (cantidad > 0 and cantidad < 100)
);


CREATE TABLE ada_pago(
nro_recibo SMALLINT,
id_pedido SMALLINT NOT NULL,
fecha_emision DATE NOT NULL,
monto_total decimal(7,2) NOT NULL,
CONSTRAINT PK_pago PRIMARY KEY (nro_recibo,id_pedido),
CONSTRAINT CK_monto_total CHECK (monto_total >= 0)
);



CREATE TABLE ada_familia_palabra(
id_familia SMALLINT NOT NULL,
id_pc SMALLINT NOT NULL,
CONSTRAINT PK_flia_palabra PRIMARY KEY (id_familia,id_pc)
);


CREATE TABLE ada_otros_esencia(
cas_oi INTEGER NOT NULL,
cas INTEGER,
CONSTRAINT PK_otro_e PRIMARY KEY (cas_oi,cas)
);
