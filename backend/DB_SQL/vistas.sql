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

/*
--VER CONTRATOS EN REGLA: vigentes, no cancelados
CREATE VIEW ada_contratos_en_regla AS
SELECT id_prov,id_prod,numero_contrato FROM ada_contrato
WHERE (CURRENT_DATE) < (fecha_emision + INTERVAL '365 day')
AND acuerdo IS TRUE
AND (cancelado IS NULL)
AND id_prov IN (SELECT id_prov FROM ada_prov_mem_activa)
UNION
SELECT DISTINCT id_prov,id_prod,numero_contrato FROM ada_renueva
WHERE (CURRENT_DATE) < (fecha + INTERVAL '365 day')
AND id_prov IN (SELECT id_prov FROM ada_prov_mem_activa)
ORDER BY id_prov, id_prod;
*/

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


CREATE VIEW ada_contratos_en_regla AS
SELECT distinct c.id_prov,c.id_prod,c.numero_contrato FROM ada_contrato c, ada_renueva r
WHERE (CURRENT_DATE) < (fecha_emision + INTERVAL '365 day')
AND acuerdo IS TRUE
and ( cancelado is not true)
AND c.id_prov IN (SELECT id_prov FROM ada_prov_mem_activa)
UNION
SELECT r.id_prov,r.id_prod,r.numero_contrato from ada_renueva r
where r.numero_contrato in (SELECT c.numero_contrato
FROM ADA_CONTRATO c where (c.acuerdo is true and c.cancelado is not true
and		(CURRENT_DATE) < (r.fecha + INTERVAL '365 day')
AND r.id_prov IN (SELECT id_prov FROM ada_prov_mem_activa)));



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

--Vistas utilices en generacion de pedidos

CREATE VIEW ADA_PRESENTACIONES_ESENCIAS AS
SELECT p.sku, p.cas, p.nombre_etiqueta NOMBRE,
to_char(p.precio, '$99990.00') PRECIO,
p.contenido_neto ||''|| p.unidad_medida AS contenido, p.cantidad_perpack
from ada_presentacion_e p where cas_oi is null;


create view ADA_esencia_en_contrato as
SELECT e.nombre_comercial, e.nombre_quimico, p.cas, p.numero_contrato
from ada_contratacion_prod p
INNER JOIN ada_esencia e on e.cas = p.cas;


CREATE VIEW ADA_PRESENTACIONES_INGREDIENTE AS
SELECT p.sku, p.cas_oi, p.nombre_etiqueta NOMBRE,
to_char(p.precio, '$99990.00') PRECIO,
p.contenido_neto ||''|| p.unidad_medida AS contenido, p.cantidad_perpack
from ada_presentacion_e p where cas is null;


create view ADA_ingrediente_en_contrato as
SELECT e.nombre_comercial, e.nombre_quimico, p.cas_oi, p.numero_contrato
from ada_contratacion_prod p
INNER JOIN ADA_OTROS_ING e on e.cas_oi = p.cas_oi;


CREATE OR REPLACE FUNCTION CERRAR_ANUAL (integer) returns void
AS
$$
UPDATE ADA_ESCALA SET FECHA_FIN=CURRENT_DATE WHERE ID_PROD=$1 AND TIPO_USO='a';
UPDATE ADA_EVAL_CRITERIO SET FECHA_FIN=CURRENT_DATE WHERE ID_CRITERIO = 4 AND ID_PROD = $1;
$$
language sql;
--
CREATE FUNCTION CERRAR_INICIAL (integer) returns void
AS
$$
UPDATE ADA_ESCALA SET FECHA_FIN=CURRENT_DATE WHERE ID_PROD=$1 AND TIPO_USO='i';
UPDATE ADA_EVAL_CRITERIO SET FECHA_FIN=CURRENT_DATE WHERE ID_CRITERIO IN(1,2,3) AND ID_PROD = $1;
$$
language sql;



CREATE  FUNCTION ada_pedido_new(integer,integer,char,char,integer,integer,bigint)
returns BIGINT
AS
$$
INSERT INTO ada_pedido
(id_prov1,id_prod1,numero_contrato1,id_prov2,metodo_pago,id_prod3,id_prov3,numero_contrato2,id_prov4,id_pais,tipo_envio,fecha_emision,total)
VALUES ($1,$2,$5,$1,$4,$2,$1,$5,$1,$6,$3,current_date,$7);
select last_value from ada_sec_id_pedido
RETURN
$$
language sql;


--Se utiliza en detalle pedido
CREATE or replace VIEW ADA_PRESENTACIONES_INGREDIENTES_PEDIDO AS
SELECT p.sku, p.cas_oi, p.nombre_etiqueta NOMBRE,p.precio,
p.contenido_neto ||''|| p.unidad_medida AS contenido, p.cantidad_perpack
from ada_presentacion_e p where cas is null;


CREATE VIEW ADA_PRESENTACIONES_ESENCIAS_PEDIDO AS
SELECT p.sku, p.cas, p.nombre_etiqueta NOMBRE,p.precio,
p.contenido_neto ||''|| p.unidad_medida AS contenido, p.cantidad_perpack
from ada_presentacion_e p where cas_oi is null;


		CREATE VIEW ADA_ESENCIAS_CONTRATADOS_PEDIDO AS
		SELECT d.id_pedido,p.sku,p.cas,p.nombre,d.cantidad,to_char((p.precio*d.cantidad),'$99999.99') as precio, p.contenido, p.cantidad_perpack
		from ADA_PRESENTACIONES_ESENCIAS_PEDIDO p
		INNER JOIN ada_det_pedido d on d.sku = p.sku;


    CREATE OR REPLACE VIEW ADA_INGREDIENTES_CONTRATADOS_PEDIDO AS
		SELECT d.id_pedido,p.sku,p.cas_oi,p.nombre,d.cantidad,(p.precio*d.cantidad) as precio, p.contenido, p.cantidad_perpack
		from ADA_PRESENTACIONES_INGREDIENTES_PEDIDO p
		INNER JOIN ada_det_pedido d on d.sku = p.sku;


		--Metodo Envio Especifico de un Pedido
		CREATE VIEW ada_me_pedido as
		 SELECT p.nombre_pais,
    t.id_pedido,
    t.total,
        CASE t.tipo_envio
            WHEN 'm'::bpchar THEN 'MARÍTIMO'::text
            WHEN 'a'::bpchar THEN 'AÉREO'::text
            WHEN 't'::bpchar THEN 'TERRESTRE'::text
            ELSE NULL::text
        END AS metodo_envio,
    a.porc_contratado
   FROM ada_pedido t
     JOIN ada_contratacion_me a ON a.numero_contrato = t.numero_contrato1
     JOIN ada_pais p ON p.id_pais = t.id_pais;
-- Vista para contratos candidatos a renovacion

create or replace view ada_renovar_contratos as
select (select extract
		  (day from  ((c.fecha_emision + INTERVAL '365 day') - CURRENT_DATE)))
		  as days, c.numero_contrato, c.id_prov, t.nombre_prov,c.id_prod
		  from ada_contrato c
		  FULL OUTER JOIN ada_renueva r on c.numero_contrato = r.numero_contrato
		  INNER JOIN ada_proveedor t on t.id_prov = c.id_prov
		  where (select extract
		  (day from  ((c.fecha_emision + INTERVAL '365 day') - CURRENT_DATE)))
		  between 1 and 90  and c.cancelado is not true and c.acuerdo is true and (r.numero_contrato is null)
		or (select extract
		  (day from  ((r.fecha + INTERVAL '365 day') - CURRENT_DATE)))
		  between 1 and 90;


		  CREATE OR REPLACE VIEW ada_detalle_cuota_pedido as
		  select p.metodo_pago, u.porc_cuota, c.periodo_vigencia,p.id_prov2, p.numero_contrato1,p.id_pedido
		  from ada_pedido P
		  INNER JOIN ada_contratacion_ap u on u.numero_contrato = p.numero_contrato1
		  INNER JOIN ada_cuota c ON  c.id_prov = p.id_prov2 WHERE u.porc_cuota = c.porc_cuota;





--VISTA PARA PEDIDOS POR PAGAR TIPO PARCIAL

--VISTA PARA PEDIDOS POR PAGAR TIPO PARCIAL
CREATE or replace VIEW ada_pedidos_por_pagar_parcial as
SELECT distinct p.id_pedido,p.id_prov4 as id_prov,p.id_prod3 as id_prod,p.numero_contrato1 as numero_contrato,v.nombre_prov,p.total,p.fecha_emision, p.estatus from ada_pedido p
inner join ada_proveedor v on v.id_prov = p.id_prov4
WHERE p.nro_factura is not null and p.metodo_pago='p'
EXCEPT
SELECT p.id_pedido,p.id_prov4,p.id_prod3,p.numero_contrato1,v.nombre_prov,p.total,p.fecha_emision,p.estatus from ada_pedido p
inner join ada_proveedor v on v.id_prov = p.id_prov4
inner join ada_pago f on f.id_pedido=p.id_pedido
where f.id_pedido=p.id_pedido;
--VISTA PARA MOSTRAR LOS PEDIDOS PEDIENTES POR PAGAR EN CUOTAS

CREATE VIEW ada_pedidos_por_pagar_cuotas as SELECT p.id_pedido,
    p.id_prov4 AS id_prov,
    p.id_prod3 AS id_prod,
    p.numero_contrato1 AS numero_contrato,
    v.nombre_prov,
    p.fecha_emision,
    p.total,
    p.estatus,
    round(100::numeric / c.porc_cuota - count(x.id_pedido)::numeric) AS cuotas
   FROM ada_pedido p
     JOIN ada_contratacion_ap c ON c.numero_contrato = p.numero_contrato1
     JOIN ada_pago x ON x.id_pedido = p.id_pedido
     JOIN ada_proveedor v ON v.id_prov = p.id_prov4
  WHERE p.metodo_pago = 'c'::bpchar AND p.estatus::text = 'enviado'::text
  GROUP BY p.id_pedido, p.id_prov4, p.id_prod3, p.numero_contrato1, v.nombre_prov, p.fecha_emision, p.estatus, c.porc_cuota;


CREATE VIEW ADA_pagar_cuota as SELECT e.id_pedido,
    e.porc_cuota,
    p.cuotas,
    p.total,
    e.porc_cuota * 0.1 * p.total::numeric AS monto_cuota
   FROM ada_detalle_cuota_pedido e
     JOIN ada_pedidos_por_pagar_cuotas p ON p.id_pedido = e.id_pedido
  GROUP BY e.id_pedido, e.porc_cuota, p.cuotas, p.total;
