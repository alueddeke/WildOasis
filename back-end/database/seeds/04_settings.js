/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes all existing entries
  return knex("settings")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("settings").insert([
        {
          id: 1,
          minBookingLength: 3,
          maxBookingLength: 90,
          maxGuestsPerBooking: 8,
          breakfastPrice: 15.0,
        },
      ]);
    });
};
