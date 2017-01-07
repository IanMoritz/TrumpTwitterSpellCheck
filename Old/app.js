var spellService = require('./spell-service');

// function (session, next) {
            spellService
                .getCorrectedText("Here is a sample santence")
                .then(text => {
                    console.log(text);
                })
                .catch((error) => {
                    console.error(error);
                });
//         }
//     })
// }
