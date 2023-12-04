module.exports = {
  apps: [{
    name: "SITEK BM",
    script: "npm",
    args: "start", 
    watch: true,
    env: {
      "PORT": 3500,
      "NODE_ENV": "prod"
    }
  }]
}
