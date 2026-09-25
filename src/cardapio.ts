import { Produto } from "./produto.js";

export class Cardapio {
  static readonly CHAVE_STORAGE = "cardapio_produtos";

  produtos: Produto[];
  constructor() {
    this.produtos = [];
  }

  adicionarProduto(produto: Produto): void {
    this.produtos.push(produto);
    this.salvarStorage();
    this.renderizarCardapio("cardapio-conteiner", true);
  }

  deletarProduto(id: number): void {
    this.produtos = this.produtos.filter((produto) => produto.id !== id);
    this.salvarStorage();
    this.renderizarCardapio("cardapio-conteiner", true);
  }

  filtrarPorNome(termo: string, modoAdmin: boolean = false): void {
    const termoFormatado = termo.toLowerCase().trim();

    const produtosFiltrados = this.produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(termoFormatado),
    );

    const conteiner = document.getElementById("cardapio-conteiner");

    if (!conteiner) return;

    let htmlFinal = "";

    for (const produto of produtosFiltrados) {
      htmlFinal += produto.gerarHTML(modoAdmin);
    }

    conteiner.innerHTML = htmlFinal;
  }

  renderizarCardapio(idDoConteiner: string, modoAdmin: boolean = false): void {
    const conteiner = document.getElementById(idDoConteiner);

    if (!conteiner) return;

    let htmlFinal = "";
    for (const produto of this.produtos) {
      htmlFinal += produto.gerarHTML(modoAdmin);
    }

    conteiner.innerHTML = htmlFinal;
  }

  salvarStorage(): void {
    const dadosParaSalvar = JSON.stringify(this.produtos);
    localStorage.setItem(Cardapio.CHAVE_STORAGE, dadosParaSalvar);
  }

  carregarStorage(modoAdmin: boolean = false): void {
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
