const projects = [
    {
        title: "Bank System V4",
        date: "Mar 22 - Apr 28, 2026",
        description: "C++ console banking app using OOP, featuring client management, transactions, user permissions, and currency exchange.",
        image: "assets/images/projects/bank-system.jpeg",
        tags: ["C++", "OOP", "File Storage", "Offline"],
        link: "https://github.com/AbdulrahmanARE/Bank-System-V4-OOP-Version"
    }
    ,
    {
        title: "Vortex App",
        date: "Apr 12 - Apr 15, 2026",
        description: "Mobile authentication UI featuring login, registration, password recovery, and reusable components.",
        image: "assets/images/projects/auth-ui.jpeg",
        tags: ["Flutter", "Dart", "Authentication UI", "Reusable Widgets"],
        link: "https://github.com/AbdulrahmanARE/25-days-flutter-challenge/tree/main/vortex_app"
    }
    ,
    {
        title: "Hallo Español",
        date: "Sep 17 - Sep 19, 2026",
        description: "Spanish vocabulary app featuring images, English translations, and audio pronunciation across multiple categories.",
        image: "assets/images/projects/espanol.jpeg",
       tags: ["Flutter", "Dart", "Audio", "Educational App"],
        link: "https://github.com/AbdulrahmanARE/25-days-flutter-challenge/tree/main/hallo_espanol"
    }
    ,
    {
        title: "Nexus E-Commerce App",
        date: "Oct 1 - Present ,2026",
        description: "E-commerce mobile UI featuring product browsing, categories, search, filters, shopping cart, and favorites.",
        image: "assets/images/projects/ecommerce.jpeg",
        tags: ["Flutter", "Dart", "E-Commerce UI", "Shopping Cart", "Product Search"],
        link: "https://github.com/AbdulrahmanARE/Nexus"
    }

];

function renderProjects() {
    const container = document.getElementById('projects-list');
    if (!container) return;

    container.innerHTML = projects.map(project => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="common-card p-0 overflow-hidden d-flex flex-column">
                <img src="${project.image}" alt="${project.title}" class="project-img">
                <div class="p-4 flex-grow-1 d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h4 class="mb-0">${project.title}</h4>
                        <span class="badge bg-dark border border-secondary text-light"
                              style="font-size:0.7rem;">${project.date}</span>
                    </div>

                    <div class="mb-3 flex-grow-1">
                        <p class="car-text text-secondary mb-0">${project.description}</p>
                    </div>

                    <div class="mt-auto">
                        <div class="mb-3">
                            ${project.tags.map(tag => `<span class="tech-badge">${tag}</span>`).join('')}
                        </div>
                        <a href="${project.link}"
                           target="_blank" rel="opener referrer"
                           class="btn btn-outline-light w-100"><i
                                class="fab fa-github me-2"></i>View on GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// We don't use DOMContentLoaded here because this script will be loaded with 'defer'
// and we want it to run as soon as possible so main.js can translate the content.
renderProjects();
