// on récupère les models utiles
const { List, Card } = require('../models');

const listController = {
    create: async function(req, res) {
        try {
            const newList = await List.create({
                title: req.body.title,
                position: req.body.position,
            });
            res.json(newList);
        } catch(error) {
            console.log(error);
            res.status(500).json({
                message: 'Erreur lors de la création de la liste',
            });
        }
    },
    read: async function(req, res) {
        try {
            const id = req.params.id;
            const askedList = await List.findByPk(id);

            // si on a une liste on l'envoie, si on a rien on met l'erreur non trouvée
            if (askedList) {
                res.json(askedList);
            }
            else {
                res.status(404).json({
                    message: 'Liste non trouvée',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Erreur lors de la récupération de la liste',
            });
        }
    },
    update: async function(req, res) {try {

        const id = req.params.id;
        const list = await List.findByPk(id);

        if(list) {
            if (req.body.title) {
                list.title = req.body.title;
            }
            if (req.body.position) {
                list.position = req.body.position;
            }
            // faire persister les changements = executer une requete sql pour modifier la BDD
            const listSaved = await list.save();

            res.json(listSaved);
        }
        else {
            res.status(404).json(`Aucune liste à l'id ${id}`);
        }
    } catch(error) {
        console.trace(error);
        res.status(500).json({ message: 'Erreur' });
    }
    },
    delete: async function(req, res) {
        try {
            const id = req.params.id;
            const list = await List.findByPk(id);

            if(list) {
                await list.destroy();
                res.json('Liste supprimée');
            }
            else {
                res.status(404).json(`Aucune liste à l'id ${id}`);
            }
        } catch(error) {
            console.trace(error);
            res.status(500).json({ message: 'Erreur' });
        }
    },
    list: async function(req, res) {
        try {
            const lists = await List.findAll({
                include: [
                { association: 'cards', include: ['labels'] }
            ]
            });
            res.json(lists);
        } catch(err) {
            console.trace(err);
            res.status(500).json({
                message: 'Impossible de contacter la base de données',
            });
        }        
    },
    // les cards d'une liste
    readCards: async (req, res) => {
        try {
            const id = req.params.id;
            const cards = await Card.findAll({
                where: {
                    list_id: id,
                },
                include: 'labels'
            });
            res.json(cards);
        } catch(error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },
    createOrUpdate: async (req, res) => {
        try {
            // on essaye de récupérer la liste en fonction de l'id éventuel
            let list;
            if (req.params.id) {
              list = await List.findByPk(req.params.id);
            }
            // si on connait cette liste
            if (list) {
                await listController.update(req, res);
            } else {
                await listController.create(req, res);
            }
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },
};

module.exports = listController;