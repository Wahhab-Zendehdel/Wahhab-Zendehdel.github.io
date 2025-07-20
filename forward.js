/**
 * @file forward.js
 * @description Handles the forwarding logic for the forward.html page.
 */

// --- CONSTANTS ---
const URL_PARAM = 'url';
const FORWARD_DELAY = 3000; // 3 seconds

// --- DOM ELEMENTS ---
const forwardUrlEl = document.getElementById('forward-url');

/**
 * @description Gets the URL from the query string.
 * @returns {string|null} The URL to forward to, or null if not found.
 */
function getForwardUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(URL_PARAM);
}

/**
 * @description Displays the forward URL and redirects the user.
 */
function handleForward() {
    const forwardUrl = getForwardUrl();

    if (forwardUrl) {
        if (forwardUrlEl) {
            forwardUrlEl.textContent = forwardUrl;
            forwardUrlEl.setAttribute('href', forwardUrl);
        }

        setTimeout(() => {
            window.location.href = forwardUrl;
        }, FORWARD_DELAY);
    } else {
        if (forwardUrlEl) {
            forwardUrlEl.textContent = 'No URL provided.';
        }
    }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    handleForward();
});
