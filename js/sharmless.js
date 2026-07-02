// --- Top Sharmless Data ---
window.sharmlessData = [
    {
        id: 1,
        name: "Rohit Kumar",
        age: 20,
        location: "Jhajjar, Haryana",
        avatar: "https://files.catbox.moe/7ux5js.JPG",
        sharmLessScore: "99%",
        level: "Zero Sharm",
        levelClass: "ultra-premium"
    },
    {
        id: 2,
        name: "Bani",
        age: 19,
        location: "Jharkhand",
        avatar: "https://files.catbox.moe/h11lia.jpg",
        sharmLessScore: "95%",
        level: "Sharm King",
        levelClass: "legendary"
    },
    {
        id: 3,
        name: "Reja Khan",
        age: 24,
        location: "Kolkata",
        avatar: "https://files.catbox.moe/d6pjp0.jpg",
        sharmLessScore: "90%",
        level: "Sharm Destroyer",
        levelClass: "pro-max"
    },
    {
        id: 4,
        name: "Sahil Jangra",
        age: 21,
        location: "Hisar, Haryana",
        avatar: "https://files.catbox.moe/apylmd.jpg",
        sharmLessScore: "88%",
        level: "Sharm Hunter",
        levelClass: "pro-max"
    },
    {
        id: 5,
        name: "Aryan Ghanghas",
        age: "19",
        location: "Everywhere",
        avatar: "https://files.catbox.moe/x44d1o.PNG",
        sharmLessScore: "100%",
        level: "Sharm God",
        levelClass: "legendary"
    },
    {
        id: 6,
        name: "That One Relative",
        age: 65,
        location: "Your Home",
        avatar: "https://files.catbox.moe/ppuzvy.png",
        sharmLessScore: "75%",
        level: "Sharm Begone",
        levelClass: "chillar"
    }
];

// Render Top Sharmless Section
window.renderTopSharmless = function() {
    console.log("SharmBazaar: Rendering sharmless list...");
    const container = document.getElementById('top-sharmless-container');
    if (!container) return;

    const sharmless = window.sharmlessData || [];
    
    // Check if we're on sharmless.html or index.html
    const isSharmlessPage = window.location.pathname.includes('sharmless') || 
                         document.title.toLowerCase().includes('top sharmless') ||
                         container.classList.contains('buyers-grid-full');
    
    const sharmlessToShow = isSharmlessPage ? sharmless : sharmless.slice(0, 3);

    container.innerHTML = sharmlessToShow.map(person => `
        <div class="buyer-card">
            <div class="flex items-center gap-4">
                <img src="${person.avatar}" alt="${person.name}" class="buyer-avatar" loading="lazy" decoding="async" onerror="this.src='https://api.dicebear.com/7.x/bottts/svg?seed=${person.name.split(' ')[0]}&backgroundColor=d91e27'">
                <div class="flex-1">
                    <div class="flex flex-col gap-1">
                        <h4 class="buyer-name">${person.name}</h4>
                        <p class="text-xs text-slate-500">${person.location}</p>
                        <div class="flex items-center gap-2">
                            <p class="buyer-age">${person.age} years old</p>
                            <div class="buyer-purchases">
                                <i data-lucide="zap" style="width: 1rem; height: 1rem;"></i>
                                <span>${person.sharmLessScore} Shameless</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="buyer-level ${person.levelClass}">${person.level}</div>
            </div>
        </div>
    `).join('');

    if (window.lucide) {
        window.lucide.createIcons();
    }
};

// Auto-run with multiple triggers
if (document.readyState !== 'loading') {
    window.renderTopSharmless();
}
document.addEventListener('DOMContentLoaded', window.renderTopSharmless);
window.addEventListener('load', window.renderTopSharmless);
// Extra insurance for dynamic loading
setTimeout(window.renderTopSharmless, 500);
