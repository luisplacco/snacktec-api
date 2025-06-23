import serviceProdutoDestaque from '../services/service.produto_destaque.js';

async function Destaque(req, res){
    try{
        const produto_destaque = await serviceProdutoDestaque.Destaque();
        res.status(200).json(produto_destaque);
    } catch (error) {
        res.status(500).json({error: "Erro ao listar produtos em destaque"});
    }
}

export default {Destaque};
