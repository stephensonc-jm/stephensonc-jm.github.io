var myTimer;
function clock() {
    myTimer = setInterval(myClock, 1000);
    var c = 5;

    function myClock() {
        document.getElementById("demo").innerHTML = --c;
        if (c == 0) {
            clearInterval(myTimer);
            alert("Reached zero");
        }
    }
}