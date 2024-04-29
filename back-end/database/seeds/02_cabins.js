/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = function (knex) {
  return knex("cabins")
    .del()
    .then(function () {
      return knex("cabins").insert([
        {
          id: 1,
          maxCapacity: 6,
          regularPrice: 300,
          discount: 15,
          description: "Spacious cabin with mountain view",
        },
      ]);
    });
};
