const express = require('express');
const {PoNews,getNews,getonenew,DeleteNewPost} = require('../controller/News');

const router = express.Router();
router.post('/', PoNews);
router.get('/', getNews);
router.get('/onenew', getonenew);
router.delete('/',DeleteNewPost);








module.exports = router;
