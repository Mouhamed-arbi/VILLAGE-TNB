const { OkPacket } = require("mysql2/promise");
const connection = require("../database");


////creating employee information (Fiche De Poste)

const postOneEmp = async (user) => {
  const sql = `INSERT INTO employees SET ?`;
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

// Checking if qlreqdy exist emp

const getOneEmp = async (useremail, callback) => {
  const sql = `SELECT * FROM employees where E_Mail="${useremail}"`;
  connection.query(sql, (err, result) => {
    callback(err, result);
  });
};

////

//GET ONE Employee ( GET WITH E-MAIL )

const getEmp = async (useremail) => {
  const sql = `SELECT * FROM employees where E_Mail="${useremail}"`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

//// Sign Up
const getUser = async (useremail) => {
  const sql = `SELECT * FROM users where E_Mail="${useremail}"`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const postUser = async (user) => {
  const sql = `INSERT INTO users SET ?`;
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

//// get one user from signup

const get_user = async (useremail, callback) => {
  const sql = `SELECT * FROM users where E_Mail="${useremail}"`;
  connection.query(sql, (err, result) => {
    callback(err, result);
  });
};

////

//GET ALL Employees

const getAllEmps = (callback) => {
  const sql = "SELECT * FROM employees";
  connection.query(sql, (err, result) => {
    callback(err, result);
  });
};

// Delete Employee

const DeleteEmp  = async (id) => {

  const sql = `DELETE FROM employees where Emp_Id="${id}"`;
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


const postArchvEmp = async (user) => {
  const sql = `INSERT INTO archiveemp SET ?`;
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


const getArchv = async (useremail) => {
  const sql = `SELECT * FROM archiveemp where E_Mail="${useremail}"`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// const updateUser = async (useremail, updates) => {
//   const sql = `UPDATE FROM users WHERE E_Mail = ${useremail}`;
//   try {
//     const result = await connection.query(sql, [updates, useremail]);
//     return result[0];
//   } catch (err) {
//     throw err;
//   }
// };




module.exports = { postOneEmp, getOneEmp, getAllEmps, getEmp,getUser, postUser,get_user, DeleteEmp ,postArchvEmp,getArchv };
