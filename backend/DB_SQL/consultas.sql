

--Filtro de Proveedores

SELECT DISTINCT p.id_prov, nombre_prov,telefono,email from ada_alternativa_envio p
--recoger columnas a mostrar
INNER JOIN ada_proveedor prov
ON p.id_prov = prov.id_prov
--aplicar filtros
WHERE p.id_pais in (Select id_pais from ada_prod_pais
WHERE id_prod=$1
AND p.id_prov IN
(SELECT * FROM ada_prov_mem_activa)); --*consulta a usar*
