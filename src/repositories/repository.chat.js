import { execute } from '../database/sqlite.js';

// Listar mensagens de uma conversa específica (aluno vê suas próprias)
async function ListarMensagens(id_usuario) {
    const sql = `
        SELECT 
            ID_MENSAGEM,
            ID_USUARIO,
            TIPO_REMETENTE,
            MENSAGEM,
            DATA_HORA,
            LIDA
        FROM MENSAGENS
        WHERE ID_USUARIO = ?
        ORDER BY DATA_HORA ASC
    `;
    const mensagens = await execute(sql, [id_usuario]);
    return mensagens;
}

// Inserir nova mensagem (aluno ou admin)
async function InserirMensagem(id_usuario, tipo_remetente, mensagem) {
    // Criar timestamp no fuso horário de São Paulo
    const agora = new Date();
    const saoPauloTime = new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(agora).replace(' ', ' ');

    const sql = `
        INSERT INTO MENSAGENS (ID_USUARIO, TIPO_REMETENTE, MENSAGEM, DATA_HORA, LIDA)
        VALUES (?, ?, ?, ?, FALSE)
    `;
    await execute(sql, [id_usuario, tipo_remetente, mensagem, saoPauloTime]);
    
    const sqlLastId = `SELECT last_insert_rowid() AS id_mensagem`;
    const result = await execute(sqlLastId);
    return { id_mensagem: result[0].id_mensagem };
}

// Listar todas as conversas (admin) - última mensagem por usuário
async function ListarConversas() {
    const sql = `
        SELECT DISTINCT
            m.ID_USUARIO,
            u.NOME as NOME_USUARIO,
            u.RA as RA_USUARIO,
            u.EMAIL as EMAIL_USUARIO,
            (SELECT MENSAGEM FROM MENSAGENS m2 WHERE m2.ID_USUARIO = m.ID_USUARIO ORDER BY DATA_HORA DESC LIMIT 1) as ULTIMA_MENSAGEM,
            (SELECT DATA_HORA FROM MENSAGENS m2 WHERE m2.ID_USUARIO = m.ID_USUARIO ORDER BY DATA_HORA DESC LIMIT 1) as ULTIMA_DATA,
            (SELECT COUNT(*) FROM MENSAGENS m3 WHERE m3.ID_USUARIO = m.ID_USUARIO AND m3.TIPO_REMETENTE = 'aluno' AND m3.LIDA = FALSE) as MENSAGENS_NAO_LIDAS
        FROM MENSAGENS m
        JOIN USUARIO u ON u.ID_USUARIO = m.ID_USUARIO
        ORDER BY ULTIMA_DATA DESC
    `;
    const conversas = await execute(sql, []);
    return conversas;
}

// Marcar mensagens como lidas
async function MarcarComoLida(id_usuario, tipo_remetente) {
    const sql = `
        UPDATE MENSAGENS 
        SET LIDA = TRUE 
        WHERE ID_USUARIO = ? AND TIPO_REMETENTE = ? AND LIDA = FALSE
    `;
    await execute(sql, [id_usuario, tipo_remetente]);
    return { success: true, message: "Mensagens marcadas como lidas" };
}

export default { 
    ListarMensagens, 
    InserirMensagem, 
    ListarConversas, 
    MarcarComoLida 
};