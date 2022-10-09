/* OROLOGIO */

function displayClock() {
    const time = new Date()
    orologio = document.getElementById("timeStamp");
    
    orologio.textContent = time.toGMTString();
}

setInterval(displayClock, 1000);


/* animazione on touch degli interessi */
function startup() {
    var contenitoriInteressi = document.getElementsByClassName("interestContainer");
    var i;
    for (i = 0; i < contenitoriInteressi.length; i++) {
        contenitoriInteressi[i].addEventListener("touchstart", function() {
            this.classList.add("touched");
        })
        contenitoriInteressi[i].addEventListener("touchend", function() {
            this.classList.remove("touched");
        })
    }
}

document.addEventListener("DOMContentLoaded", startup);

function arrowPressed() {
    document.getElementById('about').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}

/* Scroll toggling for pong */
var touchScrollEnabled = false;

function scrollToggle() {
    touchScrollEnabled = !touchScrollEnabled;
    
    if(touchScrollEnabled) document.getElementById("scrollToggler").innerHTML = "Now you can scroll down!"
    else document.getElementById("scrollToggler").innerHTML = "[ ENABLE SCROLL ]"
}

/* Typewriter */
var j = 0;
var txt = 'getInterestsList';
var speed = 70;

function typeWriter() {
  if (j < txt.length) {
    document.getElementById("tipeWriter").innerHTML += txt.charAt(j);
    j++;
    setTimeout(typeWriter, speed);
  }
}

document.addEventListener('aos:in:terminal-intro', ({ detail }) => {
    j = 0;
    document.getElementById("tipeWriter").innerHTML = "";
    typeWriter();
});


/* Safety scroll per evitare di rimanere bloccati su mobile */
document.addEventListener("DOMContentLoaded", () => {window.scrollTo({ top: 0, behavior: 'smooth' })});
