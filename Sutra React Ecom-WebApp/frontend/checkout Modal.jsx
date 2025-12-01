{
    checkoutOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-1000 backdrop-brightness-55">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 max-h-[90vh] shadow-lg flex flex-col gap-4 w-full overflow-y-auto max-w-2xl sm:max-w-lg rounded-xl">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Checkout</h3>
                    <button
                        onClick={resetCheckout}
                        className="transition-colors duration-200 ease-in-out rounded-sm hover:bg-gray-200 cursor-pointer size-6 flex justify-center items-center"
                    >
                        ✕
                    </button>
                </div>

                {/* PROGRESS STEPS */}
                <div className="flex items-center justify-between py-2 text-sm">
                    {["Shipping", "Payment", "Review", "Complete"].map((label, i) => (
                        <div
                            key={label}
                            className={`flex flex-col items-center gap-1 ${checkoutStep >= i + 1 ? "text-[#f97316]" : "text-gray-400"
                                }`}
                        >
                            <div
                                className={`h-9 w-9 rounded-full flex items-center justify-center border ${checkoutStep >= i + 1 ? "border-[#f97316]" : "border-gray-300"
                                    }`}
                            >
                                {i + 1}
                            </div>
                            <p className="text-xs">{label}</p>
                        </div>
                    ))}
                </div>

                {/* STEP CONTENT */}
                {checkoutStep === 1 && (
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg text-[#111111] mb-2">
                            Shipping Information
                        </h3>

                        <input
                            type="text"
                            placeholder="Full Name"
                            className="mt-1 px-3 py-2 bg-gray-100 rounded-lg text-sm"
                            value={shippingInfo.name}
                            onChange={(e) =>
                                setShippingInfo({ ...shippingInfo, name: e.target.value })
                            }
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="px-3 py-2 bg-gray-100 rounded-lg text-sm"
                            value={shippingInfo.email}
                            onChange={(e) =>
                                setShippingInfo({ ...shippingInfo, email: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="px-3 py-2 bg-gray-100 rounded-lg text-sm"
                            value={shippingInfo.phone}
                            onChange={(e) =>
                                setShippingInfo({ ...shippingInfo, phone: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Address"
                            className="px-3 py-2 bg-gray-100 rounded-lg text-sm"
                            value={shippingInfo.address}
                            onChange={(e) =>
                                setShippingInfo({ ...shippingInfo, address: e.target.value })
                            }
                        />

                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="City"
                                className="px-3 py-2 bg-gray-100 rounded-lg text-sm w-1/2"
                                value={shippingInfo.city}
                                onChange={(e) =>
                                    setShippingInfo({ ...shippingInfo, city: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="State"
                                className="px-3 py-2 bg-gray-100 rounded-lg text-sm w-1/2"
                                value={shippingInfo.state}
                                onChange={(e) =>
                                    setShippingInfo({ ...shippingInfo, state: e.target.value })
                                }
                            />
                        </div>
                    </div>
                )}

                {checkoutStep === 2 && (
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg text-[#111111] mb-2">Payment Method</h3>

                        {/* Payment method selection */}
                        <div className="flex flex-col gap-2">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod("card")}
                                className={`flex items-center border rounded-xl p-3 justify-between ${paymentMethod === "card"
                                        ? "border-[#f97316] bg-orange-50"
                                        : "border-gray-200"
                                    }`}
                            >
                                <span>Credit / Debit Card</span>
                                <span className="text-xs text-gray-500">Visa, MasterCard, RuPay</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setPaymentMethod("upi")}
                                className={`flex items-center border rounded-xl p-3 justify-between ${paymentMethod === "upi"
                                        ? "border-[#f97316] bg-orange-50"
                                        : "border-gray-200"
                                    }`}
                            >
                                <span>UPI Payment</span>
                                <span className="text-xs text-gray-500">GPay, PhonePe, Paytm</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setPaymentMethod("cash")}
                                className={`flex items-center border rounded-xl p-3 justify-between ${paymentMethod === "cash"
                                        ? "border-[#f97316] bg-orange-50"
                                        : "border-gray-200"
                                    }`}
                            >
                                <span>Cash on Delivery</span>
                                <span className="text-xs text-gray-500">
                                    Pay when you receive
                                </span>
                            </button>
                        </div>

                        {/* Payment details */}
                        {paymentMethod === "card" && (
                            <div className="mt-4 flex flex-col gap-3">
                                <input
                                    type="text"
                                    placeholder="Card Number"
                                    className="px-3 py-2 bg-gray-100 rounded-lg text-sm"
                                    value={cardInfo.number}
                                    onChange={(e) =>
                                        setCardInfo({ ...cardInfo, number: e.target.value })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Cardholder Name"
                                    className="px-3 py-2 bg-gray-100 rounded-lg text-sm"
                                    value={cardInfo.name}
                                    onChange={(e) =>
                                        setCardInfo({ ...cardInfo, name: e.target.value })
                                    }
                                />
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        className="px-3 py-2 bg-gray-100 rounded-lg text-sm w-1/2"
                                        value={cardInfo.expiry}
                                        onChange={(e) =>
                                            setCardInfo({ ...cardInfo, expiry: e.target.value })
                                        }
                                    />
                                    <input
                                        type="text"
                                        placeholder="CVV"
                                        className="px-3 py-2 bg-gray-100 rounded-lg text-sm w-1/2"
                                        value={cardInfo.cvv}
                                        onChange={(e) =>
                                            setCardInfo({ ...cardInfo, cvv: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                        )}

                        {paymentMethod === "upi" && (
                            <div className="mt-4 flex flex-col gap-3">
                                <input
                                    type="text"
                                    placeholder="yourname@upi"
                                    className="px-3 py-2 bg-gray-100 rounded-lg text-sm"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                />
                                <p className="text-xs text-gray-500">
                                    You will receive a collect request on your UPI app.
                                </p>
                            </div>
                        )}

                        {paymentMethod === "cash" && (
                            <div className="mt-4 flex flex-col gap-3">
                                <textarea
                                    rows={2}
                                    placeholder="Any delivery notes (optional)"
                                    className="px-3 py-2 bg-gray-100 rounded-lg text-sm"
                                    value={cashNote}
                                    onChange={(e) => setCashNote(e.target.value)}
                                />
                                <p className="text-xs text-gray-500">
                                    Please keep the approximate amount ready at delivery.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {checkoutStep === 3 && (
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg text-[#111111] mb-2">Review Order</h3>

                        {/* Shipping summary */}
                        <div className="border border-gray-200 rounded-lg p-3 text-sm">
                            <h4 className="font-medium mb-2">Shipping</h4>
                            <p>{shippingInfo.name}</p>
                            <p>{shippingInfo.address}</p>
                            <p>
                                {shippingInfo.city} {shippingInfo.state}
                            </p>
                            <p className="mt-1 text-gray-500">
                                {shippingInfo.email} · {shippingInfo.phone}
                            </p>
                        </div>

                        {/* Payment summary */}
                        <div className="border border-gray-200 rounded-lg p-3 text-sm">
                            <h4 className="font-medium mb-2">Payment</h4>
                            <p className="capitalize">{paymentMethod}</p>
                            {paymentMethod === "card" && cardInfo.number && (
                                <p className="text-gray-500">
                                    **** **** **** {cardInfo.number.slice(-4)}
                                </p>
                            )}
                            {paymentMethod === "upi" && upiId && (
                                <p className="text-gray-500">{upiId}</p>
                            )}
                        </div>

                        {/* Order summary */}
                        <div className="border border-gray-200 rounded-lg p-3 text-sm">
                            <h4 className="font-medium mb-2">Order Summary</h4>
                            {/* Static example items for now */}
                            <div className="flex justify-between mb-1">
                                <span>You Become What You Think × 1</span>
                                <span>₹129</span>
                            </div>
                            <div className="flex justify-between mb-1">
                                <span>Growth Over Comfort × 1</span>
                                <span>₹129</span>
                            </div>

                            <div className="border-t border-gray-200 mt-2 pt-2 space-y-1">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>₹{shippingCost}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>GST (18%)</span>
                                    <span>₹{gst}</span>
                                </div>
                                <div className="flex justify-between pt-2 text-base font-semibold">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {checkoutStep === 4 && (
                    <div className="flex flex-col items-center gap-3 py-6">
                        <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mb-2">
                            <span className="text-2xl">✅</span>
                        </div>
                        <h3 className="text-lg font-semibold">Order Placed!</h3>
                        <p className="text-sm text-gray-500 text-center max-w-sm">
                            Thank you for ordering Sanskrit posters from SUTRA. You’ll
                            receive a confirmation email shortly with your order details.
                        </p>
                        <button
                            onClick={resetCheckout}
                            className="mt-2 px-5 py-2 rounded-lg bg-[#f97316] text-white text-sm hover:bg-[#ea580c]"
                        >
                            Close
                        </button>
                    </div>
                )}

                {/* FOOTER BUTTONS */}
                {checkoutStep < 4 && (
                    <div className="flex justify-between pt-4">
                        {checkoutStep > 1 ? (
                            <button
                                onClick={goBack}
                                className="h-9 px-4 rounded-lg bg-gray-200 text-[#111111] font-medium hover:bg-gray-300"
                            >
                                Back
                            </button>
                        ) : (
                            <button
                                className="h-9 px-4 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed"
                                disabled
                            >
                                Back
                            </button>
                        )}

                        <button
                            onClick={goNext}
                            className="h-9 px-4 rounded-lg bg-[#f97316] text-white font-medium hover:bg-[#ea580c]"
                        >
                            {checkoutStep === 3 ? "Place Order" : "Continue"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
