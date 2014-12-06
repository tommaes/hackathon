var answer = require('../../general/loginAnswer')

module.exports = {

    User_Info_DB : function () {
    
        function login(username, password, db) {
            db.get("SELECT * from user_info where username=? AND password=?", [username, password] , function(err,row){
               if(row === undefined) {
                   return new LogInAnswer(false, undefined);
               }
               else {
                   return new LogInAnswer(true, undefined);
               }
            });
        }
        

    
    },

    initializeTable : "CREATE TABLE if not exists user_info (username TEXT NOT NULL, \
                                                            password TEXT NOT NULL, \
                                                            email TEXT NOT NULL, \
                                                            hero TEXT NOT NULL, \
                                                            typeaccount INTEGER NOT NULL, \
                                                            PRIMARY KEY(username))"
                                                                
};