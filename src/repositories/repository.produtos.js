import {execute} from '../database/sqlite.js';


async function Listar (){


    let sql = "select * from PRODUTO order by ID_PRODUTO desc";


   const produtos =  await execute(sql, []);

    return produtos;
}


export default {Listar};