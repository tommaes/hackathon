var fs = require('fs'),
    sqlite3 = require('sqlite3').verbose(),
    gameUser = require('./GameUser'),
    User_Info_DB = require('./user_info'),
    VisualizationDB = require('./Visualization');
    
  
    
 function DatabaseLayer() {
    
    this.db = new sqlite3.Database('heroesofmightandknowledge.db');
    
    this.initializeTables = function() {
        var self = this;
        this.db.serialize(function() {
            self.db.run(self.userDB.initializeTable);
            self.db.run(gameUser.initializeGoldTable);
        });
        
    this.closeDBConnection = function() {
        var self = this;
        self.db.serialize(function() {
            //Only for testing
            self.db.run("DROP TABLE user_info");
            self.db.run("DROP TABLE game_user");
            
            self.db.close();
        });
    };
    
    // ----------------------------------  Create User ------------------------------------------------------
    
    this.createUser = function(username, password, email, hero, type) {
        var self = this;
         self.db.serialize(function() {
            var f = function(value) {
                self.gameUser_DB.createUser(value, self.db, function(v) {console.log("done");});
            };
            self.userDB.createUser(username, password, email, hero, type, self.db, f);
        });
    };
    
    // ----------------------------------  Log In ------------------------------------------------------
    
    this.login = function(username, password, func) {
        var self = this;
        self.db.serialize(function() {
            var printGold = function(newv) {
                
                // Test Code
                
                console.log(newv);
                database.closeDBConnection();
                console.log("Database closed");
                func(newv);
                
            };
            self.userDB.login(username, password, self.db, function(value) {
                //console.log(value);
                self.gameUser_DB.getGold(value.possibleUser, self.db, printGold);
            });
        });
    };
        
    };
    
    // ----------------------------------  Visualization ------------------------------------------------------
    
    this.getHeroes = function() {
        return this.visualizationDB.heroes;
    };
    
    this.getTroops = function() {
        return this.visualizationDB.troops;
    };
    
    
    // ----------------------------------  Initialization ------------------------------------------------------
    
    this.initializeTables();
    
    
}

DatabaseLayer.prototype.userDB = new User_Info_DB();
DatabaseLayer.prototype.gameUser_DB = new gameUser.Game_User_DB();
DatabaseLayer.prototype.visualizationDB = new VisualizationDB();

module.exports = DatabaseLayer;


// Test code
// Remove when done

var database = new DatabaseLayer();

  for (var i = 0; i < 10; i++) {
      database.createUser("test" + i, "Ipsum " + i, "lol", "DarthVader", 1);
  }
  
  
  console.log("select * FROM game_user where username='test0'");
  
  
  database.login("test5", "Ipsum 5", function(v) {});