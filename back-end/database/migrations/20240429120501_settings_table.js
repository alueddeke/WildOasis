/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("settings", function (table) {
    table.increments("id").primary();
    table.integer("minBookingLength").notNullable();
    table.integer("maxBookingLength").notNullable();
    table.integer("maxGuestsPerBooking").notNullable();
    table.float("breakfastPrice").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("settings");
};
