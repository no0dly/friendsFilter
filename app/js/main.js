(function() {
    var friendWindow = document.getElementById('allFriends');
    var friendWindow2 = document.getElementById('addedFriends');

    Ps.initialize(friendWindow);
    Ps.initialize(friendWindow2);
}());

(function() {
    new Promise(function(resolve){
        if(document.readyState === 'complete') {
            resolve();
        } else {
            window.onload = resolve;
        }
    }).then(function() {
        return new Promise(function(resolve, reject) {
            VK.init({
                apiId: 5373612
            });

            VK.Auth.login(function(response) {
                if(response.session) {
                    resolve(response);
                } else {
                    reject( new Error('не удалось соединиться!') );
                }
            }, 2);
        });
    }).then(function() {
        return new Promise(function(resolve, reject){
            VK.api('friends.get', {'fields':'photo_50'}, function(response) {
                if( response.error ) {
                    reject( new Error(response.error.error_msg) );
                } else {
                    var source      = document.getElementById('listTemplate').innerHTML;
                    var templateFn  = Handlebars.compile(source);
                    var template    = templateFn({list: response.response});
                    var container   = document.getElementById('allFriends');

                    container.innerHTML = template;
                    resolve();
                }
            });
        });
    }).catch(function(e) {
        console.error(e.message);
    });
}());

(function() {
    var contentContainer = document.querySelector('.filter-content');

    contentContainer.addEventListener('click', listAction, false);

    function listAction(e) {
        var addClass    = 'filter-content-btn__add';
        var removeClass = 'filter-content-btn__remove';
        var addIcons    = 'fa fa-plus';
        var removeIcons = 'fa fa-times';
        var target      = e.target;
        var link        = target.parentNode;
        var friend      = target.closest('li');
        var friendData  = {};
        var allFriends  = document.getElementById('allFriends');
        var addedFrList = document.getElementById('addedFriends');

        if(link.className === addClass) {

            addedFrList.appendChild(friend);
            link.className   = removeClass;
            target.className = removeIcons;

        } else if( link.className === removeClass ) {

            allFriends.appendChild(friend);
            link.className = addClass;
            target.className = addIcons;

        }
    }
}());