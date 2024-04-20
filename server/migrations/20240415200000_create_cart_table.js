const { Knex } = require("knex");
exports.up = function(knex) {
    return knex.schema.createTable('carts', function(table) {
      table.increments('id').primary(); // Auto-incrementing ID
      table.integer('userId').unsigned().notNullable(); // User ID who owns the cart
      table.integer('itemId').unsigned().notNullable(); // Item ID added to the cart
      table.integer('quantity').unsigned().notNullable().defaultTo(1); // Quantity of the item in the cart
      table.timestamps(true, true); // createdAt and updatedAt columns
  
      // Foreign keys
      table.foreign('userId').references('id').inTable('users').onDelete('CASCADE'); // Reference to users table
      table.foreign('itemId').references('id').inTable('items').onDelete('CASCADE'); // Reference to items table
  
      // Unique constraint to ensure only one item per user cart
      table.unique(['userId', 'itemId']);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('carts');
  };
  
