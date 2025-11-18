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
        if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
        res.status(200).json(produto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar produto" });
    }
}

async function Inserir(req, res) {
    try {
        const dados = req.body;
        
        // Validações básicas
        if (!dados.nome || dados.nome.trim() === "") {
            return res.status(400).json({ error: "Nome do produto é obrigatório" });
        }
        if (!dados.preco || Number(dados.preco) <= 0) {
            return res.status(400).json({ error: "Preço deve ser maior que zero" });
        }
        if (!dados.id_categoria) {
            return res.status(400).json({ error: "Categoria é obrigatória" });
        }
        
        const resultado = await serviceProdutos.Inserir(dados);
        res.status(201).json(resultado);
    } catch (error) {
        console.error("Erro controller.produtos.Inserir:", error);
        res.status(500).json({ error: "Erro ao criar produto" });
    }
}

async function Atualizar(req, res) {
    try {
        const id_produto = req.params.id_produto;
        const dados = req.body;
        
        if (!id_produto) {
            return res.status(400).json({ error: "ID do produto é obrigatório" });
        }
        
        // Validações básicas
        if (dados.nome && dados.nome.trim() === "") {
            return res.status(400).json({ error: "Nome do produto não pode estar vazio" });
        }
        if (dados.preco && Number(dados.preco) <= 0) {
            return res.status(400).json({ error: "Preço deve ser maior que zero" });
        }
        
        const resultado = await serviceProdutos.Atualizar(id_produto, dados);
        res.status(200).json(resultado);
    } catch (error) {
        console.error("Erro controller.produtos.Atualizar:", error);
        if (error.message.includes("não encontrado")) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: "Erro ao atualizar produto" });
    }
}

async function Excluir(req, res) {
    try {
        const id_produto = req.params.id_produto;
        
        if (!id_produto) {
            return res.status(400).json({ error: "ID do produto é obrigatório" });
        }
        
        const resultado = await serviceProdutos.Excluir(id_produto);
        res.status(200).json(resultado);
    } catch (error) {
        console.error("Erro controller.produtos.Excluir:", error);
        if (error.message.includes("não encontrado")) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: "Erro ao excluir produto" });
    }
}

export default {Listar, ListarByProduto, Inserir, Atualizar, Excluir};
