import { Produto, Bebida, Lanche } from "./produto.js";

export class Cardapio {
  static readonly CHAVE_STORAGE = "cardapio_produtos";

  produtos: Produto[];
  constructor() {
    this.produtos = [];
  }

  adicionarProduto(produto: Produto): void {
    this.produtos.push(produto);
    this.salvarStorage();
  }

  deletarProduto(id: number): void {
    this.produtos = this.produtos.filter((produto) => produto.id !== id);
    this.salvarStorage();
  }

  buscarPorId(id: number): Produto | undefined {
    return this.produtos.find((p) => p.id === id);
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
      // Chama dinamicamente o gerarHTML correto de cada classe filha (Polimorfismo)
      htmlFinal += produto.gerarHTML(modoAdmin);
    }

    conteiner.innerHTML = htmlFinal;
  }

  salvarStorage(): void {
    // Salva identificando a classe concreta do produto
    const dadosParaSalvar = this.produtos.map((p) => ({
      id: p.id,
      nome: p.nome,
      precoBase: p.precoBase,
      descricao: p.descricao,
      imagemUrl: p.imagemUrl,
      tipo: p instanceof Bebida ? "bebida" : "lanche",
    }));

    localStorage.setItem(
      Cardapio.CHAVE_STORAGE,
      JSON.stringify(dadosParaSalvar),
    );
  }

  carregarStorage(modoAdmin: boolean = false): void {
    const dadosSalvos = localStorage.getItem(Cardapio.CHAVE_STORAGE);

    if (dadosSalvos) {
      const produtosObjetos = JSON.parse(dadosSalvos);
      this.produtos = [];

      for (const item of produtosObjetos) {
        const id = item.id ?? item._id;
        const nome = item.nome ?? item._nome ?? "";
        const precoBase = item.precoBase ?? item.preco ?? item._preco ?? 0;
        const descricao = item.descricao ?? item._descricao ?? "";
        const imagemUrl = item.imagemUrl ?? item._imagemUrl ?? "";
        const tipo = item.tipo;

        // Reinstancia a classe concreta correta preservando as regras de preço e HTML
        let novoProduto: Produto;
        if (tipo === "bebida") {
          novoProduto = new Bebida(id, nome, precoBase, descricao, imagemUrl);
        } else {
          novoProduto = new Lanche(id, nome, precoBase, descricao, imagemUrl);
        }

        this.produtos.push(novoProduto);
      }
      this.renderizarCardapio("cardapio-conteiner", modoAdmin);
    }
  }
}
