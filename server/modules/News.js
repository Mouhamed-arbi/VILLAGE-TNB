const { OkPacket } = require("mysql2/promise");
const connection = require("../database");



const postNews = async (user) => {
    const sql = `INSERT INTO news SET ?`;
    return new Promise((resolve, reject) => {
      connection.query(sql, user, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  const getAllNews = (callback) => {
    const sql = "SELECT * FROM news";
    connection.query(sql, (err, result) => {
      callback(err, result);
    });
  };

  const getOneNew = async (id, callback) => {
    const sql = `SELECT * FROM news where User_ID="${id}"`;
    connection.query(sql, (err, result) => {
      callback(err, result);
    });
  };


  const DeleteNew  = async (id) => {

    const sql = `DELETE FROM news where Id_News="${id}"`;
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
        if (err) {
          console.log(err)
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

module.exports = {postNews, getAllNews,getOneNew,DeleteNew};
