console.log('The bot is starting');

// Require the modules
var Twit = require('twit');
var spellService = require('./spell-service');
var twitconfig = require('./config/twitconfig');
var T = new Twit(twitconfig);
var checkedText;

var stream = T.stream('statuses/filter', { follow: ['25073877', '747793587002183680'] });
//https://dev.twitter.com/streaming/overview/request-parameters#follow
stream.on('tweet', function (tweet) {
  if (tweet.user.id == '747793587002183680') {
    console.log('He Tweeted :(')

    // var fs = require ('fs');    //write JSON 1/3
    // var json = JSON.stringify(tweet,null,2);  //write JSON 2/3
    // fs.writeFile("tweet.JSON", json);  //write JSON 3/3

    originalText = tweet.text
    console.log("The original text is: " + originalText);

    spellService
        .getCorrectedText(originalText)
        .then(text => {
            checkedText = text
            console.log("Text variable is: " + text);
            console.log("Output text is: " + checkedText);
            chooseTweet();
        })
        .catch((error) => {
            sendIt("Hey @Ian_Moritz your bot has an error " + tweet.id_str)
            console.log(error);
        })

            function chooseTweet (){
            if (!checkedText == undefined && checkedText !== null){
              newTweet = "✅ " + " https://twitter.com/realDonaldTrump/status/" + tweet.id_str
              sendIt(newTweet);
              console.log("Function choice 1");
            }

            else {
              newTweet = checkedText + " https://twitter.com/realDonaldTrump/status/" + tweet.id_str
              sendIt(newTweet);
              console.log(newTweet);
              console.log("Function choice 2");
            }
        }
    }
})

function sendIt(txt) {
    var tweet = {
        status: (txt),
//        in_reply_to_status_id: tweet.id
    }
    console.log("The tweet is:")
    console.log(txt);

T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if (err) {
            console.log("Something went wrong with posting:");
            console.log(err)
        } else {
            console.log("It worked!");
            console.log();
        }
    }
}
