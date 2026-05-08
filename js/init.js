// --- Initialization ---

// reveal content immediately
document.body.classList.add('loaded');

// Initialize Lucide icons with a delay to reduce Total Blocking Time (TBT)
if (window.lucide) {
    const initIcons = () => lucide.createIcons();
    'requestIdleCallback' in window ? requestIdleCallback(() => setTimeout(initIcons, 100)) : setTimeout(initIcons, 300);
}
