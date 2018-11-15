 function Question(text, choices, answer) {
 	this.text;
 	this.choices = choices;
 	this.answer = answer;
 }

Question.prototype.correctAnswer = function(choice) {
	return choice === this.answer;
}