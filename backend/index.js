const express = require('express')
const app = express();

const cors = require('cors');

var pgp = require('pg-promise')(/*options*/);
var db = pgp('postgres://filmdatabase:' + process.env.POSTGRES_PASSOWRD + '@film-database.ciyl3ymdaics.eu-west-2.rds.amazonaws.com:5432/filmdatabase');

function getAllData() {
  return new Promise((resolve,reject) => {
    resolve(db.any('SELECT * FROM blurays'));
    // reject('reject');
  })
}

var corsOptions = {
  origin: 'http://localhost:4200/',
  optionsSuccessStatus: 200
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/api/getData', (req,res) => {
  getAllData()
  .then(function(data) {
    console.log(data);
    res.status(200).send(data);
  })
  .catch(function(err) {
    console.log("error in getAllData",err);
    res.status(200).send("error:",err);
  })
})

app.get('/api/getUser', (req,res) => {
  const user = req.headers.user;

  console.log(user);

  db.one('SELECT * FROM users WHERE uid=$1',[user])
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    if (err.message === 'No data returned from the query.') {
      db.any('INSERT INTO users (uid,role) VALUES ($1,$2)',[user,1])
        .then(() => {
          db.one('SELECT * FROM users WHERE uid=$1',[user])
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(500).send(err);
        })
      })
      .catch((err) => {
        res.status(500).send(err);
      })
    }
    else 
    {
      console.log("printed error:", err);
      res.status(500).send("error getting user");
    }
  })
})

app.post('/adduser', (req,res) => {
  const user = req.headers.user;
  console.log(user);

  db.any('INSERT INTO users (uid,role) VALUES ($1,$2)',[user,1]);

  res.status(200).send("success");
})

app.listen(process.env.PORT || 8081, () => {
  console.log('App listening on port',process.env.PORT || 8081 + "!")
});