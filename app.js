document.addEventListener("DOMContentLoaded", () => {
    let spirits = [];
    let draftPool = [];
    let draftResults = [];
    let currentPlayer = 0;
    let playerCount = 3;
    let cardsPerDraft = 3;
    
    fetch('spirits.json')
        .then(response => response.json())
        .then(data => {
            spirits = data;
            draftPool = [...spirits];
        });

    function startDraft() {
        playerCount = parseInt(document.getElementById("playerCount").value);
        cardsPerDraft = parseInt(document.getElementById("cardsPerDraft").value);
        draftResults = Array(playerCount).fill(null);
        currentPlayer = 0;
        showDraftOptions();
        document.getElementById("setup").style.display = "none";
        document.getElementById("draft").style.display = "block";
    }
    
    function showDraftOptions() {
        if (currentPlayer >= playerCount) {
            showResults();
            return;
        }

        document.getElementById("currentPlayer").innerText = `Player ${currentPlayer + 1}, choose a spirit:`;
        document.getElementById("spiritOptions").innerHTML = "";
        document.getElementById("previousPicksList").innerHTML = draftResults
            .map((pick, index) => pick ? `<li>Player ${index + 1}: ${pick}</li>` : "")
            .join("");
        
        shuffleArray(draftPool);
        let options = draftPool.slice(0, cardsPerDraft);
        options.forEach(spirit => {
            let btn = document.createElement("button");
            btn.innerText = spirit;
            btn.onclick = () => selectSpirit(spirit, options);
            document.getElementById("spiritOptions").appendChild(btn);
        });
    }
    
    function selectSpirit(spirit, options) {
        draftResults[currentPlayer] = spirit;
        draftPool = draftPool.filter(s => !options.includes(s) || s === spirit);
        currentPlayer++;
        showDraftOptions();
    }
    
    function showResults() {
        document.getElementById("draft").style.display = "none";
        document.getElementById("results").style.display = "block";
        document.getElementById("draftResults").innerHTML = draftResults
            .map((pick, index) => `<li>Player ${index + 1}: ${pick}</li>`)
            .join("");
    }
    
    function restartDraft() {
        document.getElementById("setup").style.display = "block";
        document.getElementById("draft").style.display = "none";
        document.getElementById("results").style.display = "none";
        draftPool = [...spirits];
    }
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    window.startDraft = startDraft;
    window.restartDraft = restartDraft;
});
