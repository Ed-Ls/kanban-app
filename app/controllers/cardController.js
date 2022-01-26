const { Card } = require('../models');

const cardController = {
    async getAllCards(req, res) {
        try {
        const allCards = await Card.findAll({
            include: [
                'labels',
                'list'
            ]
        });

        res.status(200).json(allCards);
    } catch (err) {
        console.trace(err);
        res.status(500).send(err);
      }
    },

    async getOneCard(req, res) {
        try {
          const card = await Card.findByPk(+req.params.id, {
            include: [
                'labels',
                'list'
            ]
          });
    
          res.status(200).json(card);

        } catch (err) {
          console.trace(err);
          res.status(500).send(err);
        }
      },

      async addCard(req, res) {
        try {
            let newCard = new Card({
                title: req.body.title,
                position: +req.body.position,
                list_id: +req.body.list
            });
    
            await newCard.save();
    
            res.status(200).send('New card added');

        } catch (err) {
          console.trace(err);
          res.status(500).send(err);
        }
      },
    }

module.exports = cardController;