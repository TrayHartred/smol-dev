```javascript
const modalUrl = "https://pi.ai/talk";

function sendMessageToBackground(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openModal') {
    window.open(modalUrl, 'modal', 'width=600,height=600');
    sendResponse({ status: 'Modal opened' });
  } else if (message.action === 'closeModal') {
    window.close();
    sendResponse({ status: 'Modal closed' });
  }
});
```