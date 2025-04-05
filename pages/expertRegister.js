document.getElementById("expertForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const expertise = document.getElementById("expertise").value;
    const linkedin = document.getElementById("linkedin").value;

    const responseMessage = document.getElementById("responseMessage");

    try {
        const response = await fetch("http://localhost:3000/api/experts/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, expertise, linkedin })  // ✅ Correct Field Names
        });

        const data = await response.json();

        if (response.ok) {
            responseMessage.textContent = data.message;
            responseMessage.style.color = "green";
        } else {
            responseMessage.textContent = data.error;
            responseMessage.style.color = "red";
        }
    } catch (error) {
        console.error("❌ Fetch Error:", error);
        responseMessage.textContent = "Server error. Please try again later.";
        responseMessage.style.color = "red";
    }
});
