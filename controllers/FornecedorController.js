const express = require('express');
const router = express.Router();
const db = require('../util/db');
const verificarToken = require('../util/VerificaToken');

/**
 * Executa uma consulta no banco de dados e envia uma resposta.
 * @param {string} sql - A consulta SQL a ser executada.
 * @param {Array} params - Os parâmetros para a consulta SQL.
 * @param {Object} res - O objeto de resposta do Express.
 * @param {string} erroMsg - Mensagem de erro para ser enviada em caso de falha.
 */
function executarConsulta(sql, params, res, erroMsg) {
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ erro: erroMsg, detalhes: err });
    } else {
      res.status(200).json(result);
    }
  });
}

// Rota para buscar todos os fornecedores
router.get('/', (req, res) => {
  executarConsulta('SELECT * FROM fornecedor', [], res, "Erro na consulta de fornecedores");
});

// Rota para buscar um fornecedor específico
router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarConsulta('SELECT * FROM fornecedor WHERE CNPJ = ?', [id], res, "Erro na consulta de fornecedor");
});

// Rota para criar um novo fornecedor
router.post('/', (req, res) => {
  const { Noforne, Nofant } = req.body;
  executarConsulta('INSERT INTO fornecedor (Noforne, Nofant) VALUES (?, ?)', [Noforne, Nofant], res, "Erro no cadastro de fornecedor!");
});

// Rota para deletar uma fornecedor
router.delete("/:id", (req, res) => {
  const fornecedorId = req.params.id;
  executarConsulta('DELETE FROM fornecedor WHERE CNPJ = ?', [fornecedorId], res, 'Erro ao deletar fornecedor');
});

// Rota para atualizar uma fornecedor
router.put('/', (req, res) => {
  const { cnpj, Noforne, Nofant } = req.body;
  console.log(cnpj, Noforne, Nofant);
  executarConsulta('UPDATE fornecedor SET Noforne = ?, Nofant = ? WHERE CNPJ = ?', [Noforne,Nofant, cnpj], res, "Erro ao atualizar fornecedor");
});

module.exports = router;