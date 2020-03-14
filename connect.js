//Here we will be connecting to the mongo database.
//There will be a database created named Unicolab which will have respective collections.
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/UnicoLAB',{ useNewUrlParser: true, useUnifiedTopology: true,
useCreateIndex: true })
module.exports={mongoose}