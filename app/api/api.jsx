
module.exports = {
    init() {
        return new Promise(function(resolve, reject) {
            VK.init({
                apiId: 5789146
            });

            return VK.Auth.login(function(response) {
                if(response.session) {
                    resolve(response)
                } else {
                    reject();
                }
            }, 2);
        });

    },
    getFriends() {
        return new Promise(function(resolve, reject) {
            VK.api('friends.get', {'fields':'photo_50'}, function(response) {
                if(response.error) {
                    reject();
                }
                resolve(response.response);
            });
        });
    }
}
