export default {
    apps: [
        {
            name: 'api',
            script: './dist/app.js',
            instances: 'max',
            exec_mode: 'cluster',
            max_memory_restart: '300M',
            env: {
                NODE_ENV: 'production'
            },
            
            // Additional production-ready settings
            autorestart: true,
            watch: false,
            max_restarts: 10,
            min_uptime: '10s',
            restart_delay: 4000,

            // Logging
            error_file: './logs/pm2-error.log',
            out_file: './logs/pm2-out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            merge_logs: true,

            // Environment variables for development
            env_development: {
                NODE_ENV: 'development',
                PORT: 4000
            },

            // Environment variables for staging
            env_staging: {
                NODE_ENV: 'staging',
                PORT: 4000
            }
        }
    ]
};