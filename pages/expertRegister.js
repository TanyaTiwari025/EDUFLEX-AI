document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("expertForm");
  const submitBtn = form.querySelector("button[type='submit']");
  const responseMessage = document.getElementById("responseMessage");
  const expertList = document.getElementById("expert-list");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const expertise = document.getElementById("expertise").value.trim();
    const linkedin = document.getElementById("linkedin").value.trim();

    try {
      const response = await fetch("http://localhost:3000/api/pages/expert/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ fullName, email, expertise, linkedin })
      });

      const data = await response.json();

      if (response.ok) {
        responseMessage.textContent = data.message || "Registered successfully!";
        responseMessage.style.color = "green";

        const expertCard = document.createElement("div");
        expertCard.className = "expert-card";
        expertCard.innerHTML = `
          <img src="../images/default.jpg" alt="${fullName}" width="100">
          <h3>${fullName}</h3>
          <p>Expert in ${expertise}</p>
          <p>Connect on <a href="${linkedin}" target="_blank">LinkedIn</a></p>
          <button class="request-btn" data-expert="${fullName}">Request Consultation</button>
        `;

        if (expertList) {
          expertList.appendChild(expertCard);
        }
        form.reset();
      } else {
        responseMessage.textContent = data.error || "Failed to register.";
        responseMessage.style.color = "red";
      }

    } catch (error) {
      console.error("❌ Fetch Error:", error);
      responseMessage.textContent = "Server error. Please try again later.";
      responseMessage.style.color = "red";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Register";
    }
  });

  // Load existing experts
  fetch("http://localhost:3000/api/pages/expert/all")
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) return;

      data.forEach(expert => {
        const expertCard = document.createElement("div");
        expertCard.className = "expert-card";
        expertCard.innerHTML = `
          <img src="../images/default.jpg" alt="${expert.fullName}" width="100">
          <h3>${expert.fullName}</h3>
          <p>Expert in ${expert.expertise}</p>
          <p>Connect on <a href="${expert.linkedin}" target="_blank">LinkedIn</a></p>
          <button class="request-btn" data-expert="${expert.fullName}">Request Consultation</button>
        `;
        expertList.appendChild(expertCard);
      });
    })
    .catch(err => {
      console.error("❌ Failed to load experts:", err);
    });
});
