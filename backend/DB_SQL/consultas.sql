

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



--CONSULTA PARA PRESENTACIONES GENERACION DE PEDIDOS
SELECT * from ADA_PRESENTACIONES_ESENCIAS p
INNER JOIN esencia_en_contrato e on e.cas=p.cas
WHERE e.numero_contrato =1010




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


--SELECT PARA INGREDIENTES ESENCIAS DISPONIBLES PARA CONTRATAR
SELECT prov.id_prov,prov.nombre_prov,es.cas,es.nombre_comercial,es.nombre_quimico FROM ada_proveedor prov
INNER JOIN ada_esencia es
ON prov.id_prov = es.id_prov
WHERE prov.id_prov =$1
EXCEPT
SELECT cp.id_prov,prov.nombre_prov,cp.cas,es.nombre_comercial,es.nombre_quimico from ada_productos_exclusivos cp
INNER JOIN ada_proveedor prov
ON cp.id_prov = prov.id_prov
INNER JOIN ada_esencia es
ON es.cas = cp.cas
WHERE cp.id_prov = $1;


--SELECT PARA INGREDIENTES DISPONIBLES PARA CONTRATAR
SELECT prov.id_prov,prov.nombre_prov,ing.cas_oi,ing.nombre_comercial,ing.nombre_quimico FROM ada_proveedor prov
INNER JOIN ada_otros_ing ing
ON prov.id_prov = ing.id_prov
WHERE prov.id_prov =$1
EXCEPT
SELECT cp.id_prov,prov.nombre_prov,cp.cas_oi,ing.nombre_comercial,ing.nombre_quimico from ada_productos_exclusivos cp
INNER JOIN ada_proveedor prov
ON cp.id_prov = prov.id_prov
INNER JOIN ada_otros_ing ing
ON ing.cas_oi = cp.cas_oi
WHERE cp.id_prov = $1;


--CONSULTAR DETALLES DE ENVIO DE UN PROVEEDOR EN ESPECIAL

select p.nombre_pais,
	case p.continente
	when 'As' then 'ASIA'
	when 'Ams' then 'AMÉRICA DEL SUR'
	when 'Oc' then 'OCEANÍA'
	when 'Af' then 'ÁFRICA'
	when 'Ca' then 'CENTROAMÉRICA'
	when 'Eu' then 'EUROPA'
	when 'Amn' then 'AMÉRICA DEL NORTE'
	end CONTINENTE,
  case t.tipo_envio
    when  'm' then 'MARTÍTIMO'
	when 'a' then 'AÉREO'
	when 't' then 'TERRESTRE'
  end  TIPO_DE_ENVÍO,t.porc_base
from ada_alternativa_envio t,ada_pais p
where p.id_pais=t.id_pais and t.id_prov= $1  ORDER BY p.nombre_pais;


--CONSULTA PARA CONOCER LOS CLIENTES ACTIVOS DE UN PROVEEDORE
SSELECT p.nombre_prod, c.fecha_emision, p.email from ada_productor p
INNER JOIN ada_contrato c on c.id_prod = p.id_prod
where (CURRENT_DATE) < (c.fecha_emision + INTERVAL '365 day')
										  and c.id_prov=$1
AND acuerdo IS TRUE
AND (cancelado IS FALSE OR cancelado IS NULL)

 UNION
 select p.nombre_prod,r.fecha,p.email from ada_productor p
INNER JOIN ada_renueva r on r.id_prod = p.id_prod
where (CURRENT_DATE) < (r.fecha + INTERVAL '365 day') and r.id_prov=1;

--CONSULTA CONTRATOS EN REGLA DE UN PROVEEDOR
SELECT p.id_prov,r.id_prod,x.nombre_prod, r.numero_contrato from ada_proveedor p
INNER JOIN ada_contratos_en_regla r on r.id_prov=p.id_prov
INNER JOIN ada_productor x on x.id_prod = r.id_prod
where p.id_prov =$1;

--CONSULTA CONTRATOS EN REGLA DE UN PRODUCTOR
SELECT p.id_prod,r.id_prov,x.nombre_prov, r.numero_contrato from ada_productor p
INNER JOIN ada_contratos_en_regla r on r.id_prod=p.id_prod
INNER JOIN ada_proveedor x on x.id_prov = r.id_prov
where p.id_prod =$1;


--CONSULTA PRESENTACIONES PARA GENERAR PEDIDO TIPO INGREDIENTE:
SELECT * from ADA_PRESENTACIONES_INGREDIENTE p
INNER JOIN ingrediente_en_contrato e on e.cas_oi=p.cas_oi
WHERE e.numero_contrato =$1;

--CONSULTA PRESENTACIONES PARA GENERAR PEDIDO TIPO ESENCIA:
SELECT * from ADA_PRESENTACIONES_ESENCIAS p
INNER JOIN esencia_en_contrato e on e.cas=p.cas
WHERE e.numero_contrato =$1



SELECT (((SELECT count(estatus)::float FROM ada_pedido where estatus ='enviado' and numero_contrato1=1005)/(SELECT count(estatus)::float FROM ada_pedido where estatus='$2' or estatus='$3' and numero_contrato1=$1))*100)as resultado


--Mostrar presentaciones de tipo esencia presentes en un pedido.
		SELECT d.id_pedido,p.sku,p.cas,p.nombre,d.cantidad,to_char((p.precio*d.cantidad),'$99999.99') as precio, p.contenido, p.cantidad_perpack
		from ADA_PRESENTACIONES_ESENCIAS_PEDIDO p
		INNER JOIN ada_det_pedido d on d.sku = p.sku where d.id_pedido=$1;

--Mostrar presentaciones de tipo ingrediente presentes en un pedido

		SELECT d.id_pedido,p.sku,p.cas_oi,p.nombre,d.cantidad,to_char((p.precio*d.cantidad),'$99999.99') as precio, p.contenido, p.cantidad_perpack
		from ADA_PRESENTACIONES_INGREDIENTES_PEDIDO p
		INNER JOIN ada_det_pedido d on d.sku = p.sku where d.id_pedido=$1;

 --Mostrar detalle de tipo envio

		SELECT d.id_pedido,p.sku,p.cas_oi,p.nombre,d.cantidad,to_char((p.precio*d.cantidad),'$99999.99') as precio, p.contenido, p.cantidad_perpack
		from ADA_PRESENTACIONES_INGREDIENTES_PEDIDO p
		INNER JOIN ada_det_pedido d on d.sku = p.sku where d.id_pedido=$1;

 --Mostrar Detalle de tipo Pago

