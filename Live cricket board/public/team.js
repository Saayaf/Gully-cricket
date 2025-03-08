// Team data structure
const teams = {
    team1: {
        name: "Team A",
        matchesPlayed: 12,
        wins: 8,
        losses: 4,
        players: [
            { name: "Player 1", matches: 12, runs: 450, wickets: 5, average: 37.5 },
            { name: "Player 2", matches: 12, runs: 320, wickets: 12, average: 26.7 },
            { name: "Player 3", matches: 10, runs: 280, wickets: 8, average: 35.0 }
        ]
    },
    team2: {
        name: "Team B",
        matchesPlayed: 10,
        wins: 6,
        losses: 4,
        players: [
            { name: "Player 4", matches: 10, runs: 380, wickets: 7, average: 31.7 },
            { name: "Player 5", matches: 10, runs: 410, wickets: 10, average: 41.0 },
            { name: "Player 6", matches: 8, runs: 220, wickets: 5, average: 27.5 }
        ]
    },
    team3: {
        name: "Team C",
        matchesPlayed: 8,
        wins: 5,
        losses: 3,
        players: [
            { name: "Player 7", matches: 8, runs: 300, wickets: 9, average: 33.3 },
            { name: "Player 8", matches: 8, runs: 250, wickets: 6, average: 31.3 },
            { name: "Player 9", matches: 6, runs: 180, wickets: 4, average: 30.0 }
        ]
    }
};

// DOM Elements
const teamSelect = document.getElementById('teamSelect');
const matchesPlayed = document.getElementById('matchesPlayed');
const wins = document.getElementById('wins');
const losses = document.getElementById('losses');
const winPercentage = document.getElementById('winPercentage');
const playerStats = document.getElementById('playerStats');

// Event listener for team selection
teamSelect.addEventListener('change', (e) => {
    const selectedTeam = e.target.value;
    if (selectedTeam) {
        updateTeamStats(selectedTeam);
        updatePlayerStats(selectedTeam);
    } else {
        clearStats();
    }
});

// Update team statistics
function updateTeamStats(teamId) {
    const team = teams[teamId];
    matchesPlayed.textContent = team.matchesPlayed;
    wins.textContent = team.wins;
    losses.textContent = team.losses;
    winPercentage.textContent = ((team.wins / team.matchesPlayed) * 100).toFixed(1) + '%';
}

// Update player statistics
function updatePlayerStats(teamId) {
    const team = teams[teamId];
    playerStats.innerHTML = team.players.map(player => `
        <tr>
            <td>${player.name}</td>
            <td>${player.matches}</td>
            <td>${player.runs}</td>
            <td>${player.wickets}</td>
            <td>${player.average}</td>
        </tr>
    `).join('');
}

// Clear statistics when no team is selected
function clearStats() {
    matchesPlayed.textContent = '-';
    wins.textContent = '-';
    losses.textContent = '-';
    winPercentage.textContent = '-';
    playerStats.innerHTML = '';
}

// Initialize
clearStats();
