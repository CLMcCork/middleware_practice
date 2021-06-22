//require express 
const express = require('express');
//execute express
const app = express();
//require npm morgan
const morgan = require('morgan');
const { nextTick } = require('process');

//tells express that on every single request, use the middleware called 'morgan'
app.use(morgan('dev'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
});

app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS!");
    next();
})

// app.use((req, res, next) => {
//     console.log("This is my first middleware!");
//     next();
// });
// app.use((req, res, next) => {
//     console.log("This is my second middleware!");
//     next();
// });


app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE!'); 
});

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('WOOOOOOF!'); 
});

//setting up a 404 route
//then could render back a nice 404 not found template 
//needs to be at end of file like this 
app.use((req, res) => {
    res.status(404).send("NOT FOUND!"); 
});


app.listen(3000, () => {
    console.log('App is running on port 3000!')
});