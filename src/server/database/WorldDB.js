var World = require('../data/World')

module.exports = WorldDB;

function WorldDB() {
    
    this.addWorld = function(world) {
        this.worlds[world.id] = world;
    };
    
    this.createWorld = function(maxAmountOfUsers) {
        var id = this.nextFreeID;
        this.nextFreeID += 1;
        var world = new World(id, maxAmountOfUsers);
        this.addWorld(world);
        return world;
    };
    
    this.getWorld = function(id) {
        return this.worlds[id];
    };
    
}

WorldDB.prototype.nextFreeID = 1;
WorldDB.prototype.worlds = {};