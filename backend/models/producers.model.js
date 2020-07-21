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
        const db_res = await db.query('SELECT DISTINCT p.id_prov,nombre_prov,telefono,email from ada_alternativa_envio p INNER JOIN ada_proveedor prov ON prov.id_prov = p.id_prov WHERE p.id_pais in (Select id_pais from ada_prod_pais WHERE id_prod=$1 AND p.id_prov IN (SELECT * FROM ada_prov_mem_activa)) EXCEPT  SELECT cont.id_prov, nombre_prov,telefono,email from ada_contratos_en_regla cont INNER JOIN ada_proveedor prov ON prov.id_prov = cont.id_prov WHERE cont.id_prod = $1',[id]);
        return db_res;
    }
}

const model = new ProducersModel();//create instance
module.exports = model; //export instance 

