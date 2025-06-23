import repositoryProdutoDestaque from "../repositories/repository.produto_destaque.js";


async function Destaque() {


    const produto_destaque = await repositoryProdutoDestaque.Destaque();

    return produto_destaque;
}

export default { Destaque };