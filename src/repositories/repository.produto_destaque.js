import {execute} from '../database/sqlite.js';


async function Destaque (id_usuario){


    let sql = `SELECT 
    e.*, 
    CASE 
        WHEN u.id_favorito IS NULL THEN 'N'
        ELSE 'S'
    END AS FAVORITO
FROM produto_destaque d
JOIN produto e 
    ON e.id_produto = d.id_produto
LEFT JOIN usuario_favorito u 
    ON u.id_produto = e.id_produto
   AND u.id_usuario = ?
ORDER BY d.ordem;

`

   const produto_destaque =  await execute(sql, [id_usuario]);

    return produto_destaque;
}

async function Listar(id_usuario, busca) {
    let filtro = [id_usuario];

    let sql = `
        SELECT 
    e.*, 
    CASE 
        WHEN u.id_favorito IS NULL THEN 'N'
        ELSE 'S'
    END AS FAVORITO
FROM produto e
LEFT JOIN usuario_favorito u 
    ON u.id_produto = e.id_produto
   AND u.id_usuario = ?
ORDER BY e.nome;
    `;

    if (busca) {
        filtro.push(`%${busca}%`);
        sql += " WHERE e.nome LIKE ? ";
    }

    sql += " ORDER BY e.nome;";

    const produto_destaque = await execute(sql, filtro);
    return produto_destaque;
}


async function InserirFavorito (id_usuario,id_produto){

        await ExcluirFavorito (id_usuario,id_produto);

        const sql = `INSERT INTO usuario_favorito (id_usuario, id_produto) VALUES (?, ?) returning id_favorito`;

   const fav=  await execute(sql, [id_usuario, id_produto]);

    return fav[0];
}
async function ExcluirFavorito (id_usuario,id_produto){


        const sql = `DELETE FROM usuario_favorito WHERE id_usuario = ? AND id_produto = ? returning id_favorito`;

   const fav =  await execute(sql, [id_usuario, id_produto]);

    return fav[0];
}

async function Cardapio(id_usuario, id_categoria) {
    const sql = `
    SELECT 
        c.id_categoria,
        c.nome AS nome_categoria,
        c.icone AS icone_categoria,
        p.id_produto,
        p.nome AS nome_produto,
        p.descricao,
        p.preco,
        p.icone AS icone_produto,
        CASE WHEN uf.id_favorito IS NULL THEN 'N' ELSE 'S' END AS favorito,
        pd.ordem AS ordem_destaque
    FROM categoria_produto c
    JOIN produto p
        ON p.id_categoria = c.id_categoria
    LEFT JOIN usuario_favorito uf
        ON uf.id_produto = p.id_produto
       AND uf.id_usuario = ?
    LEFT JOIN produto_destaque pd
        ON pd.id_produto = p.id_produto
    WHERE c.id_categoria = ?
    ORDER BY pd.ordem, p.nome;
    `;

    const resultado = await execute(sql, [id_usuario, id_categoria]);

    if (!resultado.length) return null;

    // Agrupa os produtos dentro da categoria
    const categoria = {
        id_categoria: resultado[0].id_categoria,
        nome_categoria: resultado[0].nome_categoria,
        icone_categoria: resultado[0].icone_categoria,
        itens: resultado.map(r => ({
            id_produto: r.id_produto,
            nome: r.nome_produto,
            descricao: r.descricao,
            preco: r.preco,
            icone: r.icone_produto,
            favorito: r.favorito,
            ordem_destaque: r.ordem_destaque
        }))
    };

    return categoria;
}

export default {Destaque, Listar, InserirFavorito, ExcluirFavorito, Cardapio};