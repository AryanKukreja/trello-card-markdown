window.TrelloPowerUp.initialize({
    'card-buttons': function (t, opts) {
        return t.card('all')
            .then(function (card) {
                console.log(card);
                cardId = card.id;
                return [{
                    icon: 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg', // don't use a colored icon here
                    text: 'Export to Markdown',
                    callback: function(t) {
                        return t.popup({
                            title: "Select Fields",
                            url: "index.html"
                        })
                    },
                    condition: 'always'
                }];
            });
    }
});
