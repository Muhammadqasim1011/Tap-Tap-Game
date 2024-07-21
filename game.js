// Initialize game variables from local storage or default values
let coins = parseFloat(localStorage.getItem('coins')) || 0;
let tapIncome = parseInt(localStorage.getItem('tapIncome')) || 1;
let tapCount = parseInt(localStorage.getItem('tapCount')) || 0;
let maxTaps = parseFloat(localStorage.getItem('maxTaps')) || 1000;
let hourlyIncome = parseFloat(localStorage.getItem('hourlyIncome')) || 0;
let upgradeTapIncomeCost = parseFloat(localStorage.getItem('upgradeTapIncomeCost')) || 10;
let upgradeHourlyIncomeCost = parseFloat(localStorage.getItem('upgradeHourlyIncomeCost')) || 20;

// Function to update the UI elements with the current values
const updateUI = () => {
    document.getElementById('coin-balance').textContent = coins.toFixed(2);
    document.getElementById('tap-count').textContent = tapCount;
    document.getElementById('tap-income').textContent = tapIncome.toFixed(2);
    document.getElementById('hourly-income').textContent = hourlyIncome.toFixed(2);
    document.getElementById('max-taps').textContent = maxTaps.toFixed(2);
    document.getElementById('upgrade-tap-income-cost').textContent = upgradeTapIncomeCost.toFixed(2);
    document.getElementById('upgrade-hourly-income-cost').textContent = upgradeHourlyIncomeCost.toFixed(2);
};

// Function to save the game state to local storage
const saveGame = () => {
    localStorage.setItem('coins', coins.toFixed(2));
    localStorage.setItem('tapIncome', tapIncome);
    localStorage.setItem('tapCount', tapCount);
    localStorage.setItem('maxTaps', maxTaps.toFixed(2));
    localStorage.setItem('hourlyIncome', hourlyIncome.toFixed(2));
    localStorage.setItem('upgradeTapIncomeCost', upgradeTapIncomeCost.toFixed(2));
    localStorage.setItem('upgradeHourlyIncomeCost', upgradeHourlyIncomeCost.toFixed(2));
};

// Event listener for tapping the tap area
document.getElementById('tap-area').addEventListener('click', function() {
    if (maxTaps > 0) {
        tapCount++;
        coins += tapIncome;
        maxTaps = Math.max(maxTaps - 1, 0); // Ensure maxTaps doesn't go below 0
        updateUI();
        saveGame();
    } else {
        alert('No more taps left. Wait for refill.');
    }
});

// Event listener for upgrading tap income
document.getElementById('upgrade-tap-income').addEventListener('click', function() {
    if (coins >= upgradeTapIncomeCost) {
        coins -= upgradeTapIncomeCost;
        tapIncome = tapIncome * 1.2;
        upgradeTapIncomeCost = upgradeTapIncomeCost * 1.3;
        updateUI();
        saveGame();
    } else {
        alert('Not enough coins to upgrade.');
    }
});

// Event listener for upgrading hourly income
document.getElementById('upgrade-hourly-income').addEventListener('click', function() {
    if (coins >= upgradeHourlyIncomeCost) {
        coins -= upgradeHourlyIncomeCost;
        hourlyIncome = hourlyIncome * 1.2 + 1;
        upgradeHourlyIncomeCost = upgradeHourlyIncomeCost * 1.3;
        updateUI();
        saveGame();
    } else {
        alert('Not enough coins to upgrade.');
    }
});

// Refill taps and add hourly income every second
setInterval(() => {
    if (maxTaps < 1000) {
        maxTaps = Math.min(1000, maxTaps + 0.27); // Increment maxTaps by 0.27 every second
    }
    coins += hourlyIncome / 3600; // Add hourly income divided by 3600 every second
    updateUI();
    saveGame();
}, 1000); // 1000 ms = 1 second

// Event listener for resetting the game
document.getElementById('reset').addEventListener('click', function() {
    if (confirm('Are you sure you want to reset the game?')) {
        // Clear all data from local storage
        localStorage.clear();

        // Reset all variables to their initial values
        coins = 0;
        tapIncome = 1;
        tapCount = 0;
        maxTaps = 1000;
        hourlyIncome = 0;
        upgradeTapIncomeCost = 10;
        upgradeHourlyIncomeCost = 20;

        // Update the UI to reflect the reset state
        updateUI();

        // Save the reset state
        saveGame();
        location.reload(); // Reload the page to reset all variables and UI

    }
});

// Initial UI update
updateUI();
