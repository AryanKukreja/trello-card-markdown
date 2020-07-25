function convertCardToMarkdown(data) {

}

function onBtnClick(t) {
    console.log("yolo")
    console.log(JSON.stringify(t.card('all'), null, 2))
}

window.TrelloPowerUp.initialize({
    'card-buttons': function (t, opts) {
        return t.card(t.getContext().card)
            .then(function (card) {
                console.log(card);
                console.log(JSON.stringify(card, null, 2));
                console.log(JSON.stringify(card, null, 2));
                return [{
                    icon: 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg', // don't use a colored icon here
                    text: 'Export to Markdown',
                    callback: onBtnClick(t),
                    condition: 'always'
                }];
            });
    }
});
