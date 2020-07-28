//import open db connection pool
const db = require('../database/database.config');

class ProviderModel
{
    //async methods

    async GetProviders()
    {
        const db_res = await db.query('SELECT id_prov,nombre_prov FROM ada_proveedor WHERE id_prov IN (SELECT * FROM ada_prov_mem_activa) ');
        return db_res;
    }


    async ObtenerEsencias(id)
    {
        const db_res = await db.query('SELECT prov.id_prov,prov.nombre_prov,es.cas,es.nombre_comercial,es.nombre_quimico FROM ada_proveedor prov  INNER JOIN ada_esencia es  ON prov.id_prov = es.id_prov WHERE prov.id_prov =$1 EXCEPT  SELECT cp.id_prov,prov.nombre_prov,cp.cas,es.nombre_comercial,es.nombre_quimico from ada_productos_exclusivos cp INNER JOIN ada_proveedor prov ON cp.id_prov = prov.id_prov INNER JOIN ada_esencia es ON es.cas = cp.cas WHERE cp.id_prov = $1',[id]);
        return db_res;
    }

    async ObtenerIngredientes(id)
    {
        const db_res = await db.query('SELECT prov.id_prov,prov.nombre_prov,ing.cas_oi,ing.nombre_comercial,ing.nombre_quimico FROM ada_proveedor prov  INNER JOIN ada_otros_ing ing  ON prov.id_prov = ing.id_prov WHERE prov.id_prov =$1 EXCEPT  SELECT cp.id_prov,prov.nombre_prov,cp.cas_oi,ing.nombre_comercial,ing.nombre_quimico from ada_productos_exclusivos cp INNER JOIN ada_proveedor prov ON cp.id_prov = prov.id_prov INNER JOIN ada_otros_ing ing ON ing.cas_oi = cp.cas_oi WHERE cp.id_prov = $1',[id]);
        return db_res;
    }

    async ObtenerAlternativasEnvio(id)
    {
        const db_res = await db.query('SELECT  ps.id_pais,nombre_pais,tipo_envio,porc_base FROM ada_pais ps INNER JOIN ada_alternativa_envio env  ON ps.id_pais = env.id_pais WHERE env.id_prov = $1',[id]);
        return db_res;
    }

    async ObtenerAltEnvioParaContrato(id_prod,id_prov)
    {
        const db_res = await db.query('SELECT nombre_pais,ps.id_pais,tipo_envio,porc_base FROM ada_pais ps  INNER JOIN ada_alternativa_envio env  ON ps.id_pais = env.id_pais INNER JOIN ada_prod_pais pps ON pps.id_pais = ps.id_pais WHERE env.id_prov = $2 and pps.id_prod = $1',[id_prod,id_prov]);
        return db_res;
    }

    async ObtenerAlternativasPago(id)
    {
        const db_res = await db.query('SELECT case m.metodo_pago when $2 then $3 when $4 then $5 END FROM ada_alternativa_pago m where m.id_prov=$1',[id,'p','PARCIAL','c','CUOTAS']);
        return db_res;
    }

    async ObtenerNombreProveedor(id)
    {
        const db_res = await db.query('SELECT nombre_prov FROM ada_proveedor WHERE id_prov = $1',[id]);
        return db_res
    }

    async ObtenerPresentacionesEsencia(cas)
    {
        const db_res = await db.query('SELECT sku,nombre_etiqueta,precio,cantidad_perpack,unidad_medida,contenido_neto,tipo_empaque FROM ada_presentacion_e WHERE cas_oi IS NULL AND cas = $1',[cas]);
        return db_res;
    }

    async ObtenerPresentacionesIngrediente(cas_oi)
    {
        const db_res = await db.query('SELECT sku,nombre_etiqueta,precio,cantidad_perpack,unidad_medida,contenido_neto,tipo_empaque FROM ada_presentacion_e WHERE cas IS NULL AND cas_oi=$1',[cas_oi]);
        return db_res;
    }

    async ObtenerInfoPagoCuotas(id){
        const db_res = await db.query('SELECT porc_cuota,periodo_vigencia,metodo_pago from ada_cuota where id_prov = $1',[id]);
        return db_res;

    }

    /*select (select extract (day from  ((c.fecha_emision + INTERVAL '365 day') - CURRENT_DATE))) as days, c.numero_contrato, c.id_prov, t.nombre_prov from ada_contrato c FULL OUTER JOIN ada_renueva r on c.numero_contrato = r.numero_contrato INNER JOIN ada_proveedor t on t.id_prov = c.id_prov where (select extract (day from  ((c.fecha_emision + INTERVAL '365 day') - CURRENT_DATE))) between 1 and 90  and c.cancelado is not true and (r.numero_contrato is null) and c.id_prod =$1 (select extract (day from  ((r.fecha + INTERVAL '365 day') - CURRENT_DATE))) between 1 and 90 an id_prod=$1
    NO SE PUEDE USAR INTERVAL AHI*/

    async GetContratosVigentes(id)
    {
        const db_res = await db.query ('SELECT * from ada_contratos_proveedor_vigente where id_prov =$1',[id]);
        return db_res;
    }

    async CancelarContrato(numero,motivo)
     {
       const db_res= await db.query('UPDATE ada_contrato SET  cancelado=true, fecha_cancelac = CURRENT_DATE, motivo_cancelac = $1 WHERE numero_contrato = $2',[motivo,numero] );
       return db_res
     }

     async ObtenerContratosPendientes(id_prov)
     {
         const db_res = await db.query('SELECT numero_contrato,nombre_prod FROM ada_contrato cont INNER JOIN ada_productor prod ON cont.id_prod = prod.id_prod WHERE acuerdo=false and id_prov = $1',[id_prov]);
         return db_res;
     }

     async AceptarContrato(numero)
     {
         const db_res = await db.query('UPDATE ada_contrato SET acuerdo=true WHERE numero_contrato = $1',[numero]);
         return db_res;
     }
    
     async RechazarContrato(numero)
     {
         const db_res = await db.query('UPDATE ada_contrato SET acuerdo=false WHERE numero_contrato = $1',[numero]);
         return db_res;
     }

    async ConfirmarPedido (id_pedido,detalle)
    {
      const db_res = await db.query('UPDATE ada_pedido SET estatus=$2, nro_factura=nextval($3), fecha_confirmacion=current_Date, descripcion=$4 where id_pedido=$1',[id_pedido,'enviado','ada_sec_nro_factura',detalle]);
      return db_res;
    }


    async RechazarPedido (id_pedido,detalle)
    {
      const db_res = await db.query('UPDATE ada_pedido SET estatus=$2, fecha_confirmacion=current_Date, descripcion=$4 where id_pedido=$1',[id_pedido,'rechazado','ada_sec_nro_factura',detalle]);
      return db_res;
    }

}

const model = new ProviderModel() //create instance
module.exports = model; //export instance
