// Import necessary modules
const { Before, BeforeAll, AfterAll, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium, firefox, webkit } = require("playwright");
const path = require("path");
const fs = require("fs");
const { Status } = require("@cucumber/cucumber");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

// Set a default timeout for Cucumber steps
setDefaultTimeout(60000);

// Global variables for scenario name and old video path
let scenarioName;
let oldvideoPath;

// Function to launch the browser
async function launchBrowser() {
  const browserName = (process.env.Browser || "chrome").toLowerCase();
  const chromiumLikeBrowsers = ["chrome", "chromium", "edge"];
  const launchArgs = ["--start-maximized"];

  if (chromiumLikeBrowsers.includes(browserName)) {
    launchArgs.push("--start-fullscreen");
  }

  const browserMap = {
    chrome: { browser: chromium, channel: undefined },
    chromium: { browser: chromium, channel: undefined },
    firefox: { browser: firefox, channel: undefined },
    webkit: { browser: webkit, channel: undefined },
    safari: { browser: webkit, channel: undefined },
    edge: { browser: chromium, channel: "msedge" },

  };

  const { browser: selectedBrowser, channel } = browserMap[browserName] || browserMap.chrome;

  global.browser = await selectedBrowser.launch({
    headless: false,
    args: launchArgs, // Launch window in maximized/fullscreen mode when supported
    slowMo: 1000,    // Slow motion for better visibility
    ...(channel && { channel }),
  });
}

// Function to create a browser context with video recording
async function createBrowserContextwithRecording() {
  global.context = await global.browser.newContext({
    viewport: null,
    recordVideo: {
      dir: path.join(__dirname, "videos"), // Video recording directory
      size: { width: 640, height: 480 },   // Video dimensions
    }
  });
  await createPageContext();
}

// Function to create a new page context
async function createPageContext() {
  global.page = await global.context.newPage();
}

// Function to capture a screenshot
async function captureScreenshot(attachFn) {
  const screenshotPath = path.join(__dirname, "screenshots");
  if (!fs.existsSync(screenshotPath)) {
    fs.mkdirSync(screenshotPath);
  }
  const screenshotName = `${scenarioName}_${new Date().toLocaleString().replace(/[/:,]/g, '_')}.png`;
  console.log('screenshotName: ', screenshotName);
  const screenshotFilePath = path.join(screenshotPath, screenshotName);
  await global.page.screenshot({ path: screenshotFilePath });
  const imageBuffer = fs.readFileSync(screenshotFilePath);
  await attachFn(imageBuffer, 'image/png');
}

// Function to close the context
async function closeContext() {
  await global.page.close();
  await global.page.video().delete(); // Delete the recorded video
  await global.context.close();
}

// Function to close the browser
async function closeBrowser() {
  await global.browser.close();
}

// Function to rename the captured video
async function renamedCapturedVideo() {
  try {
    await global.page.close();
    const newVideoName = `${scenarioName}_${new Date().toLocaleString().replace(/[/:,]/g, '_')}.webm`;
    const newVideoPath = path.join(__dirname, "videos", newVideoName);
    await new Promise(resolve => setTimeout(resolve, 3000)); // Delay to ensure the video is fully written
    await fs.promises.rename(oldvideoPath, newVideoPath);
    console.log('File is renamed');
  }
  catch (error) {
    console.error('Error while renaming the video:', error);
  }
}

// Before All Hook: Launch the browser before all scenarios
BeforeAll(async () => {
  await launchBrowser();
});

// Before Hook: Create a new browser context and page before each scenario
Before(async (scenario) => {
  scenarioName = scenario.pickle.name;
  await createBrowserContextwithRecording();
});

// After Hook: Cleanup and capture a screenshot after each scenario
After(async function (scenario) {
  oldvideoPath = await global.page.video().path();
  if (scenario.result.status === Status.FAILED) {
    await captureScreenshot(this.attach.bind(this));
    console.log('Scenario is failed.');
    await renamedCapturedVideo();
  }
  else {
    await closeContext();
    console.log('Your scenario is looking good!.');
  }
});

// After All Hook: Close the browser after all scenarios
AfterAll(async function () {
  await closeBrowser();
});
