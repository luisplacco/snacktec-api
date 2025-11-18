import serviceChat from '../services/service.chat.js';

// GET /chat - Buscar mensagens da conversa do usuário logado
async function ListarMensagens(req, res) {
    try {
        const id_usuario = req.id_usuario; // vem do JWT
        
        if (!id_usuario) return res.status(400).json({ error: "Usuário não identificado" });
        
        const mensagens = await serviceChat.ListarMensagens(id_usuario);
        
        // Marcar mensagens do admin como lidas quando aluno visualiza
        await serviceChat.MarcarComoLida(id_usuario, 'admin');
        
        res.status(200).json(mensagens);
    } catch (error) {
        console.error("Erro controller.chat.ListarMensagens:", error);
        res.status(500).json({ error: "Erro ao listar mensagens" });
    }
}

// POST /chat - Enviar nova mensagem (aluno)
async function EnviarMensagem(req, res) {
    try {
        const id_usuario = req.id_usuario; // vem do JWT
        const { mensagem } = req.body;
        
        if (!id_usuario) return res.status(400).json({ error: "Usuário não identificado" });
        if (!mensagem || mensagem.trim() === "") return res.status(400).json({ error: "Mensagem é obrigatória" });
        
        const resultado = await serviceChat.EnviarMensagem(id_usuario, mensagem.trim());
        res.status(201).json(resultado);
    } catch (error) {
        console.error("Erro controller.chat.EnviarMensagem:", error);
        res.status(500).json({ error: "Erro ao enviar mensagem" });
    }
}

// GET /admin/chat - Listar todas as conversas por usuário (admin)
async function ListarConversas(req, res) {
    try {
        const conversas = await serviceChat.ListarConversas();
        res.status(200).json(conversas);
    } catch (error) {
        console.error("Erro controller.chat.ListarConversas:", error);
        res.status(500).json({ error: "Erro ao listar conversas" });
    }
}

// GET /admin/chat/:id_usuario - Buscar conversa específica com um aluno
async function ListarConversa(req, res) {
    try {
        const id_usuario = req.params.id_usuario;
        
        if (!id_usuario) return res.status(400).json({ error: "ID do usuário é obrigatório" });
        
        const mensagens = await serviceChat.ListarMensagens(id_usuario);
        
        // Marcar mensagens do aluno como lidas quando admin visualiza
        await serviceChat.MarcarComoLida(id_usuario, 'aluno');
        
        res.status(200).json(mensagens);
    } catch (error) {
        console.error("Erro controller.chat.ListarConversa:", error);
        res.status(500).json({ error: "Erro ao buscar conversa" });
    }
}

// POST /admin/chat - Responder mensagem para um usuário específico
async function ResponderMensagem(req, res) {
    try {
        const { id_usuario, mensagem } = req.body;
        
        if (!id_usuario) return res.status(400).json({ error: "ID do usuário é obrigatório" });
        if (!mensagem || mensagem.trim() === "") return res.status(400).json({ error: "Mensagem é obrigatória" });
        
        const resultado = await serviceChat.ResponderMensagem(id_usuario, mensagem.trim());
        res.status(201).json(resultado);
    } catch (error) {
        console.error("Erro controller.chat.ResponderMensagem:", error);
        res.status(500).json({ error: "Erro ao responder mensagem" });
    }
}

export default { 
    ListarMensagens, 
    EnviarMensagem, 
    ListarConversas, 
    ListarConversa, 
    ResponderMensagem 
};