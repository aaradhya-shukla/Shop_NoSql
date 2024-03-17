const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('65f444df0520fec3efac0ecf')
    .then(user => {
      console.log("user name:",user.name,user);
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect('mongodb+srv://aaradhya:az75yvTFpQm9TAMM@aaradhya.mwglytc.mongodb.net/Shop?retryWrites=true&w=majority&appName=Aaradhya')
.then(result=>{
  User.findOne().then(user=>{
    if(!user){
      User.create({
        name: 'Aaradhya',
        email: 'aaradhya.shukla229@gmail.com',
        cart: {
          items: []
        }
      })
    }
    app.listen(3000);
    console.log('connected via mongoose');
  })
}).catch(err=>console.log(err));