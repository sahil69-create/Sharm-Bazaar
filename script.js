// --- Navigation Functions ---

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    const isHidden = mobileMenu.classList.contains('hidden');
    
    if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

// State for eligibility form
let selectedOptions = {
    1: null,
    2: null,
    3: null
};

// --- Modal Functions ---

function openModal(productName) {
    const modal = document.getElementById('buyModal');
    const form = document.getElementById('eligibility-form');
    const rejection = document.getElementById('rejection-screen');
    
    // Reset state
    selectedOptions = { 1: null, 2: null, 3: null };
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('border-teal-500', 'bg-teal-50', 'text-teal-700');
        btn.classList.add('border-slate-100');
    });

    // Reset views
    form.classList.remove('hidden');
    rejection.classList.add('hidden');
    
    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Prevent scroll
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('buyModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    
    // Restore scroll
    document.body.style.overflow = 'auto';
}

function selectOption(questionId, value) {
    selectedOptions[questionId] = value;
    
    // Visual feedback for the selected button in the specific question group
    const parentDiv = event.target.closest('.grid');
    const buttons = parentDiv.querySelectorAll('.option-btn');
    
    buttons.forEach(btn => {
        btn.classList.remove('border-teal-500', 'bg-teal-50', 'text-teal-700');
        btn.classList.add('border-slate-100');
    });
    
    event.target.classList.add('border-teal-500', 'bg-teal-50', 'text-teal-700');
    event.target.classList.remove('border-slate-100');
}

function submitEligibility() {
    // Check if all options are selected
    if (!selectedOptions[1] || !selectedOptions[2] || !selectedOptions[3]) {
        alert("Please answer all questions to prove your shamelessness (or lack thereof).");
        return;
    }

    const form = document.getElementById('eligibility-form');
    const rejection = document.getElementById('rejection-screen');
    
    // Show "Processing" state on button
    const submitBtn = event.target;
    const originalText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = "Analyzing Shamelessness...";
    
    setTimeout(() => {
        form.classList.add('hidden');
        rejection.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
        
        // Re-initialize icons for the rejection screen if needed
        lucide.createIcons();
    }, 1500);
}

// --- Sharm Calculator Functions ---

function updateCalculator() {
    const checkboxes = document.querySelectorAll('#calculator input[type="checkbox"]');
    const meter = document.getElementById('sharm-meter');
    const resultText = document.getElementById('calculator-result-text');
    const recommendation = document.getElementById('calculator-recommendation');
    
    let totalShamelessness = 0;
    checkboxes.forEach(cb => {
        if (cb.checked) {
            totalShamelessness += parseInt(cb.value);
        }
    });

    // Update UI
    meter.style.width = `${totalShamelessness}%`;
    resultText.innerText = `${totalShamelessness}%`;
    
    // Update Recommendation
    if (totalShamelessness === 0) {
        recommendation.innerText = "Select your sins to begin";
        recommendation.className = "text-right text-sm font-semibold text-slate-500";
    } else if (totalShamelessness <= 30) {
        recommendation.innerText = "You still have some hope. 'Chillar Sharm' might work.";
        recommendation.className = "text-right text-sm font-semibold text-teal-600";
    } else if (totalShamelessness <= 70) {
        recommendation.innerText = "Danger zone! Upgrade to 'Pro Max' before dinner.";
        recommendation.className = "text-right text-sm font-semibold text-orange-500";
    } else {
        recommendation.innerText = "God help you. 'Ultra Premium' is your only survival chance.";
        recommendation.className = "text-right text-sm font-semibold text-coral-500 animate-pulse";
    }
}

// --- Helper Functions ---

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.currentTarget;
        const originalContent = btn.innerHTML;
        
        btn.innerHTML = `<i data-lucide="check" class="w-4 h-4"></i><span>Copied!</span>`;
        lucide.createIcons();
        
        setTimeout(() => {
            btn.innerHTML = originalContent;
            lucide.createIcons();
        }, 2000);
    });
}

// Close modal on escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
