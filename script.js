// SEM NAPIŠ SVŮJ E-MAIL
const teacherEmail = "tvuj.email@skola.cz";

// ČASOVÝ LIMIT HRY
const totalGameTime = 60 * 60;

// TREST ZA ŠPATNÝ KÓD
const penaltySeconds = 3 * 60;

const introScreen = {
  title: "Incident v NovaCore Research Labs",
  badge: "Start mise",
  image: "obrazky/uvod.jpg",
  text: `
    <p>Vítej v <strong>NovaCore Research Labs</strong> – tajném výzkumném centru, kde se pracuje na projektech, které mohou změnit svět.</p>

    <p>Dnes přicházíš jako nový člen expertního týmu. Inženýr Josef Barnabáš Tě provádí řídicím střediskem. Všude kolem blikají monitory, svítí kontrolky a z hlubin laboratoře se ozývá tiché hučení přístrojů.</p>

    <p>Najednou se ozve ostrý výstražný tón.</p>

    <span class="system-message">NESTABILITA REAKTORU ZJIŠTĚNA!</span>

    <p>K restartu systému je potřeba získat <strong>šest čtyřmístných kódů</strong>. Každý z nich odemkne jednu bezpečnostní úroveň.</p>

    <p>Na splnění mise máš <strong>60 minut</strong>. Za každý špatně zadaný kód systém odečte <strong>3 minuty</strong>.</p>

    <p>Nejprve vyplň název týmu a jména hráčů. Potom můžeš spustit misi.</p>
  `
};

const levels = [
  {
    title: "Úkol 1: Rozmazané poznámky",
    badge: "Úroveň 1",
    code: "1111",
    image: "obrazky/ukol1.jpg",
    text: `
      <p>Červená světla se rozblikají a místností se rozezní varovné pípání. Lekneš se, prudce sebou trhneš a omylem převrhneš kelímek s kávou.</p>
      <p>Káva se rozlije přímo na důležité poznámky ležící na stole. Některá slova jsou pořád čitelná, jiná se úplně rozmazala.</p>
      <p><strong>Doplň chybějící slova a zjisti první čtyřmístný kód.</strong></p>
    `
  },
  {
    title: "Úkol 2: Zásobní lahve",
    badge: "Úroveň 2",
    code: "2222",
    image: "obrazky/ukol2.jpg",
    text: `
      <p>Alarmy sice na okamžik zeslábly, ale reaktor je stále nestabilní. Červená světla blikají pomaleji, zato pravidelně – jako odpočítávání.</p>
      <p>Všimneš si poličky se zásobními lahvemi. Na každé z nich je název prvku.</p>
      <p><strong>Prozkoumej názvy prvků na lahvích a najdi druhý přístupový kód.</strong></p>
    `
  },
  {
    title: "Úkol 3: Chromatogram",
    badge: "Úroveň 3",
    code: "3333",
    image: "obrazky/ukol3.jpg",
    text: `
      <p>Monitor náhle znovu zabliká. Objeví se záznam z plynového chromatografu. Křivky na obrazovce poskakují, hodnoty se mění a systém stále opakuje:</p>
      <span class="system-message">NESTABILITA ROSTE.</span>
      <p>Teď rozhoduje rychlost, přesnost a schopnost číst mezi řádky… nebo spíš <strong>mezi píky</strong>.</p>
      <p><strong>Najdi ukryté indicie a získej třetí čtyřmístný kód.</strong></p>
    `
  },
  {
    title: "Úkol 4: Pohlednice",
    badge: "Úroveň 4",
    code: "4444",
    image: "obrazky/ukol4.jpg",
    text: `
      <p>Chromatogram se zastaví. Varovné hlášení na okamžik zmizí a v místnosti zavládne napjaté ticho.</p>
      <p>Na nástěnce mezi poznámkami, plánky a starými dokumenty si všimneš pohlednice.</p>
      <p>Jenže v NovaCore Research Labs není obyčejné vůbec nic.</p>
      <p><strong>Prohlédni si pohlednici pozorně. Možná právě ona ukrývá další čtyřmístný kód.</strong></p>
    `
  },
  {
    title: "Úkol 5: Periodická soustava",
    badge: "Úroveň 5",
    code: "5555",
    image: "obrazky/ukol5.jpg",
    text: `
      <p>Ani po zadání čtvrtého kódu se reaktor nestabilizoval. Systém se znovu otřese a na obrazovce se objeví periodická soustava prvků.</p>
      <p>Známá. Přehledná. Bezbarvá.</p>
      <p>Jenže při bližším pohledu zjistíš, že něco není v pořádku. Některé značky prvků vypadají podezřele a v tabulce problikávají červená políčka.</p>
      <p><strong>Prozkoumej periodickou soustavu a zjisti pátý čtyřmístný kód.</strong></p>
    `
  },
  {
    title: "Úkol 6: Hra atomů s elektrony",
    badge: "Finální úroveň",
    code: "6666",
    image: "obrazky/ukol6.jpg",
    text: `
      <p>Řídicí systém reaktoru se přepíná do posledního nouzového režimu.</p>
      <span class="system-message">FINÁLNÍ STABILIZAČNÍ SEKVENCE – MANUÁLNÍ NASTAVENÍ VYŽADOVÁNO</span>
      <p>Na druhé obrazovce se spustí bludiště. Cesty jsou úzké, slepé uličky neúprosné a jen jedna trasa vede k cíli.</p>
      <p>Na cestě potkáš různé částice. Některé elektrony přijaly, jiné je odevzdaly. Právě jejich náboj Ti pomůže získat poslední čtyřmístný kód.</p>
      <p><strong>Tik-tak. Reaktor čeká.</strong></p>
    `
  }
];

const finalScreen = {
  title: "Mise splněna!",
  badge: "Reaktor stabilizován",
  image: "obrazky/uspech.jpg",
  text: `
    <p>Zadáváš poslední čtyřmístný kód.</p>
    <p>Na okamžik se nic neděje.</p>
    <p>Pak alarmy utichnou. Červená světla pohasnou a hodnoty na monitorech se pomalu vracejí do zelených zón.</p>
    <span class="system-message">STABILIZACE DOKONČENA<br>NOUZOVÝ REŽIM UKONČEN</span>
    <p><strong>Reaktor je zachráněn. Vítej v NovaCore Research Labs!</strong></p>
  `
};

const timeOutScreen = {
  title: "Čas vypršel!",
  badge: "Mise neúspěšná",
  image: "obrazky/konec-casu.jpg",
  text: `
    <p>Časový limit byl vyčerpán.</p>
    <p>Reaktor se nepodařilo stabilizovat včas a nouzový systém hru ukončil.</p>
    <span class="system-message">NOUZOVÝ PROTOKOL SELHAL</span>
    <p><strong>Laboratoř potřebuje nový pokus.</strong></p>
  `
};

let currentLevel = 0;
let timeLeft = totalGameTime;
let timerInterval = null;
let gameRunning = false;
let gameOver = false;
let waitingForNextLevel = false;

let gameStartTime = null;
let levelStartTime = null;

let teamData = {
  teamName: "",
  players: []
};

let stats = [];

const title = document.getElementById("title");
const text = document.getElementById("text");
const levelBadge = document.getElementById("levelBadge");

const imageBox = document.getElementById("imageBox");
const levelImage = document.getElementById("levelImage");

const teamForm = document.getElementById("teamForm");
const teamNameInput = document.getElementById("teamName");
const playerInputs = [
  document.getElementById("player1"),
  document.getElementById("player2"),
  document.getElementById("player3"),
  document.getElementById("player4")
];
const formMessage = document.getElementById("formMessage");

const startButton = document.getElementById("startButton");
const codeBox = document.getElementById("codeBox");
const codeInput = document.getElementById("codeInput");
const checkButton = document.getElementById("checkButton");
const message = document.getElementById("message");
const restartButton = document.getElementById("restartButton");

const timer = document.getElementById("timer");
const timerBox = document.getElementById("timerBox");

const resultBox = document.getElementById("resultBox");
const resultButtons = document.getElementById("resultButtons");
const copyButton = document.getElementById("copyButton");
const emailButton = document.getElementById("emailButton");
const speakerButton = document.getElementById("speakerButton");
const speakerStatus = document.getElementById("speakerStatus");

const SPEAKER_BUTTON_TEXT = "poslechni si";
const SPEAKER_STOP_TEXT = "zastavit hlas";

let selectedCzechVoice = null;
let currentlySpeaking = false;

function showImage(imagePath) {
  if (imagePath) {
    levelImage.src = imagePath;
    imageBox.classList.remove("hidden");
  } else {
    imageBox.classList.add("hidden");
  }
}

levelImage.addEventListener("error", function () {
  imageBox.classList.add("hidden");
});

function loadCzechVoice() {
  if (!("speechSynthesis" in window)) {
    return;
  }

  const voices = window.speechSynthesis.getVoices();

  // Prohlížeč nabízí jen hlasy nainstalované v zařízení.
  // Proto hlas nevybíráme podle pořadí, ale bodujeme ho:
  // 1) přednost má čeština, 2) přednost má mužsky znějící název hlasu.
  const maleVoiceName = /\b(jakub|jan|pavel|petr|martin|miroslav|zden[eě]k|v[ií]t|anton[ií]n|ond[rř]ej|ji[rř][ií]|milo[sš]|male|man)\b/i;
  const femaleVoiceName = /\b(zuzana|iveta|vlasta|milena|tereza|karolina|karol[ií]na|female|woman)\b/i;

  function scoreVoice(voice) {
    const lang = (voice.lang || "").toLowerCase();
    const name = voice.name || "";
    let score = 0;

    if (lang === "cs-cz") score += 120;
    else if (lang.startsWith("cs")) score += 100;
    else if (/czech|cesky|česky/i.test(name)) score += 80;

    if (maleVoiceName.test(name)) score += 90;
    if (femaleVoiceName.test(name)) score -= 70;
    if (/google|microsoft|apple|siri/i.test(name)) score += 8;
    if (voice.localService) score += 4;

    return score;
  }

  selectedCzechVoice = voices
    .slice()
    .sort(function (a, b) {
      return scoreVoice(b) - scoreVoice(a);
    })[0] || null;
}

function cleanTextForSpeaker(rawText) {
  return rawText
    .replace(/\s+/g, " ")
    .replace(/NovaCore/g, "Nova Kór")
    .replace(/Research Labs/g, "Research Labs")
    .replace(/⏱/g, "Čas běží.")
    .trim();
}

function getTextForSpeaker() {
  return cleanTextForSpeaker(title.textContent + ". " + text.innerText);
}

function resetSpeakerButton() {
  currentlySpeaking = false;
  speakerButton.classList.remove("speaking");
  speakerButton.textContent = SPEAKER_BUTTON_TEXT;
  speakerStatus.textContent = "";
}

function stopSpeaker() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  resetSpeakerButton();
}

function speakCurrentScreen() {
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
    speakerStatus.textContent = "Hlasové čtení tento prohlížeč nepodporuje.";
    return;
  }

  if (window.speechSynthesis.speaking || currentlySpeaking) {
    stopSpeaker();
    return;
  }

  loadCzechVoice();

  const textToRead = getTextForSpeaker();

  if (!textToRead) {
    speakerStatus.textContent = "Na této obrazovce není co přečíst.";
    return;
  }

  const utterance = new SpeechSynthesisUtterance(textToRead);
  utterance.lang = "cs-CZ";

  // Nižší výška hlasu + pomalejší tempo působí tajemněji a více „mužsky“.
  // Když zařízení nemá český mužský hlas, alespoň ztišíme výšku hlasu.
  utterance.rate = 0.78;
  utterance.pitch = 0.45;
  utterance.volume = 1;

  if (selectedCzechVoice) {
    utterance.voice = selectedCzechVoice;
  }

  utterance.onstart = function () {
    currentlySpeaking = true;
    speakerButton.classList.add("speaking");
    speakerButton.textContent = SPEAKER_STOP_TEXT;
    speakerStatus.textContent = "Systém předčítá hlášení…";
  };

  utterance.onend = resetSpeakerButton;
  utterance.onerror = function () {
    resetSpeakerButton();
    speakerStatus.textContent = "Čtení se nepodařilo spustit.";
  };

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

if ("speechSynthesis" in window) {
  loadCzechVoice();
  window.speechSynthesis.onvoiceschanged = loadCzechVoice;
} else {
  speakerButton.disabled = true;
  speakerButton.textContent = "hlas není podporován";
}

speakerButton.addEventListener("click", speakCurrentScreen);

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  timer.textContent = formatTime(timeLeft);

  timerBox.classList.remove("warning", "danger");

  if (timeLeft <= 5 * 60) {
    timerBox.classList.add("danger");
  } else if (timeLeft <= 15 * 60) {
    timerBox.classList.add("warning");
  }
}

function startTimer() {
  clearInterval(timerInterval);
  updateTimerDisplay();

  timerInterval = setInterval(function () {
    if (!gameRunning || gameOver) {
      return;
    }

    timeLeft--;

    if (timeLeft <= 0) {
      timeLeft = 0;
      updateTimerDisplay();
      endGameByTime();
      return;
    }

    updateTimerDisplay();
  }, 1000);
}

function subtractTimeForWrongCode() {
  timeLeft -= penaltySeconds;

  if (timeLeft <= 0) {
    timeLeft = 0;
    updateTimerDisplay();
    endGameByTime();
  } else {
    updateTimerDisplay();
  }
}

function showIntro() {
  stopSpeaker();
  clearInterval(timerInterval);

  currentLevel = 0;
  timeLeft = totalGameTime;
  gameRunning = false;
  gameOver = false;
  waitingForNextLevel = false;
  gameStartTime = null;
  levelStartTime = null;

  stats = levels.map(function (level, index) {
    return {
      number: index + 1,
      title: level.title,
      duration: 0,
      errors: 0,
      completed: false
    };
  });

  updateTimerDisplay();

  title.textContent = introScreen.title;
  levelBadge.textContent = introScreen.badge;
  text.innerHTML = introScreen.text;
  showImage(introScreen.image);

  teamForm.classList.remove("hidden");
  startButton.classList.remove("hidden");

  codeBox.classList.add("hidden");
  restartButton.classList.add("hidden");
  resultBox.classList.add("hidden");
  resultButtons.classList.add("hidden");

  message.textContent = "";
  formMessage.textContent = "";
}

function readTeamData() {
  const teamName = teamNameInput.value.trim();
  const players = playerInputs
    .map(function (input) {
      return input.value.trim();
    })
    .filter(function (name) {
      return name !== "";
    });

  return {
    teamName: teamName,
    players: players
  };
}

function startGame() {
  teamData = readTeamData();

  if (teamData.teamName === "") {
    formMessage.textContent = "Nejprve napište název týmu.";
    formMessage.className = "message error";
    teamNameInput.focus();
    return;
  }

  currentLevel = 0;
  timeLeft = totalGameTime;
  gameRunning = true;
  gameOver = false;
  waitingForNextLevel = false;
  gameStartTime = Date.now();

  updateTimerDisplay();
  showLevel();
  startTimer();
}

function showLevel() {
  stopSpeaker();
  const level = levels[currentLevel];

  waitingForNextLevel = false;
  levelStartTime = Date.now();

  title.textContent = level.title;
  levelBadge.textContent = level.badge;
  text.innerHTML = level.text;
  showImage(level.image);

  teamForm.classList.add("hidden");
  startButton.classList.add("hidden");
  resultBox.classList.add("hidden");
  resultButtons.classList.add("hidden");

  codeInput.value = "";
  codeInput.disabled = false;
  checkButton.disabled = false;

  message.textContent = "";
  message.className = "message";

  codeBox.classList.remove("hidden");
  restartButton.classList.add("hidden");

  setTimeout(function () {
    codeInput.focus();
  }, 100);
}

function completeCurrentLevel() {
  const secondsSpent = Math.round((Date.now() - levelStartTime) / 1000);

  stats[currentLevel].duration += secondsSpent;
  stats[currentLevel].completed = true;
}

function checkCode() {
  if (!gameRunning || gameOver || waitingForNextLevel) {
    return;
  }

  const enteredCode = codeInput.value.trim();
  const correctCode = levels[currentLevel].code;

  if (enteredCode.length !== 4) {
    message.textContent = "Kód musí mít přesně 4 číslice.";
    message.className = "message info";
    codeInput.focus();
    return;
  }

  if (enteredCode === correctCode) {
    waitingForNextLevel = true;
    completeCurrentLevel();

    message.textContent = "Kód přijat. Přístupová úroveň odemčena.";
    message.className = "message ok";

    codeInput.disabled = true;
    checkButton.disabled = true;

    setTimeout(function () {
      currentLevel++;

      if (currentLevel < levels.length) {
        showLevel();
      } else {
        showFinalScreen();
      }
    }, 1000);

  } else {
    stats[currentLevel].errors++;
    subtractTimeForWrongCode();

    if (gameOver) {
      return;
    }

    message.textContent = "Kód není správný. Systém odečetl 3 minuty. Zkus to znovu.";
    message.className = "message error";

    codeInput.value = "";
    codeInput.focus();
  }
}

function showFinalScreen() {
  stopSpeaker();
  gameRunning = false;
  gameOver = true;
  clearInterval(timerInterval);

  title.textContent = finalScreen.title;
  levelBadge.textContent = finalScreen.badge;
  text.innerHTML = finalScreen.text;
  showImage(finalScreen.image);

  codeBox.classList.add("hidden");
  restartButton.classList.remove("hidden");

  showResults("Mise splněna");
}

function endGameByTime() {
  stopSpeaker();
  if (levelStartTime && currentLevel < stats.length && !stats[currentLevel].completed) {
    const secondsSpent = Math.round((Date.now() - levelStartTime) / 1000);
    stats[currentLevel].duration += secondsSpent;
  }

  gameRunning = false;
  gameOver = true;
  clearInterval(timerInterval);

  title.textContent = timeOutScreen.title;
  levelBadge.textContent = timeOutScreen.badge;
  text.innerHTML = timeOutScreen.text;
  showImage(timeOutScreen.image);

  codeBox.classList.add("hidden");
  restartButton.classList.remove("hidden");

  showResults("Čas vypršel");
}

function getTotalErrors() {
  return stats.reduce(function (sum, item) {
    return sum + item.errors;
  }, 0);
}

function getPlayedTime() {
  return totalGameTime - timeLeft;
}

function createResultText(status) {
  let playersText = teamData.players.length > 0
    ? teamData.players.join(", ")
    : "neuvedeno";

  let result = "";
  result += "Výsledek únikové hry – NovaCore Research Labs\n";
  result += "---------------------------------------------\n";
  result += "Stav: " + status + "\n";
  result += "Tým: " + teamData.teamName + "\n";
  result += "Hráči: " + playersText + "\n\n";
  result += "Celkový čas hry: " + formatTime(getPlayedTime()) + "\n";
  result += "Zbývající čas: " + formatTime(timeLeft) + "\n";
  result += "Chybné pokusy celkem: " + getTotalErrors() + "\n\n";

  stats.forEach(function (item) {
    result += "Úkol " + item.number + ": ";
    result += formatTime(item.duration);
    result += ", chyby: " + item.errors;
    result += ", stav: " + (item.completed ? "splněno" : "nesplněno");
    result += "\n";
  });

  return result;
}

function showResults(status) {
  const playersText = teamData.players.length > 0
    ? teamData.players.join(", ")
    : "neuvedeno";

  let tableRows = "";

  stats.forEach(function (item) {
    tableRows += `
      <tr>
        <td>Úkol ${item.number}</td>
        <td>${formatTime(item.duration)}</td>
        <td>${item.errors}</td>
        <td>${item.completed ? "splněno" : "nesplněno"}</td>
      </tr>
    `;
  });

  resultBox.innerHTML = `
    <h2>Závěrečný protokol</h2>

    <div class="result-summary">
      <strong>Stav:</strong> ${status}<br>
      <strong>Tým:</strong> ${teamData.teamName}<br>
      <strong>Hráči:</strong> ${playersText}<br>
      <strong>Celkový čas hry:</strong> ${formatTime(getPlayedTime())}<br>
      <strong>Zbývající čas:</strong> ${formatTime(timeLeft)}<br>
      <strong>Chybné pokusy celkem:</strong> ${getTotalErrors()}
    </div>

    <table class="result-table">
      <thead>
        <tr>
          <th>Úkol</th>
          <th>Čas řešení</th>
          <th>Chyby</th>
          <th>Stav</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;

  resultBox.classList.remove("hidden");
  resultButtons.classList.remove("hidden");

  const resultText = createResultText(status);

  copyButton.onclick = function () {
    navigator.clipboard.writeText(resultText).then(function () {
      copyButton.textContent = "Výsledek zkopírován";
      setTimeout(function () {
        copyButton.textContent = "Zkopírovat výsledek";
      }, 2000);
    });
  };

  emailButton.onclick = function () {
    const subject = "Výsledek únikové hry – " + teamData.teamName;
    const mailtoLink =
      "mailto:" + encodeURIComponent(teacherEmail) +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(resultText);

    window.location.href = mailtoLink;
  };
}

startButton.addEventListener("click", startGame);

checkButton.addEventListener("click", checkCode);

codeInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkCode();
  }
});

restartButton.addEventListener("click", showIntro);

showIntro();