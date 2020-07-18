--seleccionar proveedores con membresia activa
CREATE VIEW ada_prov_mem_activa AS --crear vista para proveedores con mem activa
SELECT id_prov from ada_membresia
WHERE fecha_fin is null and id_prov is not null;


--SELECCIONAR PRODUCTORES CON MEMBRESIA ACTIVA
SELECT * FROM ada_prod_mem_activa;

--PRUEBA DEL FILTRO CERRAR membresia a productor EURO FRAGANCE
UPDATE ada_membresia SET fecha_fin = '01-01-2020'
WHERE id_prod = 4;

--VISTA DE PRODUCTORES CON MEMBRESIA
CREATE VIEW ada_prod_mem_activa AS
SELECT id_prod FROM ada_membresia
WHERE fecha_fin IS NULL AND id_prod IS NOT NULL;

--VER LA MEMBRESIA DE LOS PROVEEDORES EN GENERAL
CREATE VIEW ada_prov_mem_general AS
SELECT m.id_prov ID, p.nombre_prov EMPRESA PROVEEDORA, m.fecha_inicio FECHA INICIO, m.fecha_fin
FROM ada_membresia m, ada_proveedor p
WHERE p.id_prov = m.id_prov;

--VER LA MEMBRESIA DE LOS PRODUCTORES EN GENERAL
CREATE VIEW ada_prod_mem_general AS
SELECT m.id_prod, p.nombre_prod, m.fecha_inicio, m.fecha_fin
FROM ada_membresia m, ada_proveedor p
WHERE p.id_prod = m.id_prod;
