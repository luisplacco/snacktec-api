import repositoryPedido from "../repositories/repository.pedido.js";


async function Listar(id_usuario) {
    const pedidos = await repositoryPedido.Listar(id_usuario);
    return pedidos;
}

async function ListarId(id_pedido) {

    const pedido = await repositoryPedido.ListarId(id_pedido);

    return pedido;
}
// ...existing code...
async function Inserir(id_usuario, dados) {
  // calcular totais se não vieram calculados
  let subtotal = Number(dados.subtotal ?? dados.vl_subtotal ?? 0) || 0;
  let desconto = Number(dados.desconto ?? dados.vl_desconto ?? 0) || 0;
  let vl_total = Number(dados.vl_total ?? dados.vlTotal ?? dados.total ?? 0) || 0;

  // se não tem subtotal/vl_total, calcular dos itens
  if ((!subtotal || subtotal === 0) && Array.isArray(dados.itens)) {
    subtotal = 0;
    for (const item of dados.itens) {
      const unit = Number(item.vl_unitario ?? 0) || 0;
      const qtd = Number(item.qtd ?? 0) || 0;
      subtotal += (unit * qtd);
    }
  }

  if (!vl_total || vl_total === 0) {
    vl_total = subtotal - desconto;
  }

  const pedido = {
    id_usuario,
    subtotal,
    desconto, 
    vl_total,
    itens: dados.itens || []
  };

  return await repositoryPedido.Inserir(pedido);
}

async function Excluir(id_pedido, id_usuario) {
    return await repositoryPedido.Excluir(id_pedido, id_usuario);
}

async function ListarTodos() {
    return await repositoryPedido.ListarTodos();
}

async function AtualizarStatus(id_pedido, status) {
    return await repositoryPedido.AtualizarStatus(id_pedido, status);
}

async function ListarItensByPedido(id_pedido) {
    return await repositoryPedido.ListarItensByPedido(id_pedido);
}

export default { Listar, ListarId, Inserir, Excluir, ListarTodos, AtualizarStatus, ListarItensByPedido };