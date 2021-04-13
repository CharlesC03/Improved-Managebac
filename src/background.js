const MIN = 60 * 1000;
//If darkMode request, then add darkMode to all tabs
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.darkMode) {
    chrome.tabs.query(
      {
        url: 'https://*.managebac.com/student/*',
      },
      function (tabs) {
        tabs.forEach((tab) => {
          chrome.tabs.insertCSS(tab.id, { file: 'style/dark_mode.css' });
        });
      }
    );
  }
  if (request.reloadPages){
    reloadTabs();
  }
});
function reloadTabs() {
  //This reloads all tabs
  chrome.tabs.query(
    {
      url: 'https://*.managebac.com/student/*',
    },
    function (tabs) {
      // reload tab with one of the methods from linked answer
      tabs.forEach((tab) => {
        chrome.tabs.reload(tab.id);
      });
    }
  );
}
/* In development. */
function checkIfRecent() {
  const MAX_NO_RELOAD = 20 * 60 * 1000;
  let currentTime = new Date().getTime();
  chrome.storage.sync.get({ lastUpdate: null, changeURL: true }, (items) => {
    if (items.lastUpdate == null) {
      chrome.storage.sync.set({ lastUpdate: currentTime });
    } else if (currentTime - items.lastUpdate > MAX_NO_RELOAD) {
      reloadTabs();
      chrome.storage.sync.set({ lastUpdate: currentTime });
    }
  });
}
// setInterval(checkIfRecent, 5 * MIN);