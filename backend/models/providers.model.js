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
        const db_res = await db.query('SELECT nombre_prov,cas,nombre_comercial,nombre_quimico FROM ada_proveedor prov INNER JOIN ada_esencia ese ON prov.id_prov = ese.id_prov WHERE prov.id_prov = $1',[id]);
        return db_res;
    }

    async ObtenerIngredientes(id)
    {
        const db_res = await db.query('SELECT nombre_prov,cas_oi,nombre_comercial,nombre_quimico FROM ada_proveedor prov INNER JOIN ada_otros_ing ing ON prov.id_prov = ing.id_prov WHERE prov.id_prov = $1',[id]);
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

