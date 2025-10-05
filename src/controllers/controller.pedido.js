import servicePedido from '../services/service.pedido.js';

async function Listar(req, res){
    try{
        const pedidos = await servicePedido.Listar();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({error: "Erro ao listar pedidos em destaque"});
    }
}

async function ListarId(req, res){
    try{
        const id_pedido  = req.params.id_pedido;
        const pedido = await servicePedido.ListarId(id_pedido);
        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({error: "Erro ao listar pedido por ID"});
    }
}

async function Inserir(req, res) {
  try {
    const id_usuario = req.id_usuario; // ou req.body.id_usuario se vier pelo JSON
    console.log("DEBUG id_usuario:", id_usuario);
    console.log("DEBUG body:", req.body);

    const pedido = await servicePedido.Inserir(id_usuario, req.body);
    res.status(201).json(pedido);
  } catch (error) {
    console.error("ERRO NO INSERIR:", error);
    res.status(500).json({ error: "Erro ao inserir novo pedido" });
  }
}

export default {Listar, ListarId, Inserir};
