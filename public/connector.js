require('dotenv').config({path: '../.env'});

let Promise = TrelloPowerUp.Promise;

window.TrelloPowerUp.initialize({
    'authorization-status': function(t, options){
        return t.get('member', 'private', 'token')
            .then(function(token){
                if (token) {
                    console.log(token)
                    process.env['TOKEN'] = token.toString();
                    return { authorized: true };
                } else {
                    return { authorized: false };
                }
            });
    },
    'show-authorization': function(t, options){
        return t.popup({
            title: 'My Auth Popup',
            args: { apiKey: process.env['TRELLO_KEY'] },
            url: './authorize.html',
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
