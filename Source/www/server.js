const express = require('express');
const path = require('path');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET
};

app.set("views", "views");
app.set("view engine", "ejs");
app.use(auth(config));
app.use(express.static('public'));


app.get('/profile', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? req.oidc.user : 'Not logged in')
})

app.get('/', function(req, res) {
    res.render("index", {
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
    })
  });

app.listen(port);