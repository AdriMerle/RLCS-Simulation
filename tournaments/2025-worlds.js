// --- TEAMS & MATCHES ---
const playInMatches = [
  ["MIBR", "Gen.G Mobil1 Racing"],
  ["ROC Esports", "FUT Esports"],
  ["Shopify Rebellion", "Virtus.pro"],
  ["Ninjas in Pyjamas", "TSM"]
];

const seeding = [
  'Gen.G Mobil1 Racing',
  'Virtus.pro',
  'TSM',
  'FUT Esports',
  'ROC Esports',
  'Ninjas in Pyjamas',
  'Shopify Rebellion',
  'MIBR'
];

const group1Base = [
  "Karmine Corp",
  "The Ultimates",
  "Dignitas",
  "Wildcard",
  "Geekay Esports",
  "FURIA",
  "Play-In - Seed #1",
  "Play-In - Seed #4"
];

const group2Base = [
  "Team Falcons",
  "Spacestation",
  "NRG",
  "Team Secret",
  "Team Vitality",
  "Twisted Minds",
  "Play-In - Seed #2",
  "Play-In - Seed #3"
];

const app = document.getElementById("app");

let init = true;

// --- RENDERING HELPERS ---
function render() {
  app.innerHTML = "";

  if (init) {
    createMatches();
  }

  renderMatch();
}


let matchesReadyToPlay = [];
let matchesWaitingForResult = [];
let matchesFinished = [];

let currentMatch = null;

// Match Template :
let match = {
  id: null,
  teams: [],
  winner: null,
  nextMatchForWinnerID: null,
  nextMatchForLoserID: null
};

// ID Guide
// Stage : I = Play-in, A/B = Group stage A or B, P = Playoffs
// Bracket : U = Upper, L = Lower
// Match IDs : QF = Qualifier Final, SF = Semi Final, R = Round 1 (playoffs only)
// Q = the team is qualified for next stage
// / = the team is eliminated
function createMatches() {
  init = false;
  matchesReadyToPlay = [
    {
      id: "IUQF1",
      teams: ["MIBR", "Gen.G Mobil1 Racing"],
      winner: null,
      nextMatchForWinnerID: "IUSF1",
      nextMatchForLoserID: "ILQF1"
    },
    {
      id: "IUQF2",
      teams: ["ROC Esports", "FUT Esports"],
      winner: null,
      nextMatchForWinnerID: "IUSF1",
      nextMatchForLoserID: "ILQF1"
    },
    {
      id: "IUQF3",
      teams: ["Shopify Rebellion", "Virtus.pro"],
      winner: null,
      nextMatchForWinnerID: "IUSF2",
      nextMatchForLoserID: "ILQF2"
    },
    {
      id: "IUQF4",
      teams: ["Ninjas in Pyjamas", "TSM"],
      winner: null,
      nextMatchForWinnerID: "IUSF2",
      nextMatchForLoserID: "ILQF2"
    }
  ];

  matchesWaitingForResult = [
    // PLAY-IN
    {
      id : "IUSF1",
      teams: [],
      nextMatchForWinnerID: "Q",
      nextMatchForLoserID: "ILSF2"
    },
    {
      id : "IUSF2",
      teams: [],
      nextMatchForWinnerID: "Q",
      nextMatchForLoserID: "ILSF1"
    },
    {
      id : "ILQF1",
      teams: [],
      nextMatchForWinnerID: "ILSF1",
      nextMatchForLoserID: "/"
    },
    {
      id : "ILQF2",
      teams: [],
      nextMatchForWinnerID: "ILSF2",
      nextMatchForLoserID: "/"
    },
    {
      id : "ILSF1",
      teams: [],
      nextMatchForWinnerID: "Q",
      nextMatchForLoserID: "/"
    },
    {
      id : "ILSF2",
      teams: [],
      nextMatchForWinnerID: "Q",
      nextMatchForLoserID: "/"
    },

    // GROUP A
    {
      "id" : "AUQF1",
      teams: ["Karmine Corp", "Play-In - Seed #4"],
      nextMatchForWinnerID: "AUSF1",
      nextMatchForLoserID: "ALQF1"
    },
    {
      id : "AUQF2",
      teams: ["The Ultimates", "Geekay Esports"],
      nextMatchForWinnerID: "AUSF1",
      nextMatchForLoserID: "ALQF1"
    },
    {
      id : "AUQF3",
      teams: ["Dignitas", "Play-In - Seed #1"],
      nextMatchForWinnerID: "AUSF2",
      nextMatchForLoserID: "ALQF2"
    },
    {
      id : "AUQF4",
      teams: ["Wildcard", "FURIA"],
      nextMatchForWinnerID: "AUSF2",
      nextMatchForLoserID: "ALQF2"
    },
    {
      "id" : "ALQF1",
      teams: [],
      nextMatchForWinnerID: "ALSF1",
      nextMatchForLoserID: "/"
    },
    {
      "id" : "ALQF2",
      teams: [],
      nextMatchForWinnerID: "ALSF2",
      nextMatchForLoserID: "/"
    },

    {
      "id" : "AUSF1",
      teams: [],
      nextMatchForWinnerID: "Q",
      nextMatchForLoserID: "ALSF2"
    },
    {
      "id" : "AUSF2",
      teams: [],
      nextMatchForWinnerID: "Q",
      nextMatchForLoserID: "ALSF1"
    },
    {
      "id" : "ALSF1",
      teams: [],
      nextMatchForWinnerID: "Q",
      nextMatchForLoserID: "/"
    },
    {
      "id" : "ALSF2",
      teams: [],
      nextMatchForWinnerID: "Q",
      nextMatchForLoserID: "/"
    },

    // GROUP B
    {
      "id" : "BUQF1",
      teams: ["Team Falcons", "Play-In - Seed #3"],
      nextMatchForWinnerID: "BUSF1",
      nextMatchForLoserID: "BLQF1"
    },
    {
      "id" : "BUQF2",
      teams: ["Spacestation Gaming", "Vitality"],
      nextMatchForWinnerID: "BUSF1",
      nextMatchForLoserID: "BLQF1"
    },
    {
      "id" : "BUQF3",
      teams: ["NRG", "Play-In - Seed #2"],
      nextMatchForWinnerID: "BUSF2",
      nextMatchForLoserID: "BLQF2"
    },
    {
      "id" : "BUQF4",
      teams: ["Team Secret", "Twisted Minds"],
      nextMatchForWinnerID: "BUSF2",
      nextMatchForLoserID: "BLQF2"
    },
    {
      "id" : "BLQF1",
      teams: [],
      nextMatchForWinnerID: "BLSF1",
      nextMatchForLoserID: "/"
    },
    {
      "id" : "BLQF2",
      teams: [],
      nextMatchForWinnerID: "BLSF2",
      nextMatchForLoserID: "/"
    },

    {
      "id" : "BUSF1",
      teams: [],
      nextMatchForWinnerID: "Q",
      nextMatchForLoserID: "BLSF2"
    },
    {
      "id" : "BUSF2",
      teams: [],
      nextMatchForWinnerID: "Q",
      nextMatchForLoserID: "BLSF1"
    },
    {
      "id" : "BLSF1",
      teams: [],
      nextMatchForWinnerID: "Q",
      nextMatchForLoserID: "/"
    },
    {
      "id" : "BLSF2",
      teams: [],
      nextMatchForWinnerID: "Q",
      nextMatchForLoserID: "/"
    },

    // PLAYOFFS
    {
      "id" : "PLR1",
      teams: ["Group - Seed AL1", "Group - Seed BL2"],
      nextMatchForWinnerID: "PLQF1",
      nextMatchForLoserID: "/",
    },
    {
      "id" : "PLR2",
      teams: ["Group - Seed BL1", "Group - Seed AL2"],
      nextMatchForWinnerID: "PLQF2",
      nextMatchForLoserID: "/"
    },
    {
      "id" : "PUQF1",
      teams: ["Group - Seed AU1", "Group - Seed BU2"],
      nextMatchForWinnerID: "PSF2",
      nextMatchForLoserID: "PLQF1"
    },
    {
      "id" : "PUQF2",
      teams: ["Group - Seed AU2", "Group - Seed BU1"],
      nextMatchForWinnerID: "PSF1",
      nextMatchForLoserID: "PLQF2"
    },
    {
      "id" : "PLQF1",
      teams: [],
      nextMatchForWinnerID: "PSF1",
      nextMatchForLoserID: "/"
    },
    {
      "id" : "PLQF2",
      teams: [],
      nextMatchForWinnerID: "PSF2",
      nextMatchForLoserID: "/"
    },
    {
      "id" : "PSF1",
      teams: [],
      nextMatchForWinnerID: "PF",
      nextMatchForLoserID: "/"
    },
    {
      "id" : "PSF2",
      teams: [],
      nextMatchForWinnerID: "PF",
      nextMatchForLoserID: "/"
    },
    {
      "id" : "PF",
      teams: [],
      nextMatchForWinnerID: "W",
      nextMatchForLoserID: "/"
    }
  ];
}

let matchCount = 0;

let stage = "play-in";

let qualifiedTeams = {
  I: [], // Play-in upper
  AU: [], // Group A upper
  AL: [], // Group A lower
  BU: [], // Group B upper
  BL: []  // Group B lower
}

function renderMatch() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  if (playInFinished() && stage === "play-in") {
    // All Play-In slots filled → move to Group Stage
    prepareGroupStage();
    stage = "group";
    render();
    return;
  } else if (groupStageFinished() && stage === "group") {
    // All Group Stage matches finished → move to Playoffs
    preparePlayoffs();
    stage = "playoffs";
    render();
    return;
  } else if (matchesReadyToPlay.length === 0) {
    app.innerHTML = "<h2>Tournament finished!</h2>";
    return;
  }

  // Take a random ready match
  // const match = matchesReadyToPlay[Math.floor(Math.random() * matchesReadyToPlay.length)];
  const match = matchesReadyToPlay[0];
  const div = document.createElement("div");
  div.className = "match-card";
  div.innerHTML = `<h2>Who wins ?</h2>`;
  
  match.teams.forEach((team, i) => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = team;
    btn.onclick = () => handleResult(team);
    div.appendChild(btn);
  });

  app.appendChild(div);
}

function handleResult(winner) {
  const match = matchesReadyToPlay.find(m => m.teams.includes(winner));
  const loser = match.teams.find(t => t !== winner);

  match.winner = winner;

  // Handle winner
  if (match.nextMatchForWinnerID === "W") {
    document.getElementById('winner-title').style.display = 'block';
    document.getElementById('winner-name').textContent = winner;
  } else if (match.nextMatchForWinnerID !== "Q") {
    const nextMatch = matchesWaitingForResult.find(m => m.id === match.nextMatchForWinnerID);
    nextMatch.teams.push(winner);
  } else {
    let bracket = match.id.charAt(0) === "I" ? match.id.charAt(0) : match.id.slice(0,2);
    qualifiedTeams[`${bracket}`].push(winner);
  }

  // Handle loser
  if (match.nextMatchForLoserID === "/") {
    // TODO : Update a ranking for all the losers
  } else {
    const nextMatch = matchesWaitingForResult.find(m => m.id === match.nextMatchForLoserID);
    nextMatch.teams.push(loser);
  }

  // Put the finished match in the corresponding list and remove it from the waiting list
  matchesFinished.push(match);
  matchesReadyToPlay = matchesReadyToPlay.filter(m => m !== match);

  // Put all newly ready matches in the ready list and remove them from the waiting list
  addReadyMatchesToReadyList();

  renderMatch();
}

// Add all matches that are ready to play to the ready list
function addReadyMatchesToReadyList() {
  for (let i = matchesWaitingForResult.length - 1; i >= 0; i--) { // Loop backwards to not shift the index when removing an element
    const m = matchesWaitingForResult[i];
    if (m.teams.length === 2 && !m.teams.some(team => typeof team === 'string' && team.toLowerCase().includes('seed'))) {
      matchesReadyToPlay.push(m);
      matchesWaitingForResult.splice(i, 1);
    }
  }
}

function prepareGroupStage() {
  seedQualifiedTeams();

  matchesWaitingForResult.forEach(match => {
    if (match.teams.some(team => typeof team === 'string' && team.toLowerCase().includes('play-in - seed'))) {
      match.teams.forEach((team, i) => {
        if (typeof team === 'string' && team.toLowerCase().includes("seed")) {
          match.teams[i] = qualifiedTeams.I[team.charAt(team.length - 1) - 1];
        }
      });
    }
  });

  addReadyMatchesToReadyList();
}

function preparePlayoffs() {
  seedQualifiedTeams();

  matchesWaitingForResult.forEach(match => {
    if (match.teams.some(team => typeof team === 'string' && team.toLowerCase().includes('group - seed'))) {
      match.teams.forEach((team, i) => {
        if (typeof team === 'string' && team.toLowerCase().includes("seed")) {
          const bracket = team.charAt(team.length - 3) + team.charAt(team.length - 2); // A or B & U or L
          match.teams[i] = qualifiedTeams[bracket][team.charAt(team.length - 1) - 1];
        }
      });
    }
  });

  addReadyMatchesToReadyList();
}

function seedQualifiedTeams() {
  // For each bracket, sort the teams by their index in the seeding array (lowest index = highest seed)
  Object.keys(qualifiedTeams).forEach(bracket => {
    qualifiedTeams[bracket].sort((a, b) => {
      return seeding.indexOf(a) - seeding.indexOf(b);
    });
  });
}

function playInFinished() {
  return qualifiedTeams.I.length === 4;
}

function groupStageFinished() {
  return qualifiedTeams.AU.length === 2 && qualifiedTeams.AL.length === 2 && qualifiedTeams.BU.length === 2 && qualifiedTeams.BL.length === 2;
}

// --- START ---
render();


// Helper functions

// Find all teams remaining by using matchesReadyToPlay and matchesWaitingForResult
function findAllRemainingTeams() {
  const remainingTeams = new Set();

  matchesReadyToPlay.forEach(match => {
    match.teams.forEach(team => remainingTeams.add(team));
  });

  matchesWaitingForResult.forEach(match => {
    match.teams.forEach(team => remainingTeams.add(team));
  });

  return Array.from(remainingTeams);
}

// Find the match in which a team is
function findMatchByTeam(teamName) {
  return matchesReadyToPlay.find(match => match.teams.includes(teamName)) ||
         matchesWaitingForResult.find(match => match.teams.includes(teamName));
}