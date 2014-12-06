var fs = require('fs'),
    sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('heroesofmightandknowledge.db');
var check;
db.serialize(function() {

  db.run("CREATE TABLE if not exists user_info (username TEXT NOT NULL, \
                                                password TEXT NOT NULL, \
                                                email TEXT NOT NULL, \
                                                hero TEXT NOT NULL, \
                                                typeaccount INTEGER NOT NULL, \
                                                PRIMARY KEY(username))");
  //db.run("CREATE TABLE if not exists ")
  var stmt = db.prepare("INSERT INTO user_info VALUES (?, ?, ?, ?, ?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("test" + i, "Ipsum " + i, "lol", "lal", 1);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, username FROM user_info", function(err, row) {
      console.log(row.id + ": " + row.username);
  });
  
  db.run("DROP TABLE user_info");
});

db.close();