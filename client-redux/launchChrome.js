const chromeLauncher = require('chrome-launcher');

chromeLauncher.launch({
    port: 9222,
    ignoreDefaultFlags: true,
    chromeFlags: chromeLauncher.Launcher.defaultFlags().filter(flag => flag !== '--disable-extensions'),
    startingUrl: process.argv[process.argv.length - 1],
}).then(function (chrome) {
    console.info('Chrome remote debugging port:', chrome.port);
});

