(() => {
  async function getTabId() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
  }
  getTabId().then((tabId) => {
    console.log(tabId);
    chrome.scripting.executeScript({
      target : {tabId : tabId},
      files : [ "script.js" ],
    })
    .then(() => console.log("script injected"));
  })
})();