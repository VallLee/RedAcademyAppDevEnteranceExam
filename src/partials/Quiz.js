import { setTimeout } from "timers";

export default class Quiz {

  constructor(quiz, quizApp) {
    this.title = quiz.title;
    this.questions = quiz.questions;
    this.score = 0;
    this.total = this.questions.length;
    this.currentQuestion = 0;
    this.quizApp = quizApp;
  }

  drawTitle(element){
    element.insertAdjacentHTML('beforeend', `<button id="${this.title.toLowerCase().replace(' ','-')}" class="quiz-box">${this.title}</button>`);
    
    document.getElementById(this.title.toLowerCase().replace(' ','-')).addEventListener('click', () => {
      this.quizInit(element);
    });
  }


  quizInit(element){
    
    element.innerHTML = `<div class="quiz-title">${this.title}</div>
    <div id='s' class="score">Score: <span id="correct-answers">${this.score}</span>/${this.total}</div>
    <div id="q"></div>`;
    
    this.questionElement = document.getElementById('q');
    this.drawQuestion();
  }

  drawQuestion(){
    let question = this.questions[this.currentQuestion];
    this.questionElement.innerHTML = `<div>${question.question}</div>`;
    let i=0;
    question.answers.forEach((answer) => {
      this.questionElement.insertAdjacentHTML('beforeend', `<button id="answer-${i}" class="answer-box">${answer.content}</button>`);

      document.getElementById(`answer-${i}`).addEventListener('click', (e) => {
        this.checkAnswer(answer.value, e.target);
      });
      i++;
    });
  }

  checkAnswer(value, answerElement){
    
    if (value) {
      answerElement.setAttribute('style', 'background-color: green;');
      this.score++;
      this.updateScore();
    } else {
      answerElement.setAttribute('style', 'background-color: red;');
    }
    this.questionElement.innerHTML += ''; //to get rid of event listeners
    this.currentQuestion++;
    if (this.currentQuestion < this.questions.length) {
      setTimeout(() => this.drawQuestion(), 2000);
    } else {
      setTimeout(() => this.endQuiz(), 2000);
    }
    
  }
  
  updateScore(){
    document.getElementById('correct-answers').textContent = this.score;
  }
  endQuiz(){
    if (this.score/this.total >= 0.5) {
      this.questionElement.innerHTML = `<div class="pass">Pass</div>`;
    } else {
      this.questionElement.innerHTML = `<div class="fail">Fail</div>`;
    }
    document.getElementById('s').setAttribute('class', 'score end');
    this.questionElement.insertAdjacentHTML('beforeend', `<button id="reset">Reset</button>`);
    document.getElementById('reset').addEventListener('click', () => {
      this.resetQuiz();
    });
     
  }
  resetQuiz() {
    this.score = 0;
    this.currentQuestion = 0;
    this.quizApp.init();
  }
}