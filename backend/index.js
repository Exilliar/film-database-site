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

// blurays
app.get('/blurays/getAll', (req,res) => { // Gets all films from blurays table
  const uid = req.headers.uid;

  db.any('SELECT * FROM blurays WHERE uid=$1',[uid])
  .then(function(data) {
    res.status(200).send(data);
  })
  .catch(function(err) {
    res.status(500).send(err);
  });
})

app.post('/blurays/removeSingle', (req,res) => { // Removes film from blurays table
  db.any('DELETE FROM blurays WHERE id=$1',[req.body.filmid]);

  res.status(200).send("success");
})

app.post('/blurays/addSingle', (req,res) => { // Adds film to blurays table
  const { name, length, watched } = req.body.film;
  const uid = req.body.uid;

  db.any('INSERT INTO blurays (name, length, watched, uid) VALUES ($1,$2,$3,$4)',[name,length,watched,uid])
  .then(() => {
    res.status(200).send("success");
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

app.post('/blurays/updateWatched', (req,res) => { // Flips the value of watched
  const { id, watched} = req.body.film;

  db.any('UPDATE blurays SET watched=$1 WHERE id=$2',[!watched,id])
  .then(() => {
    res.status(200).send("success");
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

// users
app.get('/users/getAll', (req,res) => { // Gets all users
  db.any('SELECT u.uid, u.email, r.name AS roleName, u.role AS roleId, r.protected FROM users u, roles r WHERE r.role=u.role')
  .then(function(data) {
    res.status(200).send(data);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

app.get('/users/getSingle', (req,res) => { // Gets the user with a given uid, if the user does not exist then adds the user and returns the newly created user
  const user = req.headers.user;
  const email = req.headers.email;

  db.one('SELECT * FROM users WHERE uid=$1',[user])
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    if (err.message === 'No data returned from the query.') {
      db.any(`INSERT INTO users (uid,role,email) VALUES ($1,$2,$3);
              SELECT * FROM users WHERE uid=$1`,[user,1,email])
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

// roles
app.get('/roles/getAll', (req, res) => {
  db.any('SELECT role AS id, name, protected FROM roles')
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.post('/roles/updateSingle', (req,res) => { // Updates the role of a user, given a uid
  const uid = req.body.uid;
  const role = req.body.role;

  db.any('UPDATE users SET role=$1 WHERE uid=$2',[role,uid])
  .then(() => {
    res.status(200).send("success");
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

app.listen(process.env.PORT || 8081, () => {
  console.log('App listening on port',process.env.PORT || 8081 + "!")
});