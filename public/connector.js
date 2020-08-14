require('dotenv').config({path: '../.env'});

let Promise = TrelloPowerUp.Promise;

window.TrelloPowerUp.initialize({
    'authorization-status': function(t, options){
        console.log(t);
        return t.get('member', 'private', 'token')
            .then(function(token){
                return { authorized: token !== null };
            });
    },
    'show-authorization': function(t, options){
        return t.popup({
            title: 'Authorize Your Account',
            url: 'auth.html',
            height: 140,
        });
    },
    'card-buttons': function (t, opts) {
        return t.card('all')
            .then(function (card) {
                console.log(card)
                return [{
                    icon: 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg', // don't use a colored icon here
                    text: 'Export to Markdown',
                    callback: function(t) {
                        return t.popup({
                            title: "Select Fields",
                            url: "options.html",
                            height: 240
                        })
                    },
                    condition: 'always'
                }];
            });
    }
});
