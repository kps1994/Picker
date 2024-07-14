chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['content.js']
  });
  chrome.tabs.sendMessage(tab.id, { action: 'activateCopyingMode' });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'deactivateCopyingMode') {
    chrome.tabs.sendMessage(sender.tab.id, { action: 'deactivateCopyingMode' });
  }
});
