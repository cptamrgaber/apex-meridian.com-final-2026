module.exports = {
  apps: [{
    name: "apex-meridian",
    cwd: "/var/www/apex-meridian",
    script: "dist/index.js",
    instances: 1,
    env: {
      NODE_ENV: "production",
      PORT: 3000
    }
  }]
};
