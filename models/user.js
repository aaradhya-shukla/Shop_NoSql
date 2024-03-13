const mongodb = require('mongodb');
const getdb = require('../util/database').getDb;

class User{
  constructor(name,email,cart, id){
    this.name = name;
    this.email = email;
    this.cart = cart;//{items:[]}
    this._id = id;
  }

  save(){
    const db = getdb();
    return db.collection('users').insertOne({name: this.name, email: this.email})
  }
  static findbyId(userId){
    const db = getdb();
    return db.collection('users').find({_id: new mongodb.ObjectId(userId)}).next().then(user=>{
      console.log("User found-->", user);
      return user
    }).catch(err=>console.log(err))
  }

  addToCart(product){
    const cartProductIndex = this.cart.items.findIndex(cp=>{
      return product._id.toString()===cp.productId.toString();
    })
    let newQunatity =1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex>=0){
      newQunatity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQunatity;
    }
    else{
    updatedCartItems.push({
      productId: product._id, 
      quantity: newQunatity})
    }
    const updatedCart = {
      items: updatedCartItems
    };
    const db = getdb();
    return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: updatedCart}})

  }

}

module.exports = User;
