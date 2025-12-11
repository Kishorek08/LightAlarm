let alarmSet = false;
let alarmTime = "";
let streak = localStorage.getItem("alarmStreak") ? Number(localStorage.getItem("alarmStreak")) : 0;

document.getElementById("streak").textContent = streak;

function setAlarm() {
    alarmTime = document.getElementById("alarmTime").value;
    alarmSet = true;
    alert("Alarm set for " + alarmTime);
}

function playSunrise(theme) {
    let colors = {
        sunrise: ["#000000", "#2a1b3d", "#ff914d", "#ffd37a", "#ffffff"],
        ocean: ["#000000", "#001d3d", "#003566", "#0077b6", "#ffffff"],
        warm: ["#000000", "#3b1c0a", "#a75d39", "#ffb26b", "#ffffff"]
    };

    let steps = colors[theme];
    let index = 0;

    let interval = setInterval(() => {
        document.body.style.background = steps[index];
        index++;

        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

        if (index >= steps.length) clearInterval(interval);
    }, 2000);

    streak++;
    localStorage.setItem("alarmStreak", streak);
    document.getElementById("streak").textContent = streak;

    let quotes = [
        "Rise and shine! 🌞",
        "A fresh start begins now.",
        "You did it! Stay consistent.",
        "Small habits create big changes."
    ];

    document.getElementById("message").textContent =
        quotes[Math.floor(Math.random() * quotes.length)];
}

setInterval(() => {
    if (!alarmSet) return;

    let now = new Date();
    let current = now.toTimeString().slice(0, 5);

    if (current === alarmTime) {
        let theme = document.getElementById("theme").value;
        playSunrise(theme);
        alarmSet = false;
    }
}, 1000);
