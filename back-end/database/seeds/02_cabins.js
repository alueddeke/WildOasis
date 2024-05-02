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
          name: "001",
          maxCapacity: 6,
          regularPrice: 300,
          discount: 15,
          description: "Spacious cabin with mountain view",
          image: "data/cabins/cabin-001.jpg",
        },
        {
          id: 2,
          name: "002",
          maxCapacity: 6,
          regularPrice: 300,
          discount: 15,
          description: "Spacious cabin with mountain view",
          image: "data/cabins/cabin-001.jpg",
        },
      ]);
    });
};

/*
/Users/antonilueddeke/Desktop/lenovo-repos/the-wild-oasis-new/the-wild-oasis-V2/client/data/cabins/cabin-001.jpg 

correct absolute path*/
