exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments("id").primary();
        table.string('first_name');
        table.string('last_name');
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.enu('role', ['user','admin'], {useNative: false}).defaultTo('user');
        table.timestamps(true, true);
    })
    .then(() => {
        return knex.schema.createTable('orders', t => {
            t.increments("id").primary();
            t.integer("user_id").unsigned();
            t.enum('status', ['ordered', 'shipped', 'delivered','cancelled']).defaultTo('ordered');
            t.enum("payment_mode", ['COD', 'card_payment', 'upi']).defaultTo('COD');
            t.enum('payment_status', ['pending', 'completed', 'failed']).defaultTo('pending');
            t.decimal('total_price', 8, 2).notNullable();
            t.timestamps(true, true);
            
            // Add foreign key constraint
            t.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
        });
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('orders')
    .then(() => {
        return knex.schema.dropTable('users');
    });
};
