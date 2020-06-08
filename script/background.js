chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.darkMode){
    chrome.tabs.query({
      url: "https://*.managebac.com/student/*"
    }, function (tabs) {
      tabs.forEach((tab) => {chrome.tabs.insertCSS(tab.id, {file: "script/darkMode.css"});});
    })
  }
});