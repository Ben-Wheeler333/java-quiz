

function buildQuiz(){
    // variable to store the HTML output
    const output = [];
  
    // for each question...
    quizQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
        // variable to store the list of possible answers
        const answers = [];
  
        // and for each available answer...
        for(letter in currentQuestion.answers){
  
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
      }
    );
  
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }
  

function showResults(){
    // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  quizQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if(userAnswer === currentQuestion.correctAnswer){
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainers[questionNumber].style.color = 'lightgreen';
    }
    // if answer is wrong or blank
    else{
      // color the answers red
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  // show number of correct answers out of total
  resultsContainer.innerHTML = `${numCorrect} out of ${quizQuestions.length}`;
}

function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

var quizQuestions = [
    {
        question: "How do you hold multiple values in one variable?",
        answers: {
            a: 'loop',
            b: 'array',
            c: 'function',
            d: 'if statement'
        },
        correctAnswer: 'b'
    },
    {
        question: "What is the correct syntax for a function statement?",
        answers: {
            a: 'function functionName() {}',
            b: 'functionName() function {}',
            c: 'function functionName{} ()',
            d: 'function() functionName {}'
        },
        correctAnswer: 'a'
    },
    {
        question: "In what HTML element do we put the JavaScript?",
        answers: {
            a: 'js',
            b: 'java',
            c: 'javascript',
            d: 'script'
        },
        correctAnswer: 'd'
    },
    {
        question: "Where should a function call be placed on the JavaScript file?",
        answers: {
            a: 'top of the javascript file',
            b: 'inside the function',
            c: 'bottom of the javascript file'
        },
        correctAnswer: 'c'
    },
    {
        question: "What is the correct syntax for 'strictly equal'?",
        answers: {
            a: '=',
            b: '===',
            c: '<=',
            d: '=='
        },
        correctAnswer: 'b'
    },
    {
        question: "How does a FOR loop start?",
        answers: {
            a: 'for (i = 0; i <= 5)',
            b: '(for i = 0; i++)',
            c: 'for (i = 0; i <= 5; i++)'
        },
        correctAnswer: 'c'
    },

]

// start quiz after start button is clicked
buildQuiz();

//pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;


// show the first slide
showSlide(currentSlide);

function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  $(".timer").text("time:" + quizTimeout);
  
  var quizTimeout = setTimeout(showSlide, 15000);

  function stopQuiz() {
      clearTimeout(quizTimeout);
  }



// on start click, start quiz
submitButton.addEventListener('click', showResults);
nextButton.addEventListener("click", showNextSlide);
  


