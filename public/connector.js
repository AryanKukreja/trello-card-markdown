require('dotenv').config({path: '../.env'});

let Promise = TrelloPowerUp.Promise;

window.TrelloPowerUp.initialize({
    'authorization-status': function(t, options){
        return t.get('member', 'private', 'token')
            .then(function(token){
                if (token) {
                    return { authorized: true };
                } else {
                    return { authorized: false };
                }
            });
    },
    'show-authorization': function(t, options){
        return t.popup({
            title: 'Grant Access',
            args: { apiKey: process.env['TRELLO_KEY'] },
            url: './authorize.html',
            height: 140,
        });
    },
    'card-buttons': function (t, opts) {
        return t.get('member', 'private', 'token')
            .then(function (token) {
                if (token) {
                    return t.card('all')
                        .then(function (card) {
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
                else {
                    return [{
                        icon: 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg', // don't use a colored icon here
                        text: 'Export to Markdown',
                        callback: function(t) {
                            return t.popup({
                                title: 'Grant Access',
                                args: { apiKey: process.env['TRELLO_KEY'] },
                                url: './authorize.html',
                                height: 130,
                            });
                        },
                        condition: 'always'
                    }];
                }
            })
    }
});
