import {execute} from '../database/sqlite.js';


async function Listar (){


    let sql = `SELECT 
  p.*,
  (SELECT SUM(QTD) FROM PEDIDO_ITEM pi WHERE pi.ID_PEDIDO = p.ID_PEDIDO) AS QTD_TOTAL_PRODUTOS
FROM PEDIDO p
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


export default {Listar, ListarId};