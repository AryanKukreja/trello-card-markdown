function convertCardToMarkdown(data) {

}

let onBtnClick = function (t, opts) {
    const card = t.getContext().card;
    return t.card(card)
        .then(function (data) {
            console.log(data);
            console.log(JSON.stringify(data, null, 2));
        });
};

window.TrelloPowerUp.initialize({
    'card-buttons': function (t, opts) {
        return [{
            icon: 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg', // don't use a colored icon here
            text: 'Export to Markdown',
            callback: onBtnClick,
            condition: 'always'
        }];
    }
});
