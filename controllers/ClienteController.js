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
function executarComandoSQL(sql, params, res, erroMsg) {
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ erro: erroMsg, detalhes: err });
    } else {
      res.status(200).json(result);
    }
  });
}

// Rota para buscar todas as cliente
router.get('/', (req, res) => {
  executarComandoSQL('SELECT * FROM cliente', [], res, "Erro na consulta de clientes");
});

// Rota para buscar uma cliente específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarComandoSQL('SELECT * FROM cliente WHERE CPF = ?', [id], res, "Erro na consulta de cliente");
});

// Rota para criar uma nova cliente
router.post('/', (req, res) => {
  const { Nomecli , Data_agend } = req.body;
  executarComandoSQL('INSERT INTO cliente (Nomecli , Data_agend) VALUES (?, ?)', [Nomecli , Data_agend], res, "Erro no cadastro de cliente!");
});

// Rota para deletar uma cliente
router.delete("/:id", (req, res) => {
  const clienteId = req.params.id;
  executarComandoSQL('DELETE FROM cliente WHERE CPF = ?', [clienteId], res, 'Erro ao deletar cliente');
});

// Rota para atualizar uma cliente
router.put('/', (req, res) => {
  const { CPF, Nomecli , Data_agend } = req.body;
  executarComandoSQL('UPDATE cliente SET Nomecli = ?, Data_agend = ? WHERE CPF = ?', [Nomecli , Data_agend,CPF], res, "Erro ao atualizar cliente");
});

module.exports = router;