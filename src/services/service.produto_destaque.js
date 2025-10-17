import repositoryProdutoDestaque from "../repositories/repository.produto_destaque.js";


async function Destaque(id_usuario) {


    const produto_destaque = await repositoryProdutoDestaque.Destaque(id_usuario);

    return produto_destaque;
}


async function Listar(id_usuario,busca, id_categoria, id_banner) {


    const produto_destaque = await repositoryProdutoDestaque.Listar(id_usuario, busca, id_categoria, id_banner);

    return produto_destaque;
}


async function InserirFavorito(id_usuario,id_produto) {


    const produto_destaque = await repositoryProdutoDestaque.InserirFavorito(id_usuario, id_produto);

    return produto_destaque;
}


async function ExcluirFavorito(id_usuario,id_produto) {


    const produto_destaque = await repositoryProdutoDestaque.ExcluirFavorito(id_usuario, id_produto);

    return produto_destaque;
}

async function Cardapio(id_usuario,id_produto) {


    const card = await repositoryProdutoDestaque.Cardapio(id_usuario, id_produto);

    return card;
}

export default { Destaque, Listar, InserirFavorito, ExcluirFavorito, Cardapio };