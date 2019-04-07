const express = require('express')
const app = express();

const cors = require('cors');

var pgp = require('pg-promise')(/*options*/);
var db = pgp('postgres://filmdatabase:' + process.env.POSTGRES_PASSOWRD + '@film-database.ciyl3ymdaics.eu-west-2.rds.amazonaws.com:5432/filmdatabase');

// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'filmdatabase',
//   host: 'film-database.ciyl3ymdaics.eu-west-2.rds.amazonaws.com',
//   database: 'filmdatabase',
//   password: process.env.POSTGRES_PASSWORD,
//   port: 5432
// })

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

    res.status(200).send(
      data
    // [{
    //   position: 1,
    //   name: 'film 1',
    //   length: 100,
    //   watched: true
    // },{
    //   position: 2,
    //   name: 'film 2',
    //   length: 100,
    //   watched: true
    // },{
    //   position: 3,
    //   name: 'film 3',
    //   length: 100,
    //   watched: true
    // },{
    //   position: 4,
    //   name: 'film 4',
    //   length: 100,
    //   watched: true
    // }]
    )
  })
  
  
})

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});