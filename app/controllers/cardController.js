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
        
        res.status(500).json({
          message: 'Erreur lors de la création de la liste',
      });
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

          res.status(500).json({
          message: 'Erreur lors de la création de la liste',
        });
        }
      },

      async addCard(req, res) {
        try {
            let newCard = await Card.create({
                title: req.body.title,
                position: +req.body.position,
                list_id: +req.body.list
            });
    
            res.status(200).json(newCard);

        } catch (err) {
          console.trace(err);

          res.status(500).json({
          message: 'Erreur lors de la création de la liste',
        });
        }
      },
    }

module.exports = cardController;