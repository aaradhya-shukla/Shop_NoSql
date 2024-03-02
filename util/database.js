const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db; // means a variable to be used in the file only

// connectiong to mongodb which takes a url at the momgodb cluster
const MongoConnect = (callback)=>{
  MongoClient.connect('mongodb+srv://aaradhya:az75yvTFpQm9TAMM@aaradhya.mwglytc.mongodb.net/?retryWrites=true&w=majority&appName=Aaradhya').
then((client)=>{
  console.log('connected')
  callback();
  _db = client.db();

}).
catch((err)=>{
  console.log(err);
})
//az75yvTFpQm9TAMM
}

const getDb = ()=>{
  if (_db){
    return _db
  }
  throw "no database found"
}

exports.MongoConnect = MongoConnect;

exports.getDb = getDb;