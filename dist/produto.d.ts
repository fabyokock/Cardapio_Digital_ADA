export interface ProdutoRenderizavel {
    readonly id: number;
    nome: string;
    calcularPrecoFinal(): number;
    gerarHTML(modoAdmin?: boolean): string;
}
export declare abstract class Produto implements ProdutoRenderizavel {
    readonly id: number;
    nome: string;
    precoBase: number;
    descricao: string;
    imagemUrl: string;
    constructor(id: number, nome: string, precoBase: number, descricao: string, imagemUrl: string);
    abstract calcularPrecoFinal(): number;
    abstract gerarHTML(modoAdmin?: boolean): string;
    get precoFormatado(): string;
}
export declare class Bebida extends Produto {
    constructor(id: number, nome: string, precoBase: number, descricao: string, imagemUrl: string);
    calcularPrecoFinal(): number;
    gerarHTML(modoAdmin?: boolean): string;
}
export declare class Lanche extends Produto {
    constructor(id: number, nome: string, precoBase: number, descricao: string, imagemUrl: string);
    calcularPrecoFinal(): number;
    gerarHTML(modoAdmin?: boolean): string;
}
//# sourceMappingURL=produto.d.ts.map