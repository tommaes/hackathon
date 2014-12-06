module.exports = {

    World : function(id, maxAmountOfUsers) {
        
        this.id = id;
        this.currentAmountOfUsers = 0;
        this.maxAmountOfUsers = maxAmountOfUsers;
        this.userPositions = {};
        
        this.addUser = function (user) {
            this.currentAmountOfUsers += 1;
            this.userPositions[user] = {};
        };
        
        this.removeUser = function (user) {
            this.currentAmountOfUsers -= 1;
            delete this.userPositions[user];
        };
        
        this.updateUserPosition = function(user, newPosition) {
            this.userPositions[user] = newPosition;
        };
        
        this.distributePosition = function(user, newPosition) {
            
        };
        
    }
  
};