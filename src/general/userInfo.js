module.exports = {

    GamePlayer : function(username, email, hero) {
        
        this.username = username;
        this.email = email;
        this.hero = hero;
        this.money = 0;
    },
    
    Teacher : function(username, email) {
        this.username = username;
        this.email = email;
    },
    
    GamePlayerID : 1,
    TeacherID : 2
                                                                
};