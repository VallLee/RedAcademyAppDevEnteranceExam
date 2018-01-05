// import quiz from 'Quiz';


export default class QuizApp {
  constructor(parentElementID) {
    this.quizzes = this.getQuizJSON('src/quiz.json');
    this.element = document.getElementById(this.parentElementID)
  }

  init() {
    if (!this.quizzes) {
      this.element.innerHTML = `<div>Something went wrong. Please try again.</div>`;
      return;
    }
    console.log(this.quizzes);

  }


  getQuizJSON(path) {
    fetch(path)
    .then((resp) => resp.json())
    .then(function(r){
      if(r.ok) {
        return r;
      }
      throw new Error('Network response was not ok.');
    })
    .catch(function(err){
      console.log(err);
      return null;
    });
  }
}
