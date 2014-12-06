var fs = require('fs'),
    sqlite3 = require('sqlite3').verbose(),
    answer = require('../../general/loginAnswer'),
    user_info = require('./user_info');

var db = new sqlite3.Database('heroesofmightandknowledge.db');
var check;
db.serialize(function() {

  db.run(user_info.initializeTable);
  //db.run("CREATE TABLE if not exists ")
  var userDB = new user_info.User_Info_DB();
  f = function(value) {};
  for (var i = 0; i < 10; i++) {
      userDB.createUser("test" + i, "Ipsum " + i, "lol", "lal", 1, db, f);
  }

  for (var j = 0; j < 10; j++) {
      userDB.login("test" + j, "Ipsum " + j, db, function(value) {
          console.log(value);
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
  db.run("DROP TABLE user_info");
});

db.close();