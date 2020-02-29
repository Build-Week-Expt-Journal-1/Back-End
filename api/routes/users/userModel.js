const db = require('../../../database/dbConfig')

function addUser(user){
  return  db('users')
  .insert(user);
}

function findBy(filter) {
    return db('users').where(filter);
  }

 

module.exports= {
    addUser,
    findBy
 }