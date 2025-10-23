//Timer for the index page
const form = document.getElementById("countdown-form");
const countdownDisplay = document.getElementById("countdown");
let countdownInterval;

if(form){
    form.addEventListener("submit", (e) =>{
        e.preventDefault();
        clearInterval(countdownInterval);

        const eventName = document.getElementById("event-name").value || "Unnamed Event";
        const targetDate = new Date(document.getElementById("target-date").value);

        if(isNaN(targetDate)) return;

        //Save countdown to localStorage
        const savedCountdowns = JSON.parse(localStorage.getItem("countdowns")) || [];
        savedCountdowns.push({ name: eventName, date: targetDate.toISOString()});
        localStorage.setItem("countdowns", JSON.stringify(savedCountdowns));

        //Start countdowns
        countdownInterval = setInterval(() =>{
            const now = new Date();
            const timeLeft = targetDate - now;

            if(timeLeft <= 0){
                clearInterval(countdownInterval);
                countdownDisplay.textContent = `"${eventName}" is here!`;
                countdownDisplay.classList.add("expired");
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
            const seconds = Math.floor((timeLeft / 1000) % 60);

            countdownDisplay.textContent = `"${eventName}" ➡️ ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    });
}

//Display list of timers on History page
const historyContainer = document.getElementById("history-list");

if(historyContainer){
    const savedCountdowns = JSON.parse(localStorage.getItem("countdowns")) || [];

    if(savedCountdowns.length === 0){
        historyContainer.innerHTML = `<p>No countdowns saved yet.</p>`;
    }else{
        savedCountdowns.forEach((item, index) => {
            const targetDate = new Date(item.date);
            const now = new Date();
            const timeLeft = targetDate - now;

            let message;
            if(timeLeft <= 0){
                message = `✅ "${item.name}" has ended (${targetDate.toLocaleString()})`;
            }else{
                    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
                    message = `"${item.name}" in ${days}d ${hours}h ${minutes}m`;
                }
                const div = document.createElement("div");
                div.classList.add("history-item");

                const text = document.createElement("span");
                text.textContent = message;

                const deleteBtn = document.createElement("button");
                deleteBtn.classList.add("delete-btn");
                deleteBtn.innerHTML = "🗑️";

                deleteBtn.addEventListener("click", () => {
                    const savedCountdowns = JSON.parse(localStorage.getItem("countdowns")) || [];
                    const updatedCountdowns = savedCountdowns.filter((_, i) => i !== index);
                    localStorage.setItem("countdowns", JSON.stringify(updatedCountdowns));
                    div.remove();
                });

                div.appendChild(text);
                div.appendChild(deleteBtn);
                historyContainer.appendChild(div);
            });
    }
}
