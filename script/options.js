// Saves options to chrome.storage
function save_options() {
  let currentTime = new Date().getTime();
  var dark_mode = document.getElementById('dark_mode').checked;
  var graph_mode = document.getElementById('graph_mode').checked;
  chrome.storage.sync.set(
    {
      darkMode: dark_mode,
      graphMode: graph_mode,
      lastUpdate: currentTime,
    },
    function () {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function () {
        status.textContent = '';
        location.reload();
      }, 750);
    }
  );
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

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get(
    {
      darkMode: false,
      graphMode: true,
    },
    function (items) {
      document.getElementById('dark_mode').checked = items.darkMode;
      document.getElementById('graph_mode').checked = items.graphMode;
      if (items.darkMode) {
        document.body.style = 'background:black;color:white;';
      }
    }
  );
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
