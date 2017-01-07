console.log('The cognitive bot is starting');

const cognitiveServices = require('cognitive-services');

const bingSpellCheck = new cognitiveServices.bingSpellCheck({
    API_KEY: bfd148ee868e4cfaa2e7ba7b554a869b
})

bingSpellCheck.spellCheck()
    .then((response) => {
        console.log('Got response', response);
    })
    .catch((err) => {
        console.error('Encountered error making request:', err);
    });
