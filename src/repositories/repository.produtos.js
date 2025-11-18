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

async function Inserir(dados) {
    const sql = `
        INSERT INTO PRODUTO (ID_CATEGORIA, NOME, DESCRICAO, PRECO, ICONE, ESTOQUE, ATIVO)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
        Number(dados.id_categoria ?? dados.ID_CATEGORIA ?? 1),
        dados.nome ?? dados.NOME ?? "",
        dados.descricao ?? dados.DESCRICAO ?? "",
        Number(dados.preco ?? dados.PRECO ?? 0),
        dados.icone ?? dados.ICONE ?? "",
        Number(dados.estoque ?? dados.ESTOQUE ?? 0),
        dados.ativo ?? dados.ATIVO ?? 1
    ];
    
    await execute(sql, params);
    
    const sqlLastId = `SELECT last_insert_rowid() AS id_produto`;
    const result = await execute(sqlLastId);
    return { id_produto: result[0].id_produto, message: "Produto criado com sucesso" };
}

async function Atualizar(id_produto, dados) {
    const sql = `
        UPDATE PRODUTO 
        SET ID_CATEGORIA = ?, NOME = ?, DESCRICAO = ?, PRECO = ?, ICONE = ?, ESTOQUE = ?, ATIVO = ?
        WHERE ID_PRODUTO = ?
    `;
    const params = [
        Number(dados.id_categoria ?? dados.ID_CATEGORIA ?? 1),
        dados.nome ?? dados.NOME ?? "",
        dados.descricao ?? dados.DESCRICAO ?? "",
        Number(dados.preco ?? dados.PRECO ?? 0),
        dados.icone ?? dados.ICONE ?? "",
        Number(dados.estoque ?? dados.ESTOQUE ?? 0),
        dados.ativo ?? dados.ATIVO ?? 1,
        Number(id_produto)
    ];
    
    await execute(sql, params);
    return { id_produto: Number(id_produto), message: "Produto atualizado com sucesso" };
}

async function Excluir(id_produto) {
    // Verificar se produto existe
    const produto = await ListarByProduto(id_produto);
    if (!produto) {
        throw new Error("Produto não encontrado");
    }
    
    const sql = `DELETE FROM PRODUTO WHERE ID_PRODUTO = ?`;
    await execute(sql, [Number(id_produto)]);
    return { id_produto: Number(id_produto), message: "Produto excluído com sucesso" };
}

export default { ListarByProduto, Listar, Inserir, Atualizar, Excluir };