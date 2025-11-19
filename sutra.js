const productCards = document.querySelectorAll(".posters");
const navButtons = document.querySelectorAll("#navbarItems p");
const exploreBtn = document.querySelector("#exploreBtn");
const cartBtn = document.querySelector("#cart");
const cartBackdrop = document.querySelector("#cartBackdrop");
const cartSection = document.querySelector("#cartSection");
const continueShopping = document.querySelector("#continueShopping");
const cartNum = document.querySelector("#cartItems");
const posterArea = document.querySelector("#postersArea");
const cartMinimizer = document.querySelector("#cartMinimizer");
const cartItemList = document.querySelector("#cartItemList");
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
        top: 0,
        behavior: "smooth"
    });
});

navButtons[1].addEventListener("click", () => {
    window.scrollTo({
        top: 970,
        behavior: "smooth"
    });
});

navButtons[2].addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

navButtons[3].addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

exploreBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 970,
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

cartBackdrop.addEventListener("click", (e) => {
    if (e.target === cartBackdrop) {
        cartSection.classList.add("-right-[576px]");
        cartSection.classList.remove("right-0");
        setTimeout(() => {
            cartBackdrop.classList.add("hidden");
        }, 100);
    }
});

cartMinimizer.addEventListener("click", () => {
    cartSection.classList.add("-right-[576px]");
    cartSection.classList.remove("right-0");
    setTimeout(() => {
        cartBackdrop.classList.add("hidden");
    }, 100);
});

continueShopping.addEventListener("click", () => {
    cartSection.classList.add("-right-[576px]");
    cartSection.classList.remove("right-0");
    setTimeout(() => {
        cartBackdrop.classList.add("hidden");
    }, 100);
});

posterArea.addEventListener("click", (e) => {
    const posterCard = e.target.closest(".posters")
    const addToCartBtn = e.target.closest(".addToCart");
    const cartItemList = document.querySelector("#cartItemList");
    const emptyCart = document.querySelector("#emptyCart");
    if (addToCartBtn && posterCard) {
        const itemTitle = posterCard.querySelector("#itemTitle").textContent;
        cartItems++;

        if (cartItems === 1) {
            cartNum.classList.remove("hidden");
            cartNum.classList.add("flex");
            cartItemList.classList.remove("hidden");
            emptyCart.classList.add("hidden");
        }

        const existingItem = findCartItem(itemTitle);
        if (existingItem) {
            const quantity = existingItem.querySelector("span");
            let currentQty = parseInt(quantity.textContent);
            quantity.textContent = ++currentQty;
        }
        else {
            addToCart(posterCard);
        }

        cartNum.textContent = cartItems;
    }
});

function addToCart(posterCard) {
    const cartItems = document.querySelector("#cartItemList");

    const cardTemplate = document.querySelector("#cartItem");
    const clone = cardTemplate.content.cloneNode(true);

    const Title = clone.querySelector("#cartItemTitle");
    const SubTitle = clone.querySelector("#cartItemSubTitle");
    const poster = clone.querySelector("#cartItemImg");
    const price = clone.querySelector("#cartItemPrice");

    Title.textContent = posterCard.querySelector("#itemTitle").textContent;
    SubTitle.textContent = posterCard.querySelector("#itemSubTitle").textContent;
    poster.src = posterCard.querySelector("#itemPoster").src;
    price.textContent = posterCard.querySelector("#itemPrice div:first-child").textContent;

    cartItems.append(clone);
    
    let subTotalCount = 0; 
    subTotalCount += (parseFloat(price.textContent.slice(1)) - 0.18*parseFloat(price.textContent.slice(1)));
    const subTotal = document.querySelector("#subTotal");
    subTotal.textContent = subTotalCount.toFixed(2);
};

function findCartItem(title) {
    const cartItems = document.querySelector("#cartItemList");
    const allCartItems = cartItems.querySelectorAll("#cartItemTitle");

    for (let i = 0; i < allCartItems.length; i++) {
        if (allCartItems[i].textContent === title) {
            return allCartItems[i].closest(".cartItem");
        }
    }

    return null;
};

function removeFromCart(cartItem) {
    const cartItemList = document.querySelector("#cartItemList");
    const emptyCart = document.querySelector("#emptyCart");

    cartItem.remove();
    cartItems--;


    if (cartItems <= 0) {
        cartNum.classList.add("hidden");
        cartItemList.classList.add("hidden");
        emptyCart.classList.remove("hidden");
    }

    cartNum.textContent = cartItems;
}

cartItemList.addEventListener("click", (e) => {
    const cartItem = e.target.closest(".cartItem");

    if (!cartItem) return;
    const reduceBtn = e.target.closest("#reduceBtn");
    const addBtn = e.target.closest("#addBtn");
    const itemTitle = cartItem.querySelector("#cartItemTitle").textContent;
    const existingItem = findCartItem(itemTitle);
    const quantity = existingItem.querySelector("span");
    let currentQty = parseInt(quantity.textContent);

    if (addBtn) {
        quantity.textContent = ++currentQty;
        cartItems++;
        cartNum.textContent = cartItems;
    }
    else if (reduceBtn) {
        if (currentQty >= 2) {
            quantity.textContent = --currentQty;
            cartItems--;
            cartNum.textContent = cartItems;
        }
        else {
            removeFromCart(cartItem);
        }
    }

});

// todo - update the subtotal and other counts correctly