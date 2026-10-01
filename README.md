# Cardapio_Digital_ADA
Projeto: Cardápio Digital (Frontend)

Aplicação web interativa. Projeto final do Módulo 02 **Programação Orientada a Objetos (POO)**. CAIXAVERSO – Formação Continuada 4 | Dev Front-end – I. ADA TECH.

---

## Funcionalidades

### Visão do Cliente (`index.html`)

- **Visualização de produtos:** Exibição clara e organizada de todos os itens do cardápio.
- **Cálculo dinâmico de preços:** Preços calculados em tempo real de acordo com as regras de cada categoria.
- **Busca em tempo real:** Filtragem instantânea de produtos por nome.

### Painel Administrativo (`admin.html`)

- **Cadastro de produtos:** Registro de novas bebidas ou lanches com upload local de imagem.
- **Gerenciamento do cardápio:** Exclusão de itens com sincronização imediata no `localStorage`.
- **Gestão de vendas:** Registro e montagem de comandas/vendas ativas.
- **Controle financeiro:** Acompanhamento do faturamento acumulado total.

---

## Conceitos de POO Aplicados

- **Interface (`ProdutoRenderizavel`):** Contrato que define a estrutura e os métodos obrigatórios dos produtos.
- **Classe Abstrata (`Produto`):** Classe-base que centraliza propriedades comuns (`id`, `nome`, `precoBase`, `descricao`, `imagemUrl`) e impede instâncias diretas.
- **Herança & Polimorfismo (`Bebida` e `Lanche`):**
  - **`Bebida`:** Adiciona uma taxa fixa de R$ 1,50 ao preço base.
  - **`Lanche`:** Aplica 10% de desconto promocional ao preço base.
  - **`gerarHTML()`:** Método sobrescrito/personalizado para incluir ou ocultar botões de ação administrativa dependendo do contexto.
- **Encapsulamento (`Venda`):** Controle interno de itens e fechamento de comanda com acúmulo de faturamento global estático.
- **Persistência (`Cardapio`):** Gerenciamento do armazenamento via `localStorage`, preservando o comportamento das classes concretas após recarregar a página.

---

## Estrutura do Projeto

```text
.
├── index.html          # Interface do cliente
├── admin.html          # Painel administrativo e vendas
├── styles/
│   └── style.css       # Estilização da aplicação
├── src/
│   ├── produto.ts      # Interface, classe abstrata Produto e subclasses (Bebida e Lanche)
│   ├── venda.ts        # Classe Venda e gestão de faturamento
│   ├── cardapio.ts     # Classe Cardapio, renderização e localStorage
│   ├── main.ts         # Script de inicialização do index.html
│   └── admin.ts        # Script de inicialização e eventos do admin.html
├── dist/               # Arquivos JavaScript compilados pelo TypeScript
└── tsconfig.json       # Configurações do compilador TypeScript
```

---

## Alunos 

- Bruna Pozza
- Fabyo Kock
- Nailson Lira

