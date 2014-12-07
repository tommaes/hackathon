module.exports = Question;

function Question(question, options, answer) {
        
    this.question = question;
    this.options = options;
    this.answer = answer;
    
    this.isCorrect = function(value) {
        return this.answer == value;
    };
    
}