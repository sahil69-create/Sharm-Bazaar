// js/rewards.js
window.rewardsData = null;

const BONUS_VIDEOS = [
    { id: 1, url: 'https://youtu.be/l_j_CM5izF4', title: 'Video 1' },
    { id: 2, url: 'https://youtu.be/gqnd0AWjZiw', title: 'Video 2' },
    { id: 3, url: 'https://youtu.be/pTiMD3BXjyU', title: 'Video 3' }
];

const COUPONS = [
    { id: 1, icon: 'trending-up', text: '10% Extra Respect Coupon' },
    { id: 2, icon: 'shield-check', text: 'Family Function Survival Pass' },
    { id: 3, icon: 'shield-off', text: 'Anti Sharma Ji Protection Card' },
    { id: 4, icon: 'badge-check', text: 'Relative Resistance License' },
    { id: 5, icon: 'zap', text: 'Emergency Sanskar Boost Voucher' }
];

window.PACKAGE_CONFIG = {
    'Chillar Sharm': {
        price: 300,
        certificateType: 'Basic',
        videos: 1,
        coupons: 1
    },
    'Pro Max Sharm': {
        price: 1999,
        certificateType: 'Premium',
        videos: 3,
        coupons: 3
    },
    'Ultra Premium Sharm': {
        price: 4599,
        certificateType: 'Gold',
        videos: 3,
        coupons: 5,
        featured: true
    }
};

function generateCertificateId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = 'SHRM-';
    for (let i = 0; i < 8; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function generateCertificateHTML(customerName, packageName, certificateId, purchaseDate) {
    return `
        <h1>🏆 CERTIFICATE 🏆</h1>
        <p style="font-size: 0.875rem; color: var(--slate-600);">This certifies that</p>
        <h2>${customerName}</h2>
        <p style="font-size: 0.875rem; color: var(--slate-600);">is the proud owner of</p>
        <h1 style="font-size: 1.25rem;">${packageName}</h1>
        <p style="font-size: 0.875rem; color: var(--slate-600);">Issued on ${purchaseDate}</p>
        <p class="certificate-id">Certificate ID: ${certificateId}</p>
    `;
}

function renderCertificate(customerName, packageName, certificateId, purchaseDate) {
    const preview = document.getElementById('certificate-preview');
    const full = document.getElementById('certificate-full');
    const html = generateCertificateHTML(customerName, packageName, certificateId, purchaseDate);
    if (preview) preview.innerHTML = html;
    if (full) full.innerHTML = html;
}

function renderBonusVideos(count) {
    const container = document.getElementById('bonus-videos-list');
    if (!container) return;
    container.innerHTML = '';
    const videos = BONUS_VIDEOS.slice(0, count);
    videos.forEach(video => {
        const div = document.createElement('div');
        div.className = 'video-card';
        div.innerHTML = `
            <a href="${video.url}" target="_blank" rel="noopener">
                <i data-lucide="play-circle"></i>
                <span>${video.title}</span>
            </a>
        `;
        container.appendChild(div);
    });
    if (window.lucide) lucide.createIcons();
}

function renderCoupons(count) {
    const container = document.getElementById('coupons-list');
    if (!container) return;
    container.innerHTML = '';
    const coupons = COUPONS.slice(0, count);
    coupons.forEach(coupon => {
        const div = document.createElement('div');
        div.className = 'coupon-card';
        div.innerHTML = `
            <i data-lucide="${coupon.icon}"></i>
            <span>${coupon.text}</span>
        `;
        container.appendChild(div);
    });
    if (window.lucide) lucide.createIcons();
}

function initializeRewards(customerName, packageName) {
    const config = PACKAGE_CONFIG[packageName];
    if (!config) return;

    const certificateId = generateCertificateId();
    const purchaseDate = new Date().toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    window.rewardsData = {
        customerName,
        packageName,
        certificateId,
        purchaseDate,
        config
    };

    renderCertificate(customerName, packageName, certificateId, purchaseDate);
    renderBonusVideos(config.videos);
    renderCoupons(config.coupons);
}

window.viewCertificate = function() {
    const modal = document.getElementById('certificate-modal');
    if (modal) {
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
};

window.closeCertificateModal = function() {
    const modal = document.getElementById('certificate-modal');
    if (modal) {
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
};

window.downloadCertificate = function() {
    if (!window.rewardsData) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const { customerName, packageName, certificateId, purchaseDate } = window.rewardsData;

    // Set background color
    doc.setFillColor(255, 247, 237);
    doc.rect(0, 0, 210, 297, 'F');

    // Border
    doc.setDrawColor(217, 30, 39);
    doc.setLineWidth(2);
    doc.rect(10, 10, 190, 277);

    // Dashed inner border
    doc.setLineDash([5, 3]);
    doc.rect(20, 20, 170, 257);
    doc.setLineDash([]);

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(217, 30, 39);
    doc.text('CERTIFICATE', 105, 60, { align: 'center' });

    // Subtitle
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('This certifies that', 105, 80, { align: 'center' });

    // Name
    doc.setFontSize(28);
    doc.setTextColor(30, 30, 30);
    doc.text(customerName, 105, 110, { align: 'center' });

    // Package
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('is the proud owner of', 105, 130, { align: 'center' });

    doc.setFontSize(18);
    doc.setTextColor(217, 30, 39);
    doc.text(packageName, 105, 150, { align: 'center' });

    // Date
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Issued on ${purchaseDate}`, 105, 170, { align: 'center' });

    // Certificate ID
    doc.setFont('courier', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Certificate ID: ${certificateId}`, 105, 200, { align: 'center' });

    doc.save(`${certificateId}-Sharm-Certificate.pdf`);
};
