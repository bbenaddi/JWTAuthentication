const db = require('./connection.js');

knex.schema.createTable('user', function (table) {
    table.increments();
    table.string('username', 30);
    table.string('password', 60);
    table.timestamps();
}).then(result => {
    console.log("table created successfully !");
})
.catch(error => {
    console.log("table creation failed :",error);
});