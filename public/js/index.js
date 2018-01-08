


$.getJSON('/js/quiz.json',).done(quizjson => {

	console.log(quizjson.quizzes)

  $("button").click(function(){
    $.getJSON('/js/quiz.json', function(data){

      let title = data.quizzes[1].title;
      let question = data.quizzes[1].questions[0].question;
      let answer = data.quizzes[1].questions[0].answers[2].content;

        
            $("h4").append(title);
            $("div").append(question);
            $("div").append(answer);


        });
    });
});

