const mongodb = require('mongodb');
const getdb = require('../util/database').getDb;

class User{
  constructor(name,email){
    this.name = name;
    this.email = email;
  }

  save(){
    const db = getdb();
    return db.connect('users').insertOne({name: this.name, email: this.email})
  }
  static findbyId(userId){
    const db = getdb();
    return db.connect('users').find({_id: new mongodb.ObjectId(userId)}).next().then(user=>{
      console.log("User found-->", user);
      return user
    }).catch(err=>console.log(err))
  }
}

module.exports = User;
