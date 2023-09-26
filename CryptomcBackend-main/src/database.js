const mongoose = require('mongoose');
require("dotenv").config()

mongoose.connect("mongodb+srv://joaquin:Bartolo811@cluster0.gsgoo9s.mongodb.net/cryptomc", { useNewUrlParser: true , useUnifiedTopology: true})
.then(() => console.log('La base de datos está conectada') )
.catch(err => console.error(err));