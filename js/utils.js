// --- Helper Functions ---

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.currentTarget;
        const original = btn.innerHTML;
        btn.innerHTML = `<i data-lucide="check" class="w-4 h-4"></i><span>Copied!</span>`;
        if (window.lucide) lucide.createIcons();
        setTimeout(() => { 
            btn.innerHTML = original; 
            if (window.lucide) lucide.createIcons(); 
        }, 2000);
    });
}
