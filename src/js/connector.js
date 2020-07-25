let onBtnClick = function (t, opts) {
    const card = t.getContext().card;
    console.log(card);
    console.log('Someone clicked the button');
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
