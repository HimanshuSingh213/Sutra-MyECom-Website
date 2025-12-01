import { useState } from "react";
import React from "react";
import { useCart } from "../context/CartContext";

function ProductCard({
    title,
    subtitle,
    poster,
    price
}) {

    // added item to cart message 
    const [added, setAdded] = useState(false);

    const [hover, setHover] = useState(false);
    const { addToCart } = useCart();

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`flex flex-col gap-7 overflow-hidden rounded-2xl posters w-full bg-white transition-all duration-300 ease-in-out hover:shadow-lg shadow-md lg:shadow-none `}>
            <div className="h-[540px] overflow-hidden z-20 flex items-center justify-center w-full ">
                <img
                    loading="lazy"
                    src={poster}
                    alt={title}
                    className={`transition-all duration-400 ease-in-out overflow-hidden object-cover h-[540px] object-center ${hover === true ? "scale-105" : ""}`}
                />
            </div>
            <div className="p-4">
                <div className="mb-3">
                    <h3 className="text-base mb-1 h-6 font-medium">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {subtitle}
                    </p>
                </div>
                <div className="flex justify-between py-2 items-center">
                    <div>₹{price}</div>
                    <div
                        onClick={() => {
                            addToCart({ title, subtitle, price, poster })
                            setAdded(true);
                            setTimeout(() => setAdded(false), 800);
                        }}
                        className="rounded-2xl bg-[#f97316] px-6 h-8 text-sm text-white font-medium flex items-center justify-center hover:bg-[#ea580c] active:scale-95 transition-all duration-150 ease-in-out">
                            {added ? "✓ Added" : "Add to Cart"}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductCard;