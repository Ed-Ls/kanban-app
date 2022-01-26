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
    }

module.exports = cardController;