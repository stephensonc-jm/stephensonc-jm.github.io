var myTimer;
let timeoutvalue = 0
const Start = document.getElementById('btnStart')
const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const lblOption_A = document.getElementById('lblOption_A')
const lblOption_B = document.getElementById('lblOption_B')
const lblOption_C = document.getElementById('lblOption_C')
const lblOption_D = document.getElementById('lblOption_D')
const submitBtn = document.getElementById('submit')
var playerName
//const playerName = document.getElementById('txtplayername')
//const AudioCountDown = document.getElementById("countDown"); 



//document.getElementById("btnExit").addEventListener("click", HomePage);

function ValidateTextBox() {
    if (document.getElementById("txtplayername").value.trim() == "") {
        alert("Please enter player name!");
        return false;
    }
    else {
        playerName = document.getElementById('txtplayername').value
        return true;
    }

};

Start.addEventListener('click', () => {
    if (!ValidateTextBox() == false) {
        let PlayerInfo = document.getElementById('dvPlayerInfo')
        let dvQuiz = document.getElementById('dvQuiz')
        PlayerInfo.style.display = "none";
        dvQuiz.style.display = "block";

        clock();
        document.getElementById('timer_sec').innerHTML = '15';
    }
});

function HomePage() {
    window.open('index.html', '_blank');
}

function clock() {

    myTimer = setInterval(myClock, 1000);
    var countdown = 15;
    submitBtn.disabled = true;
    function myClock() {
        document.getElementById("timer_sec").innerHTML = --countdown;

        if (countdown == 0) {
            var audio = new Audio('Sounds/BellDing.mp3');
            audio.play();
            //AudioCountDown.play();
            clearInterval(myTimer);

            submitBtn.disabled = false;
            timeoutvalue++
            document.getElementById("option_A").disabled = true;
            document.getElementById("option_B").disabled = true;
            document.getElementById("option_C").disabled = true;
            document.getElementById("option_D").disabled = true;
        }
        else if (countdown < 0) { clearInterval(myTimer); }
    }
}

let questioninput = document.querySelectorAll('input[name="answer"]');

for (let i = 0; i < questioninput.length; i++) {
    questioninput[i].addEventListener('change', function () {
        document.getElementById("option_A").disabled = true;
        document.getElementById("option_B").disabled = true;
        document.getElementById("option_C").disabled = true;
        document.getElementById("option_D").disabled = true;
        submitBtn.disabled = false;
        clearInterval(myTimer);
    });
}


const quizData = [
    {
        question: "Which language runs in a web browser?",
        option_A: "Java",
        option_B: "C",
        option_C: "Python",
        option_D: "javascript",
        correct: "option_D",
    },
    {
        question: "What does CSS stand for?",
        option_A: "Central Style Sheets",
        option_B: "Cascading Style Sheets",
        option_C: "Cascading Simple Sheets",
        option_D: "Cars SUVs Sailboats",
        correct: "option_B",
    },
    {
        question: "What does HTML stand for?",
        option_A: "Hypertext Markup Language",
        option_B: "Hypertext Markdown Language",
        option_C: "Hyperloop Machine Language",
        option_D: "Helicopters Terminals Motorboats Lamborginis",
        correct: "option_A",
    },
    {
        question: "What year was JavaScript launched?",
        option_A: "1996",
        option_B: "1995",
        option_C: "1994",
        option_D: "none of the above",
        correct: "option_B",
    },
];

/*const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const lblOption_A = document.getElementById('lblOption_A')
const lblOption_B = document.getElementById('lblOption_B')
const lblOption_C = document.getElementById('lblOption_C')
const lblOption_D = document.getElementById('lblOption_D')
const submitBtn = document.getElementById('submit')
*/
let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {
    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    lblOption_A.innerText = currentQuizData.option_A
    lblOption_B.innerText = currentQuizData.option_B
    lblOption_C.innerText = currentQuizData.option_C
    lblOption_D.innerText = currentQuizData.option_D
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer = "none"
    submitBtn.disabled = false;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
        if (answer.length === 0) {
            answer = "none"
        }
    })
    return answer
}
function removeIFrame() {
    window.top.location.href = "index.html";
}

function ShowScores() {
    window.top.location.href ="scores.html";
}

submitBtn.addEventListener('click', () => {

    document.getElementById("option_A").disabled = false;
    document.getElementById("option_B").disabled = false;
    document.getElementById("option_C").disabled = false;
    document.getElementById("option_D").disabled = false;
    var text = "100s"
    let link = "<a href='javascript:void(0)'; onclick='ShowScores()'>" + text + "</a>";
    submitBtn.disabled = true;
    const answer = getSelected()

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++
        }

        currentQuiz++

        if (currentQuiz < quizData.length) {
         
            loadQuiz();
            clock();
            document.getElementById('timer_sec').innerHTML = '15';
        } else {
            clearInterval(myTimer); //clear counter  
            if (score < (quizData.length / 2)) {
                var quiz = document.getElementById("quiz")
               
           quiz.innerHTML = `
           <h2 class="resultstextfail">You failed to score a passing grade. You answered ${score}/${quizData.length} questions correctly</h2><div>
           <button onclick="location.reload()" class="button">Play Again</button>
           <button onclick="location.close()" class="button">Close</button></div> `
            }
            else if (score >= quizData.length) {
                clearInterval(myTimer);
                var quiz = document.getElementById("quiz")
                var audio = new Audio('Sounds/CrowdArenaCheer.mp3');
                audio.play();
                quiz.innerHTML = `
           <h2 class="resultstextfull">Congrats on scoring 100%, You answered all ${quizData.length} questions correctly</h2>
           <section class="quizresults"><img src="Graphics/worldcuptrophy.gif"></section>
           <section class="quizresults"><h4 class="perfecttext">Your name has been added to the ${link} list.</h4></section>`
                var seperator = "|";
                var playerlog;

                //localStorage.clear();
                playerlog = localStorage.getItem("playerlog");

                if (playerlog === null) {
                    playerlog = ""

                }
                const highscores = playerlog + seperator + playerName;
                localStorage.clear();
                localStorage.setItem("playerlog", highscores);
            }
            else {
                var quiz = document.getElementById("quiz")
               // var img = document.createElement("img");
                var scorepercentile = (score/quizData.length)*100
                quiz.innerHTML = `
           <h2 class="resultstextpass">Your score is ${scorepercentile}%. You answered ${score}/${quizData.length} questions correctly</h2>
           <section class="quizresults"><img src="Graphics/medal.JPG"></section>          
           <section class="quizresults"><button onclick="location.reload()"  class="button">Play Again</button>
           <button onclick="removeIFrame()" class="button">Close</button></section> `
            }

        }
    }
})