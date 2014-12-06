var answer = require('../../general/loginAnswer'),
    account = require('../../general/userInfo');

module.exports = {

    User_Info_DB : function () {
        
        this.login = function (username, password, db, f) {
            db.get("select * from user_info WHERE username='" + username + "' AND password='" + password + "'", function(err, row){
               if(row === undefined) {
                   f(new answer.LogInAnswer(false, undefined));
               }
               else {
                   f(new answer.LogInAnswer(true, undefined));
               }
            });
        };
        
        this.createUser = function (username, password, email, hero, type, db, f) {
            try {
                db.run("Insert into user_info VALUES (?, ?, ?, ?, ?)", [username, password, email, hero, type]);
                if (type == account.GamePlayerID) {
                    f(new account.GamePlayer(username, email, hero));
                }
                else {
                    f(new account.Teacher(username, email));
                }
            }
            catch(error) {
                
            }
        };
        

    
    },

    initializeTable : "CREATE TABLE if not exists user_info (username TEXT NOT NULL, \
                                                            password TEXT NOT NULL, \
                                                            email TEXT NOT NULL, \
                                                            hero TEXT NOT NULL, \
                                                            typeaccount INTEGER NOT NULL, \
                                                            PRIMARY KEY(username))"
                                                                
};