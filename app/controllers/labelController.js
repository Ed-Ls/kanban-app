const { Label } = require('../models');

const labelController = {
    async getAllLabels(req, res) {
        try {
        const allLabels = await Label.findAll({
            include: ['cards']
        });

        res.status(200).json(allLabels);
    } catch (err) {
        console.trace(err);

        res.status(500).json({
          message: 'Impossible de contacter la base de données',
      });
      }
    },

    async getOneLabel(req, res) {
        try {
          const label = await Label.findByPk(+req.params.id, {
            include: [
              { association: 'cards', include: ['labels']},
            ]
          });
    
          res.status(200).json(label);

        } catch (err) {
          console.trace(err);
          
        res.status(500).json({
          message: 'Impossible de récuperer le label demandé',
      });
        }
      },

      async addLabel(req, res) {

        //check if the label already exists
        try {
            const existingLabel = await Label.findOne({
                where: {
                    'title': req.body.title
                }
            });

            if (existingLabel) {
                return res.status(400).send('This label already exists');
            }

          //create new label
            const newLabel = await Label.create({
                title: req.body.title,
                color: req.body.color,
            });
    
    
            res.status(200).json(newLabel);

        } catch (err) {
          console.trace(err);

          res.status(500).json({
            message: 'Erreur lors de la création du label',
        });
        }
      },


    async deleteOneLabel(req, res) {
        try {
          const label = await Label.destroy({
            where: {
                id: +req.params.id
            }
        })

          res.status(200).send("Label deleted successfully")

        } catch (err) {
          console.trace(err);

            res.status(500).json({
            message: 'Erreur lors de la suppression du label',
        });
        }
      },


    async updateOneLabel(req, res) {
      try {
        const updatedLabel = await Label.update(
          { title: req.body.title,
            color: req.body.color, },
          { where: { id: +req.params.id } }
      );

        res.status(200).json(updatedLabel)

      } catch (err) {
        console.trace(err);
        
        res.status(500).json({
          message: 'Erreur lors de la MAJ du label',
      });
      }
    },
}

module.exports = labelController;