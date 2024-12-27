// script.js
function subscribe(plan) {
    alert(`You have selected the ${plan} plan. Proceeding to payment...`);
    window.location.href = "payment_page.html?plan=" + plan;
}
