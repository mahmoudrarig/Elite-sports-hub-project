function togglePasswordVisibility(inputId, btnEl) {
    const passwordInput = document.getElementById(inputId);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        btnEl.textContent = '🙈'; // Change icon to hidden eye
    } else {
        passwordInput.type = 'password';
        btnEl.textContent = '👁️'; // Change icon back to open eye
    }
}

/* ==========================================
   2. THEME TOGGLE FUNCTIONALITY
   ========================================== */
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');

// Check saved user preference in localStorage
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Light';
}

themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light';
    }
});

/* ==========================================
   3. LOGIN / REGISTER TAB SWITCHER
   ========================================== */
function switchMode(mode) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const successMsg = document.getElementById('successMessage');

    successMsg.classList.add('hidden');

    if (mode === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
    }
}

/* ==========================================
   4. MULTI-STEP REGISTER FORM NAVIGATION
   ========================================== */
let currentStep = 1;

function showStep(step) {
    document.querySelectorAll('.form-step').forEach((el, idx) => {
        el.classList.toggle('hidden', idx !== (step - 1));
    });

    for (let i = 1; i <= 3; i++) {
        const pStep = document.getElementById(`pStep${i}`);
        if (i <= step) {
            pStep.classList.add('active');
        } else {
            pStep.classList.remove('active');
        }
    }
}

function nextStep(step) {
    if (validateStep(step)) {
        currentStep = step + 1;
        showStep(currentStep);
    }
}

function prevStep(step) {
    currentStep = step - 1;
    showStep(currentStep);
}

/* ==========================================
   5. FORM VALIDATION HELPERS
   ========================================== */
function showError(inputEl, errorEl) {
    inputEl.classList.add('invalid');
    errorEl.classList.add('show');
}

function clearError(inputEl, errorEl) {
    inputEl.classList.remove('invalid');
    errorEl.classList.remove('show');
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateStep(step) {
    let isValid = true;

    if (step === 1) {
        const email = document.getElementById('regEmail');
        const emailErr = document.getElementById('regEmailErr');
        const pass = document.getElementById('regPassword');
        const passErr = document.getElementById('regPasswordErr');
        const confirmPass = document.getElementById('regConfirmPassword');
        const confirmErr = document.getElementById('regConfirmPasswordErr');

        // Email validation
        if (!isValidEmail(email.value.trim())) {
            showError(email, emailErr);
            isValid = false;
        } else {
            clearError(email, emailErr);
        }

        // Password validation (at least 8 chars, 1 letter and 1 number)
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passRegex.test(pass.value)) {
            showError(pass, passErr);
            isValid = false;
        } else {
            clearError(pass, passErr);
        }

        // Confirm password matching
        if (confirmPass.value === '' || confirmPass.value !== pass.value) {
            showError(confirmPass, confirmErr);
            isValid = false;
        } else {
            clearError(confirmPass, confirmErr);
        }
    }

    if (step === 2) {
        const name = document.getElementById('regFullName');
        const nameErr = document.getElementById('regFullNameErr');
        const phone = document.getElementById('regPhone');
        const phoneErr = document.getElementById('regPhoneErr');

        if (name.value.trim().length < 2) {
            showError(name, nameErr);
            isValid = false;
        } else {
            clearError(name, nameErr);
        }

        if (phone.value.trim().length < 7) {
            showError(phone, phoneErr);
            isValid = false;
        } else {
            clearError(phone, phoneErr);
        }
    }

    return isValid;
}

/* ==========================================
   6. FORM SUBMISSION HANDLERS
   ========================================== */
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail');
    const emailErr = document.getElementById('loginEmailErr');
    const pass = document.getElementById('loginPassword');
    const passErr = document.getElementById('loginPasswordErr');

    let valid = true;

    if (!isValidEmail(email.value.trim())) {
        showError(email, emailErr);
        valid = false;
    } else {
        clearError(email, emailErr);
    }

    if (pass.value.trim() === '') {
        showError(pass, passErr);
        valid = false;
    } else {
        clearError(pass, passErr);
    }

    if (valid) {
        alert('Logging in successfully!');
        window.location.href = 'Home.html';
    }
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const sport = document.getElementById('favSport');
    const sportErr = document.getElementById('favSportErr');
    const terms = document.getElementById('termsCheck');
    const termsErr = document.getElementById('termsCheckErr');

    let valid = true;

    if (sport.value === '') {
        showError(sport, sportErr);
        valid = false;
    } else {
        clearError(sport, sportErr);
    }

    if (!terms.checked) {
        termsErr.classList.add('show');
        valid = false;
    } else {
        termsErr.classList.remove('show');
    }

    if (valid) {
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('successMessage').classList.remove('hidden');
        setTimeout(() => {
            switchMode('login');
        }, 2500);
    }
});