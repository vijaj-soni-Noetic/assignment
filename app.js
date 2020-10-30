const express = require('express');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');

const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');
const app =express();

app.use(helmet());


if(process.env.NODE_EVN ==='development'){
    app.use(morgan('dev'));
}


app.use(express.json());
app.use(mongoSanitize());

app.use(xss());


app.use(express.static(`${__dirname}/public`));



app.use((req, res, next) => {
    req.requestTime= new Date().toDateString();
   // console.log(req.headers);
    next();
});
app.use('/api/v1/user', require('./router/authRouter'));
app.use('/api/v1/menu', require('./router/menu'));
app.use('/api/v1/cart', require('./router/card'));
app.use('/api/v1/image', require('./router/upload.router'));

app.all('*', (req, res, next)=>{
    
    next(new AppError(`can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);
module.exports = app;