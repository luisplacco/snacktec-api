import {execute} from '../database/sqlite.js';


async function Destaque (){


    let sql = `SELECT 
    e.*,
    CASE 
        WHEN uf.id_usuario IS NOT NULL THEN 'S'
        ELSE 'N'
    END AS favorito
FROM 
    produto_destaque d
JOIN 
    produto e ON e.id_produto = d.id_produto
LEFT JOIN 
    usuario_favorito uf ON uf.id_produto = e.id_produto AND uf.id_usuario = 1
ORDER BY 
    d.ordem;
`

   const produto_destaque =  await execute(sql, []);

    return produto_destaque;
}


export default {Destaque};