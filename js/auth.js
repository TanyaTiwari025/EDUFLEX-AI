document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = signupForm.email.value;
            const password = signupForm.password.value;

            // Save user details in localStorage (for demo purposes)
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            alert('Signup successful! You can now log in.');
            window.location.href = '../pages/login.html'; // Redirect to login page
        });
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;

            // Check stored user details
            const storedEmail = localStorage.getItem('email');
            const storedPassword = localStorage.getItem('password');

            if (email === storedEmail && password === storedPassword) {
                alert('Login successful!');
                window.location.href = '../pages/dashboard.html'; // Redirect to dashboard
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });
    }
});
