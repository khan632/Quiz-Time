const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'When is the World engineers Day observed?',
        choice1: '14 sept',
        choice2: '15 sept',
        choice3: '6 oct',
        choice4: '7 sept',
        answer: 2,
    },
    {
        question: 'Capital of Austraila is: ',
        choice1: 'Canberra',
        choice2: 'Melbourne',
        choice3: 'Sydney',
        choice4: 'Auckland',
        answer: 1,
    },
    {
        question: 'Longest passenger train route in the world is?',
        choice1: 'Toronto to Vancouver',
        choice2: 'shanghai to Lhasa',
        choice3: 'Moscow to Vladivostok',
        choice4: 'Dibrugarh to Kanyakumari',
        answer: 3,
    },
    {
        question: 'Which team has highest run in t20 cricket?',
        choice1: 'Afganistan',
        choice2: 'Royal Challangers Banglore',
        choice3: 'Trinbago Knight Riders',
        choice4: 'Czech Republict',
        answer: 1,
    },
    {
        question: 'Which fast bowler has taken highest number of wickets in odi?',
        choice1: 'James Anderson',
        choice2: 'Waqar Younis',
        choice3: 'Wasim Akram',
        choice4: 'Anil Kumble',
        answer: 2,
    }
    ]

const CorrectBonus = 10;
const MaxQuestions = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () =>{
    if(availableQuestions.length === 0 || questionCounter >= MaxQuestions){
        localStorage.setItem('mostRecentScore', score);
        //go to the end window
    return window.location.assign('end.html');
    }

    questionCounter++;

    progressText.innerText = `Question ${questionCounter}/${MaxQuestions}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MaxQuestions) * 100}%`; 

    const questionIndex =  Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};


    choices.forEach((choice) => {
        choice.addEventListener('click', (e) =>{
            if(!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];

            const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

            if(classToApply === 'correct'){
                incrementScore(CorrectBonus);
            }

            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1000)
            
        });

    });

    incrementScore = num =>{
        score += num;
        scoreText.innerText = score;
    }

startGame();