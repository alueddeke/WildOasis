/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cabins", function (table) {
    table.increments("id").primary();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.string("name").notNullable();
    table.integer("maxCapacity").notNullable();
    table.integer("regularPrice").notNullable();
    table.integer("discount").notNullable();
    table.string("description").notNullable();
    table.string("image").notNullable();

    table.integer("cabinID").unsigned();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("cabins");
};
