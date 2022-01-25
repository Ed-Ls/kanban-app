const Card = require('./card');
const Label = require('./label');
const List = require('./list');

// une card est liée a une seule liste
Card.belongsTo(List, {
    foreignKey: 'list_id',
    as: 'list',
});

// une list possède plusieurs cards
List.hasMany(Card, {
    foreignKey: 'list_id',
    as: 'cards'
});

//Une card possède plusieurs labels
Card.belongsToMany(Label, {
    as: 'labels',
    through: 'card_has_label',
    foreignKey: 'card_id',
    otherKey: 'label_id'
});

// un label possède plusieurs cards
Label.belongsToMany(Card, {
    as: 'cardList',
    through: 'card_has_label',
    foreignKey: 'label_id',
    otherKey: 'card_id'
});

module.exports = { Card, Label, List };