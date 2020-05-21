require('dotenv/config');

module.exports = require('knex')({
    client: process.env.SGBD,
    connection: {
        host : process.env.HOST,
        user : process.env.NAME,
        password : process.env.PASSWORD,
        database : process.env.DATABASE,
        port : process.env.PORT
    },
    useNullAsDefault: true
});