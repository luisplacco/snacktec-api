import {execute} from '../database/sqlite.js';


async function Listar (){


    let sql = "select * from PRODUTO order by ID_PRODUTO desc";


   const produtos =  await execute(sql, []);

    return produtos;
}


async function ListarByProduto(id_produto) {
    const sql = `
        SELECT 
            ID_PRODUTO,
            ID_CATEGORIA,
            NOME,
            DESCRICAO,
            PRECO,
            ICONE,
            ESTOQUE,
            ATIVO
        FROM PRODUTO
        WHERE ID_PRODUTO = ?
    `;
    const resultado = await execute(sql, [Number(id_produto)]);
    return resultado.length ? resultado[0] : null;
}

export default { ListarByProduto, Listar };