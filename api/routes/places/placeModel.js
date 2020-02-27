const db = require('../../../database/dbConfig');

function addPlace (place){
    return db('places')
    .insert(place);
}


async function getPlace(id ){
    const place = await db('places')
    .where('user_id', id)
    // .andWhere('user_id', user_id)
    first();


}
function findById(id) {
    return db('places')
      .where({ id })
      .first();
  }

function getAllPlaces (  ){
    return db('places') 
 }


function updatePlace(id, obj, user_id) {
    return db("places")
      .where("id", id)
      .andWhere("user_id", user_id)
      .update(obj)
      .returning(["id", ...Object.keys(obj)]);
  }
  
  function delPlace(id, user_id) {
    return db("places")
      .where("id", id)
      .andWhere("user_id", user_id)
      .del();
  }


  module.exports = {
      addPlace,
       getAllPlaces,
       getPlace,
       updatePlace,
       delPlace,
       findById
  }