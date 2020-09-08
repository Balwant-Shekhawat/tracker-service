/* eslint-disable */
module.exports = {
    apps: [
        {
            name: 'tracker-service',
            script: 'server.js',
            kill_timeout: 5000,
            wait_ready: true,
            listen_timeout: 30000,
            autorestart: true,
            watch: false,
            max_memory_restart: '2G',
            env: {
                NODE_ENV: 'development',
                DB: 'mongodb://localhost:27017/balwant',
                PORT: 3001,
            },
            env_staging: {
                NODE_ENV: 'staging',
                DB: 'mongodb://localhost:27017/balwant',
                DB_USER: 'user',
                DB_PASS: 'password',
                PORT: 3002,
            },
            env_production: {
                NODE_ENV: 'production',
                DB: 'mongodb://localhost:27017/balwant',
                DB_USER: 'user',
                DB_PASS: 'password',
                PORT: 8447,
            },
        },
    ],
};
