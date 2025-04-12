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
                const response = await fetch('http://localhost:3000/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                    // Redirect to login page on success
                    alert('Signup successful! You can now log in.');
                    window.location.href = '../public/login.html';
                }
            }catch (error) {
                console.error('Error:', error);
            }
           
     
        });
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit',  async function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
               
            const data = { email, password };


            // if (email   && password) {
            //     alert('Login successful!');
            //     window.location.href = '../pages/dashboard.html'; // Redirect to dashboard
            // } else {
            //     alert('Invalid email or password. Please try again.');
            // }


            try{
                console.log("dekh bhai yaha hu")
                const response = await fetch('http://localhost:3000/api/login',{
                   method:'POST',
                   headers: {
                    'Content-Type': 'application/json'
                     },
                     credentials: 'include', 
                    body: JSON.stringify(data)
            
                });
                console.log(response);
                if (response.ok) {
                    const responseData = await response.json();
                    alert(responseData.message); // Display success message
                    window.location.href = '../pages/dashboard.html'; // Redirect to dashboard
                } else {
                    const errorData = await response.json();
                    alert(errorData.error || 'Login failed. Please try again.');
                }
            } catch (err) {
                console.error('Error during login:', err);
                alert('An error occurred while logging in. Please try again.');
            }
        } 
        else {
            alert('Invalid email or password. Please try again.');
        }    
        });
    }
});
