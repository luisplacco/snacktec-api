import serviceProdutos from '../services/service.produtos.js';

async function Listar(req, res){
    try{
        const produtos = await serviceProdutos.Listar();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({error: "Erro ao listar produtos"});
    }
}

export default {Listar};
