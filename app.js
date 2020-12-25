const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require("bcrypt")
const shortid = require("shortid")
const alert = require('alert')
var Razorpay = require('razorpay')
const dotenv = require('dotenv')
dotenv.config()

const {
    exec
} = require('child_process');

const fs = require('fs')
//Requiring Schemas
const {
    User
} = require("./user.js")

var {
    Data
} = require("./project.js")

// var {
//     mongoose
// } = require('./connect.js');
var {
    auth,
    firebaseApp
} = require("./src/firebase.js");

var rzp = new Razorpay({
    key_id: 'rzp_test_ww9vFc3GF9XHaH', // need to change in payment.ejs
    key_secret: 'DmZF9wbbOdLhpghCh7M25Jhn'
})

//authentication schemes
var session = require('express-session')
var cookieParser = require('cookie-parser')
// var passport = require('passport')
var app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(session({
    secret: 'asdfasdgfsdghfsddf',
    resave: false,
    saveUninitialized: false
}))

// app.use(passport.initialize());
// app.use(passport.session());

// if (typeof localStorage === "undefined" || localStorage === null) {
//     var LocalStorage = require('node-localstorage').LocalStorage
//     localStorage = new LocalStorage('./scratch')
// }

//Start of Get Requests
app.get('/', (req, res) => {
    var curUser = auth.currentUser;
    if(curUser){
        return res.redirect('./dashboard')
    }
    else return res.render('home')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/idea', (req, res) => {
    res.render('idea')
})

app.get('/team', (req, res) => {
    res.render('team')
})

app.get('/register', (req, res) => {
    var curUser = auth.currentUser;
    if(curUser){
        return res.redirect('./dashboard')
    }
    else{
        res.render('register')
    }
})

app.get('/login', (req, res) => {
    var curUser = auth.currentUser;
    if(curUser){
        return res.redirect('./dashboard')
    }
    else{
        return res.render('login')
    }
})

app.get('/details', (req, res) => {
    res.render('details')
})

app.get('/profile', (req, res) => {
    res.render('profile')
})

app.get('/payment', (req, res) => {
    res.render('payment')
    //{name:name,phonenumber:phone,email:email}
})

app.get('/dashboard', (req, res) => {
    var curUser = auth.currentUser;
    if(curUser){
        // console.log("Current User: ",auth.currentUser)
        return res.render('dashboard')
    }
    else return res.redirect('/login')
    // var category = req.query.category || "none"
    // var id = localStorage.getItem('id') || req.user
    // User.findOne({
    //     id: id
    // }, (err, user) => {
    //     if (err) {
    //         res.redirect('/login')
    //     }
    //     if (user) {
    //         Data.find({
    //             id: id
    //         }, (err, results) => {
    //             if (category === "none") {
    //                 res.render('profile', {
    //                     name: user.name,
    //                     email: user.email,
    //                     number: user.phonenumber,
    //                     pub: user.publications || '0',
    //                     exp: user.research_exp || '0',
    //                     link: user.url || 'none',
    //                     college: user.organisation,
    //                     interest: user.interest,
    //                     designation: user.designation,
    //                     docs: results,
    //                     list: []
    //                 })
    //             } else {
    //                 User.find({
    //                     interest: category
    //                 }, (err, userss) => {
    //                     console.log(userss)
    //                     if (userss) {
    //                         res.render('profile', {
    //                             name: user.name,
    //                             email: user.email,
    //                             number: user.phonenumber,
    //                             pub: user.publications || '0',
    //                             exp: user.research_exp || '0',
    //                             link: user.url || 'none',
    //                             college: user.organisation,
    //                             interest: user.interest,
    //                             designation: user.designation,
    //                             docs: results,
    //                             own_id: id,
    //                             list: userss
    //                         })
    //                     }
    //                 })
    //             }
    //         })
    //         console.log(user)
    //     }
    // })
})
//End of get requests


//Start of post requrests
app.post("/login", (req, res) => {

    var curUser = auth.currentUser;

    if(curUser){
        return res.redirect('./dashboard')
    } else {
        var email = req.body.email
        var password = req.body.password
        auth.signInWithEmailAndPassword(email,password)
            .then((user)=>{
                // console.log(user);
                return res.redirect('./dashboard')
            })
            .catch((err)=>{
                var errorCode = err.code;
                var errorMessage = err.message;
                console.log(errorCode,errorMessage)
                // console.log("Please check your password")//ALERT NOT WORKING FIX IT
                return res.redirect('/login');
            })
    }
    // User.findOne({
    //     email: email
    // }).then((doc) => {
    //     console.log(doc)
    //     bcrypt.compare(req.body.password, doc.password, (err, result) => {
    //         if (err) {
    //             console.log(err)
    //         } else if (result) {
    //             // console.log('Here!')
    //             // console.log(doc[0])
    //             if (doc.phonenumber !== '') {
    //                 const user_id = doc.id
    //                 req.login(user_id, (err) => {
    //                     localStorage.setItem('id', doc.id)
    //                     res.redirect('/payment')
    //                 })
    //             }
    //             // else{
    //             // 	console.log('here!')
    //             //             	localStorage.setItem('id',doc.id)
    //             // 	res.redirect('/details')
    //             // }
    //         } else {
    //             res.redirect("/")
    //             console.log(doc)
    //         }
    //     })
    // }).catch((err) => {
    //     console.log(err)
    // })
})


//End of post requests
app.post('/register', (req, res) => {
    var email = req.body.email
    var password = req.body.password
    var password2 = req.body.password2
    if(password!=password2){
        console.log("Passwords do not match")
        redirect('/register')
    }
    auth.createUserWithEmailAndPassword(email,password)
        .then((user)=>{
            // console.log(user)
            res.redirect('/login')
        })
        .catch((err)=>{
            var errorCode = err.code;
            var errorMessage = err.message;
            console.log(errorCode,errorMessage)
            res.redirect('/register')
        })
    // User.findOne({
    //     email: req.body.email
    // }, function(err, user) {
    //     if (err) res.redirect('/register')
    //     if (user) {
    //         alert("There exists a user with that email. Please give a correct email.")
    //         res.redirect('/register')
    //         return
    //     }
    // })
    // if (req.body.password === req.body.password2) {
    //     bcrypt.hash(req.body.password, 10, (err, hash) => {
    //         console.log(hash)
    //         new User({
    //             name: req.body.name,
    //             email: req.body.email,
    //             password: hash,
    //             id: shortid.generate()
    //         }).save().then((user) => {
    //             console.log(user)
    //             localStorage.setItem('id', user.id)
    //             res.redirect('/details')
    //         }, (e) => {
    //             res.status(400).send(e)
    //         }).catch((err) => {
    //             console.log(err)
    //         });
    //     })
    // } else {
    //     res.redirect("/register")
    // }
})

app.post('/details', (req, res) => {
    var id = localStorage.getItem('id')
    User.findOne({
        id: id
    }, (err, doc) => {
        console.log('document here!11')
        console.log(doc)
        doc.phonenumber = req.body.phonenumber
        doc.organisation = req.body.organisation
        doc.research_exp = req.body.research_exp
        doc.publications = req.body.publications
        doc.url = req.body.url
        doc.designation = req.body.designation
        doc.interest = req.body.interest
        doc.save()
        res.redirect('/login')
        return
    })
})

app.post('/logout', (req, res) => {
    auth.signOut().then(()=>{
        console.log('Current User: ',auth.currentUser)
        return res.render('login')
    })
    .catch((err)=>{
        var errorCode = err.code;
        var errorMessage = err.message;
        console.log('******ERROR*****',errorCode,errorMessage)
        return res.render('login')
    })
    // localStorage.clear()
    // req.logout()
    // req.session.destroy()
    // res.redirect('/')
})

app.post('/database', (req, res) => {
    id = localStorage.getItem('id')
    fs.writeFile('some.txt', req.body.abstract, (err) => {
        // In case of a error throw err. 
        if (err) throw err;
    })
    exec("python execute.py", (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err)
        } else {
            // the *entire* stdout and stderr (buffered)
            // var lastIndex = stdout.lastIndexOf(" ");
            msg = stdout.substring(2, 25)
            console.log(msg)
            new Data({
                id: id,
                project_id: shortid.generate(),
                title: req.body.title,
                abstract: req.body.abstract,
                category:msg
            }).save().then((doc) => {
                res.redirect('/dashboard')
            })
        }
    });
    console.log(id)
})

app.post('/add_collaborator', (req, res) => {
    var id = localStorage.getItem("id")
    Data.find({
        id: id
    }, (err, docs) => {
        if (docs) {
            console.log(docs)
            res.render('collab', {
                docs: docs
            })
        }
    })
})

// app.post('/pay', (req, res) => {
//     var amount = 10000
//     name = "Abinash Dutta"
//     email = "abinashdtt45@gmail.com"
//     phone = "7086616224"
//     rzp.customers.create({
//         name: name,
//         email: email,
//         fail_existing: '0'
//     }).then((data) => {
//         console.log(data)
//         rzp.orders.create({
//             amount: amount,
//             currency: "INR",
//             receipt: data.id
//         }).then((order) => {
//             console.log("Order Details: ");
//             console.log(order);
//             console.log(order.id)
//             var orderID = order.id;
//             rzp.payments.fetch(req.body.razorpay_payment_id).then((response) => {
//                 console.log("Payment Instance")
//                 console.log(response)
//                 rzp.payments.capture(req.body.razorpay_payment_id, response.amount).then((capture) => {
//                     console.log("Payment Captured Successfully: ")
//                     console.log(capture)
//                     res.redirect('/dashboard')
//                 }).catch((error) => {
//                     console.log("Failed to capture payment")
//                     console.log(error)
//                 })
//             }).catch((error) => {
//                 console.log("failed to fetch payment")
//                 console.log(response)
//             })
//         }).catch((error) => {
//             //error
//             console.log("Order creation error")
//             console.log(error)
//             res.redirect('/dashboard')
//         })
//     }).catch((error) => {
//         // error
//         console.log("Customer Create Error: ");
//         console.log(error);
//         res.redirect('/dashboard')
//     })
// })
// passport.serializeUser(function(user_id, done) {
//     done(null, user_id);
// });
// passport.deserializeUser(function(user_id, done) {
//     done(null, user_id);
// });

app.listen(3000, () => {
    console.log("Connected to Server")
})