/**
 * @file forward.js
 * @description Handles displaying the submitted URL.
 */

// --- CONSTANTS ---
const URL_PARAM = 'url';

// --- DOM ELEMENTS ---
const forwardUrlEl = document.getElementById('forward-url');

/**
 * @description Gets the URL from the query string.
 * @returns {string|null} The URL to display, or null if not found.
 */
function getDisplayUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(URL_PARAM);
}

/**
 * @description Displays the URL.
 */
function displayUrl() {
    const displayUrl = getDisplayUrl();

    if (displayUrl) {
        if (forwardUrlEl) {
            forwardUrlEl.textContent = displayUrl;
        }
    } else {
        if (forwardUrlEl) {
            forwardUrlEl.textContent = 'No URL provided.';
        }
    }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    displayUrl();
});
