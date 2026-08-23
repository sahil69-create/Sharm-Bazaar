// --- Sharm Calculator Functions ---

window.updateCalculator = function() {
    const checkboxes = document.querySelectorAll('#calculator input[type="checkbox"]');
    const totalShamelessness = Array.from(checkboxes).reduce((acc, cb) => acc + (cb.checked ? parseInt(cb.value) : 0), 0);

    const meter = document.getElementById('sharm-meter');
    const resultText = document.getElementById('calculator-result-text');
    
    if (meter) meter.style.width = `${totalShamelessness}%`;
    if (resultText) resultText.innerText = `${totalShamelessness}%`;
    
    const rec = document.getElementById('calculator-recommendation');
    if (!rec) return;

    if (totalShamelessness === 0) {
        rec.innerText = "Select your sins to begin";
        rec.className = "text-right text-sm font-semibold text-slate-500";
    } else if (totalShamelessness <= 30) {
        rec.innerText = "You still have some hope.";
        rec.className = "text-right text-sm font-semibold";
        rec.style.color = "var(--primary-red)";
    } else if (totalShamelessness <= 70) {
        rec.innerText = "Danger zone! Upgrade now.";
        rec.className = "text-right text-sm font-semibold text-orange-500";
    } else {
        rec.innerText = "God help you. Go God Mode.";
        rec.className = "text-right text-sm font-semibold animate-pulse";
        rec.style.color = "var(--primary-red)";
    }
};
