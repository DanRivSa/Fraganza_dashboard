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

    async GetProviderPDF(id)
    {
        const db_res = await db.query('SELECT nombre_prov,telefono,email,direccion_fiscal,cod_postal,nombre_pais,nombre_asoc,metodo_pago FROM ada_asoc_nacional asoc RIGHT JOIN ada_proveedor prov ON asoc.id_asoc = prov.id_asoc  INNER JOIN ada_pais pais  ON prov.id_pais = pais.id_pais INNER JOIN ada_alternativa_pago alt ON alt.id_prov = prov.id_prov  WHERE prov.id_prov = $1',[id]);
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

}

const model = new ProviderModel() //create instance
module.exports = model; //export instance

