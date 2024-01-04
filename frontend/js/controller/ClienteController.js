import ClienteView from "../view/ClienteView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de Cliente.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarClienteFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = ClienteView.renderizarClienteFormulario();
  document.getElementById("formulario_cliente").addEventListener("submit", cadastrarCliente);
}

/**
 * Cadastra um novo Cliente.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarCliente(event) {
  event.preventDefault();
  const NomecliValor = document.getElementById("Cliente_Nomecli_formulario").value;
  const Data_agendValor = document.getElementById("Cliente_Data_agend_formulario").value;
  const novoCliente = { Nomecli: NomecliValor, Data_agend: Data_agendValor };

  try {
    await fetch(`${API_BASE_URL}/clientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoCliente),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaClientes(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar Cliente:", error);
  }
}
/**
 * Renderiza a lista de Clientes.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaClientes(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/clientes");
    const ClientesBD = await response.json(); 

    const Clientes = ClientesBD.map((row) => {
      return {
        CPF: row.CPF,
        Nomecli: row.Nomecli,
        Data_agend: row.Data_agend
      };
    });
    componentePrincipal.innerHTML = ClienteView.renderizarTabelaCliente(Clientes);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar Clientes:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de Cliente.
 * Cada botão, quando clicado, aciona a função de exclusão de Cliente correspondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const ClienteCPF = this.getAttribute("cliente-id");
      excluirCliente(ClienteCPF);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de Cliente.
 * Cada botão, quando clicado, aciona a função de buscar a Cliente específica para atualização.
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const ClienteCPF = this.getAttribute("cliente-atualizar-id");
      buscarCliente(ClienteCPF);
    });
  });
}

/**
 * Exclui uma Cliente específica com base no cnpj.
 * Após a exclusão bem-sucedcnpja, a lista de Clientees é atualizada.
 * @param {string} CPF - cnpj da Cliente a ser excluída.
 */
async function excluirCliente(CPF) {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes/${CPF}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir o Cliente");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaClientes(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir a Cliente:", error);
  }
}

/**
 * Busca uma Cliente específica para atualização, com base no cnpj.
 * Após encontrar a Cliente, renderiza o formulário de atualização.
 * @param {string} CPF - cnpj da Cliente a ser buscada.
 */
async function buscarCliente(CPF) {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes/${CPF}`);
    const ClientesBD = await response.json();
    if (ClientesBD.length <= 0) return;

    const Cliente = ClientesBD.map(row => ({
      CPF: row.CPF,
      Nomecli: row.Nomecli,
      Data_agend: row.Data_agend,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = ClienteView.renderizarFormularioClienteAtualizar(Cliente);
    document.getElementById("formulario_cliente_atualizar").addEventListener("submit", atualizarCliente);
  } catch (error) {
    console.error("Erro ao buscar Cliente:", error);
  }
}

/**
 * Atualiza um Cliente específico.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarCliente(event) {
  event.preventDefault();

  const CPFValor = document.getElementById("Cliente_CPF_formulario").value;
  const NomecliValor = document.getElementById("Cliente_Nomecli_formulario").value;
  const Data_agendValor = document.getElementById("Cliente_Data_agend_formulario").value;
  const Cliente = {CPF: CPFValor, Nomecli: NomecliValor,Data_agend: Data_agendValor,};

  try {
    const response = await fetch(`${API_BASE_URL}/clientes`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(Cliente),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar o Cliente");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaClientes(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar Cliente:", error);
  }
}

const ClienteController = {
  renderizarClienteFormulario,
  cadastrarCliente,
  renderizarListaClientes,
  excluirCliente,
};

export default ClienteController;
