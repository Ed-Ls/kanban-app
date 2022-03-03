# The Kanban App by Eden

**Here is my Kanban App (Node.js + Express, SQL + Sequelize, ReactJS + Tailwind) !** 😁

It's a minimalist Trello-like app, allowing user to add different Lists with Cards and labels. You can edit lists & cards titles, delete cards & lists and freely add or remove labels from the cards.

[Live Demo](https://youtu.be/7weil4R94YU)

## How to run it

Install node modules on API side :

`cd api`
`npm install`

Configure your **.env** file with a valid SQL connexion string (see **.env_example** for more info), and create the DB :

`psql -U YourUserName -d YourDatabaseName -f api/data/create_db.sql`

Then run the server :

`npm start`

On another terminal, do the same for the client side :

`cd kanban`
`npm install`
`npm start`

Visit your _localhost:3000_ for the client side, and _localhost:5000_ to check the API

## Built with

- **Frontend** : Html, CSS (with Tailwind), ReactJS with Hooks.
- **Backend** : Node.js, [Express](https://expressjs.com/fr/), [Multer](https://www.npmjs.com/package/multer), SQL with [PostgreSQL](https://www.postgresql.org/) and Sequelize for the DB part.

## License

This website and API were made by me, please credit **©EdCh-Lo** if using it.
