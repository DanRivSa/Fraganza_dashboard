

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


--para reporte proveedores
SELECT nombre_prov,telefono,email,direccion_fiscal,cod_postal,nombre_pais,nombre_asoc,metodo_pago
FROM ada_asoc_nacional asoc
RIGHT JOIN ada_proveedor prov
ON asoc.id_asoc = prov.id_asoc
INNER JOIN ada_pais pais
ON prov.id_pais = pais.id_pais
INNER JOIN ada_alternativa_pago alt
ON alt.id_prov = prov.id_prov
WHERE prov.id_prov = $1

--obtener esencias proveedor
SELECT nombre_prov,cas,nombre_comercial,nombre_quimico FROM ada_proveedor prov
INNER JOIN ada_esencia ese
ON prov.id_prov = ese.id_prov
WHERE prov.id_prov = $1

--obtener otros ingredientes para prov
SELECT nombre_prov,cas_oi,nombre_comercial,nombre_quimico FROM ada_proveedor prov
INNER JOIN ada_otros_ing ing
ON prov.id_prov = ing.id_prov
WHERE prov.id_prov = $1




--filtro para proveedores disponibles para evaluacion inicial
SELECT DISTINCT p.id_prov,nombre_prov,telefono,email from ada_alternativa_envio p
--seleccionar columnas
INNER JOIN ada_proveedor prov
ON prov.id_prov = p.id_prov
--aplicar filtros
WHERE p.id_pais in (Select id_pais from ada_prod_pais
WHERE id_prod=1
AND p.id_prov IN
(SELECT * FROM ada_prov_mem_activa))
EXCEPT
SELECT cont.id_prov, nombre_prov,telefono,email from ada_contratos_en_regla cont
INNER JOIN ada_proveedor prov
ON prov.id_prov = cont.id_prov
WHERE cont.id_prod = 1;
