chrome.runtime.onStartup.addListener(() => {
  console.log("Browser started! Running extension code...");
  chrome.tabs.create({ url: "https://youtube.com" });
  // Add code to call API when browser opens
});

chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed or updated");
  // Add code to call API when browser opens
});

chrome.windows.onCreated.addListener((window) => {
  console.log("Window created:", window);
  // Add code to call API when browser opens
});

chrome.tabs.onCreated.addListener((tab) => {
  console.log("Tab created:", tab);
  // Add code to call API when browser opens
});