var fs = require('fs'),
    sqlite3 = require('sqlite3').verbose(),
    user_info = require('./user_info');

var db = new sqlite3.Database('heroesofmightandknowledge.db');
var check;
db.serialize(function() {

  db.run(user_info.initializeTable);
  //db.run("CREATE TABLE if not exists ")
  var userDB = new user_info.User_Info_DB();
  for (var i = 0; i < 10; i++) {
      userDB.createUser("test" + i, "Ipsum " + i, "lol", "lal", 1, db);
  }

  db.each("SELECT rowid AS id, username FROM user_info", function(err, row) {
      console.log(row.id + ": " + row.username);
  });
  
  db.run("DROP TABLE user_info");
});

db.close();