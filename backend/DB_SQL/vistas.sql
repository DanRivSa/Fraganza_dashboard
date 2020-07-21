--seleccionar proveedores con membresia activa
CREATE VIEW ada_prov_mem_activa AS --crear vista para proveedores con mem activa
SELECT id_prov from ada_membresia
WHERE fecha_fin is null and id_prov is not null;


--PRUEBA DEL FILTRO CERRAR membresia a productor EURO FRAGANCE
UPDATE ada_membresia SET fecha_fin = '01-01-2020'
WHERE id_prod = 4;

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

--A: vista bonita de las presentaciones de tipo ingrediente
CREATE VIEW ada_pres_i_e AS
SELECT p.nombre_etiqueta NOMBRE,
to_char(p.precio, '$99990.00') PRECIO,
p.contenido_neto ||''|| p.unidad_medida AS contenido, p.cantidad_perpack
from ada_presentacion_e p where cas is null;
--A: vista bonita de las presentaciones de tipo esencia
CREATE VIEW ada_pres_e_e AS
SELECT p.nombre_etiqueta NOMBRE,
to_char(p.precio, '$99990.00') PRECIO,
p.contenido_neto ||''|| p.unidad_medida AS contenido, p.cantidad_perpack
from ada_presentacion_e p where cas_oi is null;
