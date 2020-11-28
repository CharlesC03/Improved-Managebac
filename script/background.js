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
          chrome.tabs.insertCSS(tab.id, { file: 'script/darkMode.css' });
        });
      }
    );
  }
});
function reloadTabs() {
  //THis reloads all tabs
  chrome.tabs.query(
    {
      url: 'https:/s/*.managebac.com/student/*',
    },
    function (tabs) {
      // reload tab with one of the methods from linked answer
      tabs.forEach((tab) => {
        chrome.tabs.reload(tab.id);
      });
    }
  );
}
function checkIfRecent() {
  const MAX_NO_RELOAD = 24 * 3600000;
  let currentTime = new Date().getTime();
  chrome.storage.sync.get({ lastChange: null }, (items) => {
    if (items.lastChange == null) {
      chrome.storage.sync.set({ lastChange: currentTime });
    } else if (currentTime - items.lastChange > MAX_NO_RELOAD) {
      reloadTabs();
      chrome.storage.sync.set({ lastChange: currentTime });
    }
  });
}
setInterval(checkIfRecent, 20 * MIN);
