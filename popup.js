(() => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const image = document.getElementById("source");

  image.addEventListener("load", (e) => {
    ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
  });
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