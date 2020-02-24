const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
var knex = require('knex')

const app = express();
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'Fati',
      password : 'Pqvavs1PtS21',
      database : 'facerec'
    }
});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => { signin.signinHandler(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.profileHandlerGet(req, res, db) });
app.put('/image', (req, res) => { image.imageHandler(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(3000,  () => {
    console.log('app is running');
});


