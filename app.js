const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');


// import routers
const indexRouter = require('./routes/index');
const portfolioRouter = require('./routes/portfolio');
const resumeRouter = require('./routes/resume');
const contactRouter = require('./routes/contact');
const adminRouter = require('./routes/admin');


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
app.use('/portfolio', portfolioRouter);
app.use('/resume', resumeRouter);
app.use('/contact', contactRouter);
app.use('/admin', adminRouter);


// app listen
app.listen(process.env.PORT || 3000);