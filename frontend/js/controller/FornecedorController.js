import FornecedorView from "../view/FornecedorView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de Fornecedor.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarFornecedorFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = FornecedorView.renderizarFornecedorFormulario();
  document.getElementById("formulario_fornecedor").addEventListener("submit", cadastrarFornecedor);
}

/**
 * Cadastra um novo Fornecedor.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarFornecedor(event) {
  event.preventDefault();
  const NoforneValor = document.getElementById("fornecedor_Noforne_formulario").value;
  const NofantValor = document.getElementById("fornecedor_Nofant_formulario").value;
  const novaFornecedor = { Noforne: NoforneValor, Nofant: NofantValor };

  try {
    await fetch(`${API_BASE_URL}/fornecedores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaFornecedor),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaFornecedores(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar Fornecedor:", error);
  }
}
/**
 * Renderiza a lista de Fornecedores.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaFornecedores(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/fornecedores");
    const FornecedoresBD = await response.json(); 

    const Fornecedores = FornecedoresBD.map((row) => {
      return {
        cnpj: row.CNPJ,
        Noforne: row.Noforne,
        Nofant: row.Nofant
      };
    });
    componentePrincipal.innerHTML = FornecedorView.renderizarTabelafornecedor(Fornecedores);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar Fornecedores:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de Fornecedor.
 * Cada botão, quando clicado, aciona a função de exclusão de Fornecedor correspondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const Fornecedorcnpj = this.getAttribute("fornecedor-id");
      excluirFornecedor(Fornecedorcnpj);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de Fornecedor.
 * Cada botão, quando clicado, aciona a função de buscar a Fornecedor específica para atualização.
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const Fornecedorcnpj = this.getAttribute("fornecedor-atualizar-id");
      buscarFornecedor(Fornecedorcnpj);
    });
  });
}

/**
 * Exclui uma Fornecedor específica com base no cnpj.
 * Após a exclusão bem-sucedcnpja, a lista de Fornecedores é atualizada.
 * @param {string} cnpj - cnpj da Fornecedor a ser excluída.
 */
async function excluirFornecedor(cnpj) {
  try {
    const response = await fetch(`${API_BASE_URL}/fornecedores/${cnpj}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir o fornecedor");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaFornecedores(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir a Fornecedor:", error);
  }
}

/**
 * Busca uma Fornecedor específica para atualização, com base no cnpj.
 * Após encontrar a Fornecedor, renderiza o formulário de atualização.
 * @param {string} cnpj - cnpj da Fornecedor a ser buscada.
 */
async function buscarFornecedor(cnpj) {
  try {
    const response = await fetch(`${API_BASE_URL}/fornecedores/${cnpj}`);
    const FornecedoresBD = await response.json();
    if (FornecedoresBD.length <= 0) return;

    const Fornecedor = FornecedoresBD.map(row => ({
      cnpj: row.CNPJ,
      Noforne: row.Noforne,
      Nofant: row.Nofant,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = FornecedorView.renderizarFormulariofornecedorAtualizar(Fornecedor);
    document.getElementById("formulario_Fornecedor_atualizar").addEventListener("submit", atualizarFornecedor);
  } catch (error) {
    console.error("Erro ao buscar fornecedor:", error);
  }
}

/**
 * Atualiza um Fornecedor específico.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarFornecedor(event) {
  event.preventDefault();

  const cnpjValor = document.getElementById("fornecedor_cnpj_formulario").value;
  const NoforneValor = document.getElementById("fornecedor_Noforne_formulario").value;
  const NofantValor = document.getElementById("fornecedor_Nofant_formulario").value;
  const Fornecedor = {cnpj: cnpjValor, Noforne: NoforneValor,Nofant: NofantValor,};

  try {
    const response = await fetch(`${API_BASE_URL}/Fornecedores`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(Fornecedor),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar o fornecedor");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaFornecedores(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar Fornecedor:", error);
  }
}

const FornecedorController = {
  renderizarFornecedorFormulario,
  cadastrarFornecedor,
  renderizarListaFornecedores,
  excluirFornecedor,
};

export default FornecedorController;
