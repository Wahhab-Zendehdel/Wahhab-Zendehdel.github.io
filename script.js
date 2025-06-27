/**
 * @file script.js
 * @description Handles dynamic content and interactivity for the portfolio page, including fetching projects from GitHub.
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
const darkModeToggle = document.getElementById('darkModeToggle');
const githubStatsImg = document.getElementById('github-stats-img');
const githubTopLangsImg = document.getElementById('github-top-langs-img');
const htmlElement = document.documentElement;

/**
 * @description A list of projects to feature that do not have public GitHub repositories.
 * These will be displayed alongside the fetched repositories.
 */
const manualProjects = [
    {
        name: "Vehicle Fuse Box Fault Detection",
        description: "Live detection of incorrect fuses in vehicle fuse boxes using Python and OpenCV.",
        githubLink: null, // No public GitHub link
        language: "Python"
    },
    {
        name: "Accounting App",
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
        name: "Library Manager",
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
        name: "AI-Powered Battery Health Diagnosis",
        description: "A user-friendly Gradio interface for loading and analyzing battery health data with over 10 different machine learning models.",
        githubLink: null,
        language: "Python"
    },
    {
        name: "COVID-19 Cough Detection",
        description: "A Python project utilizing machine learning to detect COVID-19 from the sound of a cough.",
        githubLink: null,
        language: "Python"
    }
];

// --- FUNCTIONS ---

/**
 * Applies the selected theme (light/dark) to the page.
 * @param {boolean} isDark - True if dark mode should be enabled.
 */
function applyTheme(isDark) {
    htmlElement.classList.toggle('dark', isDark);
    if(darkModeToggle) darkModeToggle.checked = isDark;
    
    // Update GitHub stats images theme
    const theme = isDark ? 'dark' : 'light';
    const bgColor = isDark ? '1d2a3a' : 'f8f9fa';
    const textColor = isDark ? 'c9d1d9' : '333';
    const titleColor = isDark ? '58a6ff' : '0056b3';
    
    if (githubStatsImg) {
        githubStatsImg.src = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=${theme}&hide_border=true&title_color=${titleColor}&icon_color=${titleColor}&text_color=${textColor}&bg_color=${bgColor}`;
    }
    if (githubTopLangsImg) {
        githubTopLangsImg.src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=${theme}&hide_border=true&title_color=${titleColor}&icon_color=${titleColor}&text_color=${textColor}&bg_color=${bgColor}`;
    }
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
    projectsGridEl.innerHTML = '<p>Loading projects...</p>';
    try {
        const response = await fetch(GITHUB_API_REPOS_URL);
        if (!response.ok) throw new Error(`Network error: ${response.statusText}`);
        
        let repos = await response.json();
        
        // Repositories to exclude from the fetched list
        const excludedRepos = ['Wahhab-Zendehdel.github.io', 'Wahhab-Zendehdel'];

        // Map fetched repos to a standard project format, filtering out excluded and forked repos
        let githubProjects = repos
            .filter(repo => !repo.fork && !excludedRepos.includes(repo.name))
            .map(repo => ({
                name: repo.name.replace(/-/g, ' ').replace(/_/g, ' '), // Replace hyphens and underscores for readability
                description: repo.description || 'No description available.',
                githubLink: repo.html_url,
                language: repo.language || 'N/A'
            }));

        // Combine the manually defined projects with the fetched GitHub projects
        const allProjects = [...manualProjects, ...githubProjects];

        displayProjects(allProjects);

    } catch (error) {
        console.error("Failed to fetch GitHub repositories:", error);
        projectsGridEl.innerHTML = '<p class="error">Error loading projects from GitHub. Please try again later.</p>';
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
        // Add a class for the specific language for styling
        const langClass = `lang-${(project.language || 'na').toLowerCase().replace('#', 'sharp')}`;

        // Conditionally create the GitHub link button only if a link exists
        const linkButton = project.githubLink ?
            `<a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="button">
                View on GitHub
            </a>` :
            '';

        projectCard.innerHTML = `
            <div class="card-content">
                <h3 class="project-name">${project.name}</h3>
                <p>${project.description}</p>
            </div>
            <div class="card-footer">
                <span class="language-tag ${langClass}">${project.language}</span>
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
    // Event Listeners
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', toggleDarkMode);
    }

    // Initial setup calls
    fetchGitHubProfile();
    fetchAndDisplayProjects(); // Fetch and display projects on load
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
