
var header = document.getElementsByTagName("h4")[0];
header.innerHTML = "JavaScript FTW!";

$.getJSON('/js/quiz.json',).done(quizjson => {

	console.log(quizjson.quizzes)

  $("button").click(function(){
    $.getJSON('/js/quiz.json', function(result){
        $.each(result, function(question, field){
            $("div").append(field + " ");
        });
    });
});

// function () {
//   select specific part of .json and append that to specific div ()

//   reapeat x 3

//   onclick.specific div function class that makes the original divs dissapear and the new divs appear with relevant Data. 

// if the correct button is pressed, add 1 to the score. 

// else the score stays the same. 

// }
// var score = 0;

// function() {

// when score reaches 3 display victory message. rinse and repeat for quiz 2. 

// }

// Mac, I will do my dambest in this class. I definietly have alot to learn, but I will put my heart and soul into this.program. 


// Despite a quick drive through the mountains tomorrow, I intend to keep working on it until Monday morning. Please don't kick me off the team Coach, I can do this. 




});
