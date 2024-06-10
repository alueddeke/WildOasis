/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("bookings", function (table) {
    table.increments("id").primary();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("startDate").notNullable();
    table.timestamp("endDate").notNullable();
    table.integer("numNights").notNullable().defaultTo(0);
    table.integer("numGuests").notNullable();
    table.decimal("cabinPrice", 10, 2).notNullable();
    table.decimal("extrasPrice", 10, 2).notNullable();
    table.decimal("totalPrice", 10, 2).notNullable();
    table.string("status").notNullable();
    table.boolean("hasBreakfast").notNullable();
    table.boolean("isPaid").notNullable();
    table.string("observations");
    table
      .integer("cabinId")
      .unsigned()
      .references("id")
      .inTable("cabins")
      .onDelete("CASCADE");
    table
      .integer("guestId")
      .unsigned()
      .references("id")
      .inTable("guests")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("bookings");
};

// // migrations/20240428123456_create_bookings_table.js

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.up = function (knex) {
//   return knex.schema.createTable("bookings", function (table) {
//     table.increments("id").primary();
//     table.timestamp("created_at").defaultTo(knex.fn.now());
//     table.timestamp("startDate").notNullable();
//     table.timestamp("endDate").notNullable();
//     table.integer("numNights").notNullable().defaultTo(0);
//     table.integer("numGuests").notNullable();
//     // table.float("cabinPrice").notNullable();
//     // table.float("extrasPrice").notNullable();
//     // table.float("totalPrice").notNullable();
//     // table.string("status").notNullable();
//     table.boolean("hasBreakfast").notNullable();
//     table.boolean("isPaid").notNullable();
//     table.string("observations");
//     table
//       .integer("cabinID")
//       .unsigned()
//       .references("id")
//       .inTable("cabins")
//       .onDelete("CASCADE")
//       .withKeyName("fk_bookings_cabin"); // Custom foreign key constraint name
//     table
//       .integer("guestID")
//       .unsigned()
//       .references("id")
//       .inTable("guests")
//       .onDelete("CASCADE")
//       .withKeyName("fk_bookings_guest"); // Custom foreign key constraint name
//   });
// };

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.down = function (knex) {
//   return knex.schema
//     .alterTable("bookings", function (table) {
//       // Remove foreign keys first
//       table.dropForeign("cabinID", "fk_bookings_cabin");
//       table.dropForeign("guestID", "fk_bookings_guest");
//     })
//     .then(() => {
//       // Then drop the table
//       return knex.schema.dropTable("bookings");
//     });
// };
