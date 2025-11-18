import repositoryChat from "../repositories/repository.chat.js";

// Listar mensagens da conversa do usuário logado
async function ListarMensagens(id_usuario) {
    return await repositoryChat.ListarMensagens(id_usuario);
}

// Aluno envia mensagem
async function EnviarMensagem(id_usuario, mensagem) {
    return await repositoryChat.InserirMensagem(id_usuario, 'aluno', mensagem);
}

// Admin responde mensagem para um usuário específico
async function ResponderMensagem(id_usuario, mensagem) {
    return await repositoryChat.InserirMensagem(id_usuario, 'admin', mensagem);
}

// Admin lista todas as conversas
async function ListarConversas() {
    return await repositoryChat.ListarConversas();
}

// Marcar mensagens como lidas
async function MarcarComoLida(id_usuario, tipo_remetente) {
    return await repositoryChat.MarcarComoLida(id_usuario, tipo_remetente);
}

export default { 
    ListarMensagens, 
    EnviarMensagem, 
    ResponderMensagem,
    ListarConversas, 
    MarcarComoLida 
};