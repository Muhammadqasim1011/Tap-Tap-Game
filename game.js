// Initialize game variables from local storage or default values
let coins = parseFloat(localStorage.getItem('coins')) || 0;
let tapIncome = parseInt(localStorage.getItem('tapIncome')) || 1;
let tapCount = parseInt(localStorage.getItem('tapCount')) || 0;
let maxTaps = parseFloat(localStorage.getItem('maxTaps')) || 1000;
let hourlyIncome = parseFloat(localStorage.getItem('hourlyIncome')) || 0;
let upgradeTapIncomeCost = parseFloat(localStorage.getItem('upgradeTapIncomeCost')) || 10;
let upgradeHourlyIncomeCost = parseFloat(localStorage.getItem('upgradeHourlyIncomeCost')) || 20;

// Update UI elements with the current values
const updateUI = () => {
    document.getElementById('coin-balance').textContent = coins.toFixed(2);
    document.getElementById('tap-count').textContent = tapCount;
    document.getElementById('tap-income').textContent = tapIncome;
    document.getElementById('hourly-income').textContent = hourlyIncome.toFixed(2);
    document.getElementById('max-taps').textContent = maxTaps.toFixed(2);
    document.getElementById('upgrade-tap-income-cost').textContent = upgradeTapIncomeCost.toFixed(2);
    document.getElementById('upgrade-hourly-income-cost').textContent = upgradeHourlyIncomeCost.toFixed(2);
};

const saveGame = () => {
    localStorage.setItem('coins', coins.toFixed(2));
    localStorage.setItem('tapIncome', tapIncome);
    localStorage.setItem('tapCount', tapCount);
    localStorage.setItem('maxTaps', maxTaps.toFixed(2));
    localStorage.setItem('hourlyIncome', hourlyIncome.toFixed(2));
    localStorage.setItem('upgradeTapIncomeCost', upgradeTapIncomeCost.toFixed(2));
    localStorage.setItem('upgradeHourlyIncomeCost', upgradeHourlyIncomeCost.toFixed(2));
};

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

document.getElementById('upgrade-tap-income').addEventListener('click', function() {
    if (coins >= upgradeTapIncomeCost) {
        coins -= upgradeTapIncomeCost;
        tapIncome = Math.floor(tapIncome * 1.1);
        upgradeTapIncomeCost = Math.floor(upgradeTapIncomeCost * 1.1);
        updateUI();
        saveGame();
    } else {
        alert('Not enough coins to upgrade.');
    }
});

document.getElementById('upgrade-hourly-income').addEventListener('click', function() {
    if (coins >= upgradeHourlyIncomeCost) {
        coins -= upgradeHourlyIncomeCost;
        hourlyIncome = Math.floor(hourlyIncome * 1.1) + 1;
        upgradeHourlyIncomeCost = Math.floor(upgradeHourlyIncomeCost * 1.1);
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

document.getElementById('reset').addEventListener('click', function() {
    if (confirm('Are you sure you want to reset the game?')) {
        localStorage.clear(); // Clear all data in local storage
        location.reload(); // Reload the page to reset all variables and UI
    }
});

// Initial UI update
updateUI();
