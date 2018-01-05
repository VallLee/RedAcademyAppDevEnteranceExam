
var header = document.getElementsByTagName("h1")[0];
header.innerHTML = "JavaScript FTW!";

$.getJSON('/js/quiz.json',).done(quizjson => {

	console.log(quizjson.quizzes)

});
