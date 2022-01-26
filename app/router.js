const express = require('express');
const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');

const router = express.Router();

//Lists 
router.get('/lists', listController.getAllLists);

router.get('/lists/:id', listController.getOneList);

router.post('/lists/create', listController.addList);

router.delete('/lists/delete/:id', listController.deleteOneList);

//Cards
router.get('/cards', cardController.getAllCards);

router.get('/cards/:id', cardController.getOneCard);



module.exports = router;