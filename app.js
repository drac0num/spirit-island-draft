if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
        .then(() => console.log("Service Worker registered successfully"))
        .catch((error) => console.error("Service Worker registration failed:", error));
}

const spirits = [
    "Wachende Augen in den Bäumen", "Unterirdisch lauernde Reißzähne", "Pfeilschneller Blitzschlag", 
    "Lebenskraft der Erde", "Bodenloser Schlamm der Sümpfe", "Sonnengenährter Fluss", 
    "Flackernde Schatten", "Wandelndes Ur-Gedächtnis", "Grinsender Gestaltwandler macht Ärger",
    "Stimme des Donners", "Trotzendes Felsgestein", "Verlockung der tiefsten Wälder", 
    "Wildwucherndes Grün", "Hüter der Verbotenen Wildnis", "Hoch Aufragender Vulkan",
    "Viele bewegen sich als Eines", "Reisszähne im Dickicht", "Bote der Albträume",
    "Nebel des leisen Todes", "Hunger des Ozeans", "Rache in Gestalt brennender Seuche",
    "Sternenlicht sucht Gestalt", "Tagessplitter teilen den Himmel"
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
        const spiritContainer = document.createElement("div");
        spiritContainer.classList.add("spirit-container");
        spiritContainer.onclick = () => selectSpirit(spirit, spiritContainer);

        const spiritImg = document.createElement("img");
        spiritImg.src = `images/${spirit.replace(/\s+/g, "_").toLowerCase()}.jpg`; // Example image path
        spiritImg.alt = spirit;
        spiritImg.classList.add("spirit-image");

        const spiritName = document.createElement("p");
        spiritName.innerText = spirit;

        spiritContainer.appendChild(spiritImg);
        spiritContainer.appendChild(spiritName);
        spiritOptionsDiv.appendChild(spiritContainer);
    });

    document.getElementById("confirmPick").disabled = true;
}

let selectedSpirit = null;
let selectedElement = null;

function selectSpirit(spirit, element) {
    if (selectedElement) {
        selectedElement.classList.remove("selected-spirit");
    }
    selectedSpirit = spirit;
    selectedElement = element;
    selectedElement.classList.add("selected-spirit");
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
