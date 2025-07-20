/**
 * @file script.js
 * @description Handles dynamic content for the portfolio page, including fetching projects from GitHub.
 */

// --- CONSTANTS ---
const GITHUB_USERNAME = 'Wahhab-Zendehdel';
const GITHUB_API_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`;
const GITHUB_API_USER_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;

// --- DOM ELEMENTS ---
const userBioEl = document.getElementById('userBio');
const projectsGridEl = document.getElementById('projectsGrid');
const currentYearEl = document.getElementById('currentYear');
const userNameEl = document.getElementById('userName');
const userAvatarEl = document.getElementById('userAvatar');
const githubStatsImg = document.getElementById('github-stats-img');
const githubTopLangsImg = document.getElementById('github-top-langs-img');

/**
 * @description A list of projects to feature that do not have public GitHub repositories.
 */
const manualProjects = [
    {
        name: "AI-Powered Fuse Box Integrity Checker",
        description: "Live detection of incorrect fuses in vehicle fuse boxes using Python and OpenCV.",
        githubLink: null,
        language: "Python"
    },
    {
        name: "Professional Accounting for Windows",
        description: "A robust accounting application for Windows built with C# and SQL.",
        githubLink: null,
        language: "C#"
    },
    {
        name: "Crypto Data Analysis & Trading Signals",
        description: "A Python tool for collecting and analyzing cryptocurrency data, calculating indicators (MACD, RSI, Ichimoku) to generate trading signals.",
        githubLink: null,
        language: "Python"
    },
    {
        name: "Efficient Library & Member Management",
        description: "A library management system developed with ASP.NET, C#, and SQL for efficient book and member tracking.",
        githubLink: null,
        language: "C#"
    },
    {
        name: "ROS2 & Unreal Engine Web Interface",
        description: "A ROS2 server in Python that creates a communication bridge between a web-based UI and the Unreal Engine.",
        githubLink: null,
        language: "Python"
    },
    {
        name: "Multi-Model Battery Health Forecaster",
        description: "A user-friendly Gradio interface for loading and analyzing battery health data with over 10 different machine learning models.",
        githubLink: null,
        language: "Python"
    },
    {
        name: "ML-Based Cough Analysis for Covid-19 Detection",
        description: "A Python project utilizing machine learning to detect COVID-19 from the sound of a cough.",
        githubLink: null,
        language: "Python"
    }
];

// --- FUNCTIONS ---

/**
 * Updates the GitHub stats images to match the Classic Academia theme.
 */
function setAcademiaThemeForStats() {
    // Parameters to match the Academia theme: cream background, navy and maroon text/icons
    const themeParams = [
        'bg_color=fdf6e3',
        'border_color=001f3f',
        'title_color=001f3f',
        'icon_color=4a0404',
        'text_color=4a0404',
        'hide_border=false'
    ].join('&');

    if (githubStatsImg) {
        githubStatsImg.src = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&${themeParams}`;
    }
    if (githubTopLangsImg) {
        githubTopLangsImg.src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&${themeParams}`;
    }
}

/**
 * Fetches the GitHub user profile data and updates the UI.
 */
async function fetchGitHubProfile() {
    try {
        const response = await fetch(GITHUB_API_USER_URL);
        if (!response.ok) throw new Error(`Network response was not ok`);
        const data = await response.json();

        userBioEl.textContent = data.bio || 'A passionate developer exploring the world of code.';
        userNameEl.textContent = data.name || data.login;
        if (data.avatar_url) userAvatarEl.src = data.avatar_url;

    } catch (error) {
        console.error("Failed to fetch GitHub profile:", error);
        userBioEl.textContent = "Error loading GitHub profile data.";
    }
}

/**
 * Fetches projects from GitHub, combines them with manual projects, and displays them.
 */
async function fetchAndDisplayProjects() {
    if (!projectsGridEl) return;
    projectsGridEl.innerHTML = '<p style="text-align: center;">Loading projects...</p>';
    try {
        const response = await fetch(GITHUB_API_REPOS_URL);
        if (!response.ok) throw new Error(`Network error: ${response.statusText}`);

        let repos = await response.json();

        const excludedRepos = ['Wahhab-Zendehdel.github.io', 'Wahhab-Zendehdel'];

        let githubProjects = repos
            .filter(repo => !repo.fork && !excludedRepos.includes(repo.name))
            .map(repo => ({
                name: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
                description: repo.description || 'No description available.',
                githubLink: repo.html_url,
                language: repo.language || 'N/A'
            }));

        const allProjects = [...manualProjects, ...githubProjects];
        displayProjects(allProjects);

    } catch (error) {
        console.error("Failed to fetch GitHub repositories:", error);
        projectsGridEl.innerHTML = '<p class="error" style="text-align: center;">Error loading projects from GitHub.</p>';
    }
}

/**
 * Populates the projects grid with a given list of projects.
 * @param {Array} projects - An array of project objects to display.
 */
function displayProjects(projects) {
    if (!projectsGridEl) return;
    projectsGridEl.innerHTML = '';

    if (!projects || projects.length === 0) {
        projectsGridEl.innerHTML = '<p>No projects to display at the moment.</p>';
        return;
    }

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        const linkButton = project.githubLink ?
            `<a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="button">View on GitHub</a>` : '';

        projectCard.innerHTML = `
            <div class="card-content">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
            </div>
            <div class="card-footer">
                <span class="language-tag">${project.language}</span>
                ${linkButton}
            </div>
        `;
        projectsGridEl.appendChild(projectCard);
    });
}

/**
 * Sets the current year in the footer.
 */
function setFooterYear() {
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubProfile();
    fetchAndDisplayProjects();
    setFooterYear();
    setAcademiaThemeForStats();
});
