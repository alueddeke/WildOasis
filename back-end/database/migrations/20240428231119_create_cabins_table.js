/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cabins", function (table) {
    table.increments("id").primary();
    table.integer("maxCapacity").notNullable();
    table.integer("regularPrice").notNullable();
    table.integer("discount").notNullable();
    table.string("description").notNullable();
    // this is where the image would go
    table.timestamp("created_at").defaultTo(knex.fn.now());
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
