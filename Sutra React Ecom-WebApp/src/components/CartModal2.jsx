import { useCart } from "../context/CartContext";

export default function CartModal2({ open, onClose }) {
    const { cartItems, increaseQty, decreaseQty, removeFromCart, subtotal } = useCart();

    return (

        <div
            onClick={onClose}
            id="cartBackdrop"
            className={`fixed top-0 left-0 w-full h-full z-1000 transition-all duration-300 ${open ? "backdrop-brightness-55 pointer-events-auto" : "backdrop-brightness-100 pointer-events-none"}`}>

            {/* cart Section goes Here */}
            <div
                onClick={(e) => e.stopPropagation()}
                id="cartSection" className={`absolute w-[576px] h-full bg-white transition-all duration-300 ease-out ${open ? "right-0" : "-right-[576px]"}`}>

                <header className="flex justify-start items-center w-full gap-2 border-b border-b-gray-100 pt-6 px-6 pb-4 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className=" h-5 w-5 text-[#F97316]" aria-hidden="true">
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                        <path d="M3.103 6.034h17.794"></path>
                        <path
                            d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z">
                        </path>
                    </svg>
                    <p className="font-semibold">Shopping Cart</p>
                    <div
                        onClick={onClose}
                        id="cartMinimizer"
                        className="absolute right-5 top-6 h-6 w-6 z-1001 hover:bg-gray-100 rounded-full flex justify-center items-center size-6 transition-colors duration-200 ease-in-out cursor-pointer">
                        ✕
                    </div>
                </header>
                {/* cart item list */}
                {/* empty cart goes here */}
                {cartItems.length === 0 && (
                    <div id="emptyCart" className="h-full flex flex-col items-center justify-center">
                        <div className="h-23 w-23 rounded-full bg-gray-100 flex justify-center items-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="w-12 h-12 text-gray-300" aria-hidden="true">
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                                <path d="M3.103 6.034h17.794"></path>
                                <path
                                    d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z">
                                </path>
                            </svg>
                        </div>
                        <div className="flex flex-col items-center mb-4">
                            <h3 className="text-lg mb-2 text-[#111111] font-normal">Your cart is empty</h3>
                            <p className="text-sm text-gray-500" id="itemSubTitle">Add some beautiful Sanskrit posters to get started!</p>
                        </div>
                        <div onClick={onClose}
                            id="continueShopping"
                            className="h-9 py-2 px-4 mt-4 border border-gray-200 text-sm rounded-md flex justify-center items-center font-semibold hover:bg-gray-200 transition-colors duration-200 ease-in-out cursor-default">
                            Continue Shopping
                        </div>
                    </div>

                )}
                {/* empty cart ends here */}
                {/* cart item list */}
                <div id="cartItemList" className="px-6 h-57/100 overflow-y-scroll">
                    <div>
                        {cartItems.map((item, i) =>
                            <div key={i}
                                id="cartItem">
                                <div
                                    className="cartItem p-3 mt-3 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow duration-200 ease-in-out mb-4">
                                    <div className="flex gap-4 items-center h-24">
                                        <div className="left h-24 w-20 rounded-lg overflow-hidden shrink-0">
                                            <img id="cartItemImg" className="h-full w-full block object-cover object-center" src={item.poster}
                                                alt={item.title} />
                                        </div>
                                        <div className="right flex flex-col w-full h-full">
                                            <div className="mb-2 flex w-full h-full relative">
                                                <div className="pr-8 w-full h-12">
                                                    <h4 id="cartItemTitle" className="text-sm text-[#111]">{item.title}</h4>
                                                    <p id="cartItemSubTitle" className="text-xs text-gray-500">{item.subtitle}</p>
                                                </div>
                                                <div id="deleteBtn"
                                                    onClick={() => removeFromCart(item.title)}
                                                    className="size-8 flex items-center justify-center absolute right-0 top-0 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 ease-in-out">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                        className=" h-4 w-4" aria-hidden="true">
                                                        <path d="M10 11v6"></path>
                                                        <path d="M14 11v6"></path>
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                                                        <path d="M3 6h18"></path>
                                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex w-full justify-between items-center">
                                                {/* quantity addition/subtraction buttons */}
                                                <div className="border border-gray-200 rounded-lg w-fit flex items-center">
                                                    <button onClick={() => decreaseQty(item.title)}
                                                        id="reduceBtn"
                                                        className="size-7 flex items-center justify-center rounded-md hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                            className="lucide lucide-minus h-3 w-3" aria-hidden="true">
                                                            <path d="M5 12h14"></path>
                                                        </svg>
                                                    </button>
                                                    <span className="size-7 flex items-center justify-center">{item.qty}</span>
                                                    <button onClick={() => increaseQty(item.title)}
                                                        id="addBtn"
                                                        className="size-7 flex items-center justify-center rounded-md hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                            className="lucide lucide-plus h-3 w-3" aria-hidden="true">
                                                            <path d="M5 12h14"></path>
                                                            <path d="M12 5v14"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                                {/* price Tag */}
                                                <div id="cartItemPrice" className="text-sm">
                                                    ₹{item.price * item.qty}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {cartItems.length !== 0 && (
                        <div className="sumUp absolute bottom-0 left-0 w-full h-auto py-4 px-6 bg-gray-50 border-t border-t-gray-100 ">
                            <div className="top mb-4">
                                <div className="subTotal flex items-center justify-between mb-2 h-5 text-sm text-[#111111]">
                                    <div className="key text-gray-600">Subtotal</div>
                                    <div id="subTotal" className="value">₹{subtotal}</div>
                                </div>
                                <div className="shipping flex items-center justify-between mb-2 h-5 text-sm text-[#111111]">
                                    <div className="key text-gray-600">Shipping</div>
                                    <div
                                        className={`value ${subtotal >= 350 ? "text-green-600 font-medium" : ""}`}>{subtotal >= 350 ? "Free" : "₹61"}</div>
                                </div>
                                <div className="gst flex items-center justify-between mb-2 h-5 text-sm text-[#111111]">
                                    <div className="key text-gray-600">GST(18%)</div>
                                    <div id="gst" className="value">₹{(subtotal * 0.18).toFixed(2)}</div>
                                </div>
                                <div
                                    className="total flex items-center justify-between mb-2 text-lg pt-3 border-t border-t-gray-300 mt-2 text-[#111111]">
                                    <div className="key text-gray-600">Total</div>
                                    <div id="total" className="value text-2xl">
                                        ₹{Math.round(subtotal * 1.18 + (subtotal >= 350 ? 0 : 61))}
                                    </div>

                                </div>
                            </div>
                            <div className="bottom">
                                <button
                                    className="checkout h-12 w-full rounded-xl bg-[#f97316] text-white font-medium mb-4 hover:bg-[#ea580c] transition-colors duration-200 ease-in-out">
                                    Proceed to Checkout
                                </button>
                                <p className="text-xs text-gray-500 text-center">Secure checkout • Free shipping on orders over ₹349</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>



    );

}