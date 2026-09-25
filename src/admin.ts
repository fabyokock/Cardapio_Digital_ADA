import { Bebida, Lanche } from "./produto.js";
import { Cardapio } from "./cardapio.js";
import { Venda } from "./venda.js";

const meuCardapio = new Cardapio();
meuCardapio.carregarStorage(true);

// Instância da venda atual no painel administrativo
let vendaAtual = new Venda();

// Elementos DOM da Tela Administrativa
const form = document.getElementById("form-produto") as HTMLFormElement;
const conteinerDoCardapio = document.getElementById("cardapio-conteiner");
const campoBusca = document.getElementById("campo-busca") as HTMLInputElement;

const elTotalVenda = document.getElementById("total-venda-atual");
const elFaturamento = document.getElementById("faturamento-total");
const elListaVenda = document.getElementById("lista-venda-atual");
const btnFinalizarVenda = document.getElementById("btn-finalizar-venda");

// Atualiza o painel visual da venda
function atualizarPainelVenda() {
  if (elListaVenda) {
    elListaVenda.innerHTML = vendaAtual.itens
      .map(
        (p) => `
          <li class="item-venda">
            <span>${p.nome}</span>
            <span>${p.precoFormatado}</span>
          </li>
        `,
      )
      .join("");
  }

  if (elTotalVenda) {
    elTotalVenda.textContent = vendaAtual.total.toFixed(2);
  }

  if (elFaturamento) {
    elFaturamento.textContent = Venda.faturamentoTotal.toFixed(2);
  }
}

// Evento: Submissão de Formulário de Novo Produto
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const tipo = (document.getElementById("tipo-produto") as HTMLSelectElement)
      .value;
    const nomeInput = (document.getElementById("nome") as HTMLInputElement)
      .value;
    const precoInput = parseFloat(
      (document.getElementById("preco") as HTMLInputElement).value,
    );
    const descricaoInput = (
      document.getElementById("descricao") as HTMLInputElement
    ).value;
    const inputArquivo = document.getElementById(
      "imagemFile",
    ) as HTMLInputElement;

    const arquivo = inputArquivo.files ? inputArquivo.files[0] : null;
    const imagemUrl = arquivo
      ? URL.createObjectURL(arquivo)
      : "https://via.placeholder.com/300x180?text=Sem+Imagem";

    const id = Date.now();

    // Criação polimórfica com base no tipo selecionado
    const novoProduto =
      tipo === "bebida"
        ? new Bebida(id, nomeInput, precoInput, descricaoInput, imagemUrl)
        : new Lanche(id, nomeInput, precoInput, descricaoInput, imagemUrl);

    meuCardapio.adicionarProduto(novoProduto);
    meuCardapio.renderizarCardapio("cardapio-conteiner", true);

    form.reset();
  });
}

// Evento: Ações de clique no cardápio (Deletar e Adicionar à Venda)
if (conteinerDoCardapio) {
  conteinerDoCardapio.addEventListener("click", (event) => {
    const alvo = event.target as HTMLElement;
    const id = Number(alvo.getAttribute("data-id"));
    if (!id) return;

    if (alvo.classList.contains("btn-deletar")) {
      if (confirm(`Tem certeza que deseja excluir esse item?`)) {
        meuCardapio.deletarProduto(id);
        meuCardapio.renderizarCardapio("cardapio-conteiner", true);
      }
    } else if (alvo.classList.contains("btn-adicionar-venda")) {
      const produto = meuCardapio.buscarPorId(id);
      if (produto) {
        vendaAtual.adicionar(produto);
        atualizarPainelVenda();
      }
    }
  });
}

// Evento: Finalizar Venda Atual
if (btnFinalizarVenda) {
  btnFinalizarVenda.addEventListener("click", () => {
    if (vendaAtual.itens.length === 0) {
      alert("Adicione pelo menos um produto para finalizar a venda.");
      return;
    }
    vendaAtual.finalizar();
    atualizarPainelVenda();

    // Prepara uma nova venda zerada
    vendaAtual = new Venda();
    alert("Venda realizada com sucesso!");
  });
}

// Evento: Busca por nome
if (campoBusca) {
  campoBusca.addEventListener("input", () => {
    meuCardapio.filtrarPorNome(campoBusca.value, true);
  });
}
