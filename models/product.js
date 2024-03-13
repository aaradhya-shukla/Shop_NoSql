const mongodb = require('mongodb');
const getdb = require('../util/database').getDb;
class Product {
  constructor(title,price,description,imageUrl,id,userId){
    this.title=title;
    this.description=description;
    this.imageUrl=imageUrl;
    this.price=price;
    this.id=id;
    this.userId = userId;
  }
  save(){
    const db = getdb();
    let dbOp;
    if (this.id){
      console.log('here')
      //updating the product
      dbOp = db.collection('products').updateOne({_id: this.id},{$set: this})
    }
    else{
      dbOp = db.collection('products').insertOne(this);
    }
    
    return dbOp.
    then(result=>{
      console.log(result)
    }).
    catch(err=>{
      console.log(err)
    });
  }

  static fetchAll(){
    const db = getdb();
    return db.collection('products').
    find().
    toArray().
    then(products=>{
      // console.log(products)
      return products;
    }).
    catch(err=>{
      console.log(err)
    })
  }

  static findById(prodId){
    // since mongodb does not know that there is only one document 
    // like that so it still returns a cursor, so to
    //move to the next document or in our case last we use next()
    const db = getdb();
    return db.collection('products').
    find({_id: new mongodb.ObjectId(prodId)}).
    next().
    then(product=>{
      console.log(product);
      return product;
    }).
    catch(err=>{
      console.log(err)
    })

  }
  static Delete(prodId){
    const db = getdb();
    console.log("productId",prodId)
    return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
    .then(result=>console.log(result)).
    catch(err=>console.log(err))
  }
}

module.exports = Product;
