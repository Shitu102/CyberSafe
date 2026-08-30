const quiz = [
{
question: "1. Should you share your OTP with anyone?",
options: ["Yes", "No", "Only with bank staff", "Only with friends"],
answer: 1
},
{
question: "2. What should you do before clicking an unknown link?",
options: ["Click immediately", "Verify the sender", "Share it", "Ignore security"],
answer: 1
},
{
question: "3. Which is the safest password?",
options: ["123456", "password", "MyDog@2026!", "abcdef"],
answer: 2
},
{
question: "4. Which email is most likely a phishing email?",
options: ["support@google.com", "googlehelp123@gmail.com", "contact@amazon.in", "info@microsoft.com"],
answer: 1
},
{
question: "5. If someone asks for your UPI PIN, what should you do?",
options: ["Share it", "Ignore and report", "Send OTP also", "Call your friends"],
answer: 1
}
];

let current = 0;
let score = 0;
let userAnswers = [];


function loadQuestion(){

    document.getElementById("question").innerText =
        quiz[current].question;

    for(let i = 0; i < 4; i++){

        document.getElementById("op" + i).innerText =
            quiz[current].options[i];

    }

    document.getElementById("progress").innerHTML =
        "Question " + (current + 1) + " of " + quiz.length;

    let percent =
        ((current + 1) / quiz.length) * 100;

    document.getElementById("progressBar").style.width =
        percent + "%";
}


function checkAnswer(index){

    userAnswers.push(index);

    if(index === quiz[current].answer){
        score++;
    }

    current++;

    if(current < quiz.length){
        loadQuestion();
    }
    else{
        showResult();
    }
}


function showResult(){

    document.getElementById("quizBox").style.display = "none";

    document.getElementById("result").style.display = "block";

    let percentage =
        Math.round((score / quiz.length) * 100);

    let message = "";

    if(score === quiz.length){
        message = "Excellent! You have strong cyber safety knowledge.";
    }
    else if(score >= 3){
        message = "Good job! Keep improving your cyber safety knowledge.";
    }
    else{
        message = "Keep learning and stay safe online.";
    }


    let review = "";


    for(let i = 0; i < quiz.length; i++){

        let isCorrect =
            userAnswers[i] === quiz[i].answer;

        review += `

        <div class="quiz-review-card">

            <div class="review-number">
                Question ${i + 1}
            </div>

            <h3>${quiz[i].question}</h3>

            <div class="answer-row">

                <span class="answer-label">
                    Your Answer
                </span>

                <span class="answer-value">
                    ${quiz[i].options[userAnswers[i]]}
                </span>

            </div>

            ${
                isCorrect
                ?
                `
                <div class="status-success">
                    ✓ Correct Answer
                </div>
                `
                :
                `
                <div class="answer-row">

                    <span class="answer-label">
                        Correct Answer
                    </span>

                    <span class="answer-value">
                        ${quiz[i].options[quiz[i].answer]}
                    </span>

                </div>

                <div class="status-info">
                    Review this question to improve your knowledge.
                </div>
                `
            }

        </div>

        `;

    }


    document.getElementById("result").innerHTML = `

        <div class="quiz-result-header">

            <div class="result-icon">
                🏆
            </div>

            <h2>Quiz Completed</h2>

            <p>${message}</p>

        </div>


        <div class="score-card">

            <div class="score-main">
                ${score}/${quiz.length}
            </div>

            <div class="score-title">
                Your Score
            </div>

            <div class="score-percentage">
                ${percentage}% Accuracy
            </div>

        </div>


        <div class="score-summary">

            <div class="summary-item">
                <strong>${score}</strong>
                <span>Correct</span>
            </div>

            <div class="summary-item">
                <strong>${quiz.length - score}</strong>
                <span>To Review</span>
            </div>

            <div class="summary-item">
                <strong>${quiz.length}</strong>
                <span>Total</span>
            </div>

        </div>


        <h2 class="review-title">
            Answer Review
        </h2>

        ${review}

    `;


    document.getElementById("restartBtn").style.display =
        "inline-block";
}


function restartQuiz(){

    current = 0;
    score = 0;
    userAnswers = [];

    document.getElementById("quizBox").style.display =
        "block";

    document.getElementById("result").style.display =
        "none";

    document.getElementById("restartBtn").style.display =
        "none";

    loadQuestion();
}


loadQuestion();