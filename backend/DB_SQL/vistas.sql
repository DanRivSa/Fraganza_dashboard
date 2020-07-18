--seleccionar proveedores con membresia activa
CREATE VIEW ada_prov_mem_activa AS --crear vista para proveedores con mem activa
SELECT id_prov from ada_membresia
WHERE fecha_fin is null and id_prov is not null;
