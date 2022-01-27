const { List } = require('../models');

const listController = {
    async getAllLists(req, res) {
        try {
        const allLists = await List.findAll({
            include: [
                { association: 'cards', include: ['labels'] }
            ]
        });

        res.status(200).json(allLists);
    } catch (err) {
        console.trace(err);

        res.status(500).json({
          message: 'Impossible de contacter la base de données',
      });
      }
    },

    async getOneList(req, res) {
        try {
          const list = await List.findByPk(+req.params.id, {
            include: [
              { association: 'cards', include: ['labels']},
            ]
          });
    
          res.status(200).json(list);

        } catch (err) {
          console.trace(err);
          res.status(500).send(err);
        }
      },

      async addList(req, res) {

        //check if the list already exists
        try {
            const existingList = await List.findOne({
                where: {
                    'title': req.body.title
                }
            });

            if (existingList) {
                return res.status(400).send('This list already exists');
            }

          //create new list
            const newList = await List.create({
                title: req.body.title,
                position: req.body.position,
            });
    
    
            res.status(200).json(newList);

        } catch (err) {
          console.trace(err);

          res.status(500).json({
            message: 'Erreur lors de la création de la liste',
        });
        }
      },


    async deleteOneList(req, res) {
        try {
          const list = await List.destroy({
            where: {
                id: +req.params.id
            },
            include: [
                'cards',
              ]
        })

          res.status(200).send("List deleted successfully")

        } catch (err) {
          console.trace(err);

            res.status(500).json({
            message: 'Erreur lors de la création de la liste',
        });
        }
      },


    async updateOneList(req, res) {
      try {
        const updatedList = await List.update(
          { title: req.body.title,
            position: req.body.position, },
          { where: { id: +req.params.id } }
      );

        res.status(200).json(updatedList)

      } catch (err) {
        console.trace(err);
        
        res.status(500).json({
          message: 'Erreur lors de la création de la liste',
      });
      }
    },
}

module.exports = listController;