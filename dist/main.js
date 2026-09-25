import { Cardapio } from "./cardapio.js";
const meuCardapio = new Cardapio();
// Tenta carregar do localStorage
meuCardapio.carregarStorage(false);
// Renderiza os produtos na tela principal no modo padrão (modoAdmin = false)
meuCardapio.renderizarCardapio("cardapio-conteiner", false);
// Evento do campo de busca na página principal
const campoBusca = document.getElementById("campo-busca");
if (campoBusca) {
    campoBusca.addEventListener("input", () => {
        meuCardapio.filtrarPorNome(campoBusca.value, false);
    });
}
//# sourceMappingURL=main.js.map