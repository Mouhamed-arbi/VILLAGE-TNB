const { OkPacket } = require("mysql2/promise");
const connection = require("../database");



const postConvs = async (user) => {
    const sql = `INSERT INTO convention_tnb SET ?`;
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

  const getAllConv = (callback) => {
    const sql = "SELECT * FROM convention_tnb";
    connection.query(sql, (err, result) => {
      callback(err, result);
    });
  };

  const getOneConv = async (id, callback) => {
    const sql = `SELECT * FROM convention_tnb where User_ID="${id}"`;
    connection.query(sql, (err, result) => {
      callback(err, result);
    });
  };



  const DeleteConv  = async (id) => {

    const sql = `DELETE FROM convention_tnb where Id_Convention_TNB="${id}"`;
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

module.exports = {postConvs, getAllConv,getOneConv,DeleteConv};
