const productCards = document.querySelectorAll(".posters");
const navButtons = document.querySelectorAll("#navbarItems p");
const exploreBtn = document.querySelector("#exploreBtn");
const cartBtn = document.querySelector("#cart");
const cartBackdrop = document.querySelector("#cartBackdrop");
const cartSection = document.querySelector("#cartSection");
const continueShopping = document.querySelector("#continueShopping");
const cartNum = document.querySelector("#cartItems");
let cartItems = 0;

productCards.forEach(card => {
    const poster = card.querySelector("img");
    card.addEventListener("mouseenter", () => {

        poster.style.scale = "1.05";
    });
    card.addEventListener("mouseleave", () => {

        poster.style.scale = "";
    });
});

navButtons[0].addEventListener("click", () => {
    window.scrollTo({
        top : 0,
        behavior: "smooth"
    });
});

navButtons[1].addEventListener("click", () => {
    window.scrollTo({
        top : 970,
        behavior: "smooth"
    });
});

navButtons[2].addEventListener("click", () => {
    window.scrollTo({
        top : 0,
        behavior: "smooth"
    });
});

navButtons[3].addEventListener("click", () => {
    window.scrollTo({
        top : 0,
        behavior: "smooth"
    });
});

exploreBtn.addEventListener("click", () => {
    window.scrollTo({
        top : 970,
        behavior: "smooth"
    });
});

window.addEventListener("DOMContentLoaded", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
});

cartBtn.addEventListener("click", () => {
    cartBackdrop.classList.toggle("hidden");
    setTimeout(() => {
        cartSection.classList.toggle("-right-[576px]")
        cartSection.classList.add("right-0")
    }, 0);
});

cartBackdrop.addEventListener("click", () => {
    cartSection.classList.add("-right-[576px]");
    cartSection.classList.remove("right-0");
    setTimeout(() => {
        cartBackdrop.classList.toggle("hidden");
    }, 100);
});

continueShopping.addEventListener("click", () => {
    cartSection.classList.add("-right-[576px]");
    cartSection.classList.remove("right-0");
    setTimeout(() => {
        cartBackdrop.classList.remove("hidden");
    }, 100);
});

productCards.forEach(card => {
    const addToCartBtn = card.querySelector(".addToCart");
    addToCartBtn.addEventListener("click", () => {
        cartItems++;
        if (cartItems === 1) {   
            cartNum.classList.remove("hidden");
            cartNum.classList.add("flex");
        }
        cartNum.textContent = cartItems;
    });
   
});