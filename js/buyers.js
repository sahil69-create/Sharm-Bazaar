// --- Top Buyers Data ---
window.buyersData = [
    {
        id: 1,
        name: "Narendra Modi",
        age: 24,
        location: "Gujarat, India",
        avatar: "buyers/narendramodi.avif",
        purchases: "132K",
        level: "Legendary",
        levelClass: "legendary"
    },
    {
        id: 2,
        name: "DUCK",
        age: 28,
        location: "Mumbai, Maharashtra",
        avatar: "buyers/pig.jfif",
        purchases: 10,
        level: "Pro Max",
        levelClass: "pro-max"
    },
    {
        id: 3,
        name: "Raghav Chadha",
        age: 37,
        location: "Delhi NCR",
        avatar: "https://files.catbox.moe/6k1c4d.jpg",
        purchases: "2.6K",
        level: "Ultra Premium",
        levelClass: "ultra-premium"
    },
    {
        id: 4,
        name: "Ananya Gupta",
        age: 57,
        location: "GLodhi Estate, New Delhi",
        avatar: "https://files.catbox.moe/4flpgi.jpg",
        purchases: "1.7K",
        level: "Pro Max",
        levelClass: "pro-max"
    },
    {
        id: 5,
        name: "Vikram Joshi",
        age: 30,
        location: "Andheri, Mumbai",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Vikram&backgroundColor=fbbf24",
        purchases: 6,
        level: "Chillar",
        levelClass: "chillar"
    },
    {
        id: 6,
        name: "Neha Kapoor",
        age: 25,
        location: "Koramangala, Bangalore",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Neha&backgroundColor=1f2937",
        purchases: 5,
        level: "Chillar",
        levelClass: "chillar"
    }
];

// Render Top Buyers Section
window.renderTopBuyers = function() {
    const container = document.getElementById('top-buyers-container');
    if (!container) return;

    const buyers = window.buyersData || [];
    
    // Check if we're on buyers.html or index.html
    const isBuyersPage = window.location.pathname.includes('buyers') || 
                         document.title.toLowerCase().includes('top buyers') ||
                         container.classList.contains('buyers-grid-full');
    
    const buyersToShow = isBuyersPage ? buyers : buyers.slice(0, 3);

    container.innerHTML = buyersToShow.map(buyer => `
        <div class="buyer-card">
            <div class="flex items-center gap-4">
                <img src="${buyer.avatar}" alt="${buyer.name}" class="buyer-avatar" loading="lazy" decoding="async" onerror="this.src='https://api.dicebear.com/7.x/bottts/svg?seed=${buyer.name.split(' ')[0]}&backgroundColor=d91e27'">
                <div class="flex-1">
                    <div class="flex flex-col gap-1">
                        <h4 class="buyer-name">${buyer.name}</h4>
                        <p class="text-xs text-slate-500">${buyer.location}</p>
                        <div class="flex items-center gap-2">
                            <p class="buyer-age">${buyer.age} years old</p>
                            <div class="buyer-purchases">
                                <i data-lucide="shopping-cart" style="width: 1rem; height: 1rem;"></i>
                                <span>${buyer.purchases}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="buyer-level ${buyer.levelClass}">${buyer.level}</div>
            </div>
        </div>
    `).join('');

    if (window.lucide) {
        window.lucide.createIcons();
    }
};

// Auto-run with multiple triggers
if (document.readyState !== 'loading') {
    window.renderTopBuyers();
}
document.addEventListener('DOMContentLoaded', window.renderTopBuyers);
window.addEventListener('load', window.renderTopBuyers);
// Extra insurance for dynamic loading
setTimeout(window.renderTopBuyers, 500);
