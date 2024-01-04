/**
 * Renderiza o formulário para criar uma nova cliente.
 * @return {string} HTML do formulário de criação de cliente.
 */
function  renderizarClienteFormulario() {
  return `
          <form class="mt-3" id="formulario_cliente">
              <div class="form-group">
                  <label for="cliente_Nomecli"> Nome do cliente:</label>
                  <input type="text" class="form-control" id="Cliente_Nomecli_formulario">
              </div>
              <div class="form-group">
                  <label for="cliente_Data_agend"> Data do agendamento:</label>
                  <textarea class="form-control" id="Cliente_Data_agend_formulario"></textarea>
              </div>
              <button type="submit" class="btn btn-primary mt-2">Salvar</button>
          </form>
      `;
}

/**
 * Renderiza o formulário para atualizar uma cliente existente.
 * @param {Object} cliente - A cliente a ser atualizada.
 * @return {string} HTML do formulário de atualização de cliente.
 */
function renderizarFormularioClienteAtualizar(cliente) {
    return `
            <form class="mt-3" id="formulario_cliente_atualizar">
                <input type="hidden" class="form-control" id="Cliente_CPF_formulario" value="${cliente.CPF}">
                <div class="form-group">
                    <label for="cliente_Nomecli"> Nome do cliente:</label>
                    <input type="text" class="form-control" id="Cliente_Nomecli_formulario" value="${cliente.Nomecli}">
                </div>
                <div class="form-group">
                    <label for="cliente_Data_agend"> Data do agendamento:</label>
                    <textarea class="form-control" id="Cliente_Data_agend_formulario">${cliente.Data_agend}</textarea>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
}

  /**
 * Renderiza a tabela de clientes.
 * @param {Array} clientes - Lista de clientes a serem exibi-las.
 * @return {string} HTML da tabela de clientes.
 */
function renderizarTabelaCliente(clientes) {
  let tabela = `
          <table class="table table-striped mt-3">
              <thead>
                  <tr>
                      <th>Nome do cliente</th>
                      <th>Data</th>
                      <th>Ações</th>
                  </tr>
              </thead>
              <tbody>
      `;

  clientes.forEach((cliente) => {
    tabela += `
              <tr>
                  <td>${cliente.Nomecli}</td>
                  <td>${cliente.Data_agend}</td>
                  <td>
                    <button class="excluir-btn" cliente-id=${cliente.CPF}>Excluir</button>
                    <button class="atualizar-btn" cliente-atualizar-id=${cliente.CPF}>Atualizar</button>
                  </td>
              </tr>
          `;
  });

  tabela += `
              </tbody>
          </table>
      `;

  return tabela;
}

const clienteView = {
    renderizarClienteFormulario,
    renderizarTabelaCliente,
    renderizarFormularioClienteAtualizar
};

export default clienteView;
