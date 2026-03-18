const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link"),
      signupForm = document.querySelector(".signup form");

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Function to validate password (at least 6 characters)
function validatePassword(password) {
    return password.length >= 6;
}

// Function to validate name (at least 10 characters)
function validateName(name) {
    return name.trim().length >= 10;
}

// Event listener for signup form submission
signupForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission
    if (validateSignup()) {
        alert("Registration successful!");
    }
});


// Function to validate signup form
function validateSignup() {
    const name = signupForm.querySelectorAll('input[type="text"]')[0].value; // First text input is name
    const email = signupForm.querySelectorAll('input[type="text"]')[1].value; // Second text input is email
    const password = signupForm.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;

    if (!validateName(name)) {
        alert("Name must be at least 10 characters long.");
        return false;
    }
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (!validatePassword(password)) {
        alert("Password must be at least 6 characters long.");
        return false;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }
    return true;
}

// Event listener for signup form submission
signupForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission
    if (validateSignup()) {
        alert("Registration successful!");
    }
});

// Show/hide password functionality
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            pwField.type = pwField.type === "password" ? "text" : "password";
        });
    });
});

//Toggle between login and signup forms//
signUp.addEventListener("click", () => container.classList.add("active"));
login.addEventListener("click", () => container.classList.remove("active"));






