function populate() {
	if(quiz.isEnded());{
		//showsScores();
}else{
	//show question
	var element = document.getElementById("question");
	element.innerHTML = quiz.getQuestionIndex().text
}
}

 var questions = [
 	new Questions("RedAcademyAppDevEnteranceExam/src/quiz.json")
 ];

 var quiz = new Quiz(questions);

 populate();
