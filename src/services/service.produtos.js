import repositoryProdutos from "../repositories/repository.produtos.js";
import repositoryProdutoDetalhe from "../repositories/repository.produtos.js";

async function Listar() {


    const produtos = await repositoryProdutos.Listar();

    return produtos;
}

async function ListarByProduto(id_produto) {
    const produto = await repositoryProdutos.ListarByProduto(id_produto);
    return produto;
}



export default { Listar, ListarByProduto };