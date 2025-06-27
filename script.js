/**
 * @file script.js
 * @description Handles dynamic content and interactivity for the portfolio page.
 */

// --- CONSTANTS ---
const GITHUB_USERNAME = 'Wahhab-Zendehdel';
const GITHUB_API_USER_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;

// --- DOM ELEMENTS ---
const userBioEl = document.getElementById('userBio');
const projectsGridEl = document.getElementById('projectsGrid');
const currentYearEl = document.getElementById('currentYear');
const userNameEl = document.getElementById('userName');
const userAvatarEl = document.getElementById('userAvatar');
const darkModeToggle = document.getElementById('darkModeToggle');
const githubStatsImg = document.getElementById('github-stats-img');
const githubTopLangsImg = document.getElementById('github-top-langs-img');
const htmlElement = document.documentElement;

/**
 * @description An array of project objects to be displayed on the page.
 * Includes language and a link to the GitHub repository.
 */
const projects = [{
    name: "Vehicle Fuse Box Fault Detection",
    description: "Live detection of incorrect fuses in vehicle fuse boxes using Python and OpenCV.",
    githubLink: "https://github.com/Wahhab-Zendehdel/Fuse-box-wrong-fuse-detector",
    language: "Python"
}, {
    name: "C# and SQL Accounting App",
    description: "A robust accounting application for Windows built with C# and SQL.",
    githubLink: "https://github.com/Wahhab-Zendehdel/Accounting-App",
    language: "C#"
}, {
    name: "Crypto Data Analysis & Trading Signals",
    description: "A Python tool for collecting and analyzing cryptocurrency data from CoinMarketCap, calculating indicators (MACD, RSI, Ichimoku) to generate trading signals.",
    githubLink: "https://github.com/Wahhab-Zendehdel/crypto-data-collector-and-plotter-with-some-indicator-and-buy-sell-signal",
    language: "Python"
}, {
    name: "ASP.NET Library Manager",
    description: "A library management system developed with ASP.NET, C#, and SQL for efficient book and member tracking.",
    githubLink: "https://github.com/Wahhab-Zendehdel/LibraryManager",
    language: "C#"
}, {
    name: "ROS2 & Unreal Engine Web Interface",
    description: "A ROS2 server in Python that creates a communication bridge between a web-based UI and the Unreal Engine.",
    githubLink: "https://github.com/Wahhab-Zendehdel/ROS2-web-server-to-unreal",
    language: "Python"
}, {
    name: "AI-Powered Battery Health Diagnosis",
    description: "A user-friendly Gradio interface for loading and analyzing battery health data with over 10 different machine learning models.",
    githubLink: "https://github.com/Wahhab-Zendehdel/Detect-battery-health-with-ML",
    language: "Python"
}, {
    name: "COVID-19 Cough Detection",
    description: "A Python project utilizing machine learning to detect COVID-19 from the sound of a cough.",
    githubLink: "https://github.com/Wahhab-Zendehdel/detect-covid-19-via-cough-voice",
    language: "Python"
}];

// --- FUNCTIONS ---

/**
 * Applies the selected theme (light/dark) to the page.
 * @param {boolean} isDark - True if dark mode should be enabled.
 */
function applyTheme(isDark) {
    if (isDark) {
        htmlElement.classList.add('dark');
        darkModeToggle.checked = true;
    } else {
        htmlElement.classList.remove('dark');
        darkModeToggle.checked = false;
    }
    // Update GitHub stats images theme
    const theme = isDark ? 'dark' : 'light';
    const bgColor = isDark ? '1d2a3a' : 'f8f9fa';
    const textColor = isDark ? 'c9d1d9' : '333';
    const titleColor = isDark ? '58a6ff' : '0056b3';
    githubStatsImg.src = `https://github-readme-stats.vercel.app/api?username=wahhab-zendehdel&show_icons=true&theme=${theme}&hide_border=true&title_color=${titleColor}&icon_color=${titleColor}&text_color=${textColor}&bg_color=${bgColor}`;
    githubTopLangsImg.src = `https://github-readme-stats.vercel.app/api/top-langs/?username=wahhab-zendehdel&layout=compact&theme=${theme}&hide_border=true&title_color=${titleColor}&icon_color=${titleColor}&text_color=${textColor}&bg_color=${bgColor}`;
}

/**
 * Toggles the theme between light and dark mode and saves the preference.
 */
function toggleDarkMode() {
    const isDark = !htmlElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    applyTheme(isDark);
}

/**
 * Fetches the GitHub user profile data and updates the UI.
 */
async function fetchGitHubProfile() {
    try {
        const response = await fetch(GITHUB_API_USER_URL);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        userBioEl.textContent = data.bio || 'A passionate developer exploring the world of code.';
        userNameEl.textContent = data.name || data.login;
        if (data.avatar_url) {
            userAvatarEl.src = data.avatar_url;
        }
    } catch (error) {
        console.error("Failed to fetch GitHub profile:", error);
        userBioEl.textContent = "Error loading GitHub profile data.";
        userNameEl.textContent = "Wahhab Zendehdel";
    }
}

/**
 * Populates the projects grid with project data.
 */
function displayProjects() {
    projectsGridEl.innerHTML = '';
    if (projects.length === 0) {
        projectsGridEl.innerHTML = '<p>No projects to display at the moment.</p>';
        return;
    }

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        // Add a class for the specific language for styling
        const langClass = `lang-${project.language.toLowerCase().replace('#', 'sharp')}`;

        projectCard.innerHTML = `
            <div class="card-content">
                <span class="language-tag ${langClass}">${project.language}</span>
                <h3>${project.name}</h3>
                <p>${project.description}</p>
            </div>
            <div class="card-footer">
                <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="button">
                    View on GitHub
                </a>
            </div>
        `;
        projectsGridEl.appendChild(projectCard);
    });
}

/**
 * Sets the current year in the footer.
 */
function setFooterYear() {
    const year = new Date().getFullYear();
    if (currentYearEl) {
        currentYearEl.textContent = year;
    }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Event Listeners
    darkModeToggle.addEventListener('change', toggleDarkMode);

    // Initial setup calls
    fetchGitHubProfile();
    displayProjects();
    setFooterYear();

    // Check for saved theme preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
        applyTheme(savedDarkMode === 'true');
    } else {
        // Or use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark);
    }
});
