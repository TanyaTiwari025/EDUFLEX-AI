document.addEventListener('DOMContentLoaded', async function() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            // const email = signupForm.email.value;
            // const password = signupForm.password.value;

           const formData = new FormData(e.target)

           const data ={}
           formData.forEach((value, key) => {
            data[key] = value; // Adds each field name and value to the 'data' object
          });
        
        

            try {
                const response = await fetch('http://localhost:3000/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                    // Redirect to login page on success
                    alert('Signup successful! You can now log in.');
                    window.location.href = '../pages/login.html';
                }
            }catch (error) {
                console.error('Error:', error);
            }
           
     
        });
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit',  function(e) {
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
