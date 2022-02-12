require('dotenv').config();

const models = require('./app/models');

const doSomeTests = async () => {
    try {
        // const lists = await models.List.findAll();
        // console.log(lists);
        const cards = await models.Card.findAll({
            include: ['list', 'labels'],
        });
        console.log(cards);
    }
    catch (error) {
        console.trace(error);
    }
};

doSomeTests();
