require('dotenv').config({path: '../../.env'});
const fetch = require('node-fetch');

const labelTemplate = '<span style="border-style: solid; border-color: ENTER_COLOR_HERE; border-radius: 10px; padding: 1px 4px; margin-right: 10px; background: ENTER_COLOR_HERE; color: white"><b>ENTER_LABEL_NAME_HERE</b></span>'
const memberTemplate = '<b style="background-color: #9b9c9e; display: inline-block; border-radius: 50%; width: 40px; height: 40px; line-height: 40px; text-align: center;">ENTER_MEMBER_HERE</b>'
const colors = {
    "green": "#61BD4F",
    "yellow": "#F2D600",
    "orange": "#FF9F1A",
    "red": "#EB5A46",
    "purple": "#C377E0",
    "blue": "#0079BF",
    "sky": "#00C2E0",
    "lime": "#51E898",
    "pink": "#FF78CB",
    "black": "#344563",
}

let markdownOutput = '';
let markdownCardDetails = '';
let markdownListDetails = '';
let markdownBoardDetails = '';
let markdownCheckListDetails = '';
let markdownMemberDetails = '';
let cardId = '';
let dataObtained = 0;
let boardPlaceholder = '';

function addCheckListToOutput(checkLists) {
    let markdownCheckLists = '';
    if (checkLists.length > 0) {
        markdownCheckLists = '\n## CheckLists\n';
        checkLists.forEach((checkList) => {
            let markdownCheckList = '**' + checkList.name + ':**\n';
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
    }
    markdownCheckListDetails += markdownCheckLists;
}

function addCardDetailsToOutput(cardInfo) {
    let markdownCard = '# ' + cardInfo.name + '\n';

    boardPlaceholder = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    markdownCard += boardPlaceholder + '\n';

    // Add card description
    if (cardInfo.desc !== '') {
        markdownCard += '> ' + cardInfo.desc + '\n\n';
    }

    // Add labels
    if (cardInfo.labels.length > 0) {
        cardInfo.labels.forEach((label) => {
            markdownCard += labelTemplate.replace(/ENTER_COLOR_HERE/g, colors[label.color]).replace(/ENTER_LABEL_NAME_HERE/g, label.name) + ' ';
        });
    }

    // Add due date
    if (cardInfo.due) {
        markdownCard += '\n\n**Due on: ' +  cardInfo.due.split('T')[0] + '**\n\n';
    }

    markdownCardDetails += markdownCard;
}

function addMembersToOutput(memberInfo) {
    let markdownMembers = '';
    if (memberInfo.length > 0) {
        markdownMembers += '## Members of Card: \n'
        memberInfo.forEach((member) => {
            markdownMembers += memberTemplate.replace(/ENTER_MEMBER_HERE/g, member.initials) + '  ' + member.fullName + '\n';
        })
    }

    markdownMemberDetails += markdownMembers;
}

function addBoardToOutput(boardInfo) {
    markdownBoardDetails += '###### ' + boardInfo.name + (boardInfo.name.toLowerCase().includes('board') ? '' : ' Board') + ' | ';
}

function addListToOutput(listInfo) {
    markdownListDetails += listInfo.name + (listInfo.name.toLowerCase().includes('list') ? '' : ' List') + '\n\n';
}

function triggerConsoleLog() {
    dataObtained += 1;

    if (dataObtained === 5) {
        markdownOutput = markdownCardDetails.replace(new RegExp(boardPlaceholder, 'g'), markdownBoardDetails + markdownListDetails);
        markdownOutput += markdownMemberDetails + markdownCheckListDetails;
        console.log(markdownOutput);
        dataObtained = 0;
    }
}

function fetchData(url, dataType) {
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

        if (dataType === 'checklist') {
            addCheckListToOutput(JSON.parse(text));
        }
        else if (dataType === 'board') {
            addBoardToOutput(JSON.parse(text));
        }
        else if (dataType === 'list') {
            addListToOutput(JSON.parse(text));
        }
        else if (dataType === 'card') {
            addCardDetailsToOutput(JSON.parse(text));
        }
        else if (dataType === 'members') {
            addMembersToOutput(JSON.parse(text));
        }
    })
    .then(() => triggerConsoleLog())
    .catch(err => console.error(err));
}

onBtnClick = function(t, opts) {
    markdownCheckListDetails = '';
    markdownMemberDetails = '';
    markdownListDetails = '';
    markdownCardDetails = '';
    markdownBoardDetails = '';

    const baseUrl = 'https://api.trello.com/1/cards/' + cardId;
    const authDetails = '?key=' + process.env['TRELLO_KEY'] + '&token=' + process.env['TRELLO_TOKEN'];

    const checkListUrl = baseUrl + '/checklists';
    const boardUrl = baseUrl + '/board';
    const listUrl = baseUrl + '/list';
    const memberUrl = baseUrl + '/members';

    fetchData(baseUrl + authDetails, 'card');
    fetchData(boardUrl + authDetails, 'board');
    fetchData(listUrl + authDetails, 'list');
    fetchData(memberUrl + authDetails, 'members');
    fetchData(checkListUrl + authDetails, 'checklist');
}

window.TrelloPowerUp.initialize({
    'card-buttons': function (t, opts) {
        return t.card('all')
            .then(function (card) {
                console.log(card);
                cardId = card.id;
                return [{
                    icon: 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg', // don't use a colored icon here
                    text: 'Export to Markdown',
                    callback: onBtnClick,
                    condition: 'always'
                }];
            });
    }
});
