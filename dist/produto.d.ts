export declare class Produto {
    private static ultimoId;
    private _id;
    private _nome;
    private _preco;
    private _descricao;
    private _imagemUrl;
    constructor(id: number, nome: string, preco: number, descricao: string, imagemUrl: string);
    static gerarNovoId(): number;
    get id(): number;
    get nome(): string;
    set nome(novoNome: string);
    get preco(): number;
    set preco(novoPreco: number);
    get descricao(): string;
    get imagemUrl(): string;
    get precoFormatado(): string;
    gerarHTML(mostrarAcoes?: boolean): string;
}
//# sourceMappingURL=produto.d.ts.map