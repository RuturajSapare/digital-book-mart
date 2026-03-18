const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const cartClose = document.querySelector('#cart-close');
cartIcon.addEventListener('click', () => cart.classList.add('active'));
cartClose.addEventListener('click', () => cart.classList.remove('active'));

const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});

const cartContent = document.querySelector(".cart-content");
const addToCart = productBox => {
     const productImgsrc = productBox.querySelector("img").src;
     const productTitle = productBox.querySelector(".product-title").textContent;
     const productPrice = productBox.querySelector(".price").textContent;

    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for(let item of cartItems){
        if(item.textContent === productTitle){
            alert("This item is already in your cart.");
            return;
        } 
    }

     const cartBox = document.createElement("div");
     cartBox.classList.add("cart-box");
     cartBox.innerHTML = `
     <img src="${productImgsrc}" class="cart-img">
     <div class="cart-detail">
          <h2 class="cart-product-title">${productTitle}</h2>
          <span class="cart-price">${productPrice}</span>
          <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button>
          </div>
    </div>
    <i class="ri-delete-bin-line cart-remove"></i>
     `;

     cartContent.appendChild(cartBox);

     cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);

        updateTotalPrice();
     });

     cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if(event.target.id === "decrement" && quantity > 1){
            quantity--;
            if (quantity === 1) {
                decrementButton.style.pointerEvents = "#999";
            }
        } else if (event.target.id === "increment") {
            quantity++;
            decrementButton.style.pointerEvents = "#333";
        }

        numberElement.textContent = quantity;

        updateTotalPrice();

     });
        
        updateCartCount(1);

        updateTotalPrice();
};

const updateTotalPrice = () =>{
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartbox => {
        const PriceElement = cartbox.querySelector(".cart-price");
        const quantityElement = cartbox.querySelector(".number");
        const price = parseFloat(PriceElement.textContent.replace("₹", ""));
        const quantity = quantityElement.textContent;
        total += price * quantity;
    });
    totalPriceElement.textContent = `₹${total}`;
};

let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else{
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
};

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
        alert("Your cart is empty. Please add items to your cart before buying.");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);

    updateTotalPrice();

    alert("Thank you for your purchase!");

     // Save cart details in localStorage for the payment page
     let cartItems = [];
     cartBoxes.forEach(cartBox => {
         let item = {
             title: cartBox.querySelector(".cart-product-title").textContent,
             price: cartBox.querySelector(".cart-price").textContent,
             quantity: cartBox.querySelector(".number").textContent
         };
         cartItems.push(item);
     });
 
     localStorage.setItem("cartItems", JSON.stringify(cartItems));
 
     // Redirect to payment page
     window.location.href = "payment.html";

});

// Redirect to homepage after successful payment
document.addEventListener("DOMContentLoaded", function() {
    const paymentForm = document.querySelector("form");
    if (paymentForm) {
        paymentForm.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Payment successful! Redirecting to homepage...");
            window.location.href = "index.html";
        });
    }
});


    
   





