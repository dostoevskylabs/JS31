let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
function timer(seconds){
	clearInterval(countdown);
	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);
	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		if ( secondsLeft < 0 ) {
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(seconds){
	const minutes = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	const display = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
	timerDisplay.textContent = display;
	document.title = display;	
}

function displayEndTime(timestamp){
	const end = new Date(timestamp);
	const hour = end.getHours();
	const mins = end.getMinutes();
	endTime.textContent = `Be back at ${hour}:${mins < 10 ? '0' : ''}${mins}`;
}
function startTimer(){
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}
buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
	e.preventDefault();
	const mins = this.minutes.value;
	this.reset();
	timer(mins * 60);
});