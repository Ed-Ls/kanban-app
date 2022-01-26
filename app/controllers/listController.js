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
        res.status(500).send(err);
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
        try {
            // const existingList = await List.findOne({
            //     where: {
            //         'title': req.body.title
            //     }
            // });

            // if (existingList) {
            //     return res.send('This list already exists');
            // }

            let newList = new List({
                title: req.body.title,
                position: req.body.position,
            });
    
            await newList.save();
    
            res.status(200).send('New list added');

        } catch (err) {
          console.trace(err);
          res.status(500).send(err);
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
          res.status(500).send(err);
        }
      },
}

module.exports = listController;