// on récupère les models utiles
const { List, Card } = require('../models');

const listController = {
    create: async function(req, res) {
        try {
            // en bonus ici on pourrait tester si req.body.title existe
            // et envoyer une erreur spéciale si c'est pas le cas
            // create est un raccourci pour build puis save mais les 2 solutions se valent complètement
            const newList = await List.create({
                title: req.body.title,
                position: req.body.position,
            });
            res.json(newList);
        } catch(error) {
            console.log(error);
            // en bonus ici si on est en avance on pourrait customiser l'erreur en fonction du scénario
            res.status(500).json({
                message: 'Erreur lors de la création de la liste',
            });
        }
    },
    read: async function(req, res) {
        try {
            // je vais récupérer les infos d'une liste en fonction de son id
            // je pars de l'id demandé
            const id = req.params.id;
            // je trouve la liste en fonction de l'id
            const askedList = await List.findByPk(id);
            // si on a une liste on l'envoie, si on a rien on met l'erreur non trouvée
            if (askedList) {
                // console.log(askedList);
                // je vais envoyer une réponse HTTP contenant du json
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
        // récuperer l'id de la liste recherchée
        const id = req.params.id;
        // récupérer la liste pour l'id demandé
        const list = await List.findByPk(id);
        // si on trouve la liste on va la modifier
        if(list) {
            // mettre à jour la liste avec les infos passées
            // si on nous passe un nom
            if (req.body.title) {
                // on met à jour le nom
                list.title = req.body.title;
            }
            // si on nous passe une position
            if (req.body.position) {
                // on met à jour la position
                list.position = req.body.position;
            }
            // faire persister les changements = executer une requete sql pour modifier la BDD
            const listSaved = await list.save();
            // envoyer une réponse
            res.json(listSaved);
        }
        // sinon on envoie une réponse explicite pour dire qu'on a rien trouvé
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
            // si on trouve la liste on la supprime
            if(list) {
                await list.destroy();
                res.json('Liste supprimée');
            }
            // sinon on envoie une réponse explicite pour dire qu'on a rien trouvé
            else {
                res.status(404).json(`Aucune liste à l'id ${id}`);
            }
        } catch(error) {
            console.trace(error);
            res.status(500).json({ message: 'Erreur' });
        }
    },
    // on fait une fonction asynchrone puisqu'on va faire une tache longue pour laquelle on va attendre le retour
    list: async function(req, res) {
        // on prévoit un try pour gérer les cas d'erreur
        try {
            // on fait appel à notre modèle et la méthode fournie par sequelize qui va bien pour récupérer toutes les listes
            const lists = await List.findAll({
                include: [
                { association: 'cards', include: ['labels'] }
            ]
            });
            // une fois toutes les données pretes, j'envoie ma réponse, ici je veux envoyer du json
            res.json(lists);
        } catch(err) {
            // en cas d'erreur
            // je log une erreur explicite pour moi développeur
            console.trace(err);
            // je renvoie un code pertinent + une erreur pour les consomateurs de mon api
            res.status(500).json({
                message: 'Impossible de contacter la base de données',
            });
        }        
    },
    // les cards d'une liste
    readCards: async (req, res) => {
        try {
            // on récupère l'id de la liste
            const id = req.params.id;
            // on récupère les cartes remplissant une condition
            const cards = await Card.findAll({
                where: {
                    list_id: id,
                },
                include: 'labels'
            });
            // on renvoie les cartes
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
                // on met à jour
                await listController.update(req, res);
            } else {
                // sinon on crée
                await listController.create(req, res);
            }
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },
};

module.exports = listController;