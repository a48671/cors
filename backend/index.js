const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 4000;

const sessionOptions = {
    secret: '123456',
    cookie: {
        maxAge: 269999999999
    },
    saveUninitialized: true,
    resave: true
};

app.use(session(sessionOptions));

app.get('/', (request, response) => {
    response.send('Hello from Express');
});

app.get('/public', (request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
    response.send(JSON.stringify({
        message: 'This is public'
    }))
});

app.post('/login', (request, response) => {
    if (request.body.password === 'secret') {
        request.session.loggedIn = true;
        response.send('You are logged in!');
    } else {
        response.send('Wrong password');
    }
});

app.get('/private', function(request, response) {
    if(request.session.loggedIn === true) {
        response.send(JSON.stringify({
            message: 'THIS IS PRIVATE'
        }))
    } else {
        response.send(JSON.stringify({
            message: 'Please login first'
        }))
    }
});

app.listen(PORT, (err) => {
    if (err) {
        return console.log('error: ', err);
    }
    console.log(`server is listening on ${PORT}`);
})
