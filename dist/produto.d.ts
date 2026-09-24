export declare class Produto {
    private static ultimoId;
    private _id;
    private _nome;
    private _preco;
    private _descricao;
    private _imagemUrl;
    constructor(id: number, nome: string, preco: number, descricao: string, imagemUrl: string);
    gerarHTML(mostrarAcoes?: boolean): string;
}
//# sourceMappingURL=produto.d.ts.map