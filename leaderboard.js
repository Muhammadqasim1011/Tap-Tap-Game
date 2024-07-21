// Placeholder for leaderboard logic
function updateLeaderboard() {
    // Fetch leaderboard data and update the list
    const leaderboard = [
        { username: 'Player1', coins: 100 },
        { username: 'Player2', coins: 90 },
        // more players
    ];

    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';

    leaderboard.forEach(player => {
        const li = document.createElement('li');
        li.textContent = `${player.username}: ${player.coins} coins`;
        leaderboardList.appendChild(li);
    });
}

updateLeaderboard();
