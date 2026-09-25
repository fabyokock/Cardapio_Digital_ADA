import { Produto } from "./produto.js";
import { Cardapio } from "./cardapio.js";

const meuCardapio = new Cardapio();
meuCardapio.carregarStorage(true);
meuCardapio.renderizarCardapio("cardapio-conteiner", true);

const form = document.getElementById("form-produto") as HTMLFormElement;
const conteinerDoCardapio = document.getElementById("cardapio-conteiner");
const campoBusca = document.getElementById("campo-busca") as HTMLInputElement;

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

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

    const novoPrato = new Produto(
      id,
      nomeInput,
      precoInput,
      descricaoInput,
      imagemUrl,
    );

    meuCardapio.adicionarProduto(novoPrato);
    meuCardapio.renderizarCardapio("cardapio-conteiner", true);

    form.reset();
  });
}

if (conteinerDoCardapio) {
  conteinerDoCardapio.addEventListener("click", (event) => {
    const alvo = event.target as HTMLElement;

    if (alvo.classList.contains("btn-deletar")) {
      const id = Number(alvo.getAttribute("data-id"));

      if (id) {
        const confirmou = confirm(`Tem certeza que deseja excluir esse item?`);

        if (confirmou) {
          meuCardapio.deletarProduto(id);
          meuCardapio.renderizarCardapio("cardapio-conteiner", true);
        }
      }
    }
  });
}

if (campoBusca) {
  campoBusca.addEventListener("input", () => {
    meuCardapio.filtrarPorNome(campoBusca.value, true);
  });
}
