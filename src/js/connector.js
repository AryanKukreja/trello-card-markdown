function convertCardToMarkdown(data) {

}

function onBtnClick(t) {
    console.log("yolo")
    console.log(JSON.stringify(t.card('all'), null, 2))
}

window.TrelloPowerUp.initialize({
    'card-buttons': function (t, opts) {
        console.log(opts);
        return t.card('all')
            .then(function (card) {
                console.log(card.badges);
                return [{
                    icon: 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg', // don't use a colored icon here
                    text: 'Export to Markdown',
                    callback: onBtnClick(t),
                    condition: 'always'
                }];
            });
    }
});
