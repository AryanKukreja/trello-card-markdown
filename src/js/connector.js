require('dotenv').config({path: '../../.env'});
const fetch = require('node-fetch');

function convertCardToMarkdown(data) {

}

function onBtnClick(cardId) {
    const url = 'https://api.trello.com/1/cards/' + cardId + '?key=' + process.env['TRELLO_KEY'] + '&token=' + process.env['TRELLO_TOKEN'];
    console.log(url);

    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            return response.text();
        })
        .then(text => console.log(text))
        .catch(err => console.error(err));
}

window.TrelloPowerUp.initialize({
    'card-buttons': function (t, opts) {
        console.log(opts);
        return t.card('all')
            .then(function (card) {
                console.log(card);
                return [{
                    icon: 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg', // don't use a colored icon here
                    text: 'Export to Markdown',
                    callback: onBtnClick(card.id),
                    condition: 'always'
                }];
            });
    }
});
