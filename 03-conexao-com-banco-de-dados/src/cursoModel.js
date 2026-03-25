const { query } = require('./db');

const getAll = async () => {
  const curso = await query('SELECT * FROM curso');
  return curso.rows;
};

const getById = async (id) => {
  const cursoId = await query('SELECT * FROM curso WHERE id = $1', [id]);
  return cursoId.rows[0];
};

const insert = async (curso) => {
  const result = await query(
    'INSERT INTO curso (nome, descricao) VALUES ($1, $2) RETURNING *',
    [curso.nome, curso.descricao]);
  return result.rows[0];
};

const update = async (curso) => {
  const result = await query(
    'UPDATE curso SET nome = $1, descricao=$2 WHERE id = $3 RETURNING *',
    [curso.nome, curso.email, curso.data_nascimento, curso.matricula, curso.id]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await query('DELETE FROM curso WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove
};
