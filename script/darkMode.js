chrome.storage.sync.get({ darkMode: false, graphMode: true }, (items) => {
  if (items.darkMode) {
    //Sends Message to background script to add Dark Mode to Managebac
    chrome.runtime.sendMessage({
      darkMode: items.darkMode,
    });
  }
});
