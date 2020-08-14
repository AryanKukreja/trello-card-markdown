require('dotenv').config({path: '../.env'});
let Promise = TrelloPowerUp.Promise;
let t = TrelloPowerUp.iframe();

let apiKey = process.env['TRELLO_KEY']; // Passed in as an argument to our iframe

let trelloAuthUrl = `https://trello.com/1/authorize?expiration=never&name=Card%20To%20Markdown&scope=read&key=${apiKey}&callback_method=fragment&return_url=${window.location.origin}/auth-success.html`;

let tokenLooksValid = function(token) {
    // If this returns false, the Promise won't resolve.
    return /^[0-9a-f]{64}$/.test(token);
}

document.getElementById('auth-btn').addEventListener('click', function(){
    t.authorize(trelloAuthUrl, { height: 750, width: 600, validToken: tokenLooksValid })
        .then(function(token){
            return t.set('member', 'private', 'token', token);
        })
        .then(function(){
            return t.closePopup();
        });
});
