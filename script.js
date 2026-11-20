// =========================================================
// CPIT 405 – Lab 5: JavaScript DOM Interactivity
// =========================================================

// ---------- TASK 1: DARK / LIGHT MODE ----------
const themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggleBtn.textContent = "Light Mode";
    } else {
        themeToggleBtn.textContent = "Dark Mode";
    }
});

// ---------- TASK 2: SHOW MORE / SHOW LESS ----------
const aboutMore = document.getElementById("about-more");
const toggleAboutBtn = document.getElementById("toggle-about-btn");

toggleAboutBtn.addEventListener("click", () => {
    aboutMore.classList.toggle("hidden");

    if (aboutMore.classList.contains("hidden")) {
        toggleAboutBtn.textContent = "Show More";
    } else {
        toggleAboutBtn.textContent = "Show Less";
    }
});

// ---------- TASK 3: DYNAMIC PROJECTS DATA ----------
const projectsData = [
    {
        title: "GitHub Developer Trends Observatory",
        date: "May 2026",
        category: "Web",
        statValue: "43%",
        statLabel: "of tracked repos are Python, a finding surfaced by the live dashboard",
        description:
            "Built an automated daily data pipeline and interactive Streamlit web dashboard that tracks 10 programming languages across GitHub, computing language velocity, star surge detection, ecosystem share, and anomaly alerts via GitHub Actions.",
        technologies: ["Python", "pandas", "Streamlit", "Plotly", "GitHub API", "GitHub Actions"],
        link: "https://app-trends-observatory-hvg3igdqjvxr6qgwx5yptq.streamlit.app",
        linkText: "Open live dashboard"
    },
    {
        title: "Personal Interactive CV 2.0",
        date: "Nov 2026",
        category: "Web",
        statValue: "100%",
        statLabel: "vanilla HTML, CSS, and DOM JavaScript with zero external UI libraries",
        description:
            "Designed and engineered a responsive 'graph paper observatory' portfolio web application featuring dark/light theme toggling, expandable bio sections, dynamic DOM project rendering, category filtering, and print-ready PDF styling.",
        technologies: ["HTML5", "CSS3", "JavaScript", "DOM API"],
        link: "https://github.com/GhalaAlsulami",
        linkText: "View source on GitHub"
    },
    {
        title: "Automated GitHub Star-Surge & Anomaly Engine",
        date: "Apr 2026",
        category: "Programming",
        statValue: "10",
        statLabel: "programming ecosystems analyzed daily with zero manual intervention",
        description:
            "Developed a modular Python and pandas statistical engine that ingests REST API repository snapshots, calculates rolling growth rates, flags statistical anomalies, and exports structured datasets for downstream analytics.",
        technologies: ["Python", "pandas", "NumPy", "REST APIs", "OOP"],
        link: "https://github.com/GhalaAlsulami",
        linkText: "Explore repository"
    }
];

const projectsContainer = document.getElementById("projects-container");

function renderProjects(selectedCategory) {
    // Clear existing cards to avoid duplicates when re-rendering
    projectsContainer.innerHTML = "";

    const filteredProjects =
        selectedCategory === "All"
            ? projectsData
            : projectsData.filter((project) => project.category === selectedCategory);

    filteredProjects.forEach((project) => {
        // Card wrapper
        const card = document.createElement("article");
        card.className = "project-card";

        // Highlight stat box
        const statBox = document.createElement("p");
        statBox.className = "stat";
        const statStrong = document.createElement("strong");
        statStrong.textContent = project.statValue;
        statBox.appendChild(statStrong);
        statBox.appendChild(document.createTextNode(" " + project.statLabel));
        card.appendChild(statBox);

        // Category badge + date row
        const metaRow = document.createElement("div");
        metaRow.className = "project-meta";

        const badge = document.createElement("span");
        badge.className = "category-badge";
        badge.textContent = project.category;

        const dateSpan = document.createElement("span");
        dateSpan.className = "project-date";
        dateSpan.textContent = project.date;

        metaRow.appendChild(badge);
        metaRow.appendChild(dateSpan);
        card.appendChild(metaRow);

        // Project title
        const title = document.createElement("h3");
        title.textContent = project.title;
        card.appendChild(title);

        // Project description
        const desc = document.createElement("p");
        desc.textContent = project.description;
        card.appendChild(desc);

        // Technologies list
        const techList = document.createElement("ul");
        techList.className = "tech-list";

        project.technologies.forEach((tech) => {
            const li = document.createElement("li");
            li.textContent = tech;
            techList.appendChild(li);
        });
        card.appendChild(techList);

        // Project link
        if (project.link) {
            const link = document.createElement("a");
            link.href = project.link;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = project.linkText;
            card.appendChild(link);
        }

        projectsContainer.appendChild(card);
    });
}

// Render all projects on initial page load
renderProjects("All");

// ---------- TASK 4: PROJECT FILTERING ----------
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Update active button state
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Re-render matching category
        const category = button.getAttribute("data-category");
        renderProjects(category);
    });
});

// ---------- TASK 5: PRINT / SAVE AS PDF ----------
const printBtn = document.getElementById("print-btn");

printBtn.addEventListener("click", () => {
    window.print();
});