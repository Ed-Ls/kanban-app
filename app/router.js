const express = require('express');
const mainController = require('./controllers/main');
const listController = require('./controllers/list');
const cardController = require('./controllers/card');
const labelController = require('./controllers/label');

const router = express.Router();

// List
router.get('/lists', listController.list);
router.post('/lists', listController.create);
router.get('/lists/:id', listController.read);
router.patch('/lists/:id', listController.update);
router.delete('/lists/:id', listController.delete);

// Card
router.get('/cards', cardController.list);
router.post('/cards', cardController.create);
router.get('/cards/:id', cardController.read);
router.patch('/cards/:id', cardController.update);
router.delete('/cards/:id', cardController.delete);
router.put('/lists/:id?', listController.createOrUpdate);

// Label
router.get('/labels', labelController.list);
router.post('/labels', labelController.create);
router.get('/labels/:id', labelController.read);
router.patch('/labels/:id', labelController.update);
router.delete('/labels/:id', labelController.delete);
router.put('/cards/:id?', cardController.createOrUpdate);

//added routes
router.post('/cards/:card_id/label/:label_id', cardController.addLabelToCard);
router.delete('/cards/:card_id/label/:label_id', cardController.removeLabelFromCard);
router.get('/lists/:id/cards', listController.readCards);
router.put('/labels/:id?', labelController.createOrUpdate);

// 404
router.use(mainController.notFound);

module.exports = router;