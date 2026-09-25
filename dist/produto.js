// Classe-base abstrata que implementa a interface
export class Produto {
    id;
    nome;
    precoBase;
    descricao;
    imagemUrl;
    constructor(id, nome, precoBase, descricao, imagemUrl) {
        this.id = id;
        this.nome = nome;
        this.precoBase = precoBase;
        this.descricao = descricao;
        this.imagemUrl = imagemUrl;
    }
    // Getter auxiliar para formatar o preço final retornado por cada subclasse
    get precoFormatado() {
        return `R$ ${this.calcularPrecoFinal().toFixed(2)}`;
    }
}
// Subclasse 1: Bebida (Especialização que adiciona taxa de R$ 1,50)
export class Bebida extends Produto {
    constructor(id, nome, precoBase, descricao, imagemUrl) {
        super(id, nome, precoBase, descricao, imagemUrl);
    }
    // Polimorfismo: Preço base + taxa de serviço/embalagem
    calcularPrecoFinal() {
        return this.precoBase + 1.5;
    }
    // Polimorfismo: Renderização personalizada para Bebida
    // Bebida
    gerarHTML(modoAdmin = false) {
        const botaoDeletar = modoAdmin
            ? `<button class="btn-deletar" data-id="${this.id}">Deletar</button>`
            : "";
        const botaoVenda = modoAdmin
            ? `<button class="btn-adicionar-venda" data-id="${this.id}">+ Venda</button>`
            : "";
        return `
    <div class="card-produto" data-id="${this.id}">
      <img src="${this.imagemUrl}" alt="${this.nome}" class="card-imagem">
      <div class="card-corpo">
        <h3 class="card-nome">${this.nome}</h3>
        <p class="card-descricao">${this.descricao}</p>
        <span class="card-preco">${this.precoFormatado}</span>
        <div class="card-acoes">
          ${botaoVenda}
          ${botaoDeletar}
        </div>
      </div>
    </div>
  `;
    }
}
// Subclasse 2: Lanche (oferece 10% de desconto promocional)
export class Lanche extends Produto {
    constructor(id, nome, precoBase, descricao, imagemUrl) {
        super(id, nome, precoBase, descricao, imagemUrl);
    }
    // Polimorfismo: Aplica 10% de desconto no preço final
    calcularPrecoFinal() {
        return this.precoBase * 0.9;
    }
    // Lanche — mesma estrutura, só troca o cálculo de preço (herdado do polimorfismo)
    gerarHTML(modoAdmin = false) {
        const botaoDeletar = modoAdmin
            ? `<button class="btn-deletar" data-id="${this.id}">Deletar</button>`
            : "";
        const botaoVenda = modoAdmin
            ? `<button class="btn-adicionar-venda" data-id="${this.id}">+ Venda</button>`
            : "";
        return `
    <div class="card-produto" data-id="${this.id}">
      <img src="${this.imagemUrl}" alt="${this.nome}" class="card-imagem">
      <div class="card-corpo">
        <h3 class="card-nome">${this.nome}</h3>
        <p class="card-descricao">${this.descricao}</p>
        <span class="card-preco">${this.precoFormatado}</span>
        <div class="card-acoes">
          ${botaoVenda}
          ${botaoDeletar}
        </div>
      </div>
    </div>
  `;
    }
}
//# sourceMappingURL=produto.js.map