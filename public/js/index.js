
var header = document.getElementsByTagName("h4")[0];
header.innerHTML = "JavaScript FTW!";

$.getJSON('/js/quiz.json',).done(quizjson => {

	console.log(quizjson.quizzes)

  $("button").click(function(){
    $.getJSON('/js/quiz.json', function(data){

      let title = data.quizzes[1].title;
      let question = data.quizzes[1].questions[0].question;

        
            $("div").append(title);
            $("div").append(question);


        });
    });
});

