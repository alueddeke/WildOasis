/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = function (knex) {
  return knex("guests")
    .del()
    .then(function () {
      return knex("guests").insert([
        {
          id: 1,
          fullName: "Antoni Lueddeke",
          email: "antoni@example.com",
          nationalID: "987654321",
          nationality: "Canadian",
          country: "Canada",
        },
        {
          id: 2,
          fullName: "Sarah Jones",
          email: "sarah.jones@mail.com",
          nationalID: "1234567890",
          nationality: "American",
          country: "USA",
        },
      ]);
    });
};
