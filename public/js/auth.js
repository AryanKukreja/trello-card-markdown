let t = window.TrelloPowerUp.iframe();

t.render(function() {
    return t.sizeTo('#content');
})

let oauthUrl = window.origin + '/3rd-party/authorize.html';

let authBtn = document.getElementById('authorize');
authBtn.addEventListener('click', function() {
    t.authorize(oauthUrl)
        .then(function(token) {
            return t.set('member', 'private', 'authToken', token)
        })
        .then(function() {
            return t.closePopup();
        });
});
