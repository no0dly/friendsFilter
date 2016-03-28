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

                    var locStor      = localStorage.addedFriends.split(',');
                    var addedFriends = [];
                    var allFriends   = [];
                    var container;
                    var source;
                    var templateFn;
                    var template;
                    

                    if( locStor.length ) {
                        allFriends = response.response.filter(function(val) {
                            if(!filter(val)) {
                                return false;
                            }
                            return true;
                        });

                        function filter(element) {
                            for(var i = 0; i < locStor.length; i++) {
                                if (element.uid.toString().indexOf( locStor[i].toString() ) !== -1 ) {
                                    addedFriends.push(element);
                                    return false;
                                }
                            }
                            return true;
                        }
                    }
                    //all fr
                    source     = document.getElementById('listTemplate').innerHTML;
                    templateFn = Handlebars.compile(source);
                    template   = templateFn({list: allFriends});
                    container  = document.getElementById('allFriends');
                    container.innerHTML = template;
                    //added fr
                    source     = document.getElementById('addedListTemplate').innerHTML;
                    templateFn = Handlebars.compile(source);
                    template   = templateFn({list: addedFriends});
                    container  = document.getElementById('addedFriends');
                    container.innerHTML = template;
                    // console.log(response.response);
                    console.log(allFriends);
                    resolve();
                }
            });
        });
    }).then(function() {
        var searchAll   = document.getElementById('leftName');
        var searchAdded = document.getElementById('rightName');

        searchAll.value = null;
        searchAdded.value = null;
        searchAll.addEventListener('input', search);
        searchAdded.addEventListener('input', search);

        function search(e) {
            var $this    = this;
            var inputVal = $this.value.toLowerCase();
            var items;
            var friendName;

            if( e.target.name === 'left-name') {
                items = document.getElementById('allFriends');
            } else {
                items = document.getElementById('addedFriends');
            }

            friendName = items.querySelectorAll('.filter-content-name__text');

            for( var i = 0; i < friendName.length; i++ ) {
                friendName[i].closest('.filter-content__item').classList.remove('hide');
                if( friendName[i].innerText.toLowerCase().indexOf(inputVal) === -1 ) {
                    friendName[i].closest('.filter-content__item').classList.add('hide');
                }
            }
        }
    }).then(function() {
        var content        = document.querySelector('.filter-content');
        var allFriends     = document.getElementById('allFriends');
        var addedFriends   = document.getElementById('addedFriends');
        var item;

        content.addEventListener("dragstart", function(e) {
            item = e.target;
        });
        content.addEventListener("dragover", function(e) {
            e.preventDefault();
        });

        content.addEventListener( 'drop', moveFriend, true );

        function moveFriend(e) {
            if(e.target === addedFriends || e.target.closest('.filter-content__list--added') ) {
                if( item.parentNode !== addedFriends ) {
                    addedFriends.appendChild(item);
                }
            } else if( e.target === allFriends || e.target.closest('.filter-content__list--all') ){
                if( item.parentNode !== allFriends ) {
                    allFriends.appendChild(item);
                }
            }
        }
    }).catch(function(e) {
        console.error(e.message);
    });
}());

(function() {
    var contentContainer = document.querySelector('.filter-content');

    var allFriends       = document.getElementById('allFriends');
    var addedFrList      = document.getElementById('addedFriends');

    contentContainer.addEventListener('click', listAction);

    function listAction(e) {
        var addClass    = 'filter-content-btn__add';
        var removeClass = 'filter-content-btn__remove';
        var addIcons    = 'fa fa-plus';
        var removeIcons = 'fa fa-times';
        var target      = e.target;
        var link        = target.parentNode;
        var friend      = target.closest('li');
        var friendData  = {};
        
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

(function() {
    var saveBtn = document.getElementById('submit');

    saveBtn.addEventListener('click', saveList);

    function saveList(e){
        var listAdded    = document.getElementById('addedFriends').children;
        var listAddedarr = [];
        var id;

        e.preventDefault();

        if( listAdded.length ) {
            for( var k = 0; k < listAdded.length; k++ ) {
                if( listAdded[k].tagName === "LI") {
                    id  = listAdded[k].getAttribute('data-id'); 
                    listAddedarr.push(id);
                }
            }
        }
        // console.log(JSON.stringify(listAddedarr));
        localStorage.setItem('addedFriends', listAddedarr);
    }
}());