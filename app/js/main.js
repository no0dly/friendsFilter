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

                var locStor      = localStorage.addedFriends;
                var addedFriends = [];
                var allFriends   = [];
                var container;
                var source;
                var templateFn;
                var template;
                var locStorArr;

                function filterAll(element) {
                    for(var i = 0; i < locStorArr.length; i++) {
                        if ( locStorArr[i].indexOf( element.uid ) !== -1 ) {
                            return false;
                        }
                    }
                    return true;
                }

                function filterAdded(val) {
                    response.response.forEach(function(respValue) {
                        if ( val.toString().indexOf( respValue.uid.toString() ) !== -1 ) {
                            addedFriends.push(respValue);
                            return true;
                        }
                    });
                    return false;
                }

                function drawList( tag, list, listTag ) {
                    source     = document.getElementById(tag).innerHTML;
                    templateFn = Handlebars.compile(source);
                    template   = templateFn({list: list});
                    container  = document.getElementById(listTag);
                    container.innerHTML = template;
                }

                if( response.error ) {
                    reject( new Error(response.error.error_msg) );
                } else {

                    if( locStor ) {
                        locStorArr = locStor.split(',');

                        allFriends = response.response.filter(function(val) {
                            return filterAll(val);
                        });

                        locStorArr.forEach( filterAdded.bind(this) );

                        //all fr
                        drawList('listTemplate', allFriends, 'allFriends');

                        //added fr
                        drawList('addedListTemplate', addedFriends, 'addedFriends');

                    } else {
                        drawList('listTemplate', response.response, 'allFriends');
                    }
                    
                    resolve();
                }
            });
        });
    }).then(function() {
        var searchAll   = document.getElementById('leftName');
        var searchAdded = document.getElementById('rightName');
        var listAll     = document.getElementById('allFriends');
        var listAdded   = document.getElementById('addedFriends');

        searchAll.value = null;
        searchAdded.value = null;
        searchAll.addEventListener('input', search);
        searchAdded.addEventListener('input', search);

        function search(e) {
            var $this    = this;
            var inputVal = $this.value.toLowerCase();
            var items;
            var friendName;
            var itemClass;

            if( e.target.name === 'left-name') {
                items = listAll;
            } else {
                items = listAdded;
            }
            friendName = items.children;
            for( var i = 0; i < friendName.length; i++ ) {
                itemClass = friendName[i].classList;

                itemClass.remove('hide');
                if( friendName[i].innerText.toLowerCase().indexOf(inputVal) === -1 ) {
                    itemClass.add('hide');
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

        localStorage.clear();
        localStorage.setItem('addedFriends', JSON.stringify(listAddedarr));
        location.reload();
    }
}());