import * as moment from "moment";

exports.seed = function (knex) {
    return knex('items').select().then(function (rows) {
        
        if (rows.length === 0) {
            return knex('items').insert([
                {
                    name: 'Apple',
                    brand_name: 'FreshFruit',
                    image_url: 'https://example.com/apple.jpg',
                    category: 'vegetables',
                    price: 1.99,
                    quantity: 100,
                    status: 'active',
                    created_at: moment(),
                    updated_at: moment()
                },
                {
                    name: 'Coca Cola',
                    brand_name: 'Coca Cola Company',
                    image_url: 'https://example.com/cocacola.jpg',
                    category: 'beverage',
                    price: 1.49,
                    quantity: 50,
                    status: 'active',
                    created_at: moment(),
                    updated_at: moment()
                },
                {
                    name: 'Lays',
                    brand_name: 'Lays Company',
                    image_url: 'https://example.com/lays.jpg',
                    category: 'snack',
                    price: 2.49,
                    quantity: 75,
                    status: 'active',
                    created_at: moment(),
                    updated_at: moment()
                }
            ]);
        }
    });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('items');
};
