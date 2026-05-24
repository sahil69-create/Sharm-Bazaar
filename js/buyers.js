// --- Top Buyers Data ---

const buyers = [
    {
        id: 1,
        name: "Bakchodi",
        age: 24,
        location: "Delhi NCR",
        avatar: "buyers/narendramodi.avif",
        purchases: 12,
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
        name: "Arjun Singh",
        age: 22,
        location: "Bangalore, Karnataka",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Arjun&backgroundColor=1f2937",
        purchases: 8,
        level: "Ultra Premium",
        levelClass: "ultra-premium"
    },
    {
        id: 4,
        name: "Ananya Gupta",
        age: 26,
        location: "Gurgaon, Haryana",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Ananya&backgroundColor=d91e27",
        purchases: 7,
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
function renderTopBuyers() {
    const container = document.getElementById('top-buyers-container');
    if (!container) return;

    // Check if we're on buyers.html or index.html
    const isBuyersPage = window.location.pathname.includes('buyers.html');
    const buyersToShow = isBuyersPage ? buyers : buyers.slice(0, 3);

    container.innerHTML = buyersToShow.map(buyer => `
        <div class="buyer-card">
            <div class="flex items-center gap-4">
                <img src="${buyer.avatar}" alt="${buyer.name}" class="buyer-avatar" loading="lazy" decoding="async">
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

    // Reinitialize lucide icons for new content
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', renderTopBuyers);
