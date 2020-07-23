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

