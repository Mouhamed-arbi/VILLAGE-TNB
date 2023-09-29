const express = require('express');
const {PoGal,getGal,getoneGal,DeleteGalPost} = require('../controller/galerie');

const router = express.Router();
router.post('/', PoGal);
router.get('/', getGal);
router.get('/onegal', getoneGal);
router.delete('/',DeleteGalPost);








module.exports = router;
