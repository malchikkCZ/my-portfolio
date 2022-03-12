const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');


// import routers
const indexRouter = require('./routes/index');


// initialize app
const app = express();


// app settings
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


// app routers
app.use('/', indexRouter);


// app listen
app.listen(process.env.PORT || 3000);