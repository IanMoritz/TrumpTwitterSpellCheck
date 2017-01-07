console.log('The bot is starting');

// Require the modules
var Twit = require('twit');
var webshot = require('webshot');
var fs = require('fs');
var spellService = require('./spell-service');
var twitconfig = require('./config/twitconfig');
var T = new Twit(twitconfig);
var checkedText;

var stream = T.stream('statuses/filter', { follow: ['25073877', '747793587002183680'] });
//https://dev.twitter.com/streaming/overview/request-parameters#follow
function test () {
  if (tweet.user.id == '747793587002183680') {

    webshot('google.com', 'google.png', function(err) {
      // screenshot now saved to google.png
    })
  }
};
