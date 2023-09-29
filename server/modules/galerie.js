const { OkPacket } = require("mysql2/promise");
const connection = require("../database");



const postGal = async (user) => {
    const sql = `INSERT INTO galerie_tnb SET ?`;
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

  const getAllGal = (callback) => {
    const sql = "SELECT * FROM galerie_tnb";
    connection.query(sql, (err, result) => {
      callback(err, result);
    });
  };

  const getOneGal = async (id, callback) => {
    const sql = `SELECT * FROM galerie_tnb where User_ID="${id}"`;
    connection.query(sql, (err, result) => {
      callback(err, result);
    });
  };


  const DeleteGal  = async (id) => {

    const sql = `DELETE FROM galerie_tnb where Id_Gal ="${id}"`;
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

module.exports = {postGal, getAllGal,getOneGal,DeleteGal};
