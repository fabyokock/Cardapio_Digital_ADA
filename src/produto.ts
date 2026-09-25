export class Produto {
  private static ultimoId: number = 1000;

  private _id: number;
  private _nome: string = "";
  private _preco: number = 0;
  private _descricao: string;
  private _imagemUrl: string;

  constructor(
    id: number,
    nome: string,
    preco: number,
    descricao: string,
    imagemUrl: string,
  ) {
    this._id = id;
    this.nome = nome;
    this.preco = preco;
    this._descricao = descricao;
    this._imagemUrl = imagemUrl;
  }

  // --- MÉTODOS ESTÁTICOS ---

  static gerarNovoId(): number {
    this.ultimoId++;
    return this.ultimoId;
  }

  // --- GETTERS E SETTERS ---

  get id(): number {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(novoNome: string) {
    if (typeof novoNome === "string") {
      const nomeLimpo = novoNome.trim();
      if (nomeLimpo.length >= 3) {
        this._nome = nomeLimpo;
      } else {
        console.warn(`O nome do produto deve ter pelo menos 03 caracteres.`);
      }
    } else {
      console.warn(`Nome inválido fornecido ao produto.`);
    }
  }

  get preco(): number {
    return this._preco;
  }

  set preco(novoPreco: number) {
    if (novoPreco > 0) {
      this._preco = novoPreco;
    } else {
      console.warn(`O preço deve ser um valor maior que zero.`);
    }
  }

  get descricao(): string {
    return this._descricao;
  }

  get imagemUrl(): string {
    return this._imagemUrl;
  }

  get precoFormatado(): string {
    return `R$ ${this._preco.toFixed(2)}`;
  }

  // Retorna o HTML do card visual do produto
  gerarHTML(mostrarAcoes: boolean = false): string {
    const botaoDeletar = mostrarAcoes
      ? `<div class="card-acoes"><button class="btn-deletar" data-id="${this.id}">Deletar</button></div>`
      : ""; //se não for false(true), cria o botão deletar

    return `
  <div class="card-produto">
      <img src="${this.imagemUrl}" alt="${this.nome}"> 
      <div class="card-conteudo">
          <h3>${this.nome}</h3>
          <p class="descricao">${this.descricao}</p>
          <p class="preco">${this.precoFormatado}</p>
          ${botaoDeletar}
      </div> 
  </div>`;
  }
}
