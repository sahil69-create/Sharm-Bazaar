// --- Navigation Functions ---

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    const isHidden = mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden', !isHidden);
    closeIcon.classList.toggle('hidden', isHidden);
}
