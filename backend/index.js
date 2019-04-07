const express = require('express')
const app = express();

const cors = require('cors');

var pgp = require('pg-promise')(/*options*/);
var db = pgp('postgres://filmdatabase:' + process.env.POSTGRES_PASSOWRD + '@film-database.ciyl3ymdaics.eu-west-2.rds.amazonaws.com:5432/filmdatabase');

function getAllData() {
  return new Promise((resolve,reject) => {
    resolve(db.any('SELECT * FROM blurays'));
  })
}

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/api/getData', (req,res) => {
  getAllData()
  .then(function(data) {
    console.log(data);
    res.status(200).send(data);
  })
})

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});