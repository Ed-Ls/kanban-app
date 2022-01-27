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
          message: 'Erreur lors de la récupération des cartes',
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
          message: 'Erreur lors de la récupération de la carte',
        });
        }
      },

      async addCard(req, res) {
        try {
            let newCard = await Card.create({
                title: req.body.title,
                position: +req.body.position,
                color: req.body.color,
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

      async deleteOneCard(req, res) {
        try {
          const card = await Card.destroy({where: {id: +req.params.id}})

        console.log(card)

          res.status(200).send("Card deleted successfully")

        } catch (err) {
          console.trace(err);

            res.status(500).json({
            message: 'Erreur lors de la suppression de la cart',
        });
        }
      },

      async updateOneCard(req, res) {
        try {
          const updatedCard = await Card.update(
            { title: req.body.title,
              position: req.body.position,
              color: req.body.color,
              list_id: +req.body.list
             },
            { where: { id: +req.params.id } }
        );
  
          res.status(200).json(updatedCard)
  
        } catch (err) {
          console.trace(err);
          
          res.status(500).json({
            message: 'Erreur lors de la MAJ de la carte',
        });
        }
      },
    }

module.exports = cardController;