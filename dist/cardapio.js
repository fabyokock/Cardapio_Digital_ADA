import { Produto } from "./produto.js";
export class Cardapio {
    static CHAVE_STORAGE = "cardapio_produtos";
    produtos;
    constructor() {
        this.produtos = [];
    }
    adicionarProduto(produto) {
        this.produtos.push(produto);
        this.salvarStorage();
        this.renderizarCardapio("cardapio-conteiner", true);
    }
    deletarProduto(id) {
        this.produtos = this.produtos.filter((produto) => produto.id !== id);
        this.salvarStorage();
        this.renderizarCardapio("cardapio-conteiner", true);
    }
    filtrarPorNome(termo, modoAdmin = false) {
        const termoFormatado = termo.toLowerCase().trim();
        const produtosFiltrados = this.produtos.filter((produto) => produto.nome.toLowerCase().includes(termoFormatado));
        const conteiner = document.getElementById("cardapio-conteiner");
        if (!conteiner)
            return;
        let htmlFinal = "";
        for (const produto of produtosFiltrados) {
            htmlFinal += produto.gerarHTML(modoAdmin);
        }
        conteiner.innerHTML = htmlFinal;
    }
    renderizarCardapio(idDoConteiner, modoAdmin = false) {
        const conteiner = document.getElementById(idDoConteiner);
        if (!conteiner)
            return;
        let htmlFinal = "";
        for (const produto of this.produtos) {
            htmlFinal += produto.gerarHTML(modoAdmin);
        }
        conteiner.innerHTML = htmlFinal;
    }
    salvarStorage() {
        const dadosParaSalvar = JSON.stringify(this.produtos);
        localStorage.setItem(Cardapio.CHAVE_STORAGE, dadosParaSalvar);
    }
    carregarStorage(modoAdmin = false) {
        const dadosSalvos = localStorage.getItem("cardapio_produtos");
        if (dadosSalvos) {
            const produtosObjetos = JSON.parse(dadosSalvos);
            this.produtos = [];
            for (const item of produtosObjetos) {
                const id = item._id ?? item.id;
                const nome = item._nome ?? item.nome ?? "";
                const preco = item._preco ?? item.preco ?? 0;
                const descricao = item._descricao ?? item.descricao ?? "";
                const imagemUrl = item._imagemUrl ?? item.imagemUrl ?? "";
                const novoProduto = new Produto(id, nome, preco, descricao, imagemUrl);
                this.produtos.push(novoProduto);
            }
            this.renderizarCardapio("cardapio-conteiner", modoAdmin);
        }
    }
}
//# sourceMappingURL=cardapio.js.map