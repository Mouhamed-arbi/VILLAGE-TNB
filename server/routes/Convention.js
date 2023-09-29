const express = require('express');
const {PoConvs,getConvs,getoneconv,DeleteNewPost} = require('../controller/Convention');

const router = express.Router();
router.post('/', PoConvs);
router.get('/', getConvs);
router.get('/oneconv', getoneconv);
router.delete('/',DeleteNewPost);








module.exports = router;
