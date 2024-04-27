module.exports = {
  apps: [
    {
      name: "my-react-app", // Name of your application
      script: "npm", // Command to start your app
      args: "run dev", // Arguments to pass to the script
      instances: 1, // Number of instances to run
      autorestart: true, // Restart the app automatically if it crashes
      watch: false, // Enable/disable file watching
      max_memory_restart: "1G", // Maximum memory threshold for restarting
      env: {
        NODE_ENV: "development", // Environment variables for development mode
        HOST: "0.0.0.0", // Bind to all network interfaces
        PORT: 3000, // Port on which your React app runs
      },
      env_production: {
        NODE_ENV: "production", // Environment variables for production mode
      },
    },
  ],
};
