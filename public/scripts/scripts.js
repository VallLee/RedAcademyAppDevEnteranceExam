$.getJSON(

	'/src/quiz.json',

).done(quizjson => {

	// console.log(quizjson.quizzes)

	// build arrays to track the session
	let scores = [] // track the user's score on each quiz
	let attempts = [] // track number of questions attempted on each quiz
	let currentQuizIndex;
	let currentQuizNumber; // buildMenu sets this to equal currentQuizIndex+1
	function buildSession(){
		let index = 0
		$.each(quizjson.quizzes, each => {
			scores.push(0)
			attempts.push(0)
			index++
		})
	}
	buildSession()

	// display the main menu
	function buildMenu(){
		$( 'h1' ).empty();
		$( 'h1' ).text('Start');
		$( '.subtitle' ).empty();
		$( '#playarea' ).empty();
		$( '.score' ).empty();
		for (let n=0; n<quizjson.quizzes.length; n++) {
			$('#playarea').append('<button id="quiz'+(n+1)+'">Quiz '+(n+1)+'</button>');
			$('#quiz'+(n+1)).click(function() {
				currentQuizIndex = n;
				currentQuizNumber = n+1;
				buildQuestion();
			});
		};
	};
	buildMenu();

	// display a question and the corresponding answers
	function buildQuestion() {

		if ( (attempts[currentQuizIndex]) < (quizjson.quizzes[currentQuizIndex].questions.length) ) {

			$( 'h1' ).empty();
			$( 'h1' ).append('Quiz '+(currentQuizNumber));
			$( '.score' ).text('Score: '+scores[currentQuizIndex]);
			$( '#playarea' ).empty();
			$( '.subtitle' ).text( quizjson.quizzes[currentQuizIndex].title );
			$( '#playarea' ).append( '<h2 class="question">Question '+((attempts[currentQuizIndex])+1)+': '+quizjson.quizzes[currentQuizIndex].questions[(attempts[currentQuizIndex])].question+'</h2>' );
			
			let answerIndex = 0;
			$.each( quizjson.quizzes[currentQuizIndex].questions[(attempts[currentQuizIndex])].answers, each => {
				let answerBoolean = quizjson.quizzes[currentQuizIndex].questions[(attempts[currentQuizIndex])].answers[answerIndex].value;
				let answerContent = quizjson.quizzes[currentQuizIndex].questions[(attempts[currentQuizIndex])].answers[answerIndex].content;
				$( '#playarea' ).append('<button class="clickable '+answerBoolean+'">'+answerContent+'</button>');
				answerIndex = answerIndex+1;
			})

			$('.true').click(function(){
				if ($(this).hasClass('clickable')) {
					scores[currentQuizIndex] = scores[currentQuizIndex]+1;
					$( '.score' ).text('Score: '+scores[currentQuizIndex]);
				}
			})

			$('.false').click(function(){
				if ($(this).hasClass('clickable')) {
					$( '.score' ).text('Score: '+scores[currentQuizIndex]);
				}
			})

			$('button').click(function() {
				if ($(this).hasClass('clickable')) {
					attempts[currentQuizIndex] = attempts[currentQuizIndex]+1;
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
		if ( (scores[currentQuizIndex]) < ( (quizjson.quizzes[currentQuizIndex].questions.length)/2 )) {
			$( '#playarea' ).empty();
			$( '#playarea' ).append( '<h2>Fail!</h2>' );
		} else {
			$( '#playarea' ).empty();
			$( '#playarea' ).append( '<h2>Pass!</h2>' );
		}
		scores[currentQuizIndex] = 0;
		attempts[currentQuizIndex] = 0;

		setTimeout(buildMenu, 2000);

	};

}).fail(() => {
	
	function playError(){
		$('#playarea').append("There's been an error loading the quiz. Please try again");
	}

	playError();

}).always(() => {

});