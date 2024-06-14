/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex("settings")
    .del()
    .then(function () {
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
