// --- Modal Functions ---

let selectedOptions = { 1: null, 2: null, 3: null };

window.openModal = function(productName) {
    const modal = document.getElementById('buyModal');
    if (!modal) return;
    
    // Reset state
    selectedOptions = { 1: null, 2: null, 3: null };
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    const eligibilityForm = document.getElementById('eligibility-form');
    const rejectionScreen = document.getElementById('rejection-screen');
    
    if (eligibilityForm) eligibilityForm.style.display = 'flex';
    if (rejectionScreen) rejectionScreen.style.display = 'none';
    
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
    const modal = document.getElementById('buyModal');
    if (modal) {
        modal.classList.remove('flex');
    }
    document.body.style.overflow = 'auto';
};

window.selectOption = function(questionId, value) {
    selectedOptions[questionId] = value;
    const target = window.event ? window.event.target : null;
    if (!target) return;

    const parent = target.parentElement;
    const buttons = parent.querySelectorAll('.option-btn');
    
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    target.classList.add('selected');
};

window.submitEligibility = function() {
    if (!selectedOptions[1] || !selectedOptions[2] || !selectedOptions[3]) {
        alert("Please answer all questions to prove your shamelessness (or lack thereof).");
        return;
    }

    const target = window.event ? window.event.target : null;
    if (!target) return;

    const originalText = target.innerText;
    target.disabled = true;
    target.innerText = "Analyzing...";
    
    setTimeout(() => {
        const eligibilityForm = document.getElementById('eligibility-form');
        const rejectionScreen = document.getElementById('rejection-screen');
        
        if (eligibilityForm) eligibilityForm.style.display = 'none';
        if (rejectionScreen) rejectionScreen.style.display = 'flex';
        
        target.disabled = false;
        target.innerText = originalText;
        if (window.lucide) lucide.createIcons();
    }, 1000);
};

window.addEventListener('keydown', (e) => e.key === 'Escape' && window.closeModal());
