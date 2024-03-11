require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { urlencoded } = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

urls = [];

app.get('/api/short/url/:id',(req,res) =>{
  const id = req.params.id;
  const url = urls.find(u => u.id === id);
  res.redirect(url);
});


app.route('/api/shorturl')
.get((req,res)=>{
  res.send("Hi");
})
.post((req, res) =>{

  const url = req.body.url;
  urls.push(url)
  res.json({original_url:url,short_url:urls.indexOf(url)})
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
