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

    async ObtenerEscalaAnualVigente(id)
    {
        const db_res = await db.query('SELECT e.fecha_inicio,p.id_prod, e.rango_inicial,e.rango_final, e.rango_aprob from ada_escala e where e.id_prod=$1 and e.fecha_fin is null and e.tipo_uso =$2',[id,'a']);
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
        const db_res = await db.query('UPDATE ada_eval_criterio SET fecha_fin=CURRENT_DATE where id_prod = $1 and tipo_uso=$2',[id,'a']);
        return db_res;
     }

     //Modulo compras

    async GetContratosVigentes(id)
    {
      const db_res = await db.query('SELECT p.id_prod,r.id_prov,x.nombre_prov, r.numero_contrato from ada_productor p INNER JOIN ada_contratos_en_regla r on r.id_prod=p.id_prod  INNER JOIN ada_proveedor x on x.id_prov = r.id_prov where p.id_prod =$1',[id]);
      return db_res;
    }

}


const model = new ProducersModel();//create instance
module.exports = model; //export instance

