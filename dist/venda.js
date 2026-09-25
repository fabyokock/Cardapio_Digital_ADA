import { Produto } from "./produto.js";
export class Venda {
    // Lista encapsulada protegida de acessos externos diretos
    produtos;
    fechada;
    // Membro estático para acumular o faturamento global do restaurante
    static faturamentoTotal = 0;
    constructor() {
        this.produtos = [];
        this.fechada = false;
    }
    // Adiciona item de forma controlada
    adicionar(produto) {
        if (!this.fechada) {
            this.produtos.push(produto);
        }
    }
    // Getter para calcular o total acumulado da venda atual usando o polimorfismo dos produtos
    get total() {
        return this.produtos.reduce((acc, prod) => acc + prod.calcularPrecoFinal(), 0);
    }
    // Retorna cópia da lista interna para renderização sem permitir modificação direta
    get itens() {
        return [...this.produtos];
    }
    // Finaliza a venda e incrementa o faturamento estático
    finalizar() {
        if (!this.fechada && this.produtos.length > 0) {
            Venda.faturamentoTotal += this.total;
            this.fechada = true;
        }
    }
    get isFechada() {
        return this.fechada;
    }
}
//# sourceMappingURL=venda.js.map