// js/modal.js
let selectedOptions = { 1: null, 2: null, 3: null };
let selectedProduct = null;
let razorpayOrderId = null;

// Replace this with your actual Razorpay Key ID in production
const RAZORPAY_KEY_ID = 'rzp_test_1234567890abcdef'; // Test key (replace with real one)

const FAILURE_MESSAGES = [
    "Payment failed. Even your Sharm refused to arrive.",
    "Your Sharm shipment got lost in a family argument.",
    "The Sharma Ji's son intercepted your payment.",
    "Your shamelessness caused a payment gateway error."
];

function hideAllScreens() {
    const screens = [
        'eligibility-form',
        'rejection-screen',
        'approval-screen',
        'package-screen',
        'payment-processing-screen',
        'payment-failure-screen',
        'rewards-screen'
    ];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = 'none';
            el.classList.add('hidden');
        }
    });
}

function showScreen(id) {
    hideAllScreens();
    const el = document.getElementById(id);
    if (el) {
        el.style.display = 'flex';
        el.classList.remove('hidden');
    }
}

window.openModal = function(productName) {
    selectedProduct = productName;
    selectedOptions = { 1: null, 2: null, 3: null };
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    const modal = document.getElementById('buyModal');
    if (!modal) return;

    const title = document.getElementById('modal-title');
    const subtitle = document.getElementById('modal-subtitle');
    if (title) title.textContent = 'Check Eligibility';
    if (subtitle) subtitle.textContent = 'We only sell to those who truly need it.';

    showScreen('eligibility-form');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
    const modal = document.getElementById('buyModal');
    if (modal) {
        modal.classList.remove('flex');
    }
    document.body.style.overflow = 'auto';
    closeCertificateModal();
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
        alert("Please answer all questions!");
        return;
    }

    const target = window.event ? window.event.target : null;
    if (!target) return;

    const originalText = target.innerText;
    target.disabled = true;
    target.innerText = "Checking...";

    setTimeout(() => {
        target.disabled = false;
        target.innerText = originalText;
        
        const title = document.getElementById('modal-title');
        const subtitle = document.getElementById('modal-subtitle');
        if (title) title.textContent = 'Approved!';
        if (subtitle) subtitle.textContent = 'You qualify for Sharm purchase.';
        showScreen('approval-screen');
    }, 1000);
};

window.showPackageDetails = function() {
    const config = window.PACKAGE_CONFIG ? window.PACKAGE_CONFIG[selectedProduct] : null;
    if (!config) {
        // Fallback config if rewards.js isn't loaded yet
        const fallbackConfig = {
            'Chillar Sharm': { price: 300, certificateType: 'Basic', videos: 1, coupons: 1 },
            'Pro Max Sharm': { price: 1999, certificateType: 'Premium', videos: 3, coupons: 3 },
            'Ultra Premium Sharm': { price: 4599, certificateType: 'Gold', videos: 3, coupons: 5 }
        };
        if (fallbackConfig[selectedProduct]) {
            window.PACKAGE_CONFIG = fallbackConfig;
        }
    }

    const pkgConfig = window.PACKAGE_CONFIG[selectedProduct];
    
    const title = document.getElementById('modal-title');
    const subtitle = document.getElementById('modal-subtitle');
    if (title) title.textContent = 'Complete Your Purchase';
    if (subtitle) subtitle.textContent = 'Review your package and proceed to payment.';

    const packageName = document.getElementById('package-name');
    const packagePrice = document.getElementById('package-price');
    const packageInclusions = document.getElementById('package-inclusions');
    
    if (packageName) packageName.textContent = selectedProduct;
    if (packagePrice) packagePrice.textContent = `₹${pkgConfig.price}`;
    
    if (packageInclusions) {
        packageInclusions.innerHTML = '';
        const inclusions = [
            `${pkgConfig.certificateType} Certificate of Sharm Ownership`,
            `${pkgConfig.videos} Bonus Video${pkgConfig.videos > 1 ? 's' : ''}`,
            `${pkgConfig.coupons} Funny Coupon${pkgConfig.coupons > 1 ? 's' : ''}`
        ];
        inclusions.forEach(inclusion => {
            const li = document.createElement('li');
            li.className = 'flex items-center gap-2';
            li.innerHTML = `
                <i data-lucide="check" style="color: #16a34a; width: 1rem; height: 1rem; flex-shrink: 0;"></i>
                <span>${inclusion}</span>
            `;
            packageInclusions.appendChild(li);
        });
        if (window.lucide) lucide.createIcons();
    }
    
    showScreen('package-screen');
};

window.goBackToApproval = function() {
    const title = document.getElementById('modal-title');
    const subtitle = document.getElementById('modal-subtitle');
    if (title) title.textContent = 'Approved!';
    if (subtitle) subtitle.textContent = 'You qualify for Sharm purchase.';
    showScreen('approval-screen');
};

window.startPayment = function() {
    const customerName = document.getElementById('customer-name').value.trim();
    const customerPhone = document.getElementById('customer-phone').value.trim();
    const customerEmail = document.getElementById('customer-email').value.trim();
    const customerAddress = document.getElementById('customer-address').value.trim();

    if (!customerName) {
        alert('Please enter your name for the certificate!');
        return;
    }
    if (!customerPhone) {
        alert('Please enter your phone number!');
        return;
    }
    if (!customerEmail) {
        alert('Please enter your email address!');
        return;
    }
    if (!customerAddress) {
        alert('Please enter your delivery address!');
        return;
    }

    const pkgConfig = window.PACKAGE_CONFIG[selectedProduct];
    const amountInPaise = pkgConfig.price * 100;

    const title = document.getElementById('modal-title');
    const subtitle = document.getElementById('modal-subtitle');
    if (title) title.textContent = 'Processing Payment';
    if (subtitle) subtitle.textContent = 'Please wait...';
    showScreen('payment-processing-screen');

    // In a real production scenario, you'd create an order on your backend first
    // For this demo, we'll simulate it and then open Razorpay checkout
    
    // Generate a mock order ID (replace with real backend call)
    razorpayOrderId = 'order_' + Math.random().toString(36).substr(2, 9).toUpperCase();

    const options = {
        key: RAZORPAY_KEY_ID,
        amount: amountInPaise,
        currency: "INR",
        name: "SharmBazaar",
        description: selectedProduct,
        order_id: razorpayOrderId,
        handler: async function (response) {
            // Payment success, verify signature
            try {
                const verifyResponse = await fetch('/api/verify-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    })
                });

                const result = await verifyResponse.json();
                if (result.success) {
                    showRewardsScreen(customerName);
                } else {
                    showPaymentFailure();
                }
            } catch (error) {
                // For demo purposes, if API call fails (local dev), we'll still show rewards
                console.log('Demo mode: Showing rewards without verification');
                showRewardsScreen(customerName);
            }
        },
        prefill: {
            name: customerName,
            email: customerEmail,
            contact: customerPhone
        },
        theme: {
            color: "#d91e27"
        },
        modal: {
            ondismiss: function() {
                showPaymentFailure();
            }
        }
    };

    // Check if Razorpay is loaded
    if (typeof Razorpay === 'undefined') {
        alert('Razorpay SDK failed to load. Please check your internet connection.');
        showScreen('package-screen');
        return;
    }

    const rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function () {
        showPaymentFailure();
    });
    
    setTimeout(() => {
        rzp1.open();
    }, 500);
};

function showPaymentFailure() {
    const message = FAILURE_MESSAGES[Math.floor(Math.random() * FAILURE_MESSAGES.length)];
    const failureMessageEl = document.getElementById('failure-message');
    if (failureMessageEl) failureMessageEl.textContent = message;

    const title = document.getElementById('modal-title');
    const subtitle = document.getElementById('modal-subtitle');
    if (title) title.textContent = 'Payment Failed';
    if (subtitle) subtitle.textContent = 'Don\'t worry, you can try again.';
    showScreen('payment-failure-screen');
}

function showRewardsScreen(customerName) {
    const title = document.getElementById('modal-title');
    const subtitle = document.getElementById('modal-subtitle');
    if (title) title.textContent = 'Success!';
    if (subtitle) subtitle.textContent = 'Your Sharm is ready.';
    
    if (window.initializeRewards) {
        window.initializeRewards(customerName, selectedProduct);
    }
    
    showScreen('rewards-screen');
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
