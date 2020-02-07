const express = require('express')
const bodyParser = require('body-parser')

var app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


//Start of Get Requests

app.get('/',(req, res)=>{
	res.render('home')
})
app.get('/about',(req, res)=>{
	res.render('about')
})
app.get('/team',(req, res)=>{
	res.render('team')
})
app.get('/register',(req, res)=>{
	res.render('register')
})
app.get('/signin',(req, res)=>{
	res.render('signin')
})



//End of get requests




//Start of post requrests





//End of post requests



app.listen(3000, ()=>{
	console.log("Connected to Server")
})