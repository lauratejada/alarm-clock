'use strict';

const showHour = document.querySelector('.hour');
const showMinutes = document.querySelector('.minutes');
const showSeconds = document.querySelector('.seconds');
const showAlarmTime = document.querySelector('span');
const input = document.querySelector('.input');
const btnSetAlarm = document.querySelector('.button');
const invalidMessage = document.querySelector('.invalid-message p');

const clockSound = new Audio('./audio/clocksound.mp3');
clockSound.type = 'audio/mp3';

const alarmSound = new Audio('./audio/alarmsound.mp3');
alarmSound.type = 'audio/mp3';

let timeString = new Date().toTimeString();

//console.log(timeString.toString().split(' ')[0]);

let time = timeString.toString().split(' ')[0];
let hour = time.split(':')[0];
let minutes = time.split(':')[1];
let seconds = time.split(':')[2];
//console.log(time);

let finalAlarmHour = '';
let finalAlarmMinutes = '';

showHour.innerHTML = hour;
showMinutes.innerHTML = minutes;
showSeconds.innerHTML = seconds;

function updateTime() {
    timeString = new Date().toTimeString();
    time = timeString.toString().split(' ')[0];
    hour = time.split(':')[0];
    minutes = time.split(':')[1];
    seconds = time.split(':')[2];
    console.log(time);
    showHour.innerHTML = hour;
    showMinutes.innerHTML = minutes;
    showSeconds.innerHTML = seconds;
    //clockSound.play();
    console.log('alarm time');
    console.log(finalAlarmHour , finalAlarmMinutes);
    console.log('curren time');
    console.log(hour, minutes);
    console.log(finalAlarmHour == hour);
    console.log(finalAlarmMinutes == minutes);
    if ((finalAlarmHour == hour) && (finalAlarmMinutes == minutes)) {
        alarmSound.play();
    }
}
setInterval(updateTime, 1000);

function inputIsValid(valTime) {  // validate format and not current time
    let patternTime = /^\d{2}\:\d{2}$/g;  // pattern for hh:mm
    let alarmTime = valTime;
    let alarmHour = alarmTime.split(':')[0];
    let alarmMinutes = alarmTime.split(':')[1];

    timeString = new Date().toTimeString();
    let currentTime = timeString.toString().split(' ')[0];
    let currentHour = currentTime.split(':')[0];
    let currentMinutes = currentTime.split(':')[1];
    console.log(currentTime);
    alarmHour = Number.parseInt(alarmHour);
    alarmMinutes = Number.parseInt(alarmMinutes);
    console.log(alarmHour);
    console.log(alarmMinutes);
    console.log('\n');

    if (patternTime.test(valTime)) {
        if((0 <= alarmHour < 24) && ((alarmMinutes != currentMinutes) && (0 <= alarmMinutes < 60))) {
            finalAlarmHour = alarmHour;
            finalAlarmMinutes = alarmMinutes;
            return true;
        } else {
            return false;
        }    
    } else {
        return false;
    }
}


btnSetAlarm.addEventListener('click', () => {
    console.log(`Input : ${input.value}`);
    console.log(`Es valido ${inputIsValid(input.value)}`);

    if (!inputIsValid(input.value)) {  // value is valid and not be the same as the current time
        invalidMessage.style.display = 'block';
    } else {
        invalidMessage.style.display = 'none';
        showAlarmTime.innerHTML = input.value;
        // set the alarm and play the alarm sound when is time
    }
});

