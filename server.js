const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const port = 3000;
const server = app.listen(port, listening);

app.use(express.static('website'));

function listening() {
  console.log('server running');
  console.log(`running on localhost: ${port}`);
}

const projectData = {};

app.get('/getData', function(req, res){
  res.send(projectData);
})

app.post('/postData', function (req, res) {
  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.userResponse = req.body.userResponse;
  res.send('POST received')
})

MovieData = [];


app.post('/addMovie', (req, res) => {
  console.log(req.body); 
  MovieData.push(req.body);
  res.send(MovieData);
})
 