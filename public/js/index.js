


$.getJSON('/js/quiz.json',).done(quizjson => {

	console.log(quizjson.quizzes)

  $("#quiz-one").click(function(){
    $.getJSON('/js/quiz.json', function(data){

      let title = data.quizzes[0].title;
      let question = data.quizzes[0].questions[0].question;
      for ( let i = 0 ; i < 4; i++ ) {
      let answers = data.quizzes[0].questions[0].answers[i].content;

      $('#answer').append("<p>"+answers+" <button class='button' type='button' id="+i+">Select</button></p></br>");
    }

            $("h4").append(title);
            $("#question").append(question);
            $("#answer").append(answer);

        });
    });

  $("#quiz-two").click(function(){
    $.getJSON('/js/quiz.json', function(data){


      let title = data.quizzes[1].title;
      let question = data.quizzes[1].questions[0].question;
      for ( let i = 0 ; i < 4; i++ ) {
      let answers = data.quizzes[1].questions[0].answers[i].content;

      $('#answer').append("<p>"+answers+" <button class='button' type='button' id="+i+">Select</button></p></br>");
    }
 
            $("h4").append(title);
            $("#question").append(question);
            $("#answer").append(answer);

        });
    });

  
});

