
module.exports = TranslateDB;


function TranslateDB() {
    
    this.getValue = function() {
        return this.questions[Math.floor(Math.random() * this.questions.length)];
    };
    
}


TranslateDB.prototype.questions = [ 
    {English : "Hello", French : "Bonjour", Dutch : "Goeiedag", German : "Guten Tag", Italian : "ciao"}, 
    {English : "fork", French : "fourche", Dutch : "vork", German : "Gabel", Italian : "forchetta"}, 
    {English : "spoon", French : "cuillère", Dutch : "lepel", German : "Löffel", Italian : "cucchiaio"}, 
    {English : "knife", French : "couteau", Dutch : "mes", German : "Messer", Italian : "coltello"}, 
    {English : "soup plate", French : "assiette creuse", Dutch : "soepbord", German : "Suppenteller", Italian : "piatto fondo"}, 
    {English : "policeman", French : "policier", Dutch : "politieman", German : "Polizist", Italian : "poliziotto"}, 
    {English : "father", French : "père", Dutch : "vader", German : "Vater", Italian : "padre"}, 
    {English : "mother", French : "mère", Dutch : "moeder", German : "Mutter", Italian : "madre"}, 
    {English : "brother", French : "frère", Dutch : "broer", German : "Bruder", Italian : "fratello"}, 
    {English : "sister", French : "sœur", Dutch : "zus", German : "Schwester", Italian : "sorella"}, 
    {English : "cat", French : "chat", Dutch : "kat", German : "Katze", Italian : "gatto"}, 
    ];
    
Object.freeze(TranslateDB.prototype.questions);