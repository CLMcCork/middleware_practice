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

//fake password function (not real auth)
//this is middleware that is used to see if they query password is entered 
const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if(password === 'chickennugget') {
        next();
    }
    //res.send('Sorry you need the secret password!')
    throw new Error('Password required!')
};

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

app.get('/error', (req, res) => {
    chicken.fly()
});

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('WOOOOOOF!'); 
});

//route for fake secret password 
app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: I have the two best goldendoodles in the world!!!');
})


//setting up a 404 route
//then could render back a nice 404 not found template 
//needs to be at end of file like this 
app.use((req, res) => {
    res.status(404).send("NOT FOUND!"); 
});

//custom error handling middleware
//has to be at bottom of file 
app.use((err, req, res, next) => {
    console.log("********************************")
    console.log("**************ERROR*************")
    console.log("********************************")
    //res.status(500).send("Oh no! There was an error!")
    console.log(err);
    next(err);  //causes you to hit the built in error handler 
}); 

app.listen(3000, () => {
    console.log('App is running on port 3000!')
});