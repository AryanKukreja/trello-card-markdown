require('dotenv').config({path: '../../.env'});
const fetch = require('node-fetch');
let FileSaver = require('file-saver');

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

let t = TrelloPowerUp.iframe();

let markdownOutput = '';
let markdownCardDetails = '';
let markdownListDetails = '';
let markdownBoardDetails = '';
let markdownCheckListDetails = '';
let markdownMemberDetails = '';
let dataObtained = 0;
let boardPlaceholder = '';
let cardName = '';
let numElements = 1;

function triggerConsoleLog() {
    dataObtained += 1;

    if (dataObtained === numElements) {
        markdownOutput = markdownCardDetails.replace(new RegExp(boardPlaceholder, 'g'), markdownBoardDetails + markdownListDetails);
        markdownOutput += markdownMemberDetails + markdownCheckListDetails;

        console.log(markdownOutput);
        const fileName = cardName.replace(/\s+/g, '') + '.md';

        let blob = new Blob([markdownOutput], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, fileName);

        dataObtained = 0;
    }
}

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
    cardName = cardInfo.name;
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
    markdownBoardDetails += '###### ' + boardInfo.name + (boardInfo.name.toLowerCase().includes('board') ? '' : ' Board') + (document.getElementById('showList').checked === true ? ' | ' : '');
}
function addListToOutput(listInfo) {
    markdownListDetails += (document.getElementById('showBoard').checked === true ? '' : '###### ') + listInfo.name + (listInfo.name.toLowerCase().includes('list') ? '' : ' List') + '\n\n';
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
        .then(() => t.closePopup())
        .catch(err => console.error(err));
}

onBtnClick = function() {
    markdownCheckListDetails = '';
    markdownMemberDetails = '';
    markdownListDetails = '';
    markdownCardDetails = '';
    markdownBoardDetails = '';

    console.log("here tooo");
    return t.card('all')
        .then(function(card) {
            console.log(card);
            const baseUrl = 'https://api.trello.com/1/cards/' + card.id;
            const authDetails = '?key=' + process.env['TRELLO_KEY'] + '&token=' + process.env['TRELLO_TOKEN'];

            const checkListUrl = baseUrl + '/checklists';
            const boardUrl = baseUrl + '/board';
            const listUrl = baseUrl + '/list';
            const memberUrl = baseUrl + '/members';

            if (document.getElementById('showBoard').checked === true) {
                numElements++;
            }
            if (document.getElementById('showList').checked === true) {
                numElements++;
            }
            if (document.getElementById('showMembers').checked === true) {
                numElements++;
            }
            if (document.getElementById('showChecklist').checked === true) {
                numElements++;
            }
            fetchData(baseUrl + authDetails, 'card');
            if (document.getElementById('showBoard').checked === true) {
                fetchData(boardUrl + authDetails, 'board');
            }
            if (document.getElementById('showList').checked === true) {
                fetchData(listUrl + authDetails, 'list');
            }
            if (document.getElementById('showMembers').checked === true) {
                fetchData(memberUrl + authDetails, 'members');
            }
            if (document.getElementById('showChecklist').checked === true) {
                fetchData(checkListUrl + authDetails, 'checklist');
            }
        });
}

window.fields.addEventListener('submit', function(event){
    console.log("In heree");
    event.preventDefault();
    onBtnClick()
    // .then(function(){
    //     t.closePopup();
    // });
});
