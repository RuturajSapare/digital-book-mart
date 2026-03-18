document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector("form");
    let submitBtn = document.querySelector(".submit_btn");
    let monthSelect = document.querySelector(".inputBox select:nth-of-type(1)");
    let yearSelect = document.querySelector(".inputBox select:nth-of-type(2)");

    submitBtn.addEventListener("click", function (event) {
        let month = monthSelect.value;
        let year = yearSelect.value;

        // Remove existing error messages
        let existingError = document.querySelector(".error-message");
        if (existingError) {
            existingError.remove();
        }

        if (month === "" || year === "") {
            event.preventDefault(); // Prevent form submission

            let errorDiv = document.createElement("div");
            errorDiv.classList.add("error-message");
            errorDiv.style.color = "red";
            errorDiv.style.marginTop = "10px";
            errorDiv.textContent = "Please select both Expiration Month and Year.";

            submitBtn.parentNode.appendChild(errorDiv);
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector("form");
    let cartContainer = document.createElement("div");
    cartContainer.classList.add("cart-summary");
    form.prepend(cartContainer); // Add cart summary above the form

    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    
    if (cartItems && cartItems.length > 0) {
        cartContainer.innerHTML = "<h3>Order Summary</h3>";
        cartItems.forEach(item => {
            let itemDiv = document.createElement("p");
            itemDiv.textContent = `${item.title} - ${item.quantity} x ${item.price}`;
            cartContainer.appendChild(itemDiv);
        });
    }
});


// document.addEventListener("DOMContentLoaded", function () {
//     let submitBtn = document.querySelector(".submit_btn");

//     submitBtn.addEventListener("click", function (event) {
//         event.preventDefault(); // Prevent form submission

//         // Redirect to the front page
//         window.location.href = "index.html";
//     });
// });


// Redirect to homepage after successful payment//
const paymentForm = document.querySelector("form");
if (paymentForm) {
    paymentForm.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Payment successful! Redirecting to homepage...");
        window.location.href = "index.html";
    });
}
