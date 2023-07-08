```javascript
const modalUrl = "https://pi.ai/talk";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openModal") {
    openModal(request.data);
  } else if (request.action === "closeModal") {
    closeModal();
  }
});

function openModal(data) {
  chrome.windows.create({
    url: modalUrl,
    type: "popup",
    focused: true,
    width: 500,
    height: 600,
  });
}

function closeModal() {
  chrome.windows.getAll({ populate: true }, (windows) => {
    windows.forEach((window) => {
      window.tabs.forEach((tab) => {
        if (tab.url === modalUrl) {
          chrome.windows.remove(window.id);
        }
      });
    });
  });
}
```