
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('stories').del()
    .then(function () {
      // Inserts seed entries
      return knex('stories').insert([
        // {id: 1, review: 'Saw some Elephants', user_id:25, place_id:24, story_photo_url:"http://assets.worldwildlife.org/photos/1139/images/carousel_small/elephants_8.1.2012_whytheymatter1_HI_247511.jpg?1345586857"},
        // {id: 2, review: 'Ate Tikka Masala with Naan Bread', user_id:25, place_id:30},
        {id: 3, review: 'stuff', user_id:1, place_id:2},
        {id:4, review: "Carnaval!", user_id:1, place_id:2}
      ]);
    });
};
