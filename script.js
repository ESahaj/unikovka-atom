/*
  NovaCore Research Labs
  Kompletní funkční skript.

  Správné kódy:
  1. 7204
  2. 8324
  3. 6867
  4. 2489
  5. 1405
  6. 3210

  Každý chybný pokus odečte 3 minuty.
  E-mail příjemce se nikde v kódu neukládá.
  Vyplňuje se až na konci hry.
*/

"use strict";

/* =========================================================
   NASTAVENÍ HRY
   ========================================================= */

const GAME_DURATION_SECONDS = 60 * 60;
const WRONG_CODE_PENALTY_SECONDS = 3 * 60;

/*
  Názvy obrázků můžeš upravit podle své složky "obrazky".
  Když některý obrázek neexistuje, stránka ho automaticky skryje
  a hra bude dál normálně fungovat.
*/
const INTRO_IMAGE = "obrazky/uvod.jpg";

const levels = [
  {
    number: 1,
    badge: "Úroveň 1 z 6",
    title: "První bezpečnostní úroveň",
    code: "7204",
    image: "obrazky/ukol1.jpg",
    text: `
      <p>Červená světla se rozblikají a místností se rozezní varovné pípání. Lekneš se, prudce sebou trhneš a omylem převrhneš kelímek s kávou.</p>
      <p>Káva se rozlije přímo na důležité poznámky ležící na stole. Některá slova jsou pořád čitelná, jiná se úplně rozmazala.</p>
      <p><strong>Doplň chybějící slova a zjisti první čtyřmístný kód.</strong></p>
    `
  },

  {
    number: 2,
    badge: "Úroveň 2 z 6",
    title: "Zásobní lahve",
    code: "8324",
    image: "obrazky/ukol2.jpg",
    text: `
       <p>Alarmy sice na okamžik zeslábly, ale reaktor je stále nestabilní. Červená světla blikají pomaleji, zato pravidelně – jako odpočítávání.</p>
      <p>Všimneš si poličky se zásobními lahvemi. Na každé z nich je název prvku.</p>
      <p><strong>Prozkoumej názvy prvků na lahvích a najdi druhý přístupový kód.</strong></p>
    `
  },

  {
    number: 3,
    badge: "Úroveň 3 z 6",
    title: "Nestabilní chromatogram",
    code: "6867",
    image: "obrazky/ukol3.jpg",
    text: `
      <p>Monitor náhle znovu zabliká. Objeví se záznam z plynového chromatografu. Křivky na obrazovce poskakují, hodnoty se mění a systém stále opakuje:</p>
      <span class="system-message">NESTABILITA ROSTE.</span>
      <p>Teď rozhoduje rychlost, přesnost a schopnost číst mezi řádky… nebo spíš <strong>mezi píky?</strong>.</p>
      <p><strong>Najdi ukryté indicie a získej třetí čtyřmístný kód.</strong></p>
    `
  },

  {
    number: 4,
    badge: "Úroveň 4 z 6",
    title: "Záhadná pohlednice",
    code: "2489",
    image: "obrazky/ukol4.jpg",
    text: `
     <p>Chromatogram se zastaví. Varovné hlášení na okamžik zmizí a v místnosti zavládne napjaté ticho.</p>
      <p>Na nástěnce mezi poznámkami, plánky a starými dokumenty si všimneš pohlednice.</p>
      <p>Jenže v NovaCore Research Labs není obyčejné vůbec nic.</p>
      <p><strong>Prohlédni si pohlednici pozorně. Možná právě ona ukrývá další čtyřmístný kód.</strong></p>
    `
  },

  {
    number: 5,
    badge: "Úroveň 5 z 6",
    title: "Periodická soustava prvků",
    code: "1405",
    image: "obrazky/ukol5.jpg",
    text: `
     <p>Ani po zadání čtvrtého kódu se reaktor nestabilizoval. Systém se znovu otřese a na obrazovce se objeví periodická soustava prvků.</p>
      <p>Známá. Přehledná. Bezbarvá.</p>
      <p>Jenže při bližším pohledu zjistíš, že něco není v pořádku. Některé značky prvků vypadají podezřele a v tabulce problikávají červená políčka.</p>
      <p><strong>Prozkoumej periodickou soustavu a zjisti pátý čtyřmístný kód.</strong></p>
    `
  },

  {
    number: 6,
    badge: "Úroveň 6 z 6",
    title: "Finální stabilizační sekvence",
    code: "3210",
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

const introText = `
  <p>
    Vítej v <strong>NovaCore Research Labs</strong> – jednom
    z nejutajenějších a nejmodernějších výzkumných center na světě.
  </p>

  <p>
    Dnes jsi tady proto, že chceš nastoupit jako nový člen expertního
    týmu. Inženýr Josef Barnabáš Tě právě provádí řídicím střediskem.
    Kolem sebe vidíš množství monitorů, blikajících světel a slyšíš
    tlumené hučení počítačů…
  </p>

  <p><strong>Pak to ale přijde!</strong></p>

  <p>
    Senzory náhle zaznamenají neobvyklou nestabilitu v reaktoru.
    Alarmy se spustí jeden po druhém a rozsvítí se všechna červená
    kontrolní světla.
  </p>

  <span class="system-message">
    REAKTOR NYNÍ PŘECHÁZÍ DO KRITICKÉ FÁZE
  </span>

  <p>
    Jediný způsob, jak systém restartovat a reaktor zachránit,
    je znovu nadefinovat šest čtyřmístných přístupových kódů.
  </p>

  <p>
    Každý chybný kód odečte <strong>3 minuty</strong>.
    Na celou misi máš <strong>60 minut</strong>.
  </p>

  <p>
    Dokážeš laboratoř zachránit dřív, než dojde ke katastrofě?
  </p>
`;

/* =========================================================
   PRVKY STRÁNKY
   ========================================================= */

const levelBadge = document.getElementById("levelBadge");
const timerBox = document.getElementById("timerBox");
const timerElement = document.getElementById("timer");
const titleElement = document.getElementById("title");

const speakerButton = document.getElementById("speakerButton");
const speakerStatus = document.getElementById("speakerStatus");

const imageBox = document.getElementById("imageBox");
const levelImage = document.getElementById("levelImage");
const textElement = document.getElementById("text");

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

const resultBox = document.getElementById("resultBox");
const resultButtons = document.getElementById("resultButtons");
const recipientEmail = document.getElementById("recipientEmail");
const resultActionMessage = document.getElementById("resultActionMessage");
const copyButton = document.getElementById("copyButton");
const emailButton = document.getElementById("emailButton");
const restartButton = document.getElementById("restartButton");

/* =========================================================
   STAV HRY
   ========================================================= */

let currentLevelIndex = -1;
let secondsRemaining = GAME_DURATION_SECONDS;
let timerInterval = null;
let gameStartedAtMs = null;
let levelStartedAtMs = null;
let gameFinished = false;

let teamData = {
  name: "",
  players: []
};

const stats = levels.map((level) => ({
  level: level.number,
  title: level.title,
  errors: 0,
  timeSeconds: 0,
  solved: false
}));

/* =========================================================
   POMOCNÉ FUNKCE
   ========================================================= */

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function stripHtml(html) {
  const temporaryElement = document.createElement("div");
  temporaryElement.innerHTML = html;
  return temporaryElement.textContent
    .replace(/\s+/g, " ")
    .trim();
}

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatDurationWords(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  if (minutes === 0) {
    return `${seconds} s`;
  }

  return `${minutes} min ${seconds} s`;
}

function setMessage(element, text, type = "") {
  element.textContent = text;
  element.className = "message";

  if (type) {
    element.classList.add(type);
  }
}

function updateTimerDisplay() {
  timerElement.textContent = formatTime(secondsRemaining);

  timerBox.classList.remove("warning", "danger");

  if (secondsRemaining <= 5 * 60) {
    timerBox.classList.add("danger");
  } else if (secondsRemaining <= 15 * 60) {
    timerBox.classList.add("warning");
  }
}

function setImage(source, alternativeText) {
  levelImage.onerror = null;

  if (!source) {
    levelImage.removeAttribute("src");
    imageBox.classList.add("hidden");
    return;
  }

  levelImage.alt = alternativeText;
  levelImage.src = source;

  imageBox.classList.remove("hidden");

  levelImage.onerror = () => {
    imageBox.classList.add("hidden");
  };
}

function scrollToTopOfCard() {
  document.querySelector(".card").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

/* =========================================================
   ÚVOD A SPUŠTĚNÍ
   ========================================================= */

function showIntro() {
  levelBadge.textContent = "Start mise";
  titleElement.textContent = "NovaCore Research Labs";
  textElement.innerHTML = introText;

  setImage(INTRO_IMAGE, "NovaCore Research Labs");

  teamForm.classList.remove("hidden");
  startButton.classList.remove("hidden");

  codeBox.classList.add("hidden");
  resultBox.classList.add("hidden");
  resultButtons.classList.add("hidden");
  restartButton.classList.add("hidden");

  updateTimerDisplay();
}

function readTeamData() {
  const teamName = teamNameInput.value.trim();
  const players = playerInputs
    .map((input) => input.value.trim())
    .filter(Boolean);

  if (!teamName) {
    setMessage(formMessage, "Vyplň název týmu.", "error");
    teamNameInput.focus();
    return null;
  }

  if (players.length === 0) {
    setMessage(
      formMessage,
      "Vyplň alespoň jedno jméno hráče.",
      "error"
    );
    playerInputs[0].focus();
    return null;
  }

  return {
    name: teamName,
    players
  };
}

function startGame() {
  if (timerInterval || gameFinished) {
    return;
  }

  const enteredTeamData = readTeamData();

  if (!enteredTeamData) {
    return;
  }

  teamData = enteredTeamData;
  setMessage(formMessage, "");

  teamForm.classList.add("hidden");
  startButton.classList.add("hidden");

  secondsRemaining = GAME_DURATION_SECONDS;
  gameStartedAtMs = Date.now();
  gameFinished = false;

  timerInterval = window.setInterval(() => {
    secondsRemaining -= 1;
    updateTimerDisplay();

    if (secondsRemaining <= 0) {
      secondsRemaining = 0;
      updateTimerDisplay();
      finishGame(false);
    }
  }, 1000);

  showLevel(0);
}

/* =========================================================
   ÚROVNĚ A KÓDY
   ========================================================= */

function showLevel(index) {
  stopSpeaking();

  currentLevelIndex = index;
  levelStartedAtMs = Date.now();

  const level = levels[currentLevelIndex];

  levelBadge.textContent = level.badge;
  titleElement.textContent = level.title;
  textElement.innerHTML = level.text;

  setImage(
    level.image,
    `Obrázek k úrovni ${level.number}`
  );

  codeInput.value = "";
  checkButton.disabled = false;
  codeInput.disabled = false;

  setMessage(message, "");

  codeBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  resultButtons.classList.add("hidden");
  restartButton.classList.add("hidden");

  window.setTimeout(() => codeInput.focus(), 100);
  scrollToTopOfCard();
}

function recordCurrentLevelTime() {
  if (currentLevelIndex < 0 || !levelStartedAtMs) {
    return;
  }

  const elapsedSeconds = Math.max(
    0,
    Math.round((Date.now() - levelStartedAtMs) / 1000)
  );

  stats[currentLevelIndex].timeSeconds += elapsedSeconds;
  levelStartedAtMs = null;
}

function checkCode() {
  if (
    gameFinished ||
    currentLevelIndex < 0 ||
    currentLevelIndex >= levels.length
  ) {
    return;
  }

  const enteredCode = codeInput.value.replace(/\D/g, "");
  codeInput.value = enteredCode;

  if (enteredCode.length !== 4) {
    setMessage(
      message,
      "Kód musí obsahovat přesně čtyři číslice.",
      "error"
    );
    codeInput.focus();
    return;
  }

  const level = levels[currentLevelIndex];

  if (enteredCode === level.code) {
    recordCurrentLevelTime();

    stats[currentLevelIndex].solved = true;

    setMessage(
      message,
      "Správný kód. Bezpečnostní úroveň byla odemčena.",
      "ok"
    );

    checkButton.disabled = true;
    codeInput.disabled = true;

    window.setTimeout(() => {
      if (currentLevelIndex === levels.length - 1) {
        finishGame(true);
      } else {
        showLevel(currentLevelIndex + 1);
      }
    }, 900);

    return;
  }

  stats[currentLevelIndex].errors += 1;

  secondsRemaining = Math.max(
    0,
    secondsRemaining - WRONG_CODE_PENALTY_SECONDS
  );

  updateTimerDisplay();

  setMessage(
    message,
    "Nesprávný kód. Systém odečetl 3 minuty.",
    "error"
  );

  codeInput.select();

  if (secondsRemaining <= 0) {
    finishGame(false);
  }
}

/* =========================================================
   VÝSLEDKY
   ========================================================= */

function getTotalErrors() {
  return stats.reduce((sum, item) => sum + item.errors, 0);
}

function getPlayedSeconds() {
  if (!gameStartedAtMs) {
    return 0;
  }

  return Math.max(
    0,
    Math.round((Date.now() - gameStartedAtMs) / 1000)
  );
}

function buildResultRows() {
  return stats.map((item) => {
    const status = item.solved ? "Splněno" : "Nesplněno";

    return `
      <tr>
        <td>${item.level}</td>
        <td>${escapeHtml(item.title)}</td>
        <td>${formatDurationWords(item.timeSeconds)}</td>
        <td>${item.errors}</td>
        <td>${status}</td>
      </tr>
    `;
  }).join("");
}

function createResultText(success) {
  const resultState = success
    ? "REAKTOR STABILIZOVÁN"
    : "MISE NEDOKONČENA";

  const lines = [
    "NovaCore Research Labs – výsledek únikové hry",
    "",
    `Výsledek: ${resultState}`,
    `Tým: ${teamData.name}`,
    `Hráči: ${teamData.players.join(", ")}`,
    `Skutečná délka hry: ${formatDurationWords(getPlayedSeconds())}`,
    `Čas zbývající na odpočtu: ${formatTime(secondsRemaining)}`,
    `Celkový počet chybných kódů: ${getTotalErrors()}`,
    "",
    "Jednotlivé úrovně:"
  ];

  stats.forEach((item) => {
    lines.push(
      `${item.level}. ${item.title} – ` +
      `čas ${formatDurationWords(item.timeSeconds)}, ` +
      `chyby ${item.errors}, ` +
      `${item.solved ? "splněno" : "nesplněno"}`
    );
  });

  return lines.join("\n");
}

function finishGame(success) {
  if (gameFinished) {
    return;
  }

  gameFinished = true;

  if (timerInterval) {
    window.clearInterval(timerInterval);
    timerInterval = null;
  }

  stopSpeaking();
  recordCurrentLevelTime();

  codeBox.classList.add("hidden");
  imageBox.classList.add("hidden");

  levelBadge.textContent = success
    ? "Mise splněna"
    : "Konec mise";

  titleElement.textContent = success
    ? "Reaktor je zachráněn!"
    : "Čas vypršel";

  textElement.innerHTML = success
    ? `
      <p>
        Jakmile zadáš poslední čtyřmístný kód, alarmy okamžitě utichnou.
        Červená světla pohasnou a hodnoty reaktoru se postupně vracejí
        do zelených zón.
      </p>

      <span class="system-message">
        STABILIZACE DOKONČENA – NOUZOVÝ REŽIM UKONČEN
      </span>

      <p>
        Reaktor je zachráněn. A Ty už víš, že tohle nebyl obyčejný
        pracovní pohovor!
      </p>

      <p><strong>Vítej v NovaCore Research Labs :-)</strong></p>
    `
    : `
      <span class="system-message">
        KRITICKÝ ČASOVÝ LIMIT BYL VYČERPÁN
      </span>

      <p>
        Mise tentokrát nebyla dokončena. Výsledek si přesto můžeš
        zkopírovat nebo odeslat e-mailem.
      </p>
    `;

  const teamName = escapeHtml(teamData.name);
  const players = escapeHtml(teamData.players.join(", "));
  const totalErrors = getTotalErrors();

  resultBox.innerHTML = `
    <div class="result-summary">
      <strong>Tým:</strong> ${teamName}<br>
      <strong>Hráči:</strong> ${players}<br>
      <strong>Skutečná délka hry:</strong>
      ${formatDurationWords(getPlayedSeconds())}<br>
      <strong>Zbývající čas:</strong> ${formatTime(secondsRemaining)}<br>
      <strong>Celkový počet chybných kódů:</strong> ${totalErrors}
    </div>

    <div class="result-table-wrap">
      <table class="result-table">
        <thead>
          <tr>
            <th>Úroveň</th>
            <th>Úkol</th>
            <th>Čas řešení</th>
            <th>Chyby</th>
            <th>Stav</th>
          </tr>
        </thead>

        <tbody>
          ${buildResultRows()}
        </tbody>
      </table>
    </div>
  `;

  resultBox.dataset.resultSuccess = String(success);

  resultBox.classList.remove("hidden");
  resultButtons.classList.remove("hidden");
  restartButton.classList.remove("hidden");

  recipientEmail.value = "";
  setMessage(resultActionMessage, "");

  scrollToTopOfCard();
}

/* =========================================================
   KOPÍROVÁNÍ A E-MAIL
   ========================================================= */

async function copyResult() {
  const success = resultBox.dataset.resultSuccess === "true";
  const resultText = createResultText(success);

  try {
    await navigator.clipboard.writeText(resultText);

    setMessage(
      resultActionMessage,
      "Výsledek byl zkopírován.",
      "ok"
    );
  } catch (error) {
    const temporaryTextarea = document.createElement("textarea");
    temporaryTextarea.value = resultText;
    temporaryTextarea.setAttribute("readonly", "");
    temporaryTextarea.style.position = "fixed";
    temporaryTextarea.style.opacity = "0";

    document.body.appendChild(temporaryTextarea);
    temporaryTextarea.select();

    const copied = document.execCommand("copy");
    temporaryTextarea.remove();

    setMessage(
      resultActionMessage,
      copied
        ? "Výsledek byl zkopírován."
        : "Výsledek se nepodařilo zkopírovat.",
      copied ? "ok" : "error"
    );
  }
}

function sendResultByEmail() {
  const recipient = recipientEmail.value.trim();

  setMessage(resultActionMessage, "");

  if (!recipient) {
    setMessage(
      resultActionMessage,
      "Nejprve vyplň e-mailovou adresu příjemce.",
      "error"
    );
    recipientEmail.focus();
    return;
  }

  if (!recipientEmail.checkValidity()) {
    setMessage(
      resultActionMessage,
      "Zadej platnou e-mailovou adresu.",
      "error"
    );
    recipientEmail.focus();
    return;
  }

  const success = resultBox.dataset.resultSuccess === "true";
  const resultText = createResultText(success);

  const subject = encodeURIComponent(
    `Výsledek únikové hry – ${teamData.name}`
  );

  const body = encodeURIComponent(resultText);

  /*
    Adresa příjemce pochází pouze z políčka na konci hry.
    Žádný konkrétní e-mail není uložen ve zdrojovém kódu.
  */
  window.location.href =
    `mailto:${recipient}?subject=${subject}&body=${body}`;
}

/* =========================================================
   HLASOVÉ ČTENÍ
   ========================================================= */

function getAvailableVoices() {
  if (!("speechSynthesis" in window)) {
    return [];
  }

  return window.speechSynthesis.getVoices();
}

function chooseCzechVoice() {
  const voices = getAvailableVoices();

  if (voices.length === 0) {
    return null;
  }

  const czechVoices = voices.filter((voice) =>
    voice.lang.toLowerCase().startsWith("cs")
  );

  const candidates = czechVoices.length > 0
    ? czechVoices
    : voices;

  /*
    Prohlížeče nemají jednotné názvy hlasů.
    Zvýhodníme názvy, které často označují mužské hlasy,
    ale skript zůstane funkční i bez nich.
  */
  const preferredNameParts = [
    "male",
    "muž",
    "daniel",
    "zdenek",
    "zdeněk",
    "jakub",
    "ondrej",
    "ondřej",
    "petr",
    "tomas",
    "tomáš"
  ];

  const preferredVoice = candidates.find((voice) => {
    const lowerName = voice.name.toLowerCase();

    return preferredNameParts.some((part) =>
      lowerName.includes(part)
    );
  });

  return preferredVoice || candidates[0];
}

function stopSpeaking() {
  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  speakerButton.classList.remove("speaking");
  speakerButton.textContent = "poslechni si";
  speakerStatus.textContent = "";
}

function speakCurrentScreen() {
  if (!("speechSynthesis" in window)) {
    setMessage(
      resultActionMessage,
      "Tento prohlížeč hlasové čtení nepodporuje.",
      "error"
    );
    return;
  }

  if (window.speechSynthesis.speaking) {
    stopSpeaking();
    return;
  }

  const spokenText = [
    titleElement.textContent,
    stripHtml(textElement.innerHTML)
  ]
    .filter(Boolean)
    .join(". ");

  if (!spokenText.trim()) {
    speakerStatus.textContent = "Na této obrazovce není co přečíst.";
    return;
  }

  const utterance = new SpeechSynthesisUtterance(spokenText);
  const chosenVoice = chooseCzechVoice();

  if (chosenVoice) {
    utterance.voice = chosenVoice;
    utterance.lang = chosenVoice.lang;
  } else {
    utterance.lang = "cs-CZ";
  }

  /*
    Nižší výška hlasu a lehce pomalejší tempo vytvoří
    tajemnější počítačový dojem. Skutečný zvuk se může lišit
    podle hlasů nainstalovaných v zařízení.
  */
  utterance.pitch = 0.72;
  utterance.rate = 0.88;
  utterance.volume = 1;

  utterance.onstart = () => {
    speakerButton.classList.add("speaking");
    speakerButton.textContent = "zastavit hlas";
    speakerStatus.textContent = "Systém čte zprávu…";
  };

  utterance.onend = () => {
    speakerButton.classList.remove("speaking");
    speakerButton.textContent = "poslechni si";
    speakerStatus.textContent = "";
  };

  utterance.onerror = () => {
    speakerButton.classList.remove("speaking");
    speakerButton.textContent = "poslechni si";
    speakerStatus.textContent =
      "Hlasové čtení se nepodařilo spustit.";
  };

  window.speechSynthesis.speak(utterance);
}

/* =========================================================
   UDÁLOSTI
   ========================================================= */

startButton.addEventListener("click", startGame);
checkButton.addEventListener("click", checkCode);
copyButton.addEventListener("click", copyResult);
emailButton.addEventListener("click", sendResultByEmail);
restartButton.addEventListener("click", () => window.location.reload());
speakerButton.addEventListener("click", speakCurrentScreen);

codeInput.addEventListener("input", () => {
  codeInput.value = codeInput.value
    .replace(/\D/g, "")
    .slice(0, 4);
});

codeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkCode();
  }
});

recipientEmail.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendResultByEmail();
  }
});

window.addEventListener("beforeunload", stopSpeaking);

/*
  Některé prohlížeče načtou seznam hlasů až dodatečně.
  Tímto se seznam připraví, jakmile je dostupný.
*/
if ("speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
} else {
  speakerButton.disabled = true;
  speakerStatus.textContent =
    "Hlasové čtení není v tomto prohlížeči dostupné.";
}

/* První zobrazení stránky */
showIntro();
