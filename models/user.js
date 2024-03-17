const mongoose = require('mongoose');
const { schema } = require('./product');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart:{
    items: [{productId: {type: Schema.Types.ObjectId, ref: 'Product' , required: true}, 
      quantity: {type: Number, required: true }}]
  }
})

module.exports = mongoose.model('user',UserSchema);


// class User{
//   constructor(name,email,cart, id){
//     this.name = name;
//     this.email = email;
//     this.cart = cart;//{items:[]}
//     this._id = id;
//   }

//   save(){
//     const db = getdb();
//     return db.collection('users').insertOne({name: this.name, email: this.email})
//   }
//   static findbyId(userId){
//     const db = getdb();
//     return db.collection('users').find({_id: new mongodb.ObjectId(userId)}).next().then(user=>{
//       console.log("User found-->", user);
//       return user
//     }).catch(err=>console.log(err))
//   }

//   addToCart(product){
//     const cartProductIndex = this.cart.items.findIndex(cp=>{
//       return product._id.toString()===cp.productId.toString();
//     })
//     let newQunatity =1;
//     const updatedCartItems = [...this.cart.items];
//     if (cartProductIndex>=0){
//       newQunatity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQunatity;
//     }
//     else{
//     updatedCartItems.push({
//       productId: product._id, 
//       quantity: newQunatity})
//     }
//     const updatedCart = {
//       items: updatedCartItems
//     };
//     const db = getdb();
//     return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: updatedCart}})

//   }

//   getCart(){
//     const db = getdb();
//     let productIds = this.cart.items.map(i =>{
//       if(i.quantity>0){
//         return i.productId;
//       }
//     })
//     productIds = productIds.filter(i=>{
//       return i!=NULL;
//     })
//     // we are  quering all the documents with the ids in the array
//     // using the $in operator
//     // this will give us a cursor with all the matching products
//     return db
//     .collection('products')
//     .find({_id: {$in: productIds}})
//     .toArray()
//     .then(products =>{
//       return products.map(p=>{
//         return {...p,
//            quantity:this.cart.items.find(i=>{
//           return i.productId.toString() === p._id.toString();
//         }).quantity }
//       })
//     })    
//   }

//   delete(prodId){
//     let updatedCartItem = this.cart.items.map(i=>{
//       if (i.productId.toString()===prodId.toString()){
//         i.quantity-=1;
//       }
//       return i
//     })
//     updatedCartItem = updatedCartItem.filter(i=>{
//       return i.quantity>0;
//     })
//     const updatedCart = {
//       items:updatedCartItem
//     }
//     const db = getdb();
//     return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: updatedCart}})
//   }

// addToOrder(){
//   const db = getdb();
//   return this.getCart().then(products=>{
//     const order = {
//       items: products,
//       user:{
//         _id: new mongodb.ObjectId(this._id),
//         name: this.name
//       }
//     }
//     return db.collection('orders').insertOne(order)
//   })
//   .then(result=>{
//     this.cart = {items: []};
//     return db.collection('users')
//     .updateOne(
//       {_id: new mongodb.ObjectId(this._id)},
//        {$set: {cart: this.cart}})
//   })
// }

// getOrders(){
//   const db = getdb();
//   return db.collection('orders').find({"user._id": new mongodb.ObjectId(this._id)}).toArray();
// }

// }


