import repositoryPedido from "../repositories/repository.pedido.js";


async function Listar() {


    const pedidos = await repositoryPedido.Listar();

    return pedidos;
}

async function ListarId(id_pedido) {

    const pedido = await repositoryPedido.ListarId(id_pedido);

    return pedido;
}
async function Inserir(id_usuario, dados) {
  let vl_total = 0;
  const itens = dados.itens.map(item => {
    const vlItemTotal = item.qtd * item.vl_unitario;
    vl_total += vlItemTotal;
    return { ...item, vl_total: vlItemTotal };
  });

  
  const desconto = dados.desconto || 0;
  const subtotal = vl_total - desconto;

  const pedido = { id_usuario, vl_total, desconto, subtotal, itens };

  const novoPedido = await repositoryPedido.Inserir(pedido);
  return novoPedido;
}





export default { Listar, ListarId, Inserir };