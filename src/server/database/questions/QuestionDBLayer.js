var TranslateDB = require('./translations'),
    Question = require('../../../general/question'),
    questionType = require('../../../general/questionTypes');

module.exports = QuestionDBLayer;

function QuestionDBLayer() {
    
    this.formatString = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) { 
            return typeof args[number] != 'undefined'
                ? args[number] 
                : match
            ;
        });
    };
        
    this.getQuestion = function(type) {
        switch(type) {
            case questionType.questionTypes.TRANSLATE : {
                var q = this.translateDB.getValue();
                
                // The English word
                var englishValue = q.English;
            
                var keys = Object.keys(q);
                // To which language
                var index = function() {
                    var i = Math.floor(Math.random() * keys.length);
                    if (i === 0)
                        return 1;
                    else return i;
                };
                var k = keys[index()];
                var answer = q[k];
                var question = "How do you say {0} in {1} ?";
                var formattedQuestion = this.formatString(question, englishValue, k);
                
                // new choices
                var newPossibilities = {};
                for (var i in q) {
                    if(q[i] !== englishValue)
                        newPossibilities[i] = q[i];
                }
                
                return new Question(formattedQuestion, newPossibilities, answer);
            }
        }
    };
    
}

QuestionDBLayer.prototype.translateDB = new TranslateDB();