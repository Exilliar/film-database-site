const express = require('express')
const app = express();
const bodyParser = require('body-parser')

const cors = require('cors');

const pgp = require('pg-promise')(/*options*/);
const db = pgp('postgres://filmdatabase:' + process.env.POSTGRES_PASSOWRD + '@film-database.ciyl3ymdaics.eu-west-2.rds.amazonaws.com:5432/filmdatabase');

app.use(cors());
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("It's alive!")
});

app.get('/api/getData', (req,res) => { // Gets all films from blurays table
  const uid = req.body.uid;

  db.any('SELECT * FROM blurays WHERE uid=$1',[uid])
  .then(function(data) {
    res.status(200).send(data);
  })
  .catch(function(err) {
    res.status(500).send(err);
  });
})

app.get('/api/getUser', (req,res) => { // Gets the user with a given uid, if the user does not exist then adds the user and returns the newly created user
  const user = req.headers.user;

  db.one('SELECT * FROM users WHERE uid=$1',[user])
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    if (err.message === 'No data returned from the query.') {
      db.any(`INSERT INTO users (uid,role) VALUES ($1,$2);
              SELECT * FROM users WHERE uid=$1`,[user,1])
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
    }
    else {
      res.status(500).send(err);
    }
  });
})

app.post('/api/removeFilm', (req,res) => { // Removes film from blurays table
  db.any('DELETE FROM blurays WHERE id=$1 AND uid=$2',[req.body.filmid, req.body.uid]);

  res.status(200).send("success");
})

app.post('/api/addFilm', (req,res) => { // Adds film to blurays table
  const { name, length, watched, uid } = req.body.film;

  db.any('INSERT INTO blurays (name, length, watched, uid) VALUES ($1,$2,$3,$4)',[name,length,watched,uid])
  .then(() => {
    res.status(200).send("success");
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

app.post('/api/updateWatched', (req,res) => { // Flips the value of watched
  const name = req.body.film;
  const uid = req.body.uid;

  let watched;

  db.any('SELECT watched FROM blurays WHERE name=$1 AND uid=$2',[name, uid])
  .then((w) => {
    watched = !w[0].watched;

    db.any('UPDATE blurays SET watched=$1 WHERE name=$2 AND uid=$2',[watched,name,uid])
    .then(() => {
      res.status(200).send("success");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

app.listen(process.env.PORT || 8081, () => {
  console.log('App listening on port',process.env.PORT || 8081 + "!")
});