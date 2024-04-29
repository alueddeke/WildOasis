/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes all existing entries
  return knex("bookings")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("bookings").insert([
        {
          guestID: 1,
          cabinID: 1,
          startDate: "2024-05-01",
          endDate: "2024-05-05",
          numNights: 4,
          numGuests: 2,
          cabinPrice: 300,
          extrasPrice: 120,
          totalPrice: 420,
          status: "unconfirmed",
          hasBreakfast: true,
          isPaid: true,
          observations: "I will arrive at 10pm",
        },
        // {
        //   guestID: 2,
        //   cabinID: 2,
        //   startDate: "2024-06-01",
        //   endDate: "2024-06-05",
        //   numNights: 4,
        // },
        // Add more booking entries as needed
      ]);
    });
};
