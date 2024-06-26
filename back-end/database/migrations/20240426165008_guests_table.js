/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("guests", function (table) {
    table.increments("id").primary();
    table.string("fullName").notNullable();
    table.string("email").notNullable();
    table.string("nationalID").notNullable();
    table.string("nationality").notNullable();
    table.string("countryFlag").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.integer("guestID").unsigned();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("guests");
};
