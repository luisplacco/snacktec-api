import serviceProdutoDestaque from '../services/service.produto_destaque.js';

async function Destaque(req, res){
    try{
        const id_usuario = req.id_usuario; // Supondo que o ID do usuário esteja disponível na requisição
        const produto_destaque = await serviceProdutoDestaque.Destaque(id_usuario);
        res.status(200).json(produto_destaque);
    } catch (error) {
        res.status(500).json({error: "Erro ao listar produtos em destaque"});
    }
}


async function Listar(req, res){
    try{
        const id_usuario = req.id_usuario;  // Supondo que o ID do usuário esteja disponível na requisição
        const busca = req.query.busca;
        const produto_destaque = await serviceProdutoDestaque.Listar(id_usuario, busca);
        res.status(200).json(produto_destaque);
    } catch (error) {
        res.status(500).json({error: "Erro ao listar produtos em destaque"});
    }
}

async function InserirFavorito(req, res){
    try{
        const id_usuario = req.id_usuario;  // Supondo que o ID do usuário esteja disponível na requisição
        const id_produto = req.params.id_produto
        const produto_destaque = await serviceProdutoDestaque.InserirFavorito(id_usuario, id_produto);
        res.status(201).json(produto_destaque);
    } catch (error) {
        res.status(500).json({error: "Erro ao listar produtos em destaque"});
    }
}

async function ExcluirFavorito(req, res){
    try{
        const id_usuario = req.id_usuario;  // Supondo que o ID do usuário esteja disponível na requisição
        const id_produto = req.params.id_produto
        const produto_destaque = await serviceProdutoDestaque.ExcluirFavorito(id_usuario, id_produto);
        res.status(200).json(produto_destaque);
    } catch (error) {
        res.status(500).json({error: "Erro ao listar produtos em destaque"});
    }
}


async function Cardapio(req, res){
    try{
        const id_usuario = req.id_usuario;  // Supondo que o ID do usuário esteja disponível na requisição
        const id_produto = req.params.id_produto
        const produto_destaque = await serviceProdutoDestaque.Cardapio(id_usuario, id_produto);
        res.status(200).json(produto_destaque);
    } catch (error) {
        res.status(500).json({error: "Erro ao listar produtos em destaque"});
    }
}

export default {Destaque, Listar, InserirFavorito, ExcluirFavorito, Cardapio};
