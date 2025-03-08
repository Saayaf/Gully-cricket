import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
    cricketApi: {
        baseUrl: process.env.CRICKET_API_URL || 'https://cricket-api.example.com/v1',
        apiKey: process.env.CRICKET_API_KEY || '',
        endpoints: {
            liveScores: '/live-scores',
            upcomingMatches: '/matches/upcoming',
            playerStats: '/players/stats',
            teamStats: '/teams/statistics'
        }
    }
};

// Validate required configuration
if (!config.cricketApi.apiKey) {
    console.error('CRICKET_API_KEY is required in environment variables');
    process.exit(1);
}

export default config;
