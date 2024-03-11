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
  const regex = /^http:\/\/www\.example\.com$/; // Regular expression to match the format
  const regex2 = /^https:\/\/www\.example\.com$/;
  if(regex.test(url) || regex2.test(url)){
    dns.lookup(url, (err, address) => {
      if (err) {
        // console.error('Error:', err);
        // console.log("fail");
        return false;
      } else {
        // console.log("pass");
        return true;
      }
    });
  } else {
    // console.log("fail1")
    return false;
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
    res.json({error:"Invalid Url"});
  }

  
});


app.route('/api/shorturl')
.get((req,res)=>{
  res.send("Hi");
})
.post((req, res) =>{

  const url = req.body.url;
  // console.log(url);

  if(validateUrl(url)){
    // console.log(url);
    // console.log("fail2");
    res.json({error:'Invalid URL'});
    
  } else {
  if (urls.includes(url)){
    // console.log("exists");
    res.json({original_url:url,short_url:urls.indexOf(url)});
  } else {
    urls.push(url);
    // console.log("new url");
  res.json({original_url:url,short_url:urls.indexOf(url)});
  }
  }
  });



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
