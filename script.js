const testWrapper = document.querySelector('.text-wrapper');
const testArea = document.querySelector('#textArea');
const originText = document.querySelector('.text').innerHTML;
const resetButton= document.querySelector('#reset');
const theTimer = document.querySelector('.timer');

let timer = [0,0,0,0];
let interval;
let timerRunning = false

//corrects stopwatch formatting
function formatting(time){
  if (time <=9){
    time = "0"+ time
  }
  return time;
}

function runTimer(){
  let currentTime = formatting(timer[0]) + ":" + formatting(timer[1]) + ":" + formatting(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100)- (timer[0]*60));
  timer[2] = Math.floor(timer[3]-(timer[1]*100) - (timer[0]*6000));

}
function reset(){
  clearInterval(interval);
  interval = null;
  timer = [0,0,0,0];
  timerRunning = false;
  testArea.value = "";
  theTimer.innerHTML = "00:00:00";

  testWrapper.style.borderColor = 'green';
}

function spellCheck(){
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0, textEntered.length);
  if (textEntered == originText){
    testWrapper.style.borderColor = 'orange';
    clearInterval(interval);
  }
  else if (textEntered==originTextMatch) {
    testWrapper.style.borderColor = 'green'
  }
  else {
    testWrapper.style.borderColor = 'red';
  console.log('wrong');
}
}
function start(){
  let textEnteredLength = textArea.value.length; //make global variable
  if (textEnteredLength === 0){
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
}

//Event Listener for input and button
testArea.addEventListener('keypress', start, false);
testArea.addEventListener('keyup', spellCheck, false);
resetButton.addEventListener('click', reset, false);
