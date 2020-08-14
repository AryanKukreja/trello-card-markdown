require('dotenv').config({path: '../.env'});

let Promise = TrelloPowerUp.Promise;

window.TrelloPowerUp.initialize({
    'authorization-status': function(t, options){
        console.log(t);
        return t.get('member', 'private', 'token')
            .then(function(token){
                if(token){
                    process.env['TRELLO_TOKEN'] = token.toString();
                    return { authorized: true };
                }
                return { authorized: false };
            });
    },
    'show-authorization': function(t, options){
        let trelloAPIKey = process.env['TRELLO_KEY'];
        if (trelloAPIKey) {
            return t.popup({
                title: 'My Auth Popup',
                args: { apiKey: trelloAPIKey }, // Pass in API key to the iframe
                url: './authorize.html', // Check out public/authorize.html to see how to ask a user to auth
                height: 140,
            });
        } else {
            console.log("🙈 Looks like you need to add your API key to the project!");
        }
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
