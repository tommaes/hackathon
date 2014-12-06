var fs = require('fs'),
    sqlite3 = require('sqlite3').verbose(),
    gameUser = require('./GameUser'),
    user_info = require('./user_info');

var db = new sqlite3.Database('heroesofmightandknowledge.db');
var check;
db.serialize(function() {

  db.run(user_info.initializeTable);
  db.run(gameUser.initializeGoldTable);
  //db.run("CREATE TABLE if not exists ")
  var userDB = new user_info.User_Info_DB();
  var gameUser_DB = new gameUser.Game_User_DB();
  
  var f = function(value) {
      gameUser_DB.createUser(value, db, function(v) {console.log("done");});
  };
  for (var i = 0; i < 10; i++) {
      userDB.createUser("test" + i, "Ipsum " + i, "lol", "lal", 1, db, f);
  }
  console.log("select * FROM game_user where username='test5'");
  db.all("select * FROM game_user where username='test5'", function(err, v) {
      console.log(v);
  });
  
  var j = 0;
  var printGold = function(newv) {
            console.log(newv);
            if (j == 9) {
                db.run("DROP TABLE user_info");
                db.run("DROP TABLE game_user");
                db.close();
            }
          };

  for (j; j < 10; j++) {
      userDB.login("test" + j, "Ipsum " + j, db, function(value) {
          //console.log(value);
          gameUser_DB.getGold(value.possibleUser, db, printGold);
      });
  }
  /*
  db.all("select * from user_info WHERE username="+ "'test6'" +" AND password="+"'Ipsum 6'", function(err, value) {
      console.log(value);
  });
  
  userDB.login('test6', 'Ipsum6', db, function(value) {
      console.log(value);
  });
  */
});