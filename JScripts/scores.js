
window.onload = HighScores;


function HighScores() {
    var Scores = document.getElementById('dvScores');

    var playerlog;
    playerlog = localStorage.getItem("playerlog");
    if (playerlog === null || playerlog === "") {
        Scores.innerHTML = `
           <span class="dvscores">High Score Listing</span>
           <span class="topscores"> No Scores yet.</span> `
    }

    else {
        var displayscores = playerlog.split('|');
        Scores.innerHTML = displayscores.join("<br>");

        Scores.innerHTML = `
           <span class="dvscores">High Score Listing</span>
           <span class="topscores"> ${displayscores.join("<br>")}</span> `
    }

}