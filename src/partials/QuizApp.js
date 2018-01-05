import Quiz from './Quiz';


export default class QuizApp {
  constructor(parentElementID) {
    this.getQuizJSON('../src/quiz.json');
    this.element = document.getElementById(parentElementID);
    this.quizObjects = [];
  }

  init() {
    //check for valid json
    if (!this.quizzes) {
      this.element.innerHTML = `<div>Something went wrong. Please try again.</div>`;
      return;
    }
    //init quiz objects one time only
    if (!this.quizObjects.length) {
      this.quizzes.quizzes.forEach((value) => {
        this.quizObjects.push(new Quiz(value, this));
      });
    }
    //draw quizBoxes
    this.element.innerHTML = `<div class="start">Start</div>`;
    this.quizObjects.forEach((quiz) => {
      quiz.drawTitle(this.element);
    });
  
  }


  getQuizJSON(path) {
    fetch(path)
    .then((resp) => resp.json())
    .then((r) => {
      this.quizzes = r;
    })
    .then(() => {this.init();})
    .catch(function(err){
      console.log(err);
    });
  }
}
