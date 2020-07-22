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
        const db_res = await db.query('SELECT nombre_pais,tipo_envio,porc_base FROM ada_pais ps INNER JOIN ada_alternativa_envio env  ON ps.id_pais = env.id_pais WHERE env.id_prov = $1',[id]);
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
}

const model = new ProviderModel() //create instance
module.exports = model; //export instance
