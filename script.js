const questions = [
    {
        question: "In Dragon Ball Super, Goku is sent to destroy earth. What happened to make him change his ways?",
        image: "https://sportshub.cbsistatic.com/i/2022/03/26/8382b60a-c82e-4464-85da-cca227cef66d/dragon-ball-super-anime-ending-goku.jpg",
        answer: [
            {text: "He just realised it was quite mean", correct: true},
            {text: "He bumped his head", correct: false},
            {text: "He couldn't be bothered in the end", correct: false},
            {text: "No one knows", correct: false},
        ]
    },
    {
        question: "What kind of person is Naruto?",
        image: "https://www.lifeisnerd.it/wp-content/uploads/2020/08/naruto-shippuden-e-boruto-1200x630-1.jpg",
        answer: [
            {text: "Samurai", correct: false},
            {text: "Ninja", correct: true},
            {text: "Knight", correct: false},
            {text: "Ramen Shop Owner", correct: false},
        ]
    },
    {
        question: "Who is the main character of One Piece",
        image: "https://static.wikia.nocookie.net/onepiece/images/6/6b/Slide_1_preview.png/revision/latest/scale-to-width-down/860?cb=20230718045122",
        answer: [
            {text: "Luffy", correct: true},
            {text: "Naruto", correct: false},
            {text: "Ichigo", correct: false},
            {text: "Goku", correct: false},
        ]
    },
    {
        question: "What's the top selling manga of 2023",
        image: "https://sm.ign.com/ign_in/screenshot/default/best-manga-slaes-2023_3gmb.png",
        answer: [
            {text: "One Piece", correct: false},
            {text: "Jujutsu Kaisen", correct: false},
            {text: "Blue Lock", correct: true},
            {text: "My Hero Academia", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    const imageElement = document.createElement("img");
    imageElement.src = currentQuestion.image;
    imageElement.alt = "Question Image";
    imageElement.classList.add("question-image");
    questionElement.appendChild(imageElement);

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while (answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score ++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if ((currentQuestionIndex) < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();