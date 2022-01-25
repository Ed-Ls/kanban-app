// on va charger nos variables d'environnement
require('dotenv').config();

// ici on require app/models
// comme c'est un dossier, cela revient a
// require app/models/index
const { Card, List, Label } = require('./app/models');

async function test() {
    // essayons de récupérer un Quiz...
    // et tant qu'a faire je voudrais TOUT
    // son user, ses questions, ses tags
    const premiereListe = await List.findByPk(1, {
        include: [
            'cards',
        ]
    });

    console.log(premiereListe);
    console.log(premiereListe.cards)
}

test();
