// --- Modal Functions ---

let selectedOptions = { 1: null, 2: null, 3: null };

function openModal(productName) {
    const modal = document.getElementById('buyModal');
    
    // Reset state
    selectedOptions = { 1: null, 2: null, 3: null };
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    document.getElementById('eligibility-form').style.display = 'flex';
    document.getElementById('rejection-screen').style.display = 'none';
    
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('buyModal');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

function selectOption(questionId, value) {
    selectedOptions[questionId] = value;
    const parent = event.target.parentElement;
    const buttons = parent.querySelectorAll('.option-btn');
    
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    event.target.classList.add('selected');
}

function submitEligibility() {
    if (!selectedOptions[1] || !selectedOptions[2] || !selectedOptions[3]) {
        alert("Please answer all questions to prove your shamelessness (or lack thereof).");
        return;
    }

    const submitBtn = event.target;
    const originalText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = "Analyzing...";
    
    setTimeout(() => {
        document.getElementById('eligibility-form').style.display = 'none';
        document.getElementById('rejection-screen').style.display = 'flex';
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
        if (window.lucide) lucide.createIcons();
    }, 1000);
}

window.addEventListener('keydown', (e) => e.key === 'Escape' && closeModal());
