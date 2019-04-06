const express = require('express')
const app = express();

const cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/api/getData', (req,res) => {
  res.status(200).send([{
    position: 1,
    name: 'film 1',
    length: 100,
    watched: true
  },{
    position: 2,
    name: 'film 2',
    length: 100,
    watched: true
  },{
    position: 3,
    name: 'film 3',
    length: 100,
    watched: true
  },{
    position: 4,
    name: 'film 4',
    length: 100,
    watched: true
  }])
})

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});