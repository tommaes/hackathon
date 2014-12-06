var account = require('../../general/userInfo');

module.exports = {

    Game_User_DB : function () {
        
        this.getGold = function (gameUser, db, f) {
            var query = "select * FROM game_user where username='" + gameUser.username + "'";
            db.get("SELECT * FROM game_user WHERE username='" + gameUser.username + "'", function(err, row){
               if(row === undefined) {
                   f(undefined);
               }
               else {
                   gameUser.money = row.gold;
                   f(gameUser);
               }
            });
        };
        
        this.createUser = function (gameUser, db, f) {
            try {
                db.run("Insert into game_user VALUES (?, 500)", [gameUser.username]);
                gameUser.money = 500;
                f(gameUser);
            }
            catch(error) {
                
            }
        };
    
    },

    initializeGoldTable : "CREATE TABLE if not exists game_user (username TEXT NOT NULL, \
                                                                gold INTEGER NOT NULL, \
                                                                PRIMARY KEY(username), \
                                                                FOREIGN KEY(username) REFERENCES user_info(username))"
                                                                
};