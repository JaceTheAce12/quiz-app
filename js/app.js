const quizData = [
    {
        questionID: 1,
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        questionID: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        questionID: 3,
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    },
    {
        questionID: 4,
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Carbon Dioxide"
    },
    {
        questionID: 5,
        question: "What is the freezing point of water in Celsius?",
        options: ["0°C", "32°F", "100°C", "50°F"],
        correctAnswer: "0°C"
    },
    {
        questionID: 6,
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "George Orwell"],
        correctAnswer: "William Shakespeare"
    },
    {
        questionID: 7,
        question: "Which element has the chemical symbol 'H'?",
        options: ["Helium", "Hydrogen", "Hassium", "Hafnium"],
        correctAnswer: "Hydrogen"
    },
    {
        questionID: 8,
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Jupiter"
    },
    {
        questionID: 9,
        question: "Which country is famous for the pyramids?",
        options: ["Greece", "China", "Egypt", "India"],
        correctAnswer: "Egypt"
    },
    {
        questionID: 10,
        question: "How many continents are there on Earth?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "7"
    }
];

const questionElement = document.querySelector("#question");
const optionsContainer = document.querySelector("#options-container");
const scoreElement = document.querySelector("#score");
const nextButton = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const submitButton = document.querySelector("#submit-btn");
const restartButton = document.querySelector("#restart-btn");

let currentQuestion = 0;
let score = 0;
let userAnswer = null; 
const userAnswers = [];

function startQuiz() {
    nextButton.style.display = "block";
    prevBtn.style.display = "none";
    submitButton.style.display = "none";
    restartButton.style.display = "none";
    loadQuestion(currentQuestion);
}

prevBtn.addEventListener("click", () => {
    currentQuestion--;
    userAnswer = null; 
    loadQuestion(currentQuestion);
});

function loadQuestion(questionIndex) {
    const question = quizData[questionIndex];
    questionElement.innerText = question.question;
    optionsContainer.innerHTML = "";

    question.options.forEach((option) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.setAttribute("data-option", option);
        button.addEventListener("click", () => {
            selectOption(option); 
            userAnswer = option;
            enableNextButton();
        });
        optionsContainer.appendChild(button);
    });

    if (questionIndex === 0) {
        prevBtn.style.display = "none";
    } else {
        prevBtn.style.display = "block";
    }

    if (questionIndex === quizData.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "block";
    } else {
        nextButton.style.display = "block";
        submitButton.style.display = "none";
    }

    // Clear previous selection when loading a new question
    clearSelection();
    disableNextButton();
}

function selectOption(option) {
    // Clear previous selection first
    clearSelection();

    const selectedOption = optionsContainer.querySelector(`button[data-option="${option}"]`);
    
    if (selectedOption) {
        selectedOption.classList.add("selected");
    }
}

function clearSelection() {
    const selectedOption = optionsContainer.querySelector(".selected");
    if (selectedOption) {
        selectedOption.classList.remove("selected");
    }
}

const checkAnswer = (selectedOption, correctOption, questionID) => {
    const isCorrect = selectedOption === correctOption;
    userAnswers.push({ questionID, selectedOption, isCorrect });

    if (selectedOption === correctOption) {
        score++; 
    }

    currentQuestion++;
    userAnswer = null; 
    updateScore(); 
    loadQuestion(currentQuestion);
}

function endQuiz() {
    questionElement.innerText = "Quiz Complete!";
    optionsContainer.innerHTML = "";
    scoreElement.innerText = `${score}/${quizData.length}`;
    nextButton.style.display = "none";
    prevBtn.style.display = "none";
    submitButton.style.display = "none";
    restartButton.style.display = "block";
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswer = null; // This resets the users answer when restarting
    scoreElement.innerText = '';
    startQuiz();
}

function updateScore () {
    scoreElement.innerText = `${score}/${quizData.length}`;
}

function enableNextButton() {
    nextButton.disabled = false;
}

function disableNextButton() {
    nextButton.disabled = true;
}

function saveUserAnswers() {
    console.log(userAnswers);
}

nextButton.addEventListener("click", () => {
    checkAnswer(userAnswer, quizData[currentQuestion].correctAnswer);
});

submitButton.addEventListener("click", endQuiz);
submitButton.addEventListener("click", saveUserAnswers);
restartButton.addEventListener("click", restartQuiz);

disableNextButton();

startQuiz();
