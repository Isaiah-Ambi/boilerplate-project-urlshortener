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

const dns = require('dns');


function validateUrl(url) {
  let con = url.startsWith("http");
  let valid;
  if(con){
    // console.log(lookUp(url))
    return true
    
  } else {
    console.log('URL must start with http or https');
    // valid = false;
    return false
  }
  
}

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let urls = [];

app.get('/api/shorturl/:id',(req,res) =>{
  const id = req.params.id;
  const url = urls[id];
  if (urls.includes(url)){
    // console.log(url);
  res.redirect(url);
  } else {
    res.json({error:"invalid url"});
  }

  
});


app.route('/api/shorturl')
.get((req,res)=>{
  res.send("Hi");
})
.post((req, res) =>{

  const url = req.body.url;
  const short = urls.indexOf(url);
  // console.log(validateUrl(url));
  let con = validateUrl(url);
  // console.log(con)
  if(con){

    dns.lookup(url, (err, address) => {
      if (err) {
        console.error('Error:', err);
        res.json({error:'invalid url'});
        // return false
      }
      console.log('Address:', address);
      console.log("valid");

      if(urls.includes(url)){
      // console.log("exists");
      res.json({original_url:url,short_url:urls.indexOf(url)});
    } else {
      urls.push(url);
      // console.log("new url");
    res.json({original_url:url,short_url:short});
    }
    });
  } else {
    res.json({error: "invalid url"});
  }})
    


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
