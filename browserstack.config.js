const base = require('@playwright/test');
const cp = require('child_process');
const clientPlaywrightVersion = cp
  .execSync('npx playwright --version')
  .toString()
  .trim()
  .split(' ')[1];
// const BrowserStackLocal = require('browserstack-local');
const util = require('util');

// BrowserStack Specific Capabilities.
// Set 'browserstack.local:true For Local testing
const caps = {
  browser: 'chrome',
  os: 'Windows',
  os_version: '10',
  name: 'My first playwright test',
  build: 'playwright-build-5',
  'browserstack.username': 'tanyahpker1',
  'browserstack.accessKey': 'fpb19Ax8qYgHN6k1FTqq',
  //'browserstack.local': true, 
  'client.playwrightVersion': '1.0.0',
};

//exports.bsLocal = new BrowserStackLocal.Local();

// replace YOUR_ACCESS_KEY with your key. You can also set an environment variable - "BROWSERSTACK_ACCESS_KEY".
// exports.BS_LOCAL_ARGS = {
//   key:'fpb19Ax8qYgHN6k1FTqq',
//};

// Patching the capabilities dynamically according to the project name.
const patchCaps = (name, title) => {
  let combination = name.split(/@browserstack/)[0];
  let [browerCaps, osCaps] = combination.split(/:/);
  let [browser, browser_version] = browerCaps.split(/@/);
  let osCapsSplit = osCaps.split(/ /);
  let os = osCapsSplit.shift();
  let os_version = osCapsSplit.join(' ');
  caps.browser = browser ? browser : 'chrome';
  caps.browser_version = browser_version ? browser_version : 'latest';
  caps.os = os ? os : 'Windows';
  caps.os_version = os_version ? os_version : '10';
  caps.name = title;
};

exports.getCdpEndpoint = (name, title) => {
    patchCaps(name, title)    
    const cdpUrl = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`
    console.log(`--> ${cdpUrl}`)
    return cdpUrl;
}