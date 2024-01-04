/**
 * Renderiza o formulário para criar uma nova fornecedor.
 * @return {string} HTML do formulário de criação de fornecedor.
 */
function renderizarFornecedorFormulario() {
  return `
          <form class="mt-3" id="formulario_fornecedor">
              <div class="form-group">
                  <label for="fornecedor_Noforne">Nome do fornecedor:</label>
                  <input type="text" class="form-control" id="fornecedor_Noforne_formulario">
              </div>
              <div class="form-group">
                  <label for="fornecedor_Nofant">Nome fantasia:</label>
                  <textarea class="form-control" id="fornecedor_Nofant_formulario"></textarea>
              </div>
              <button type="submit" class="btn btn-primary mt-2">Salvar</button>
          </form>
      `;
}

/**
 * Renderiza o formulário para atualizar uma fornecedor existente.
 * @param {Object} fornecedor - A fornecedor a ser atualizada.
 * @return {string} HTML do formulário de atualização de fornecedor.
 */
function renderizarFormulariofornecedorAtualizar(fornecedor) {
    return `
            <form class="mt-3" id="formulario_Fornecedor_atualizar">
                <input type="hidden" class="form-control" id="fornecedor_cnpj_formulario" value="${fornecedor.cnpj}">
                <div class="form-group">
                    <label for="fornecedor_Noforne">Título da fornecedor:</label>
                    <input type="text" class="form-control" id="fornecedor_Noforne_formulario" value="${fornecedor.Noforne}">
                </div>
                <div class="form-group">
                    <label for="fornecedor_Nofant">Descrição:</label>
                    <textarea class="form-control" id="fornecedor_Nofant_formulario">${fornecedor.Nofant}</textarea>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
}

  /**
 * Renderiza a tabela de fornecedors.
 * @param {Array} fornecedores - Lista de fornecedors a serem exibcnpjas.
 * @return {string} HTML da tabela de fornecedors.
 */
function renderizarTabelafornecedor(fornecedores) {
  let tabela = `
          <table class="table table-striped mt-3">
              <thead>
                  <tr>
                      <th>Nome do fornecedor</th>
                      <th>Nome fantasia</th>
                      <th>Ações</th>
                  </tr>
              </thead>
              <tbody>
      `;

  fornecedores.forEach((fornecedor) => {
    tabela += `
              <tr>
                  <td>${fornecedor.Noforne}</td>
                  <td>${fornecedor.Nofant}</td>
                  <td>
                    <button class="excluir-btn" fornecedor-id=${fornecedor.cnpj}>Excluir</button>
                    <button class="atualizar-btn" fornecedor-atualizar-id=${fornecedor.cnpj}>Atualizar</button>
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

const fornecedorView = {
    renderizarFornecedorFormulario,
    renderizarTabelafornecedor,
    renderizarFormulariofornecedorAtualizar
};

export default fornecedorView;
