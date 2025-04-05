// script.js
function subscribe(plan) {
    alert(`You have selected the ${plan} plan. Proceeding to payment...`);
    window.location.href = "payment_page.html?plan=" + plan;
}
// Function to submit the consultation request form
document.addEventListener("DOMContentLoaded", function () {
    const consultationForm = document.getElementById("consultation-form");

    if (consultationForm) {
        consultationForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent default form submission

            // Get form data
            const expertEmail = document.getElementById("expert-email").value;
            const studentName = document.getElementById("student-name").value;
            const serviceRequested = document.getElementById("service-requested").value;

            // Prepare the request payload
            const requestData = {
                expertEmail,
                studentName,
                serviceRequested,
            };

            try {
                // Send data to the backend API
                const response = await fetch("/send-consultation-request", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                });

                // Handle response
                if (response.ok) {
                    alert("Your request has been sent successfully!");
                    consultationForm.reset(); // Clear form fields
                } else {
                    alert("Error sending request. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An unexpected error occurred. Please try again later.");
            }
        });
    }
});