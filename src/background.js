browser.runtime.onMessage.addListener(function(request, _, _) {
  // console.log('Hello from the background');
  // console.log(request);
  if (request.reloadPages) {
    browser.tabs.query({ url: '*://stackoverflow.com/*' }).then((tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.reload(tab.id);
      });
    });
  }
  if (request.runContentScript) {
    browser.tabs.executeScript({
      file: 'content-script.js',
    });
  }
});
