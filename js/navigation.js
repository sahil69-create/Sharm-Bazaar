// --- Navigation Functions ---

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    mobileMenu.classList.toggle('active');
    const isActive = mobileMenu.classList.contains('active');
    
    menuIcon.classList.toggle('hidden', isActive);
    closeIcon.classList.toggle('hidden', !isActive);
}
