/* =========================================================
   KNOX CYBER LAB
   Safe Cybersecurity Training Simulator
========================================================= */


/* =========================
   PLAYER DATA
========================= */

let player = {
  xp: 0,
  level: 1,
  missions: 0,
  completed: []
};


/* =========================
   LOAD SAVED DATA
========================= */

const saved = localStorage.getItem("knoxCyberLab");

if (saved) {
  try {
    player = JSON.parse(saved);
  } catch {
    console.log("Starting new training profile.");
  }
}


/* =========================
   ELEMENTS
========================= */

const xpElement = document.getElementById("xp");
const levelElement = document.getElementById("level");
const missionsElement = document.getElementById("missions");
const rankElement = document.getElementById("rank");
const progressElement = document.getElementById("progress");
const progressText = document.getElementById("progressText");

const modal = document.getElementById("missionModal");
const closeModal = document.getElementById("closeModal");

const missionTitle = document.getElementById("missionTitle");
const missionDescription = document.getElementById("missionDescription");
const missionContent = document.getElementById("missionContent");
const missionResult = document.getElementById("missionResult");

const consoleOutput = document.getElementById("consoleOutput");
const commandInput = document.getElementById("commandInput");
const clearTerminal = document.getElementById("clearTerminal");

const startBtn = document.getElementById("startBtn");


/* =========================
   UPDATE DASHBOARD
========================= */

function updateDashboard() {

  xpElement.textContent = player.xp;

  levelElement.textContent = player.level;

  missionsElement.textContent = player.missions;

  const percentage = player.xp % 100;

  progressElement.style.width = percentage + "%";

  progressText.textContent = percentage + "%";


  if (player.level >= 10) {
    rankElement.textContent = "CYBER MASTER";
  }

  else if (player.level >= 7) {
    rankElement.textContent = "ELITE";
  }

  else if (player.level >= 4) {
    rankElement.textContent = "SPECIALIST";
  }

  else if (player.level >= 2) {
    rankElement.textContent = "OPERATIVE";
  }

  else {
    rankElement.textContent = "ROOKIE";
  }

  localStorage.setItem(
    "knoxCyberLab",
    JSON.stringify(player)
  );
}


/* =========================
   ADD XP
========================= */

function addXP(amount) {

  const oldLevel = player.level;

  player.xp += amount;

  player.level =
    Math.floor(player.xp / 100) + 1;


  if (player.level > oldLevel) {

    terminalLog(
      `LEVEL UP! You are now level ${player.level}.`,
      "success"
    );

  }

  updateDashboard();
}


/* =========================
   COMPLETE MISSION
========================= */

function completeMission(id, xp) {

  if (!player.completed.includes(id)) {

    player.completed.push(id);

    player.missions++;

    addXP(xp);

    terminalLog(
      `Mission ${id} completed. +${xp} XP`,
      "success"
    );

    updateDashboard();

  } else {

    terminalLog(
      `Mission ${id} already completed.`,
      "warning"
    );

  }
}


/* =========================
   TERMINAL LOG
========================= */

function terminalLog(message, type = "") {

  const line = document.createElement("p");

  line.textContent = "> " + message;

  if (type === "success") {
    line.classList.add("success");
  }

  if (type === "warning") {
    line.style.color = "#ffd43b";
  }

  if (type === "error") {
    line.style.color = "#ff1f1f";
  }

  consoleOutput.appendChild(line);

  consoleOutput.scrollTop =
    consoleOutput.scrollHeight;
}


/* =========================
   START BUTTON
========================= */

startBtn.addEventListener("click", () => {

  document.getElementById("dashboard")
    .scrollIntoView({
      behavior: "smooth"
    });

  terminalLog(
    "Training session started.",
    "success"
  );

});


/* =========================
   MISSION SYSTEM
========================= */

const missions = {

  password: {

    title: "PASSWORD DEFENDER",

    description:
      "Choose the strongest password from the simulated examples.",

    xp: 25,

    html: `
      <div class="challenge">

        <h3>
          Which password is strongest?
        </h3>

        <div class="answer-grid">

          <button class="answer"
            data-answer="wrong">
            password123
          </button>

          <button class="answer"
            data-answer="wrong">
            Knox2008
          </button>

          <button class="answer"
            data-answer="correct">
            R7!qL9#vT2@pX8
          </button>

          <button class="answer"
            data-answer="wrong">
            123456789
          </button>

        </div>

      </div>
    `
  },


  phishing: {

    title: "PHISHING HUNTER",

    description:
      "A simulated message has arrived. Identify the suspicious one.",

    xp: 30,

    html: `
      <div class="challenge">

        <h3>
          Which message is most suspicious?
        </h3>

        <div class="answer-grid">

          <button class="answer"
            data-answer="wrong">
            Your school has posted a new timetable.
            Check the official school portal.
          </button>

          <button class="answer"
            data-answer="correct">
            URGENT! You won a FREE PHONE!
            Send your password immediately to claim it!
          </button>

          <button class="answer"
            data-answer="wrong">
            Your bank statement is ready.
            Please check your official banking app.
          </button>

        </div>

      </div>
    `
  },


  network: {

    title: "NETWORK ANALYST",

    description:
      "Analyze the simulated network report and identify the suspicious event.",

    xp: 35,

    html: `
      <div class="challenge">

        <h3>
          SIMULATED NETWORK LOG
        </h3>

        <pre style="
          color:#666;
          font-family:monospace;
          font-size:11px;
          line-height:1.8;
          white-space:pre-wrap;
        ">[10:42] Device connected
[10:43] Normal DNS request
[10:44] Software update
[10:45] Multiple failed login attempts
[10:46] Backup completed</pre>

        <br>

        <h3>
          Which event deserves investigation?
        </h3>

        <div class="answer-grid">

          <button class="answer"
            data-answer="wrong">
            Software update
          </button>

          <button class="answer"
            data-answer="correct">
            Multiple failed login attempts
          </button>

          <button class="answer"
            data-answer="wrong">
            Backup completed
          </button>

        </div>

      </div>
    `
  },


  terminal: {

    title: "TERMINAL CHALLENGE",

    description:
      "Complete the safe terminal puzzle. No real system commands are executed.",

    xp: 40,

    html: `
      <div class="challenge">

        <h3>
          What command would normally display
          available commands in this simulator?
        </h3>

        <input
          class="text-input"
          id="terminalAnswer"
          placeholder="Type your answer..."
        >

        <button
          class="submit-answer"
          id="submitTerminal">
          SUBMIT
        </button>

      </div>
    `
  }

};


/* =========================
   OPEN MISSION
========================= */

document.querySelectorAll(".mission-card")
  .forEach(card => {

    const button =
      card.querySelector(".mission-btn");

    button.addEventListener("click", () => {

      const id =
        card.dataset.mission;

      openMission(id);

    });

  });


function openMission(id) {

  const mission = missions[id];

  missionTitle.textContent =
    mission.title;

  missionDescription.textContent =
    mission.description;

  missionContent.innerHTML =
    mission.html;

  missionResult.innerHTML = "";

  modal.classList.add("active");


  /* ANSWER BUTTONS */

  document.querySelectorAll(".answer")
    .forEach(button => {

      button.addEventListener("click", () => {

        const answer =
          button.dataset.answer;

        if (answer === "correct") {

          button.classList.add("correct");

          missionResult.innerHTML =
            `<span class="result-success">
              ✓ CORRECT — Security decision confirmed.
              +${mission.xp} XP
            </span>`;

          completeMission(
            id,
            mission.xp
          );

          disableAnswers();

        } else {

          button.classList.add("wrong");

          missionResult.innerHTML =
            `<span class="result-fail">
              ✕ INCORRECT — Analyze the clues and try again.
            </span>`;

        }

      });

    });


  /* TERMINAL PUZZLE */

  const submitTerminal =
    document.getElementById("submitTerminal");

  if (submitTerminal) {

    submitTerminal.addEventListener(
      "click",
      () => {

        const answer =
          document.getElementById(
            "terminalAnswer"
          ).value
          .trim()
          .toLowerCase();


        if (
          answer === "help" ||
          answer === "? "
        ) {

          missionResult.innerHTML =
            `<span class="result-success">
              ✓ CORRECT — You found the simulator help command.
              +${mission.xp} XP
            </span>`;

          completeMission(
            id,
            mission.xp
          );

          submitTerminal.disabled = true;

        } else {

          missionResult.innerHTML =
            `<span class="result-fail">
              ✕ Not quite. Try the command used
              to display available simulator commands.
            </span>`;

        }

      }
    );

  }

}


/* =========================
   DISABLE ANSWERS
========================= */

function disableAnswers() {

  document.querySelectorAll(".answer")
    .forEach(button => {

      button.disabled = true;

    });

}


/* =========================
   CLOSE MODAL
========================= */

closeModal.addEventListener(
  "click",
  () => {
    modal.classList.remove("active");
  }
);


modal.addEventListener(
  "click",
  event => {

    if (event.target === modal) {
      modal.classList.remove("active");
    }

  }
);


/* =========================
   TERMINAL COMMANDS
========================= */

commandInput.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Enter") {
      return;
    }

    const command =
      commandInput.value
        .trim()
        .toLowerCase();

    if (!command) {
      return;
    }

    terminalLog(command);

    commandInput.value = "";


    switch (command) {

      case "help":

        terminalLog(
          "Available commands:",
          "success"
        );

        terminalLog(
          "help — show simulator commands"
        );

        terminalLog(
          "status — show training status"
        );

        terminalLog(
          "missions — show available missions"
        );

        terminalLog(
          "clear — clear terminal"
        );

        terminalLog(
          "about — about KNOX Cyber Lab"
        );

        break;


      case "status":

        terminalLog(
          `Level: ${player.level}`
        );

        terminalLog(
          `XP: ${player.xp}`
        );

        terminalLog(
          `Completed missions: ${player.missions}`
        );

        terminalLog(
          `Rank: ${rankElement.textContent}`,
          "success"
        );

        break;


      case "missions":

        terminalLog(
          "01 — Password Defender"
        );

        terminalLog(
          "02 — Phishing Hunter"
        );

        terminalLog(
          "03 — Network Analyst"
        );

        terminalLog(
          "04 — Terminal Challenge"
        );

        break;


      case "about":

        terminalLog(
          "KNOX Cyber Lab is a safe cybersecurity training simulator."
        );

        terminalLog(
          "No real systems are accessed."
        );

        break;


      case "clear":

        consoleOutput.innerHTML = "";

        terminalLog(
          "Terminal cleared.",
          "success"
        );

        break;


      case "scan":

        terminalLog(
          "Simulation scan initiated..."
        );

        setTimeout(() => {

          terminalLog(
            "Training environment: SECURE",
            "success"
          );

        }, 700);

        break;


      case "whoami":

        terminalLog(
          "OPERATIVE — KNOX CYBER LAB"
        );

        break;


      default:

        terminalLog(
          `Unknown simulator command: ${command}`,
          "error"
        );

        terminalLog(
          "Type 'help' for available commands."
        );

    }

  });


/* =========================
   CLEAR TERMINAL BUTTON
========================= */

clearTerminal.addEventListener(
  "click",
  () => {

    consoleOutput.innerHTML = "";

    terminalLog(
      "Terminal cleared.",
      "success"
    );

  }
);


/* =========================
   INITIALIZE
========================= */

updateDashboard();

terminalLog(
  "Player profile loaded.",
  "success"
);

terminalLog(
  `Level ${player.level} operative ready.`
);
