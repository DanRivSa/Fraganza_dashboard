//import open db connection pool
const db = require('../database/database.config');

class ProviderModel
{
    //async methods
    
    async GetProviders()
    {
        const db_res = await db.query('SELECT * FROM ada_proveedor');
        return db_res;
    }

    async GetProviderPDF(id)
    {
        const db_res = await db.query('SELECT nombre_prov,telefono,email,direccion_fiscal,cod_postal,nombre_pais,nombre_asoc FROM ada_asoc_nacional asoc RIGHT JOIN ada_proveedor prov  ON asoc.id_asoc = prov.id_asoc INNER JOIN ada_pais pais ON prov.id_pais = pais.id_pais WHERE prov.id_prov = $1',[id]);
        return db_res;
    }
}

const model = new ProviderModel() //create instance
module.exports = model; //export instance