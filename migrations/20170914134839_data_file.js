exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable("data_file", function (table) {
            table.increments();
            table.string('link');
            table.string('title');
            table.string('name');
            table.integer('id_user');
            table.string('description');
            table.timestamps();
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable("data_file")
    ]);
};
