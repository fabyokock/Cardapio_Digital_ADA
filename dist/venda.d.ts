import { Produto } from "./produto.js";
export declare class Venda {
    private readonly produtos;
    private fechada;
    static faturamentoTotal: number;
    constructor();
    adicionar(produto: Produto): void;
    get total(): number;
    get itens(): readonly Produto[];
    finalizar(): void;
    get isFechada(): boolean;
}
//# sourceMappingURL=venda.d.ts.map