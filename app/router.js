const express = require('express');
const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const labelController = require('./controllers/labelController');

const router = express.Router();

//Lists 
router.get('/lists', listController.getAllLists);

router.get('/lists/:id', listController.getOneList);

router.get('/lists/:id/cards', listController.getCardsOfList);

router.post('/lists', listController.addList);

router.put('/lists/:id', listController.updateOneList);

router.delete('/lists/:id', listController.deleteOneList);

//Cards
router.get('/cards', cardController.getAllCards);

router.get('/cards/:id', cardController.getOneCard);

router.post('/cards', cardController.addCard);

router.put('/cards/:id', cardController.updateOneCard);

router.delete('/cards/:id', cardController.deleteOneCard);

router.post('/cards/:id/label', cardController.addLabelToCard);

//Labels
router.get('/labels', labelController.getAllLabels);

router.get('/labels/:id', labelController.getOneLabel);

router.post('/labels', labelController.addLabel);

router.put('/labels/:id', labelController.updateOneLabel);

router.delete('/labels/:id', labelController.deleteOneLabel);


module.exports = router;