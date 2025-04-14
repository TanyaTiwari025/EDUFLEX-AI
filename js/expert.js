// script.js
function subscribe(plan) {
    alert(`You have selected the ${plan} plan. Proceeding to payment...`);
    window.location.href = "payment_page.html?plan=" + plan;
}

function openConsultationForm(expert) {
    document.getElementById("consultation-form").style.display = "block";
    document.getElementById("consultation-form").scrollIntoView({ behavior: "smooth" });
    document.getElementById("expert-name").value = expert.fullName;
    document.getElementById("expert-email").value = expert.email;
  }
  
  function closeConsultationForm() {
    document.getElementById("consultation-form").style.display = "none";
  }
  
  document.getElementById("consultationRequestForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const data = {
      studentName: document.getElementById("student-name").value,
      studentEmail: document.getElementById("student-email").value,
      service: document.getElementById("service").value,
      expertName: document.getElementById("expert-name").value,
      expertEmail: document.getElementById("expert-email").value,
    };
  
    try {
      const res = await fetch("http://localhost:3000/api/pages/email/send-consultation-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
  
      const result = await res.json();
      alert(result.message || "Email sent!");
      closeConsultationForm();
    } catch (err) {
      alert("Failed to send request");
    }
  });
  