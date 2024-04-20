
exports.up = function (knex) {
    return knex.schema.createTable('items', table => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("brand_name").notNullable();
        table.string("image_url");
        table.enu('category', ['beverage','snack','dairy','vegetables','staples'], {useNative: false})
        table.decimal("price", 8, 2).notNullable();
        table.integer("quantity").notNullable();
        table.enu("status",['active','deleted'], {useNative: false}).defaultTo('active')
        table.timestamps(true, true);
        table.unique(['name', 'brand_name'])
        
    });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('items');
};
