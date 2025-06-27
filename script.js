/**
 * @file script.js
 * @description Handles dynamic content for the portfolio page, including fetching GitHub data and populating projects.
 */

// --- CONSTANTS ---
const GITHUB_USERNAME = 'Wahhab-Zendehdel';
const GITHUB_API_USER_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;

// --- DOM ELEMENTS ---
// It's a good practice to get all your DOM elements at the top.
const userBioEl = document.getElementById('userBio');
const projectsGridEl = document.getElementById('projectsGrid');
const currentYearEl = document.getElementById('currentYear');
const userNameEl = document.getElementById('userName');
const userAvatarEl = document.getElementById('userAvatar');

/**
 * @description An array of project objects to be displayed on the page.
 */
const projects = [
    {
        name: "Vehicle Fuse Box Fault Detection",
        description: "Live detection of incorrect fuses in vehicle fuse boxes using Python and OpenCV.",
        link: "#" // Add project link here
    },
    {
        name: "C# and SQL Accounting App",
        description: "A robust accounting application for Windows built with C# and SQL.",
        link: "#"
    },
    {
        name: "Crypto Data Analysis & Trading Signals",
        description: "A Python tool for collecting and analyzing cryptocurrency data from CoinMarketCap, calculating indicators (MACD, RSI, Ichimoku) to generate trading signals.",
        link: "#"
    },
    {
        name: "ASP.NET Library Manager",
        description: "A library management system developed with ASP.NET, C#, and SQL for efficient book and member tracking.",
        link: "#"
    },
    {
        name: "ROS2 & Unreal Engine Web Interface",
        description: "A ROS2 server in Python that creates a communication bridge between a web-based UI and the Unreal Engine.",
        link: "#"
    },
    {
        name: "AI-Powered Battery Health Diagnosis",
        description: "A user-friendly Gradio interface for loading and analyzing battery health data with over 10 different machine learning models.",
        link: "#"
    },
    {
        name: "COVID-19 Cough Detection",
        description: "A Python project utilizing machine learning to detect COVID-19 from the sound of a cough.",
        link: "#"
    }
];

// --- FUNCTIONS ---

/**
 * Fetches the GitHub user profile data and updates the UI.
 */
async function fetchGitHubProfile() {
    try {
        const response = await fetch(GITHUB_API_USER_URL);
        if (!response.ok) {
            // Throw an error if the network response is not ok
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();

        // Update the bio, name, and avatar with fetched data
        userBioEl.textContent = data.bio || 'A passionate developer exploring the world of code.';
        userNameEl.textContent = `Hi, I'm ${data.name || data.login}`;
        if (data.avatar_url) {
            userAvatarEl.src = data.avatar_url;
        }

    } catch (error) {
        console.error("Failed to fetch GitHub profile:", error);
        // Display error messages to the user in the UI
        userBioEl.textContent = "Error loading GitHub profile data. Please check the console.";
        userNameEl.textContent = "Wahhab Zendehdel";
    }
}

/**
 * Populates the projects grid with project data.
 */
function displayProjects() {
    // Clear the loading message
    projectsGridEl.innerHTML = '';
    
    // Check if there are projects to display
    if (projects.length === 0) {
        projectsGridEl.innerHTML = '<p>No projects to display at the moment.</p>';
        return;
    }

    // Create and append a card for each project
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        // Use template literals for cleaner HTML string construction
        projectCard.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            ${project.link !== "#" ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="button" style="margin-top: 10px;">View Project</a>` : ''}
        `;
        projectsGridEl.appendChild(projectCard);
    });
}


/**
 * Sets the current year in the footer.
 */
function setFooterYear() {
    // Get the current year and set it
    const year = new Date().getFullYear();
    if (currentYearEl) {
        currentYearEl.textContent = year;
    }
}

// --- INITIALIZATION ---

/**
 * Add an event listener to run functions when the DOM is fully loaded.
 * This is a best practice to ensure all elements are available before scripts try to access them.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initial calls to populate the page
    fetchGitHubProfile();
    displayProjects();
    setFooterYear();
});
