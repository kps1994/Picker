// Function to deactivate copying mode
function deactivateCopyingMode() {
    document.body.dataset.copyingMode = 'inactive';
    document.removeEventListener('mouseover', mouseOverListener);
    document.removeEventListener('click', clickListener);
    document.removeEventListener('keydown', escapeListener);
    console.log('Copying mode deactivated');
}

// Function to activate copying mode
function activateCopyingMode() {
    document.body.dataset.copyingMode = 'active';
    document.addEventListener('mouseover', mouseOverListener);
    document.addEventListener('click', clickListener);
    document.addEventListener('keydown', escapeListener);
    console.log('Copying mode activated');
}

// Mouse over listener
function mouseOverListener(event) {
    if (document.body.dataset.copyingMode === 'active') {
        const target = event.target;
        target.style.outline = "2px solid red";
        target.addEventListener('mouseout', function mouseOutListener() {
            target.style.outline = "";
            target.removeEventListener('mouseout', mouseOutListener);
        });
    }
}

// Click listener
function clickListener(event) {
    if (document.body.dataset.copyingMode === 'active') {
        const target = event.target;
        const textToCopy = target.innerText;
        console.log(textToCopy);

        // Use the modern Clipboard API
        navigator.clipboard.writeText(textToCopy).then(function() {
        }).catch(function(err) {
            console.error('Failed to copy text: ', err);
        });
    }
}

// Escape key listener
function escapeListener(event) {
    if (event.key === 'Escape') {
        deactivateCopyingMode();
    }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'activateCopyingMode') {
        activateCopyingMode();
    } else if (request.action === 'deactivateCopyingMode') {
        deactivateCopyingMode();
    }
});
