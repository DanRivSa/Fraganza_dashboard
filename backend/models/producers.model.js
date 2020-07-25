//import open db connection pool
const db = require('../database/database.config');

class ProducersModel
{
    //async methods

    async GetProducers()
    {
        const db_res = await db.query('SELECT id_prod,nombre_prod FROM ada_productor WHERE id_prod IN (SELECT * FROM ada_prod_mem_activa)');
        return db_res;
    }

    async FiltrarProveedoresEvIni(id)
    {
        const db_res = await db.query('SELECT DISTINCT p.id_prov,nombre_prov,telefono,email from ada_alternativa_envio p INNER JOIN ada_proveedor prov ON prov.id_prov = p.id_prov WHERE p.id_pais in (SELECT id_pais FROM ada_prod_pais WHERE id_prod=$1 AND p.id_prov IN (SELECT * FROM ada_prov_mem_activa)) AND p.id_prov IN (SELECT id_prov FROM ada_proveedores_con_productos) EXCEPT  SELECT cont.id_prov, nombre_prov,telefono,email FROM ada_contratos_en_regla cont INNER JOIN ada_proveedor prov ON prov.id_prov = cont.id_prov WHERE cont.id_prod = $1',[id]);
        return db_res;
    }


    //Formula: Aqui empezo Andres
    async ObtenerEscalaInicialVigente(id)
    {
        const db_res = await db.query('SELECT e.fecha_inicio,e.id_prod, e.rango_inicial,e.rango_final, e.rango_aprob from ada_escala e where e.id_prod=$1 and e.fecha_fin is null and e.tipo_uso =$2',[id,'i']);
        return db_res;
    }


    async ObtenerUbicacionGeoVigente(id)
    {
        const db_res = await db.query('SELECT c.id_prod, c.peso from ada_eval_criterio c where c.id_prod=$1 and c.fecha_fin is null and c.id_criterio=1',[id]);
        return db_res;
    }


    async ObtenerAltEnvioVigente(id)
    {
        const db_res = await db.query('SELECT c.id_prod, c.peso from ada_eval_criterio c where c.id_prod=$1 and c.fecha_fin is null and c.id_criterio=2',[id]);
        return db_res;
    }


    async ObtenerPagoGeoVigente(id)
    {
        const db_res = await db.query('SELECT c.id_prod, c.peso from ada_eval_criterio c where c.id_prod=$1 and c.fecha_fin is null and c.id_criterio=3',[id]);
        return db_res;
    }

    async ObtenerCriterioSucces(id)
    {

    }

    async ObtenerEscalaAnualVigente(id)
    {
        const db_res = await db.query('SELECT e.fecha_inicio,e.id_prod, e.rango_inicial,e.rango_final, e.rango_aprob from ada_escala e where e.id_prod=$1 and e.fecha_fin is null and e.tipo_uso =$2',[id,'a']);
        return db_res;
    }

    async PostEscalaInicial(id,rango_min,rango_max,rango_aprob){

        const db_res = await db.query('INSERT INTO ada_escala (id_prod,rango_inicial,rango_final,rango_aprob,tipo_uso)  VALUES ($1,$2,$3,$4,$5)',[id,rango_min,rango_max,rango_aprob,'i']);
        return db_res;
    }


    async PostEscalaAnual(id,rango_min,rango_max,rango_aprob){

      const db_res = await db.query('INSERT INTO ada_escala (id_prod,rango_inicial,rango_final,rango_aprob,tipo_uso)  VALUES ($1,$2,$3,$4,$5)',[id,rango_min,rango_max,rango_aprob,'a']);
      return db_res;
  }




    async PostUbicacion(id,id_criterio,peso){

        const db_res = await db.query('INSERT INTO ada_eval_criterio (id_prod,id_criterio,peso,tipo_uso)  VALUES ($1,$2,$3,$4)',[id,id_criterio,peso,'i']);
        return db_res;
    }

    async PostEnvio(id,id_criterio,peso){

        const db_res = await db.query('INSERT INTO ada_eval_criterio (id_prod,id_criterio,peso,tipo_uso)  VALUES ($1,$2,$3,$4)',[id,id_criterio,peso,'i']);
        return db_res;
    }

    async PostPago(id,id_criterio,peso)
    {

        const db_res = await db.query('INSERT INTO ada_eval_criterio (id_prod,id_criterio,peso,tipo_uso)  VALUES ($1,$2,$3,$4)',[id,id_criterio,peso,'i']);
        return db_res;
     }


     async PostCriterioAnual(id,id_criterio,peso)
     {

         const db_res = await db.query('INSERT INTO ada_eval_criterio (id_prod,id_criterio,peso,tipo_uso)  VALUES ($1,$2,$3,$4)',[id,id_criterio,peso,'a']);
         return db_res;
      }

    //Cerrar los historicos que constituyen la formula (escala y criterios)
    async PutEscalaInicialVigencia(id){
        const db_res = await db.query('UPDATE ada_escala SET fecha_fin=CURRENT_DATE where id_prod = $1 and tipo_uso=$2',[id,'i']);
        return db_res;
    }

     async PutEscalaAnualVigencia(id)
     {
      const db_res = await db.query('UPDATE ada_escala SET fecha_fin=CURRENT_DATE where id_prod = $1 and tipo_uso=$2',[id,'a']);
      return db_res;
     }

    async PutCriteriosInicial(id){
        const db_res = await db.query('UPDATE ada_eval_criterio SET fecha_fin=CURRENT_DATE where id_prod = $1 and tipo_uso=$2',[id,'i']);
        return db_res;
    }

    async PutCriteriosAnual(id){
        const db_res = await db.query('UPDATE ada_eval_criterio SET fecha_fin=CURRENT_DATE where id_prod = $1 and id_criterio=4',[id]);
        return db_res;
     }

     async CerrarCriterioAnual(id)
     {
      const db_res = await db.query('UPDATE ada_eval_criterio SET fecha_fin = CURRENT_DATE WHERE id_criterio = 4 AND id_prod = $1',[id]);
      return db_res;
     }

     async CerrarEscalaAnual(id)
     {
      const db_res = await db.query('UPDATE ada_escala SET fecha_fin = CURRENT_DATE WHERE tipo_uso=$2 AND id_prod= $1',['a',id]);
      return db_res;
     }


     async GetContratosPorVencer(id){
       const db_res = await db.query('SELECT days, numero_contrato, id_prov,nombre_prov from ada_contratos_por_renovar where id_prod = $1',[id]);
       return db_res;
     }
     //Modulo compras

    async GetContratosVigentes(id)
    {
      const db_res = await db.query('select * from ada_contratos_productor_vigente where id_prod=$1',[id]);
      return db_res;
    }

    async GetEsenciasContratadas(id_proveedor,numero_contrato)
    {
      const db_res = await db.query('SELECT e.nombre_comercial, e.nombre_quimico, p.cas from ada_contratacion_prod p INNER JOIN ada_esencia e on e.cas = p.cas where p.id_prov=$1 and p.numero_contrato=$2 and p.cas_oi is null',[id_proveedor,numero_contrato]);
      return db_res;
    }

    async GetIngredientesContratados(id_proveedor,numero_contrato)
    {
      const db_res = await db.query('SELECT e.nombre_comercial, e.nombre_quimico, p.cas_oi from ada_contratacion_prod p INNER JOIN ada_otros_ing e on e.cas_oi = p.cas_oi where p.id_prov=$1 and p.numero_contrato=$2 and p.cas is null',[id_proveedor,numero_contrato]);
      return db_res;
    }
     async metodoPagoContratados(id_proveedor,numero_contrato)
     {
       const db_res = await db.query('SELECT case metodo_pago when $3 then $4 when $5 then $6 end from ada_contratacion_ap where id_prov = $1 and numero_contrato=$2',[id_proveedor,numero_contrato,'c','Pago por Cuotas','p','Pago Parcial']);
       return db_res;
     }

     async metodoEnvioContratados(id_proveedor,numero_contrato)
     {
       const db_res = await db.query('select p.nombre_pais,case m.tipo_envio when $3 then $4 when $5 then $6 when $7 then $8 end, m.porc_contratado from ada_contratacion_me m INNER JOIN ada_pais p on p.id_pais = m.id_pais WHERE m.id_prov=$1 and m.numero_contrato=$2',[id_proveedor,numero_contrato,'m','MARÍTIMO','a','AÉREO','t','TERRESTRE']);
       return db_res;
     }

     async generarPedido(id_proveedor,id_productor,numero_contrato,metodo_pago,id_pais,metodo_envio)
     {
        const db_res = await db.query('INSERT INTO ada_pedido (id_prov1,id_prod1,numero_contrato1,id_prov2,metodo_pago,id_prod3,id_prov3,numero_contrato2,id_prov4,id_pais,tipo_envio,estatus) VALUES ($1,$2,$3,$1,$4,$2,$1,$3,$1,$5,$6)',[id_proveedor,id_productor,numero_contrato,metodo_pago,id_pais,metodo_envio]);
        return db_res;
     }

     async PresentacionesEsenciaPedido(numero_contrato)
     {
       const db_res = await db.query('SELECT * from ADA_PRESENTACIONES_ESENCIAS p INNER JOIN esencia_en_contrato e on e.cas=p.cas WHERE e.numero_contrato =$1',[numero_contrato]);
       return db_res;
     }

     async PresentacionesIgredientesPedido(numero_contrato)
     {
       const db_res = await db.query('SELECT * from ADA_PRESENTACIONES_INGREDIENTE p INNER JOIN ingrediente_en_contrato e on e.cas_oi=p.cas_oi WHERE e.numero_contrato =$1;',[numero_contrato]);
       return db_res;
     }

     async PostDetPedido(sku,cantidad){
       const db_res = await db.query('INSERT INTO ada_det_pedido (id_pedido,sku,cantidad) VALUES (currval($2),$1,$3)',['ada_sec_id_pedido',sku,cantidad]);
       return db_res;
     }

}


const model = new ProducersModel();//create instance
module.exports = model; //export instance

