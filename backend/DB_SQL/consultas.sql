--Filtro Proveedores Potenciales
SELECT DISTINCT p.id_prov from ada_alternativa_envio p
WHERE p.id_pais in (Select id_pais from ada_prod_pais
WHERE id_prod=x
AND p.id_prov IN
(SELECT id_prov from ada_membresia
WHERE fecha_fin is null and id_prov is not null));
