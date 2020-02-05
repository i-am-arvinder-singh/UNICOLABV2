const express = require('express')
const bodyParser = require('body-parser')
var app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


//Start of Get Requests

app.get('/',(req, res)=>{
	res.render('login')
})


//End of get requests




//Start of post requrests





//End of post requests



app.listen(3000, ()=>{
	console.log("Connected to Server")
})