

$.getJSON(

	// hack to work around Chrome's dislike of cross origin requests
	'https://raw.githubusercontent.com/redacademy/adp-entrance/master/src/quiz.json?token=Abg1ef9fFuozu_gYnqATP7JFWc1-ASlSks5aTURtwA%3D%3D',
	// 'src/quiz.json',

).done(quizjson => {

	console.log(quizjson.quizzes)

	// build arrays to track the session
	let scores = [] // track the user's score on each quiz
	let attempts = [] // track number of questions attempted on each quiz
	let currentQuiz;
	function buildSession(){
		let index = 0
		$.each(quizjson.quizzes, each => {
			scores.push(0)
			attempts.push(0)
			index++
		})
	}
	buildSession()

	// build the main menu
	function buildMenu(){
		$( '#playarea' ).empty();
		$( '.score' ).empty();
		for (let n=0; n<quizjson.quizzes.length; n++) {
			$('#playarea').append('<button id="quiz'+(n+1)+'">Quiz '+(n+1)+'</button>');
			$('#quiz'+(n+1)).click(function() {
				currentQuiz = n+1;
				buildQuestion();
			});
		};
	};
	buildMenu();

	function buildQuestion() {

		if ( (attempts[currentQuiz-1]) < (quizjson.quizzes[currentQuiz-1].questions.length) ) {

			$( 'h1' ).empty();
			$( 'h1' ).append('Quiz '+(currentQuiz));
			$( '.score' ).text('Score: '+scores[currentQuiz-1]);
			$( '#playarea' ).empty();
			$( '#playarea' ).append( '<h2>'+quizjson.quizzes[currentQuiz-1].title+'</h2>' );
			$( '#playarea' ).append( '<h2>Question '+((attempts[currentQuiz-1])+1)+': '+quizjson.quizzes[currentQuiz-1].questions[(attempts[currentQuiz-1])].question+'</h2>' );
			
			let answerIndex = 0;
			$.each( quizjson.quizzes[currentQuiz-1].questions[(attempts[currentQuiz-1])].answers, each => {
				$( '#playarea' ).append('<button class="clickable '+quizjson.quizzes[currentQuiz-1].questions[(attempts[currentQuiz-1])].answers[answerIndex].value+'">'+quizjson.quizzes[currentQuiz-1].questions[(attempts[currentQuiz-1])].answers[answerIndex].content+'</button>');
				answerIndex = answerIndex+1;
			})

			$('.true').click(function(){
				if ($(this).hasClass('clickable')) {
					scores[currentQuiz-1] = scores[currentQuiz-1]+1;
					$( '.score' ).text('Score: '+scores[currentQuiz-1]);
				}
			})

			$('.false').click(function(){
				if ($(this).hasClass('clickable')) {
					$( '.score' ).text('Score: '+scores[currentQuiz-1]);
				}
			})

			$('button').click(function() {
				if ($(this).hasClass('clickable')) {
					attempts[currentQuiz-1] = attempts[currentQuiz-1]+1;
					$(this).addClass('selected');
					$('button').removeClass('clickable');
					$('button').addClass('revealed');
					setTimeout(buildQuestion, 2000);
				}
			});

		} else {
			buildReportCard();
		}

	};

	function buildReportCard() {
		if ( (scores[currentQuiz-1]) < ( (quizjson.quizzes[currentQuiz-1].questions.length)/2 )) {
			$( '#playarea' ).empty();
			$( '#playarea' ).append( '<h2>Fail!</h2>' );
		} else {
			$( '#playarea' ).empty();
			$( '#playarea' ).append( '<h2>Pass!</h2>' );
		}
		scores[currentQuiz-1] = 0;
		attempts[currentQuiz-1] = 0;

		setTimeout(buildMenu, 2000);

	};
















}).fail(() => {
	
	function playError(){
		$('#playarea').append("There's been an error loading the quiz. Please try again");
	}

	playError();

}).always(() => {

});
		
