/**
 * @file forward.js
 * @description Handles form submission and displaying the submitted URL.
 */

// --- DOM ELEMENTS ---
const forwardForm = document.getElementById('forward-form');
const urlInput = document.getElementById('url-input');
const forwardUrlEl = document.getElementById('forward-url');

/**
 * @description Displays the URL.
 * @param {string} url - The URL to display.
 */
function displayUrl(url) {
    if (forwardUrlEl) {
        forwardUrlEl.textContent = url;
    }
}

/**
 * @description Handles the form submission.
 * @param {Event} event - The form submission event.
 */
function handleForwardFormSubmit(event) {
    event.preventDefault();
    const url = urlInput.value;
    if (url) {
        displayUrl(url);
    }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    if (forwardForm) {
        forwardForm.addEventListener('submit', handleForwardFormSubmit);
    }
});
