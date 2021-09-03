const flash = require('express-flash')
const session = require('express-session')
const express = require('express')
const exphbs = require('express-handlebars')
const NamesGreeted = require('./namesGreeted')
const LanguagePicker = require('./languagePicker')
const { Pool } = require('pg')
const Routes = require('./routes/greetingRoutes')

const app = express()
const namesGreeted = NamesGreeted()
const languagePicker = LanguagePicker()
const routes = Routes()

//set up pool connection to database
const pool = new Pool({
  connectionString: 'postgres://oygnbgbdfpfsyl:325a9a8705dc1bd16a4339834a7d345a8d2f25babe8d74cd6f08c84131d15c67@ec2-18-215-44-132.compute-1.amazonaws.com:5432/ddd21pda85tb2v',
  ssl: {
    rejectUnauthorized: false
  }
})

// initialise session middleware - flash-express depends on it
app.use(session({
  secret : "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}))

// initialise the flash middleware
app.use(flash())


//set up middleware
app.engine('handlebars', exphbs({layoutsDir: "views/layouts/"}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



//gets values for counter value and greeting text
app.get('/', routes.main)

//sets values for name, language uses and stores name of greeted person in database
app.post("/name", routes.names)

//empties database and resets counter
app.post("/counter", routes.counter)

app.post("/greeted", routes.greeted)

app.get("/greeted/:name", routes.greetList)

const PORT = process.env.PORT || 3011

app.listen(PORT, () => {
    console.log("App is running at port " + PORT)
})