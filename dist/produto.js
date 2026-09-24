export class Produto {
    static ultimoId = 1000;
    _id;
    _nome = "";
    _preco = 0;
    _descricao;
    _imagemUrl;
    constructor(id, nome, preco, descricao, imagemUrl) {
        this._id = id;
        this.nome = nome;
        this.preco = preco;
        this._descricao = descricao;
        this._imagemUrl = imagemUrl;
    }
    // --- MÉTODOS ESTÁTICOS ---
    static gerarNovoId() {
        this.ultimoId++;
        return this.ultimoId;
    }
    // --- GETTERS E SETTERS ---
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    set nome(novoNome) {
        if (typeof novoNome === "string") {
            const nomeLimpo = novoNome.trim();
            if (nomeLimpo.length >= 3) {
                this._nome = nomeLimpo;
            }
            else {
                console.warn(`O nome do produto deve ter pelo menos 03 caracteres.`);
            }
        }
        else {
            console.warn(`Nome inválido fornecido ao produto.`);
        }
    }
    get preco() {
        return this._preco;
    }
    set preco(novoPreco) {
        if (novoPreco > 0) {
            this._preco = novoPreco;
        }
        else {
            console.warn(`O preço deve ser um valor maior que zero.`);
        }
    }
    get descricao() {
        return this._descricao;
    }
    get imagemUrl() {
        return this._imagemUrl;
    }
    get precoFormatado() {
        return `R$ ${this._preco.toFixed(2)}`;
    }
    // Retorna o HTML do card visual do produto
    gerarHTML(mostrarAcoes = false) {
        const botaoDeletar = mostrarAcoes
            ? `<div class="card-acoes"><button class="btn-deletar" data-id="${this.id}">Deletar</button></div>`
            : ''; //se não for false(true), cria o botão deletar
        return `
  <div class="card-produto">
      <img src="${this.imagemUrl}" alt="${this.nome}"> 
      <div class="card-conteudo">
          <h3>${this.nome}</h3>
          <p class="descricao">${this.descricao}</p>
          <p class="preco">${this.preco.toFixed(2)}</p>
          ${botaoDeletar}
      </div> 
  </div>`;
    }
}
//# sourceMappingURL=produto.js.map