import React from 'react'
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();


export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("sutra_cart");
        if (saved) setCartItems(JSON.parse(saved));
    }, [])

    useEffect(() => {
        localStorage.setItem("sutra_cart", JSON.stringify(cartItems));
    }, [cartItems])

    // Adding Items to Cart
    const addToCart = (item) => {
        setCartItems((prev) => {
            const existing = prev.find((p) => p.title === item.title);

            if (existing)
                return prev.map((p) => p.title === item.title ? { ...p, qty: p.qty + 1 } : p
                );


            return [...prev, { ...item, qty: 1 }];
        })

    }

    // Removing Items from Cart 
    const removeFromCart = (title) => {
        setCartItems((prev) => prev.filter((p) => p.title !== title));
    }

    // Increasing Qty of Cart Items 
    const increaseQty = (title) => {
        setCartItems((prev) =>
            prev.map((p) => p.title === title ? { ...p, qty: p.qty + 1 } : p)
        )
    }


    // Decreasing Qty of Cart Items
    const decreaseQty = (title) => {
        setCartItems((prev) => {
            return (prev.map((p) => {
                if (p.title !== title) return p;

                const newQty = p.qty - 1;

                if (newQty < 1) return null;
                return { ...p, qty: newQty };

            }).filter(Boolean))
        });
    }


    // Calculating Subtotal 
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty, 0
    );

    // Total Item Count 
    const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);




    return (
        <CartContext.Provider value={{ cartItems, addToCart, increaseQty, decreaseQty, removeFromCart, subtotal, totalItems, }}>
            {children}
        </CartContext.Provider>
    )

}

export function useCart() {
    return useContext(CartContext);
}