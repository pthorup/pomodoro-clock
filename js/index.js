var breakDuration;  
var sessionDuration;
var phrase; 
var paused;
var degree;
var breakTimer;
var secondsPerSquareBreak;
var counterBreak;
var sessionTimer;
var secondsPerSquareSess;
var counterSess;
setAllDuration();

/*************************** Settings ***************************/
/* Set break and session duration */
function setAllDuration(){
	stopTimer();
	degree = 0;
	phrase = "Session";
	clearSquareDivs();
  sessionDuration = parseInt(document.getElementById("sessionDuration").value);
	sessionTimer = sessionDuration * 60;
	secondsPerSquareSess = sessionDuration;  /* Number of seconds to create each square which happens to be the same as sessionDuration/breakDuration */
	counterSess = sessionDuration; /* Counter to keep track*/
	breakDuration = parseInt(document.getElementById("breakDuration").value);
	breakTimer = breakDuration * 60;
	secondsPerSquareBreak = breakDuration; 
	counterBreak = breakDuration;
	displayUserInput(sessionDuration, "sessionValue", "Session");
	displayUserInput(breakDuration, "breakValue", "Break");
	displayCurrentTime(sessionDuration, "Session");
}

/* Output rest settings */ 
function displayUserInput(value, id, phrase) {
	var min = value > 1 ? "minutes" : "minute";
  document.getElementById(id).innerHTML = value+" "+min;
}
/****************************************************************/

/************************ Timer progress ************************/
/* Start timer */
function setTimer(){  
  var min, sec, value;
  
  if(!paused) {
    paused = setInterval( function(){
      if(phrase === "Session") {
        min = parseInt(sessionTimer / 60); /* To get rid of decimals*/
        sec = parseInt(sessionTimer % 60);
			console.log("session: "+sessionTimer);
        min = min < 10 ? "0" + min : min; /* Add zeros in front for single digits */
        sec = sec < 10 ? "0" + sec : sec;
			
        value = min + ":" + sec;
        /* Make div for progress ring */
				if(counterSess === secondsPerSquareSess) {
        	var div = document.createElement("div");
          div.className = "squares";
					div.style.WebkitTransform = "rotate("+degree+"deg)";
          div.style.msTransform = "rotate("+degree+"deg)";
					div.style.transform = "rotate("+degree+"deg)";
					div.style.backgroundColor = "rgb(255, "+(degree+2)+", 0)"; 
					//div.style.backgroundColor = "#"+sec+"0090"; // purple then blue more blu
					//div.style.backgroundColor = "#"+sec+"0060"; // purple then blue
					//div.style.backgroundColor = "#00"+sec+"90"; // Teal then blue 7200ff
          document.getElementById("backCircle").appendChild(div); 
					degree = degree + 6;
					secondsPerSquareSess += sessionDuration;
				}				
				document.getElementById("timer").style.color = "#7200ff";
        displayCurrentTime(value, "Session");
        sessionTimer--;
				counterSess++;
				console.log("SecPerSq: "+secondsPerSquareSess+" counter: "+counterSess);
        if (sessionTimer < 0) {
            sessionTimer = sessionDuration * 60;
						secondsPerSquareSess = sessionDuration; 
					  counterSess = sessionDuration;
						phrase = "Break";
        }
      } else {
        min = parseInt(breakTimer / 60); /* To get rid of decimals*/
        sec = parseInt(breakTimer % 60);

        min = min < 10 ? "0" + min : min; /* Add zeros in front for single digits */
        sec = sec < 10 ? "0" + sec : sec;

        value = min + ":" + sec;
				if(counterBreak === secondsPerSquareBreak) {
        	var select = document.getElementById("backCircle");
          select.removeChild(select.lastChild);
					secondsPerSquareBreak += breakDuration;
				}				
				
				document.getElementById("timer").style.color = "#00bfde";
        displayCurrentTime(value, "Break");
        breakTimer--;
				counterBreak++;
				console.log("SecPerSq: "+secondsPerSquareBreak+" counterb: "+counterBreak);
        if (breakTimer < 0) {
          	breakTimer = breakDuration * 60;
						secondsPerSquareBreak = breakDuration; 
 						counterBreak = breakDuration;
						degree = 0;
						phrase = "Session";
        }
      }
    }, 1000);
  } else {
    stopTimer();
  }
}


function displayCurrentTime(value, phrase){
	/* Only displays the current phrase */
    document.getElementById("currentPhrase").innerHTML = phrase; 
    document.getElementById("timer").innerHTML = value; 
}

/**************************** Resets and  Pauses ******************************/
function stopTimer(){
  clearInterval(paused);
  paused = null;
}

function clearSettings(){
	document.getElementById("sessionDuration").value = 1;
	document.getElementById("breakDuration").value = 1;
	setAllDuration();	
}

function clearSquareDivs(){
	/* remove any square child elements used in the timer progress */
	var squareDiv = document.getElementById("backCircle");
	while (squareDiv.firstChild) {
			squareDiv.removeChild(squareDiv.firstChild);
	}
}