const express = require('express')
const bodyParser = require('body-parser')

var app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

if( typeof localStorage === "undefined" || localStorage === null){
	var LocalStorage = require('node-localstorage').LocalStorage
	localStorage = new LocalStorage('./scratch')
}


//Start of Get Requests

app.get('/',(req, res)=>{
	var name = localStorage.getItem('name')
	var pass = localStorage.getItem('pass')
	console.log(name)
	localStorage.clear()
	console.log(localStorage.getItem('name'))
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
app.post("/abcd", (req,res)=>{
	console.log(req.body)
	var name = req.body.email
	var pass = req.body.password
	localStorage.setItem("name" , name)
	localStorage.setItem("pass" , pass)
	// console.log(name+" "+pass)
	res.redirect("/")
	console.log(req.body)
	
	
})



//Start of post requrests





//End of post requests



app.listen(3000, ()=>{
	console.log("Connected to Server")
})