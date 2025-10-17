import {execute} from '../database/sqlite.js';


async function Listar (){


    let sql = `SELECT 
  p.*,
  (SELECT SUM(QTD) FROM PEDIDO_ITEM pi WHERE pi.ID_PEDIDO = p.ID_PEDIDO) AS QTD_TOTAL_PRODUTOS, ps.DESCRICAO as STATUS_DESCRICAO
FROM PEDIDO p join PEDIDO_STATUS ps on(ps.STATUS = p.STATUS)
ORDER BY p.ID_PEDIDO DESC;

`;

   const pedidos =  await execute(sql, []);

    return pedidos  ;
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

async function Inserir(pedido) {
  // 1. Inserir pedido
  const sqlPedido = `INSERT INTO pedido (id_usuario, status, dt_pedido, vl_total, desconto, subtotal)
   VALUES (?, 'P', CURRENT_TIMESTAMP, ?, ?, ?)`;


  await execute(sqlPedido, [pedido.id_usuario, pedido.vl_total, pedido.desconto, pedido.subtotal]);

  // 2. Pegar o último ID inserido
  const sqlLastId = `SELECT last_insert_rowid() AS id_pedido`;
  const result = await execute(sqlLastId);
  const id_pedido = result[0].id_pedido;

  // 3. Inserir itens (APENAS UMA VEZ)
  const sqlItem = `
    INSERT INTO pedido_item (id_pedido, id_produto, qtd, vl_unitario, vl_total, obs)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  for (let item of pedido.itens || []) {
    await execute(sqlItem, [
      id_pedido,
      item.id_produto,
      item.qtd,
      item.vl_unitario,
      item.vl_total,
      item.obs || ''
    ]);
  }

  return { id_pedido };
}
export default { Listar, ListarId, Inserir };