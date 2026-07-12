// --- Top Buyers Data ---
window.buyersData = [
    {
        id: 1,
        name: "Narendra Modi",
        age: 75,
        location: "Gujarat, India",
        avatar: "buyers/narendramodi.avif",
        purchases: "132K",
        level: "Legendary",
        levelClass: "legendary"
    },
    {
        id: 2,
        name: "Dharmendra Pradhan",
        age: 56,
        location: "New Delhi",
        avatar: "https://files.catbox.moe/ej0cc4.jpg",
        purchases: "78K",
        level: "Legend",
        levelClass: "legendary"
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
        name: "Arvind Kejriwal",
        age: 57,
        location: "Lodhi Estate, New Delhi",
        avatar: "https://files.catbox.moe/4flpgi.jpg",
        purchases: "1.7K",
        level: "Pro Max",
        levelClass: "pro-max"
    },
    {
        id: 5,
        name: "Donald Trump",
        age: 79,
        location: "Mumbai, Maharashtra",
        avatar: "buyers/pig.jfif",
        purchases: "10",
        level: "Pro Max",
        levelClass: "pro-max"
    },
    {
        id: 6,
        name: "Dilip Ghosh",
        age: 61,
        location: "Sector-5 Metro Station, Kolkata, West Bengal",
        avatar: "https://files.catbox.moe/y4uucf.jpg",
        purchases: "15K",
        level: "Chillar",
        levelClass: "chillar"
    },
    {
        id: 7,
        name: "Shubham Bhagat",
        age: 22,
        location: "Sahibgand, Jharkhand",
        avatar: "https://files.catbox.moe/5hize6.jpg",
        purchases: "55K",
        level: "Ultra Premium",
        levelClass: "ultra-premium"
    },
    {
        id: 8,
        name: "Priyanka Gandhi",
        age: 53,
        location: "New Delhi",
        avatar: "https://files.catbox.moe/ppuzvy.png",
        purchases: "22K",
        level: "Legend",
        levelClass: "legendary"
    },
    {
        id: 9,
        name: "Rahul Gandhi",
        age: 54,
        location: "Wayanad, Kerala",
        avatar: "https://files.catbox.moe/ppuzvy.png",
        purchases: "48K",
        level: "Legendary",
        levelClass: "legendary"
    },
    {
        id: 10,
        name: "Yogi Adityanath",
        age: 52,
        location: "Lucknow, Uttar Pradesh",
        avatar: "https://files.catbox.moe/ppuzvy.png",
        purchases: "89K",
        level: "Legendary",
        levelClass: "legendary"
    },
    {
        id: 11,
        name: "Mamata Banerjee",
        age: 69,
        location: "Kolkata, West Bengal",
        avatar: "https://files.catbox.moe/ppuzvy.png",
        purchases: "35K",
        level: "Ultra Premium",
        levelClass: "ultra-premium"
    },
    {
        id: 12,
        name: "Akshay Kumar",
        age: 56,
        location: "Mumbai, Maharashtra",
        avatar: "https://files.catbox.moe/ppuzvy.png",
        purchases: "72K",
        level: "Legend",
        levelClass: "legendary"
    }
];

window.buyersShowAll = false;

// Render Top Buyers Section
window.renderTopBuyers = function() {
    console.log("SharmBazaar: Rendering buyers list...");
    const container = document.getElementById('top-buyers-container');
    if (!container) return;

    const buyers = window.buyersData || [];
    
    // Check if we're on buyers.html or index.html
    const isBuyersPage = window.location.pathname.includes('buyers') || 
                         document.title.toLowerCase().includes('top buyers') ||
                         container.classList.contains('buyers-grid-full');
    
    let buyersToShow;
    let showButton = false;
    
    if (isBuyersPage) {
        if (window.buyersShowAll) {
            buyersToShow = buyers;
        } else {
            buyersToShow = buyers.slice(0, 6);
            if (buyers.length > 6) showButton = true;
        }
    } else {
        buyersToShow = buyers.slice(0, 3);
    }

    let html = buyersToShow.map(buyer => `
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

    if (showButton) {
        html += `
            <div style="grid-column: 1 / -1; text-align: center;">
                <button onclick="window.toggleBuyersShowAll()" class="btn-primary" style="margin-top: 1rem;">
                    ${window.buyersShowAll ? 'Show Less' : 'Show More Profiles'}
                </button>
            </div>
        `;
    }

    container.innerHTML = html;

    if (window.lucide) {
        window.lucide.createIcons();
    }
};

window.toggleBuyersShowAll = function() {
    window.buyersShowAll = !window.buyersShowAll;
    window.renderTopBuyers();
};

// Auto-run with multiple triggers
if (document.readyState !== 'loading') {
    window.renderTopBuyers();
}
document.addEventListener('DOMContentLoaded', window.renderTopBuyers);
window.addEventListener('load', window.renderTopBuyers);
// Extra insurance for dynamic loading
setTimeout(window.renderTopBuyers, 500);
