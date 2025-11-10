import serviceProdutos from '../services/service.produtos.js';
import serviceProdutoDetalhe from '../services/service.produtos.js';


async function Listar(req, res){
    try{
        const produtos = await serviceProdutos.Listar();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({error: "Erro ao listar produtos"});
    }
}

async function ListarByProduto(req, res) {
    try {
        const id_produto = req.params.id_produto;
        const produto = await serviceProdutos.ListarByProduto(id_produto);
        if (!produto) return res.status(404).json({});
        res.status(200).json(produto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar produto" });
    }
}

export default {Listar, ListarByProduto};
