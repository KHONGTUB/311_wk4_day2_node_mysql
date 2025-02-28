const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let id = req.params.id
  let sql = "SELECT * FROM ?? WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS

  sql = mysql.format(sql, ['users', "id", id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME
  const { first_name, last_name} = req.body
  let sql = "INSERT INTO ?? VALUES (null, ?, ?)"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', first_name, last_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  const {id} = req.params
  const {body} = req
  let sql = "UPDATE ?? SET ? WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["users", body, 'id', id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);

    return res.json({
      affectedRows : results.affectedRows,
      message : results.message
    });
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>

  const {first_name} = req.params
  let sql = "DELETE FROM ?? WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', first_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}