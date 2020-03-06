const db = require('../../../database/dbConfig');
 
function addPlace (place){
    return db('places')
    .insert(place);
}


function addReview(info) {
    return db("items")
      .returning(["id", ...Object.keys(info)])
      .insert(info);
  }
 
function findById(id) {
    return db('places')
      .where({ id })
      .first();
  }

  function findStoryById(id){
      return db('stories')
      .where({id})
      .first();
  }


   

function getAllPlaces (  ){
    return db('places') 
 }

  function findPlaces(id){
      return db('places as p')
      .join('users as u','u.id','p.user_id')
      .select('p.city', 'p.country','u.username','u.id','p.id')
      .where({user_id:id})
  }

function updatePlace(id, obj, user_id) {
    return db("places")
      .where("id", id)
      .andWhere("user_id", user_id)
      .update(obj)
      .returning(["id", ...Object.keys(obj)]);
  }

   async function update(changes, id){
      await db('places')
      .where({id})
      .update(changes);
  }

   async function updateStory(changes, id){
      await db('stories')
      .where({id})
      .update(changes)
  }

//   function updateStory(id, info, user_id){
//      return db ('stories')
//       .where("id", id)
//       .andWhere('user_id', user_id)
//       .update(info)
//       .returning(["id", ...Object.keys(info)]);

//   }
  
  function remove(id){
      return db('places').where({id}).del();
  }

  function removeStory(id){
      return db('stories').where({id}).del();
  }
   

  function getStories(id){
      return db('stories as s')
       .join('places as p'  ,'p.id','s.place_id')
    //    .join('users as u')
       .select('p.city','p.country','s.review','s.id')
       .where({place_id:id})
      
  }

  async function addStory(story, place_id){
      await db('stories').insert(story, place_id)
  }


  module.exports = {
      addPlace,
       getAllPlaces,
        updatePlace,
        findById,
       findPlaces,
       getStories,
       addStory,
       update,
       updatePlace,
       updateStory,
       findStoryById,
       remove,
       removeStory,
       addReview
  }