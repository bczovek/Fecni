import database from './model/database.js';
import express from 'express';
import 'dotenv/config'
import { auth } from 'express-openid-connect';

const app = express();
const port = process.env.PORT || 3000;

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
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
  req.database = database(process.env.REDIS_URL);
  next();
});

app.get('/', function(req, res) {
    res.render("index", {
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
    })
  });

app.post('/save', (req, res) => {
  if(req.oidc.isAuthenticated()){
    req.database.setLists(req.oidc.user.nickname, req.body.lists).then((message) => {
      res.status(200).send(message);
    }).catch((message) => {
      res.status(500).send(message);
    });
  } else {
    res.status(401).send("Unauthorized. Please login first.");
  }
});

app.get('/lists', (req, res) => {
  if(req.oidc.isAuthenticated()){
    req.database.getLists(req.oidc.user.nickname).then((lists) => {
      res.json(lists);
    }).catch((message) => {
      res.status(500).send(message);
    });
  } else {
    res.status(401).send("Unauthorized. Please login first.");
  }
});

app.listen(port);