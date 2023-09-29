const express = require('express');
const {carPost,getCarpp,ParPost,getParps,getonecarr,DeleteCarPost,DeleteParPost} = require('../controller/carpooling');

const router = express.Router();
router.post('/', carPost);
router.get('/', getCarpp);
router.post('/par', ParPost);
router.get('/par', getParps);
router.get('/onecar', getonecarr);
router.delete('/delcar', DeleteCarPost);
router.delete('/delpar', DeleteParPost);







module.exports = router;
