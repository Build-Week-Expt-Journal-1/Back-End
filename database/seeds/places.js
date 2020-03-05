
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('places').del()
    .then(function () {
      // Inserts seed entries
      return knex('places').insert([
        {   city: 'Kathmandu', country:'Nepal',user_id:1, photo_url:'https://www.southasiatime.com/wp-content/uploads/2019/03/1512123168-ST_Kathmandu_Nepal_Cropped-650x260.png'},
        {  city: 'Rio De Janerio', country:'Brazil',user_id:1, photo_url:'https://i.ytimg.com/vi/qk1wmiBCVPw/maxresdefault.jpg'},
        {  city: 'Tokyo',country:'Japan',user_id:1,photo_url:'https://i.ytimg.com/vi/m5OMz_N_yhc/maxresdefault.jpg'},
      ]);
    });
};
