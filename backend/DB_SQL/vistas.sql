--seleccionar proveedores con membresia activa
CREATE VIEW ada_prov_mem_activa AS --crear vista para proveedores con mem activa
SELECT id_prov from ada_membresia
WHERE fecha_fin is null and id_prov is not null;

--VISTA DE PRODUCTORES CON MEMBRESIA
CREATE VIEW ada_prod_mem_activa AS
SELECT id_prod FROM ada_membresia
WHERE fecha_fin IS NULL AND id_prod IS NOT NULL;

--VER LA MEMBRESIA DE LOS PROVEEDORES EN GENERAL
CREATE VIEW ada_prov_mem_general AS
SELECT m.id_prov ID, p.nombre_prov EMPRESA_PROVEEDORA, m.fecha_inicio FECHA_INICIO, m.fecha_fin
FROM ada_membresia m, ada_proveedor p
WHERE p.id_prov = m.id_prov;

--VER LA MEMBRESIA DE LOS PRODUCTORES EN GENERAL
CREATE VIEW ada_prod_mem_general AS
SELECT m.id_prod, p.nombre_prod, m.fecha_inicio, m.fecha_fin
FROM ada_membresia m, ada_productor p
WHERE p.id_prod = m.id_prod;

--VER CONTRATOS EN REGLA: vigentes, no cancelados
CREATE VIEW ada_contratos_en_regla AS
SELECT id_prov,id_prod,numero_contrato FROM ada_contrato
WHERE (CURRENT_DATE) < (fecha_emision + INTERVAL '365 day')
AND acuerdo IS TRUE
AND (cancelado IS FALSE OR cancelado IS NULL)
AND id_prov IN (SELECT id_prov FROM ada_prov_mem_activa)
UNION
SELECT DISTINCT id_prov,id_prod,numero_contrato FROM ada_renueva
WHERE (CURRENT_DATE) < (fecha + INTERVAL '365 day')
AND id_prov IN (SELECT id_prov FROM ada_prov_mem_activa)
ORDER BY id_prov, id_prod;

--Vista bonita de las presentaciones de tipo ingrediente
CREATE VIEW ada_pres_i_e AS
SELECT p.nombre_etiqueta NOMBRE,
to_char(p.precio, '$99990.00') PRECIO,
p.contenido_neto ||''|| p.unidad_medida AS contenido, p.cantidad_perpack
from ada_presentacion_e p where cas is null;
--Vista bonita de las presentaciones de tipo esencia
CREATE VIEW ada_pres_e_e AS
SELECT p.nombre_etiqueta NOMBRE,
to_char(p.precio, '$99990.00') PRECIO,
p.contenido_neto ||''|| p.unidad_medida AS contenido, p.cantidad_perpack
from ada_presentacion_e p where cas_oi is null;

--Listra de productos exclusivos
CREATE VIEW ada_productos_exclusivos AS
SELECT cp.id_prov,cp.id_prod,cp.numero_contrato, cas,cas_oi,exclusivo FROM ada_contratacion_prod cp
INNER JOIN ada_contrato cont
ON cont.numero_contrato = cp.numero_contrato
WHERE cas IS NOT NULL AND exclusivo IS true
UNION
SELECT cp.id_prov,cp.id_prod,cp.numero_contrato,cas,cas_oi,exclusivo FROM ada_contratacion_prod cp
INNER JOIN ada_contrato cont
ON cont.numero_contrato = cp.numero_contrato
WHERE cas_oi IS NOT NULL AND exclusivo IS true
ORDER BY numero_contrato;


--Lista de ingredientes tipo esencias disponibles de todos los proveedores (no exclusivos)
CREATE VIEW ada_esencias_disponibles AS
SELECT es.id_prov,nombre_prov,cas,nombre_comercial from ada_esencia es
INNER JOIN ada_proveedor prov ON es.id_prov = prov.id_prov
EXCEPT
SELECT exc.id_prov,nombre_prov,exc.cas,nombre_comercial FROM ada_productos_exclusivos exc
INNER JOIN ada_esencia es ON es.id_prov = exc.id_prov
INNER JOIN ada_proveedor prov ON exc.id_prov = prov.id_prov
ORDER BY id_prov;


--Lista de ingredientes tipo otro_ingrediente disponibles de todos los proveedores (no exclusivos)
CREATE VIEW ada_ingredientes_disponibles AS
SELECT ing.id_prov,nombre_prov,cas_oi,nombre_comercial from ada_otros_ing ing
INNER JOIN ada_proveedor prov ON ing.id_prov = prov.id_prov
EXCEPT
SELECT exc.id_prov,nombre_prov,exc.cas_oi,nombre_comercial FROM ada_productos_exclusivos exc
INNER JOIN ada_otros_ing ing ON ing.id_prov = exc.id_prov
INNER JOIN ada_proveedor prov ON exc.id_prov = prov.id_prov
ORDER BY id_prov;

--Todos los proveedores con productos para ofrecer en evaluaciones iniciales
CREATE VIEW ada_proveedores_con_productos AS
SELECT edis.id_prov,edis.nombre_prov FROM ada_esencias_disponibles edis
UNION
SELECT idis.id_prov,nombre_prov FROM ada_ingredientes_disponibles idis
ORDER BY id_prov;

--Chequear las cuotas
CREATE VIEW ada_prov_cuotas AS
SELECT c.porc_cuota, c.metodo_pago, p.nombre_prov, p.id_prov from ada_cuota c
INNER JOIN ada_proveedor p on p.id_prov=c.id_prov;


--Conocer tipo de membresia
CREATE VIEW ada_tipo_miembro_prov AS
SELECT e.nombre_prov,COALESCE(a.nombre_asoc,'No pertenece') as Asoc,
e.direccion_fiscal, e.telefono, e.calle, e.cod_postal, e.avenida, e.email, p.nombre_pais,
case m.tipo
when 'PRI' then 'PRINCIPAL'
when 'SEC' then 'SECUNDARIO'
when 'ASC' then 'ASOCIACIÓN NACIONAL'
end MEMBRESIA
from ada_proveedor e
LEFT OUTER JOIN ada_asoc_nacional a on a.id_asoc=e.id_asoc
INNER JOIN ada_pais p on p.id_pais = e.id_pais
INNER JOIN ada_membresia m on m.id_prov = e.id_prov;


--vista para contratos vigentes de un productor
CREATE VIEW ada_contratos_productor_vigente AS
SELECT p.id_prod,r.id_prov,x.nombre_prov, r.numero_contrato
from ada_productor p
INNER JOIN ada_contratos_en_regla r on r.id_prod=p.id_prod
INNER JOIN ada_proveedor x on x.id_prov = r.id_prov;

--vista para contratos vigentes de un proveedor
CREATE VIEW ada_contratos_proveedor_vigente as
SELECT p.id_prov,r.id_prod,x.nombre_prod, r.numero_contrato
from ada_proveedor p
INNER JOIN ada_contratos_en_regla r on r.id_prov=p.id_prov
INNER JOIN ada_productor x on x.id_prod = r.id_prod;


//Vistas utilices en generacion de pedidos

CREATE VIEW ADA_PRESENTACIONES_ESENCIAS AS
SELECT p.sku, p.cas, p.nombre_etiqueta NOMBRE,
to_char(p.precio, '$99990.00') PRECIO,
p.contenido_neto ||''|| p.unidad_medida AS contenido, p.cantidad_perpack
from ada_presentacion_e p where cas_oi is null;


create view esencia_en_contrato as
SELECT e.nombre_comercial, e.nombre_quimico, p.cas, p.numero_contrato
from ada_contratacion_prod p
INNER JOIN ada_esencia e on e.cas = p.cas;


CREATE VIEW ADA_PRESENTACIONES_ESENCIAS_PEDIDO AS
SELECT p.sku, p.cas, p.nombre_etiqueta NOMBRE,p.precio,
p.contenido_neto ||''|| p.unidad_medida AS contenido, p.cantidad_perpack
from ada_presentacion_e p where cas_oi is null;





CREATE VIEW ADA_PRESENTACIONES_INGREDIENTE AS
SELECT p.sku, p.cas_oi, p.nombre_etiqueta NOMBRE,
to_char(p.precio, '$99990.00') PRECIO,
p.contenido_neto ||''|| p.unidad_medida AS contenido, p.cantidad_perpack
from ada_presentacion_e p where cas is null;


create view ingrediente_en_contrato as
SELECT e.nombre_comercial, e.nombre_quimico, p.cas_oi, p.numero_contrato
from ada_contratacion_prod p
INNER JOIN ADA_OTROS_ING e on e.cas_oi = p.cas_oi;


CREATE OR REPLACE FUNCTION CERRAR_ANUAL (id_PROD integer) returns void
AS
$$
UPDATE ADA_ESCALA SET FECHA_FIN=CURRENT_DATE WHERE ID_PROD=ID_PROD AND TIPO_USO='a';
UPDATE ADA_EVAL_CRITERIO SET FECHA_FIN=CURRENT_DATE WHERE ID_CRITERIO = 4 AND ID_PROD = ID_PROD;
$$
language sql



CREATE OR REPLACE FUNCTION CERRAR_INICIAL (id_PROD integer) returns void
AS
$$
UPDATE ADA_ESCALA SET FECHA_FIN=CURRENT_DATE WHERE ID_PROD=ID_PROD AND TIPO_USO='a';
UPDATE ADA_EVAL_CRITERIO SET FECHA_FIN=CURRENT_DATE WHERE ID_CRITERIO IN(1,2,3) AND ID_PROD = ID_PROD;
$$
language sql



CREATE  FUNCTION ada_pedido_new(integer,integer,char,char,integer,integer)
returns BIGINT
AS
$$
INSERT INTO ada_pedido
(id_prov1,id_prod1,numero_contrato1,id_prov2,metodo_pago,id_prod3,id_prov3,numero_contrato2,id_prov4,id_pais,tipo_envio,fecha_emision)
VALUES ($1,$2,$5,$1,$4,$2,$1,$5,$1,$6,$3,current_date);
select last_value from ada_sec_id_pedido
RETURN
$$
language sql


--Se utiliza en detalle pedido
CREATE or replace VIEW ADA_PRESENTACIONES_INGREDIENTES_PEDIDO AS
SELECT p.sku, p.cas_oi, p.nombre_etiqueta NOMBRE,p.precio,
p.contenido_neto ||''|| p.unidad_medida AS contenido, p.cantidad_perpack
from ada_presentacion_e p where cas is null;


CREATE VIEW ADA_PRESENTACIONES_ESENCIAS_PEDIDO AS
SELECT p.sku, p.cas, p.nombre_etiqueta NOMBRE,p.precio,
p.contenido_neto ||''|| p.unidad_medida AS contenido, p.cantidad_perpack
from ada_presentacion_e p where cas_oi is null;

