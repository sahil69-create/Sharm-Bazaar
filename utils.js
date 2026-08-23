// --- Helper Functions ---

window.copyToClipboard = function(text) {
    const target = window.event ? window.event.currentTarget : null;
    navigator.clipboard.writeText(text).then(() => {
        if (!target) return;
        const original = target.innerHTML;
        target.innerHTML = `<i data-lucide="check" class="w-4 h-4"></i><span>Copied!</span>`;
        if (window.lucide) lucide.createIcons();
        setTimeout(() => { 
            target.innerHTML = original; 
            if (window.lucide) lucide.createIcons(); 
        }, 2000);
    });
};
