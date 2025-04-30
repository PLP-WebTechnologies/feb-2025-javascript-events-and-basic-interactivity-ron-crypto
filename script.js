document.addEventListener('DOMContentLoaded', () => {
    // 1. Event Handling 🎈
    const clickButton = document.getElementById('clickButton');
    const hoverArea = document.getElementById('hoverArea');
    const keypressInput = document.getElementById('keypressInput');
    const keypressOutput = document.getElementById('keypressOutput');
    const secretButton = document.getElementById('secretButton');
    const secretAction = document.getElementById('secretAction');

    clickButton.addEventListener('click', () => {
        alert('Button Clicked!');
    });

    hoverArea.addEventListener('mouseover', () => {
        hoverArea.textContent = 'You are hovering!';
    });

    hoverArea.addEventListener('mouseout', () => {
        hoverArea.textContent = 'Hover Over Me';
    });

    keypressInput.addEventListener('keypress', (event) => {
        keypressOutput.textContent = `You typed: ${event.key}`;
    });

    let clickCount = 0;
    let longPressTimer;

    secretButton.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 2) {
            secretAction.classList.remove('hidden');
            setTimeout(() => {
                secretAction.classList.add('hidden');
                clickCount = 0;
            }, 2000);
        }
        clearTimeout(longPressTimer);
        longPressTimer = setTimeout(() => {
            secretAction.classList.remove('hidden');
            setTimeout(() => {
                secretAction.classList.add('hidden');
                clickCount = 0;
            }, 2000);
        }, 1000); // Adjust time for long press
    });

    secretButton.addEventListener('dblclick', () => {
        clearTimeout(longPressTimer); // Prevent long press action on double click
    });

    // 2. Interactive Elements 🎮
    const changeTextButton = document.getElementById('changeTextButton');
    const changingText = document.getElementById('changingText');
    let isOriginalText = true;

    changeTextButton.addEventListener('click', () => {
        changingText.textContent = isOriginalText ? 'Text Changed!' : 'Initial Text';
        isOriginalText = !isOriginalText;
    });

    const images = document.querySelectorAll('.image-gallery img');
    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    const tabButtons = document.querySelectorAll('.tab-buttons .tab-button');
    const tabContents = document.querySelectorAll('.tab-contents .tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 3. Form Validation 📋✅
    const form = document.getElementById('myForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', (event) => {
        let isValid = true;

        // Required field check for Name
        if (!nameInput.value.trim()) {
            nameError.textContent = 'Name is required.';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        // Email format validation
        if (emailInput.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            emailError.textContent = 'Invalid email format.';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        // Password rules
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long.';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
            formMessage.classList.add('hidden');
        } else {
            formMessage.textContent = 'Form submitted successfully!';
            formMessage.classList.remove('hidden');
            event.preventDefault(); // For demonstration, prevent actual submission
            form.reset();
            setTimeout(() => formMessage.classList.add('hidden'), 3000);
        }
    });

    // Bonus: Real-time feedback while typing (for password)
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long.';
        } else {
            passwordError.textContent = '';
        }
    });
});