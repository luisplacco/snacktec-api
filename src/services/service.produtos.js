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

async function Inserir(dados) {
    return await repositoryProdutos.Inserir(dados);
}

async function Atualizar(id_produto, dados) {
    return await repositoryProdutos.Atualizar(id_produto, dados);
}

async function Excluir(id_produto) {
    return await repositoryProdutos.Excluir(id_produto);
}

export default { Listar, ListarByProduto, Inserir, Atualizar, Excluir };