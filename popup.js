```javascript
let openModalButton = document.getElementById('openModalButton');
let modalContainer = document.getElementById('modalContainer');

openModalButton.addEventListener('click', function() {
    sendMessageToBackground({ action: 'openModal', data: null });
});

function sendMessageToBackground(message) {
    chrome.runtime.sendMessage(message, function(response) {
        if (response.action === 'openModal') {
            modalContainer.innerHTML = `<iframe src="${response.data}" width="100%" height="100%"></iframe>`;
        }
    });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'closeModal') {
        modalContainer.innerHTML = '';
        sendResponse({ action: 'modalClosed', data: null });
    }
});
```