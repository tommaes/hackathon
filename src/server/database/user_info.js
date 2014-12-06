var answer = require('../../general/loginAnswer')
var account = require('../../general/userInfo')

module.exports = {

    User_Info_DB : function () {
    
        function login(username, password, db) {
            db.get("SELECT * from user_info where username=? AND password=?", [username, password] , function(err,row){
               if(row === undefined) {
                   return new answer.LogInAnswer(false, undefined);
               }
               else {
                   return new answer.LogInAnswer(true, undefined);
               }
            });
        }
        
        function createUser(username, password, email, hero, type, db) {
            try {
                db.run("Insert into user_info VALUES (?, ?, ?, ?, ?)", [username, password, email, hero, type]);
                if (type == account.GamePlayerID) {
                    return new account.GamePlayer(username, email, hero);
                }
                else {
                    return new account.Teacher(username, email);
                }
            }
            catch(error) {
                
            }
        }
        

    
    },

    initializeTable : "CREATE TABLE if not exists user_info (username TEXT NOT NULL, \
                                                            password TEXT NOT NULL, \
                                                            email TEXT NOT NULL, \
                                                            hero TEXT NOT NULL, \
                                                            typeaccount INTEGER NOT NULL, \
                                                            PRIMARY KEY(username))"
                                                                
};