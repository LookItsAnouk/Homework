var express = require('express')
var app = express()

const methodOverride = require("method-override")

app.use(express.urlencoded({extended: true}))

// ---------------Method Overrride Middleware--------------
app.use(methodOverride((req, res) => {
    if(req.body && req.body._method) {
        const method = req.body._method;
        return method
    }
}))


const path = require("path")

app.use(express.static(path.join(__dirname, 'public')));


const logger = require('morgan');
app.use(logger('dev'));



// app.get('/', (req, res) => {
//     res.render('cohorts/new')
// })
// app.get('/cohorts/index', (req, res) => {
//     res.render('cohorts/index')
// })
// app.get('/cohorts/show', (req, res) => {
//     res.render('cohorts/show')
// })



// //----Handle the submit of the Survey form---->
// app.get('/submit', (req, res) => {
//     const name = req.query.name;
//     const logourl = req.query.logourl;
//     const members = req.query.members;
//     res.render('cohort/show', {
//         name: name,
//         logourl: logourl,
//         members: members
//     })
// })

// Cohort router access
const cohortRouter = require("./routes/cohorts");
app.use("/cohorts", cohortRouter);

//---Set View Engine----------->
app.set('view engine', 'ejs')
app.set('views', 'views')


// servers
const PORT = 3000;
const DOMAIN = 'localhost'

app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})