const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/api/getData', (req,res) => {
  res.status(200).send({
    success: 'true',
    message: 'this was successfull'
  })
})

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});