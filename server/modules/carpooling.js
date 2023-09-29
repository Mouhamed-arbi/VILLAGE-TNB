const { OkPacket } = require("mysql2/promise");
const connection = require("../database");


const postCar = async (user) => {
    const sql = `INSERT INTO carpooling SET ?`;
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


const getAllCarp = (callback) => {
    const sql = "SELECT * FROM carpooling";
    connection.query(sql, (err, result) => {
      callback(err, result);
    });
  };


  const postPar = async (user) => {
    const sql = `INSERT INTO carpooling_participation SET ?`;
    return new Promise((resolve, reject) => {
      connection.query(sql, user, (err, result) => {
        if (err) {
          console.log(err)
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };  

  const getPar = (callback) => {
    const sql = "SELECT * FROM carpooling_participation";
    connection.query(sql, (err, result) => {
      callback(err, result);
    });
  };
  const getOneCar = async (id, callback) => {
    const sql = `SELECT * FROM carpooling where User_ID="${id}"`;
    connection.query(sql, (err, result) => {
      callback(err, result);
    });
  };

  const DeleteCar  = async (id) => {

    const sql = `DELETE FROM carpooling where Id_Carpooling="${id}"`;
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

  const DeletePar  = async (id) => {

    const sql = `DELETE FROM carpooling_participation where Id_Carpooling="${id}"`;
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

module.exports = { postCar, getAllCarp ,postPar,getPar,getOneCar,DeleteCar,DeletePar};
