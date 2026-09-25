import { Produto } from "./produto.js";

export class Venda {
  // Lista encapsulada protegida de acessos externos diretos
  private readonly produtos: Produto[];
  private fechada: boolean;

  // Membro estático para acumular o faturamento global do restaurante
  static faturamentoTotal: number = 0;

  constructor() {
    this.produtos = [];
    this.fechada = false;
  }

  // Adiciona item de forma controlada
  adicionar(produto: Produto): void {
    if (!this.fechada) {
      this.produtos.push(produto);
    }
  }

  // Getter para calcular o total acumulado da venda atual usando o polimorfismo dos produtos
  get total(): number {
    return this.produtos.reduce(
      (acc, prod) => acc + prod.calcularPrecoFinal(),
      0,
    );
  }

  // Retorna cópia da lista interna para renderização sem permitir modificação direta
  get itens(): readonly Produto[] {
    return [...this.produtos];
  }

  // Finaliza a venda e incrementa o faturamento estático
  finalizar(): void {
    if (!this.fechada && this.produtos.length > 0) {
      Venda.faturamentoTotal += this.total;
      this.fechada = true;
    }
  }

  get isFechada(): boolean {
    return this.fechada;
  }
}
