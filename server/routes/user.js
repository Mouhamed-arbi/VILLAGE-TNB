const express = require('express');
const {postEmp,getEmps,getEmployee, signUp,getoneuser, DelEmployee,loginUser,postEmpArchv} = require('../controller/users');

const router = express.Router();
router.post('/', postEmp);
router.get('/', getEmps);
router.get('/getemp', getEmployee);
router.post('/signup',signUp);
router.get('/getuser', getoneuser);
router.delete('/delete', DelEmployee);
router.post("/login",loginUser)
router.post("/archv",postEmpArchv)





// router.post('/login', loginUser);

module.exports = router;
