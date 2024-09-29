const express = require("express");
const https = require('https');
const fs = require('fs');
const path = require('path');
var os = require("os");
var ocsp = require('ocsp');

// Check if running on AWS EC2
if (os.hostname() == 'emoovit-cnc') {
  console.log('You run this server at correct AWS EC2');
} else {
  console.log('You are in DEBUG MODE');
}

// SSL Credentials
const credentials = {
  key: fs.readFileSync('ssl/STAR_emoovit_ai.key'),
  cert: fs.readFileSync('ssl/STAR_emoovit_ai.crt')
};

const emoovitai = express();
const httpRedirect = express();

// Serve static HTML files (including index.html)
emoovitai.use(express.static(__dirname + "/www"));

// Serve static files from node_modules (for JavaScript or CSS libraries)
emoovitai.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Automatically route for all HTML files in the www folder
fs.readdirSync(path.join(__dirname, 'www')).forEach(file => {
  if (path.extname(file) === '.html' && file !== 'index.html') {
    const route = `/${path.basename(file, '.html')}`;
    emoovitai.get(route, (req, res) => {
      res.sendFile(path.join(__dirname, 'www', file));
    });
  }
});

// Serve index.html at the root /
emoovitai.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'www', 'index.html'));
});

// set up a route to redirect http to https
httpRedirect.use(function (req, res, next) {
  if (!req.secure) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});

httpRedirect.listen(80);

var server = https.createServer(credentials, emoovitai);
server.listen(443, () => console.log('eMooVit.ai public website is running in HTTPS mode'));
