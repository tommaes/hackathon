var fs = require('fs'),
    sqlite3 = require('sqlite3').verbose(),
    gameUser = require('./GameUser'),
    User_Info_DB = require('./user_info'),
    VisualizationDB = require('./Visualization'),
    WorldDB = require('./WorldDB'),
    QuestionDB = require('./questions/QuestionDBLayer');
    
  
    
 function DatabaseLayer() {
    
    this.db = new sqlite3.Database('heroesofmightandknowledge.db');
    
    this.initializeTables = function() {
        var self = this;
        this.db.serialize(function() {
            self.db.run(self.userDB.initializeTable);
            self.db.run(gameUser.initializeGoldTable);
        });
    };
        
    this.closeDBConnection = function() {
        var self = this;
        self.db.serialize(function() {
            //Only for testing
            self.db.run("DROP TABLE user_info");
            self.db.run("DROP TABLE game_user");
            
            self.db.close();
        });
    };
    
    // ----------------------------------  Create Question ------------------------------------------------------
    
    this.getQuestion = function(questionType, callback) {
        var self = this;
        callback(self.questionDB.getQuestion(questionType));
    };
    
    // ----------------------------------  Create User ------------------------------------------------------
    
    this.createUser = function(username, password, email, hero, type, callback) {
        var self = this;
         self.db.serialize(function() {
            var f = function(value) {
                self.gameUser_DB.createUser(value, self.db, callback);
            };
            self.userDB.createUser(username, password, email, hero, type, self.db, f);
        });
    };

    this.checkEmailExists = function(email, callback) {
        var self = this;
        self.userDB.checkEmailExists(email, self.db, callback);
    };

    this.checkUserNameExists = function(userName, callback) {
        var self = this;
        self.userDB.checkUserNameExists(userName, self.db, callback);
    };
    
    // ----------------------------------  Create World ------------------------------------------------------
    
    this.createWorld = function(maxAmountOfUsers, callback) {
        var self = this;
        callback(self.worldDB.createWorld(maxAmountOfUsers));
    };
    
    // ----------------------------------  Log In ------------------------------------------------------
    
    this.login = function(username, password, callback) {
        var self = this;
        self.db.serialize(function() {
            var printGold = function(newv) {
                
                // Test Code
                
                // console.log(newv);
                // database.closeDBConnection();
                // console.log("Database closed");
                //================================
                
                callback(newv);
            };
            self.userDB.login(username, password, self.db, function(value) {
                //console.log(value);
                self.gameUser_DB.getGold(value.possibleUser, self.db, printGold);
            });
        });
    };

    // ----------------------------------  Visualization ------------------------------------------------------
    
    this.getHeroes = function(callback) {
        callback(this.visualizationDB.heroes);
    };
    
    this.getTroops = function(callback) {
        callback(this.visualizationDB.troops);
    };
    
    
    // ----------------------------------  Initialization ------------------------------------------------------
    
    this.initializeTables();
    
    
}

DatabaseLayer.prototype.userDB = new User_Info_DB();
DatabaseLayer.prototype.gameUser_DB = new gameUser.Game_User_DB();
DatabaseLayer.prototype.visualizationDB = new VisualizationDB();
DatabaseLayer.prototype.worldDB = new WorldDB();
DatabaseLayer.prototype.questionDB = new QuestionDB();

module.exports = new DatabaseLayer();


// Test code
// Remove when done

var database = new DatabaseLayer();

  for (var i = 0; i < 10; i++) {
      database.createUser("test" + i, "Ipsum " + i, "lol@lol.com", "DarthVader", 1, function(value) { console.log(value)});
  }
  
  
  console.log("select * FROM game_user where username='test0'");
  
  database.getTroops(function(value) { console.log(value)});
  
  database.getHeroes(function(value) { console.log(value)});
  
  database.createWorld(10, function(value) { console.log(value)});
  
  
  database.getQuestion(1, function(value) { console.log(value)});
  
  database.login("test5", "Ipsum 5", function(v) {});