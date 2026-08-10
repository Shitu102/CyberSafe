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

document.getElementById("question").innerText = quiz[current].question;

for(let i=0;i<4;i++){
document.getElementById("op"+i).innerText = quiz[current].options[i];
}

document.getElementById("progress").innerHTML =
"Question " + (current+1) + " of " + quiz.length;


let percent=((current+1)/quiz.length)*100;

document.getElementById("progressBar").style.width = percent + "%";

}



function checkAnswer(index){

userAnswers.push(index);

if(index == quiz[current].answer){
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

document.getElementById("quizBox").style.display="none";

let msg="";

if(score==5){
msg="🟢 Excellent! You are a Cyber Safety Expert.";
}
else if(score>=3){
msg="🟡 Good! Keep Learning.";
}
else{
msg="🔴 Learn More About Cyber Safety.";
}


document.getElementById("result").style.display="block";


let review = "";


for(let i=0; i<quiz.length; i++){


if(userAnswers[i] == quiz[i].answer){

review += `
<hr>

<h3>Question ${i+1}</h3>

<p><b>${quiz[i].question}</b></p>

<p style="color:green;">
✅ Your Answer is Correct.
</p>
`;

}

else{

review += `
<hr>

<h3>Question ${i+1}</h3>

<p><b>${quiz[i].question}</b></p>

<p style="color:red;">
❌ Your Answer:
${quiz[i].options[userAnswers[i]]}
</p>

<p style="color:green;">
✅ Correct Answer:
${quiz[i].options[quiz[i].answer]}
</p>
`;

}

}


document.getElementById("result").innerHTML = `

<h2>Your Score: ${score}/5</h2>

<h3>${msg}</h3>

${review}

`;


document.getElementById("restartBtn").style.display="inline-block";

}



function restartQuiz(){

current=0;
score=0;
userAnswers=[];


document.getElementById("quizBox").style.display="block";

document.getElementById("result").style.display="none";

document.getElementById("restartBtn").style.display="none";


loadQuestion();

}



loadQuestion();