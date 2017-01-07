const request = require('request');

const SPELL_CHECK_API_URL = "https://api.cognitive.microsoft.com/bing/v5.0/spellcheck/?form=BCSSCK",
    SPELL_CHECK_API_KEY = 'bfd148ee868e4cfaa2e7ba7b554a869b';

/**
 * Gets the correct spelling for the given text
 * @param {string} text The text to be corrected
 * @returns {Promise} Promise with corrected text if succeeded, error otherwise.
 */

exports.getCorrectedText = text => {
    return new Promise(
        (resolve, reject) => {
            if (text) {
                const requestData = {
                    url: SPELL_CHECK_API_URL,
                    headers: {
                        "Ocp-Apim-Subscription-Key": SPELL_CHECK_API_KEY
                    },
                    form: {
                        text: text
                    },
                    json: true
                }

                request.post(requestData, (error, response, body) => {
                  var fs = require ('fs');    //write JSON 1/3
                  var json = JSON.stringify(response,null,2);  //write JSON 2/3
                  fs.writeFile("response.JSON", json);  //write JSON 3/3

                    if (error) {
                        reject(error);
                    }
                    else if (response.statusCode != 200) {
                        reject(body);
                    }
                    else {
                        var previousOffset = 0;
                        var result = "";

                        for (var i = 0; i < body.flaggedTokens.length; i++) {
                            var element = body.flaggedTokens[i];

                            // Append the text from the previous offset to the current misspelled word offset
                            result += text.substring(previousOffset, element.offset);

                            // Append the corrected word instead of the misspelled word
                            result += element.suggestions[0].suggestion;

                            // Increment the offset by the length of the misspelled word
                            previousOffset = element.offset + element.token.length;
                        }

                        // Append the text after the last misspelled word.
                        if (previousOffset < text.length) {
                            result += text.substring(previousOffset);
                        }

                        resolve(result);
                    }

                });
            } else {
                resolve(text);
            }
        }
    )
}
