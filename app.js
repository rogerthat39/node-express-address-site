const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')

//use any static files from /public
app.use(express.static("public"))
//set pug as the templating engine
app.set("view engine", "pug")
//show engine where the view files are
app.set("views", "./views")

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(session({secret: 'secret', 'resave': true, 'saveUninitialized': true}))

//import routes
app.use("/", require("./routes/routes"))

//run the app on port 3000
app.listen(3000, ()=>{
    console.log("running on port 3000")
})