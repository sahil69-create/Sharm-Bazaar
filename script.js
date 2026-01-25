// Mock Stock Logic
const stockElements = document.querySelectorAll('.stock-count');

stockElements.forEach(el => {
    // Randomly update stock every few seconds
    setInterval(() => {
        let currentStock = parseInt(el.innerText);
        if (currentStock > 1 && Math.random() > 0.7) {
            el.innerText = currentStock - 1;
        }
    }, 5000 + Math.random() * 5000);
});

// Modal Logic
const packingModal = document.getElementById('packingModal');
const checkoutModal = document.getElementById('checkoutModal');
const closeBtns = document.querySelectorAll('.close, .close-checkout');

// Close modals
closeBtns.forEach(btn => {
    btn.onclick = () => {
        packingModal.style.display = 'none';
        checkoutModal.style.display = 'none';
    };
});

window.onclick = (event) => {
    if (event.target == packingModal) {
        packingModal.style.display = 'none';
    }
    if (event.target == checkoutModal) {
        checkoutModal.style.display = 'none';
    }
};

// Buy Logic
function buySharm(productName, price) {
    // 1. Show Packing Modal
    const selectedProductSpan = document.getElementById('selectedProduct');
    const loadingText = document.getElementById('loadingText');
    
    selectedProductSpan.innerText = productName;
    loadingText.innerText = "Searching for remaining dignity...";
    packingModal.style.display = 'block';

    // 2. Simulate process
    setTimeout(() => {
        loadingText.innerText = "Compressing ego...";
    }, 1500);

    setTimeout(() => {
        loadingText.innerText = "Wrapping sharm in bubble wrap...";
    }, 3000);

    setTimeout(() => {
        // 3. Close Packing, Open Checkout
        packingModal.style.display = 'none';
        openCheckout(productName, price);
    }, 4500);
}

function openCheckout(productName, price) {
    document.getElementById('checkoutProduct').innerText = productName;
    document.getElementById('checkoutPrice').innerText = '₹' + price;
    checkoutModal.style.display = 'block';
}

// Payment Logic
const paymentForm = document.getElementById('paymentForm');

paymentForm.onsubmit = (e) => {
    e.preventDefault();
    const btn = paymentForm.querySelector('.pay-btn');
    const originalText = btn.innerText;
    
    btn.innerText = "Processing...";
    btn.disabled = true;
    btn.style.backgroundColor = "#ccc";

    setTimeout(() => {
        alert("Payment Failed Successfully ✔\n\nReason: Your conscience is too clean (or empty). \nYour Sharm is on the way... in your dreams.");
        checkoutModal.style.display = 'none';
        btn.innerText = originalText;
        btn.disabled = false;
        btn.style.backgroundColor = "#4caf50";
    }, 2000);
};

// Cart Logic (Fake)
const cartIcon = document.querySelector('.cart-icon');
cartIcon.onclick = () => {
    alert("Your cart is empty, just like your excuses.");
};

// Copy UPI Logic
function copyUPI() {
    const upiText = document.getElementById('upiId').innerText;
    navigator.clipboard.writeText(upiText).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.style.backgroundColor = "#4caf50";
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.backgroundColor = ""; // Reset to CSS default
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert("Failed to copy UPI ID. Please copy manually.");
    });
}
