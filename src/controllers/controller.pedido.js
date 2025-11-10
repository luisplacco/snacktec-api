import servicePedido from '../services/service.pedido.js';

async function Listar(req, res){
    try{
        const id_usuario = req.id_usuario; // pega do JWT
        console.log("DEBUG controller.pedido.Listar - id_usuario:", id_usuario);
        
        if (!id_usuario) return res.status(400).json({ error: "Usuário não identificado" });
        
        const pedidos = await servicePedido.Listar(id_usuario);
        res.status(200).json(pedidos);
    } catch (error) {
        console.error("Erro controller.pedido.Listar:", error);
        res.status(500).json({error: "Erro ao listar pedidos"});
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

async function Excluir(req, res) {
    try {
        const id_pedido = req.params.id_pedido;
        const id_usuario = req.id_usuario; // vem do JWT
        
        if (!id_pedido) return res.status(400).json({ error: "ID do pedido é obrigatório" });
        if (!id_usuario) return res.status(400).json({ error: "Usuário não identificado" });
        
        console.log("DEBUG controller.pedido.Excluir - id_pedido:", id_pedido, "id_usuario:", id_usuario);
        
        const resultado = await servicePedido.Excluir(id_pedido, id_usuario);
        res.status(200).json(resultado);
    } catch (error) {
        console.error("Erro controller.pedido.Excluir:", error);
        
        // tratar erros específicos
        if (error.message.includes("não encontrado")) {
            return res.status(404).json({ error: error.message });
        }
        if (error.message.includes("não pertence")) {
            return res.status(403).json({ error: error.message });
        }
        if (error.message.includes("pendentes")) {
            return res.status(400).json({ error: error.message });
        }
        
        res.status(500).json({ error: "Erro ao excluir pedido" });
    }
}

async function ListarTodos(req, res) {
    try {
        console.log("DEBUG controller.pedido.ListarTodos - admin");
        const pedidos = await servicePedido.ListarTodos();
        res.status(200).json(pedidos);
    } catch (error) {
        console.error("Erro controller.pedido.ListarTodos:", error);
        res.status(500).json({ error: "Erro ao listar todos os pedidos" });
    }
}

async function AtualizarStatus(req, res) {
    try {
        const id_pedido = req.params.id_pedido;
        const { status } = req.body;
        
        if (!id_pedido) return res.status(400).json({ error: "ID do pedido é obrigatório" });
        if (!status) return res.status(400).json({ error: "Status é obrigatório" });
        
        console.log("DEBUG controller.pedido.AtualizarStatus - id_pedido:", id_pedido, "status:", status);
        
        const resultado = await servicePedido.AtualizarStatus(id_pedido, status);
        res.status(200).json(resultado);
    } catch (error) {
        console.error("Erro controller.pedido.AtualizarStatus:", error);
        res.status(500).json({ error: "Erro ao atualizar status do pedido" });
    }
}

async function ListarItensByPedido(req, res) {
    try {
        const id_pedido = req.params.id_pedido;
        
        if (!id_pedido) return res.status(400).json({ error: "ID do pedido é obrigatório" });
        
        console.log("DEBUG controller.pedido.ListarItensByPedido - id_pedido:", id_pedido);
        
        const itens = await servicePedido.ListarItensByPedido(id_pedido);
        res.status(200).json(itens);
    } catch (error) {
        console.error("Erro controller.pedido.ListarItensByPedido:", error);
        res.status(500).json({ error: "Erro ao listar itens do pedido" });
    }
}

export default {Listar, ListarId, Inserir, Excluir, ListarTodos, AtualizarStatus, ListarItensByPedido};
