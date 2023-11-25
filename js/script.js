let reminders = [];

function addReminder() {
  const input = document.getElementById("reminder-input");
  let reminderText = input.value.trim();

  const reminder = {
    text: reminderText,
    time: new Date().getTime(),
    expired: false,
    timerId: null,
  };

  reminders.push(reminder);
  input.value = "";
  saveReminders();
  displayReminders();
}

function displayReminders() {
  const reminderList = document.getElementById("reminder-list");
  reminderList.innerHTML = "";

  reminders.forEach((reminder) => {
    const listItem = document.createElement("li");
    const reminderText = document.createElement("span");
    const timerText = document.createElement("span");

    reminderText.textContent = reminder.text;
    timerText.style.float = "right";

    listItem.addEventListener("click", () => {
      clearInterval(reminder.timerId);
      reminders.splice(reminders.indexOf(reminder), 1);
      saveReminders();
      displayReminders();
    });

    listItem.appendChild(reminderText);
    listItem.appendChild(timerText);
    reminderList.appendChild(listItem);

    reminder.timerId = setInterval(() => {
      const timeDiff = new Date().getTime() - reminder.time;
      const minutes = Math.floor(timeDiff / (60 * 1000));
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);

      if (weeks > 0) {
        timerText.textContent = `${weeks}w`;
      } else if (days > 0) {
        timerText.textContent = `${days}d`;
      } else if (hours > 0) {
        timerText.textContent = `${hours}h`;
      } else {
        timerText.textContent = `${minutes}m`;
      }
    }, 1000);
  });
}

function saveReminders() {
  localStorage.setItem("reminders", JSON.stringify(reminders));
}

function loadReminders() {
  const savedReminders = localStorage.getItem("reminders");
  if (savedReminders) {
    reminders = JSON.parse(savedReminders);
    displayReminders();
  }
}

document.getElementById("reminder-form").addEventListener("submit", (event) => {
  event.preventDefault();
  addReminder();
});

window.addEventListener("load", () => {
  loadReminders();
});
