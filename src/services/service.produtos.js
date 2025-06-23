import repositoryProdutos from "../repositories/repository.produtos.js";


async function Listar() {


    const produtos = await repositoryProdutos.Listar();

    return produtos;
}

export default { Listar };