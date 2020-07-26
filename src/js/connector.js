require('dotenv').config({path: '../../.env'});
const fetch = require('node-fetch');
let markdownOutput = '';

function convertCardToMarkdown(checkLists) {
    let markdownCheckLists = '# CheckLists\n';
    checkLists.forEach((checkList) => {
        let markdownCheckList = '## CheckList: \'' + checkList.name + '\'\n';
        checkList.checkItems.forEach((item) => {
            if (item.state === 'incomplete') {
                markdownCheckList += ' - [ ] ' + item.name + '\n';
            }
            else {
                markdownCheckList += ' - [x] ' + item.name + '\n';
            }
        });
        markdownCheckLists += markdownCheckList + '\n';
    });

    return markdownCheckLists;
}

function fectchCheckLists(url) {
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
    .then((text) => {
        console.log(JSON.parse(text));
        console.log(convertCardToMarkdown(JSON.parse(text)))
    })
    .catch(err => console.error(err));
}

onBtnClick = function(t, optns) {
    const baseUrl = 'https://api.trello.com/1/cards/' + cardId;
    const checkListUrl = 'https://api.trello.com/1/cards/' + cardId + '/checklists';
    const boardUrl = 'https://api.trello.com/1/cards/' + cardId;
    const authDetails = '?key=' + process.env['TRELLO_KEY'] + '&token=' + process.env['TRELLO_TOKEN']

    fectchCheckLists(checkListUrl + authDetails)
}

window.TrelloPowerUp.initialize({
    'card-buttons': function (t, opts) {
        return t.card('all')
            .then(function (card) {
                console.log(card);
                return [{
                    icon: 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg', // don't use a colored icon here
                    text: 'Export to Markdown',
                    callback: onBtnClick,
                    condition: 'always'
                }];
            });
    }
});
