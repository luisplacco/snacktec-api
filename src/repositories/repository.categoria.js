import {execute} from '../database/sqlite.js';


async function Listar (){


    let sql = "select * from CATEGORIA_PRODUTO order by ID_CATEGORIA desc";


   const categoria =  await execute(sql, []);

    return categoria;
}


export default {Listar};