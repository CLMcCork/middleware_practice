//require express 
const express = require('express');
//execute express
const app = express();
//require npm morgan
const morgan = require('morgan');

//tells express that on every single request, use the middleware called 'morgan'
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.send('HOME PAGE!'); 
});

app.get('/dogs', (req, res) => {
    res.send('WOOOOOOF!'); 
});

app.listen(3000, () => {
    console.log('App is running on port 3000!')
});