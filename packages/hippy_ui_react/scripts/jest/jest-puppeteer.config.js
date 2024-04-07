module.exports = {
  launch: {
    dumpio: false,
    headless: true,
  },
  server: {
    command: 'yarn doc:server',
    port: 6060,
    host: 'localhost',
    usedPortAction: 'kill',
    waitOnScheme: {
      delay: 100000,
    },
    launchTimeout: 200000,
  },
  browserContext: 'default',
};
