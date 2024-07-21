document.getElementById('claim-reward').addEventListener('click', function() {
    const now = new Date();
    const lastClaimDate = localStorage.getItem('lastClaimDate');
    
    if (lastClaimDate && new Date(lastClaimDate).toDateString() === now.toDateString()) {
        alert('You have already claimed your reward today.');
        return;
    }
    
    // Example reward
    coins += 10000;
    document.getElementById('coin-balance').textContent = coins;
    localStorage.setItem('lastClaimDate', now.toISOString());
    saveGame();
});
