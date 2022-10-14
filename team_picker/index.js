var express = require('express')
var app = express()

var morgan = require('morgan')



const methodOverride = require("method-override")

// ---------------Method Overrride Middleware--------------
app.use(methodOverride((req, res) => {
    if(req.body && req.body._method) {
        const method = req.body._method;
        return method
    }
}))

app.use(express.urlencoded({extended: true}))

const cookieParser = require('cookie-parser');

app.use(cookieParser())

const postsRouter = require("./routes/postsRouter");
app.use("/posts", postsRouter);

const path = require("path")

app.use(express.static(path.join(__dirname, 'public')));


const logger = require('morgan');
app.use(logger('dev'));
//--------

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/cohort_list', (req, res) => {
    res.render('cohort_list')
})
app.get('/new_cohort', (req, res) => {
    res.render('new_cohort')
})



//----Handle the submit of the Survey form---->
app.get('/submit', (req, res) => {
    const name = req.query.name;
    const logo = req.query.logo;
    const members = req.query.members;
    res.render('cohort_details/', {
        name: name,
        logo: logo,
        members: members
    })
})



/*
// ---------------POST ROUTER ACCESSING POST ROUTES------------------>
const noteRouter = require('./routes/notes')
app.use('/notes', noteRouter)*/

//---Set View Engine----------->
app.set('view engine', 'ejs')
app.set('views', 'views')



const PORT = 3000;
const DOMAIN = 'localhost'

app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})