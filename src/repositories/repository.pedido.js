import {execute} from '../database/sqlite.js';


async function Listar(id_usuario){
    let sql = `SELECT 
  p.*,
  (SELECT SUM(QTD) FROM PEDIDO_ITEM pi WHERE pi.ID_PEDIDO = p.ID_PEDIDO) AS QTD_TOTAL_PRODUTOS, 
  ps.DESCRICAO as STATUS_DESCRICAO
FROM PEDIDO p 
JOIN PEDIDO_STATUS ps ON (ps.STATUS = p.STATUS)
WHERE p.ID_USUARIO = ?
ORDER BY p.ID_PEDIDO DESC;`;

   const pedidos = await execute(sql, [id_usuario]);
   return pedidos;
}


async function ListarId (id_pedido){

  const sqlItens = `SELECT I.*,p.nome,p.descricao, p.icone from PEDIDO_ITEM I
join produto p on(p.id_produto = i.id_produto)
where i.id_pedido = ?
order by i.id_item;`;


    let sql = `SELECT 
  p.*,
  (SELECT SUM(QTD) FROM PEDIDO_ITEM pi WHERE pi.ID_PEDIDO = p.ID_PEDIDO) AS QTD_TOTAL_PRODUTOS
FROM PEDIDO p
where p.ID_PEDIDO = ?
ORDER BY p.ID_PEDIDO DESC;

`;

   const pedido =  await execute(sql, [id_pedido]);

  const itens = await execute(sqlItens, [id_pedido]);

    pedido[0].itens = itens;
    return pedido[0]  ;
}

// ...existing code...
async function Inserir(pedido) {
  try {
    console.log("DEBUG Inserir - pedido recebido:", JSON.stringify(pedido));

    // normaliza nomes e força number
    let subtotal = Number(pedido.subtotal ?? pedido.vl_subtotal ?? 0) || 0;
    let desconto = Number(pedido.desconto ?? pedido.vl_desconto ?? 0) || 0;
    let vl_total = Number(pedido.vl_total ?? pedido.vlTotal ?? pedido.total ?? 0) || 0;

    // calcula valores a partir dos itens se necessário
    if ((!vl_total || vl_total === 0) && Array.isArray(pedido.itens)) {
      subtotal = 0;
      for (const item of pedido.itens) {
        const unit = Number(item.vl_unitario ?? 0) || 0;
        const qtd = Number(item.qtd ?? 0) || 0;
        const itemTotal = Number(item.vl_total ?? (unit * qtd)) || (unit * qtd);
        subtotal += itemTotal;
      }
      vl_total = subtotal - desconto;
    }

    console.log("DEBUG Inserir - valores calculados:", { subtotal, desconto, vl_total });

    // inserir pedido com valores corretos
    const sqlPedido = `
      INSERT INTO PEDIDO (ID_USUARIO, STATUS, DT_PEDIDO, SUBTOTAL, DESCONTO, VL_TOTAL)
      VALUES (?, 'P', CURRENT_TIMESTAMP, ?, ?, ?)
    `;
    await execute(sqlPedido, [pedido.id_usuario, subtotal, desconto, vl_total]);

    // pegar id inserido
    const sqlLastId = `SELECT last_insert_rowid() AS id_pedido`;
    const r = await execute(sqlLastId);
    const id_pedido = r[0].id_pedido;

    // inserir itens
    const sqlItem = `
      INSERT INTO PEDIDO_ITEM (ID_PEDIDO, ID_PRODUTO, QTD, VL_UNITARIO, VL_TOTAL, OBS)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    for (const item of pedido.itens || []) {
      const itemVlUnit = Number(item.vl_unitario ?? 0) || 0;
      const itemVlTotal = Number(item.vl_total ?? (item.qtd * itemVlUnit)) || (item.qtd * itemVlUnit);
      await execute(sqlItem, [
        id_pedido,
        item.id_produto,
        item.qtd,
        itemVlUnit,
        itemVlTotal,
        item.obs || ''
      ]);
    }

    return { id_pedido };
  } catch (err) {
    console.error("ERRO NO INSERIR:", err);
    throw err;
  }
}


async function Excluir(id_pedido, id_usuario) {
    try {
        // verificar se o pedido existe e pertence ao usuário
        const sqlVerificar = `SELECT ID_USUARIO, STATUS FROM PEDIDO WHERE ID_PEDIDO = ?`;
        const pedido = await execute(sqlVerificar, [id_pedido]);
        
        if (!pedido.length) {
            throw new Error("Pedido não encontrado");
        }
        
        if (pedido[0].ID_USUARIO !== id_usuario) {
            throw new Error("Pedido não pertence ao usuário");
        }

        // opcional: só permitir excluir pedidos pendentes
        if (pedido[0].STATUS !== 'P') {
            throw new Error("Só é possível excluir pedidos pendentes");
        }

        // excluir itens primeiro (devido à foreign key)
        const sqlExcluirItens = `DELETE FROM PEDIDO_ITEM WHERE ID_PEDIDO = ?`;
        await execute(sqlExcluirItens, [id_pedido]);
        
        // depois excluir o pedido
        const sqlExcluirPedido = `DELETE FROM PEDIDO WHERE ID_PEDIDO = ?`;
        await execute(sqlExcluirPedido, [id_pedido]);
        
        return { success: true, message: "Pedido excluído com sucesso" };
    } catch (err) {
        console.error("Erro repository.pedido.Excluir:", err);
        throw err;
    }
}

async function ListarTodos() {
    const sql = `SELECT 
  p.*,
  u.NOME as NOME_USUARIO,
  u.RA as RA_USUARIO,
  u.EMAIL as EMAIL_USUARIO,
  (SELECT SUM(QTD) FROM PEDIDO_ITEM pi WHERE pi.ID_PEDIDO = p.ID_PEDIDO) AS QTD_TOTAL_PRODUTOS, 
  ps.DESCRICAO as STATUS_DESCRICAO
FROM PEDIDO p 
JOIN USUARIO u ON u.ID_USUARIO = p.ID_USUARIO
JOIN PEDIDO_STATUS ps ON (ps.STATUS = p.STATUS)
ORDER BY p.DT_PEDIDO DESC, p.ID_PEDIDO DESC;`;

   const pedidos = await execute(sql, []);
   return pedidos;
}

async function AtualizarStatus(id_pedido, status) {
    const sql = `UPDATE PEDIDO SET STATUS = ? WHERE ID_PEDIDO = ?`;
    await execute(sql, [status, id_pedido]);
    return { success: true, message: "Status atualizado com sucesso" };
}

async function ListarItensByPedido(id_pedido) {
    const sql = `
        SELECT 
            pi.ID_ITEM,
            pi.ID_PEDIDO,
            pi.ID_PRODUTO,
            p.NOME AS NOME_PRODUTO,
            p.DESCRICAO AS DESCRICAO_PRODUTO,
            p.ICONE AS ICONE_PRODUTO,
            pi.QTD,
            pi.VL_UNITARIO,
            pi.VL_TOTAL,
            pi.OBS
        FROM PEDIDO_ITEM pi
        LEFT JOIN PRODUTO p ON p.ID_PRODUTO = pi.ID_PRODUTO
        WHERE pi.ID_PEDIDO = ?
        ORDER BY pi.ID_ITEM;
    `;
    const itens = await execute(sql, [id_pedido]);
    return itens;
}

export default { Listar, ListarId, Inserir, Excluir, ListarTodos, AtualizarStatus, ListarItensByPedido };