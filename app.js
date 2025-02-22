const spirits = [
    "Lightning's Swift Strike", "River Surges in Sunlight", "Vital Strength of the Earth", 
    "Shadows Flicker Like Flame", "Thunderspeaker", "A Spread of Rampant Green", 
    "Ocean’s Hungry Grasp", "Bringer of Dreams and Nightmares", "Serpent Slumbering Beneath the Island"
];

let availableSpirits = [...spirits];
let playerCount = 0;
let cardsPerDraft = 3;
let currentPlayer = 0;
let draftResults = [];

function startDraft() {
    playerCount = parseInt(document.getElementById("playerCount").value);
    cardsPerDraft = parseInt(document.getElementById("cardsPerDraft").value);
    
    if (playerCount < 1 || playerCount > 6) {
        alert("Please enter a valid number of players (1-6).");
        return;
    }

    draftResults = [];
    currentPlayer = 0;
    availableSpirits = [...spirits];

    document.getElementById("setup").style.display = "none";
    document.getElementById("draft").style.display = "block";
    
    nextDraftRound();
}

function nextDraftRound() {
    if (currentPlayer >= playerCount) {
        showResults();
        return;
    }

    document.getElementById("currentPlayer").innerText = `Player ${currentPlayer + 1}, pick a spirit:`;
    const spiritOptionsDiv = document.getElementById("spiritOptions");
    spiritOptionsDiv.innerHTML = "";

    const draftPool = [];
    while (draftPool.length < cardsPerDraft && availableSpirits.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableSpirits.length);
        draftPool.push(availableSpirits.splice(randomIndex, 1)[0]);
    }

    draftPool.forEach(spirit => {
        const button = document.createElement("button");
        button.innerText = spirit;
        button.onclick = () => selectSpirit(spirit);
        spiritOptionsDiv.appendChild(button);
    });

    document.getElementById("confirmPick").disabled = true;
}

let selectedSpirit = null;
function selectSpirit(spirit) {
    selectedSpirit = spirit;
    document.getElementById("confirmPick").disabled = false;
}

function confirmSelection() {
    draftResults.push({ player: currentPlayer + 1, spirit: selectedSpirit });
    currentPlayer++;
    nextDraftRound();
}

function showResults() {
    document.getElementById("draft").style.display = "none";
    document.getElementById("results").style.display = "block";

    const resultsList = document.getElementById("draftResults");
    resultsList.innerHTML = "";

    draftResults.forEach(result => {
        const li = document.createElement("li");
        li.innerText = `Player ${result.player}: ${result.spirit}`;
        resultsList.appendChild(li);
    });
}

function restartDraft() {
    document.getElementById("results").style.display = "none";
    document.getElementById("setup").style.display = "block";
}
