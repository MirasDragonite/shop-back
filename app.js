const express = require('express');
const bodyParser = require('body-parser');
const ejs=require('ejs')
const mongoURI='mongodb://localhost:27017/sessions';

const methodOverride = require('method-override')
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json');
const app = express();
//const port = 3000
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(methodOverride('_method'))

const UserRoute = require('./routes/UserRoute')
app.use('/user',UserRoute)


const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const {router} = require("express/lib/application");
const https = require("https");

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


app.use(express.static('assets'))
app.use(express.static('img'))

app.use('/fonts',express.static(__dirname+'assets/fonts'))
app.use('/img',express.static(__dirname+'assets/img'))
app.use('/js',express.static(__dirname+'assets/js'))
app.use('/scss',express.static(__dirname+'assets/scss'))
app.use('/css',express.static(__dirname+'assets/css'))
app.use('/webp',express.static(__dirname+'assets/img/about'))
app.use('/webp',express.static(__dirname+'assets/img/blog'))
app.use('/icons',express.static(__dirname+'assets/img/icons'))
app.use('/shape',express.static(__dirname+'assets/img/shape'))
app.use('/photos',express.static(__dirname+'assets/img/photos'))
///routs
app.use('/about-us', require('./routes/about-us'))
app.use('/account', require('./routes/account'))
app.use('/account-login', require('./routes/account-login'))

app.use('/blog', require('./routes/blog'))

app.use('/blog-details-left-sidebar', require('./routes/blog-details-left-sidebar'))
app.use('/blog-details-no-sidebar', require('./routes/blog-details-no-sidebar'))
app.use('/contact', require('./routes/contact'))
app.use('/page-not-found', require('./routes/page-not-found'))
app.use('/shop', require('./routes/shop'))
app.use('/shop-cart', require('./routes/shop-cart'))
app.use('/shop-checkout', require('./routes/shop-checkout'))
app.use('/shop-compare', require('./routes/shop-compare'))
app.use('/shop-four-columns', require('./routes/shop-four-columns'))
app.use('/shop-three-columns', require('./routes/shop-three-columns'))
app.use('/shop-right-sidebar', require('./routes/shop-right-sidebar'))
app.use('/index-two', require('./routes/index-two'))
app.use('/index', require('./routes/index'))
app.use('/', require('./routes/index2'))
app.use('/shop-wishlist', require('./routes/shop-wishlist'))
app.use('/single-affiliate-product', require('./routes/single-affiliate-product'))
app.use('/single-group-product', require('./routes/single-group-product'))
app.use('/single-normal-product', require('./routes/single-normal-product'))
app.use('/single-product', require('./routes/single-product'))
app.use('/weather', require('./routes/weather'))

app.post('/',((req, res) =>{
    let cityname=req.body.city
    let key="d134b1b82ccbb2a01099550a3393edb5"
    let url="https://api.openweathermap.org/data/2.5/weather?q=" +cityname + "&appid=" + key + "&units=metric&mode=json"
    https.get(url,function (response){
        response.on( 'data',data=>{
            // console.log(data)
            let a= JSON.parse(data)
            let temp= a.main.temp
            let cond= a.weather[0].description
            res.send("Weather in city:"+ cityname + "  "+cond+"  "+temp)
        })

    })

} ))


app.get('/', (req, res) => {
    res.render('index');
});

/*app.post('/', (req, res) => {
    create(req,res)
});*/

/*app.get('/', (req, res) => {
    findAll(req, res)
});*/

app.get('/find', (req, res) => {
    res.render('find');
});
/*app.get('/findbyemail', (req, res) => {
    findOne(req,res)
});*/

app.get('/update', (req, res) => {
    res.render('update');
});

app.get('/delete', (req, res) => {
    res.render('delete');
});


let port = process.env.PORT||3000;
/*if (port == null || port == "") {
    port = 3000;
}*/

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});