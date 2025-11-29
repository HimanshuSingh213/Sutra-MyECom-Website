{
    checkoutOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-1000 backdrop-brightness-55">

            {/* Checkout Container */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 max-h-[90vh] shadow-lg flex flex-col gap-4 w-full overflow-hidden max-w-2xl sm:max-w-lg rounded-xl"
            >

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Checkout</h3>

                    {/* Close Button */}
                    <button
                        onClick={() => setCheckoutOpen(false)}
                        className="transition-colors duration-200 ease-in-out rounded-sm hover:bg-gray-200 cursor-pointer size-6 flex justify-center items-center"
                    >
                        <span className="text-xl">✕</span>
                    </button>
                </div>

                {/* PROGRESS STEPS — UI Only */}
                <div>
                    <div className="line mb-4 w-full overflow-hidden rounded-full h-2 bg-[#03021333]">
                        <div className="h-2 w-full bg-[#030213] -translate-x-3/4"></div>
                    </div>

                    <div className="flex items-center w-full justify-between">

                        {/* STEP 1 */}
                        <div className="flex flex-1 items-center gap-2 flex-col">
                            <div className={`h-10 w-10 flex justify-center items-center rounded-full
              ${checkoutStep === 1 ? "text-white bg-[#f97316]" : "text-gray-400 bg-gray-200"}
            `}>
                                🛻
                            </div>
                            <p className={`text-xs ${checkoutStep === 1 ? "text-[#f97316]" : "text-gray-400"}`}>
                                Shipping
                            </p>
                        </div>

                        {/* STEP 2 */}
                        <div className="flex flex-1 items-center gap-2 flex-col">
                            <div className={`h-10 w-10 flex justify-center items-center rounded-full
              ${checkoutStep === 2 ? "text-white bg-[#f97316]" : "text-gray-400 bg-gray-200"}
            `}>
                                💳
                            </div>
                            <p className={`text-xs ${checkoutStep === 2 ? "text-[#f97316]" : "text-gray-400"}`}>
                                Payment
                            </p>
                        </div>

                        {/* STEP 3 */}
                        <div className="flex flex-1 items-center gap-2 flex-col">
                            <div className={`h-10 w-10 flex justify-center items-center rounded-full
              ${checkoutStep === 3 ? "text-white bg-[#f97316]" : "text-gray-400 bg-gray-200"}
            `}>
                                📦
                            </div>
                            <p className={`text-xs ${checkoutStep === 3 ? "text-[#f97316]" : "text-gray-400"}`}>
                                Review
                            </p>
                        </div>

                        {/* STEP 4 */}
                        <div className="flex flex-1 items-center gap-2 flex-col">
                            <div className={`h-10 w-10 flex justify-center items-center rounded-full
              ${checkoutStep === 4 ? "text-white bg-[#22c55e]" : "text-gray-400 bg-gray-200"}
            `}>
                                ✔
                            </div>
                            <p className={`text-xs ${checkoutStep === 4 ? "text-[#22c55e]" : "text-gray-400"}`}>
                                Complete
                            </p>
                        </div>

                    </div>
                </div>

                <div className="border h-0 w-full border-gray-200"></div>

                {/* STEP CONTENT — now this is where you redesign */}
                <div className="py-4 overflow-y-auto custom-scroll">

                    {/* STEP 1 UI */}
                    {checkoutStep === 1 && (
                        <div className="flex flex-col gap-3">
                            <h3 className="text-lg text-[#111]">Shipping Information</h3>

                            <input
                                type="text"
                                placeholder="Full Name"
                                className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm h-9"
                                value={shippingInfo.name}
                                onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                            />

                            {/* Continue same pattern for other inputs */}
                        </div>
                    )}

                    {/* STEP 2 UI */}
                    {checkoutStep === 2 && (
                        <div>
                            <h3 className="text-lg text-[#111111]">Payment Method</h3>

                            <button
                                onClick={() => setPaymentMethod("card")}
                                className="flex items-center border border-gray-200 rounded-xl p-4"
                            >
                                Credit / Debit Card
                            </button>

                            <button
                                onClick={() => setPaymentMethod("upi")}
                                className="flex items-center border border-gray-200 rounded-xl p-4"
                            >
                                UPI Payment
                            </button>

                            <button
                                onClick={() => setPaymentMethod("cash")}
                                className="flex items-center border border-gray-200 rounded-xl p-4"
                            >
                                Cash on Delivery
                            </button>
                        </div>
                    )}

                    {/* STEP 3 UI */}
                    {checkoutStep === 3 && (
                        <div>
                            <h3 className="text-lg font-medium">Review Order</h3>
                        </div>
                    )}

                    {/* STEP 4 UI */}
                    {checkoutStep === 4 && (
                        <div className="flex flex-col items-center justify-center gap-4 py-6">
                            <h2 className="text-xl font-semibold text-green-600">Order Placed!</h2>
                            <button
                                className="px-6 py-2 rounded-lg bg-[#f97316] text-white"
                                onClick={() => setCheckoutOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    )}

                </div>

                <div className="border h-0 w-full border-gray-200"></div>

                {/* FOOTER BUTTONS */}
                <div className="pt-4 w-full flex justify-between items-center">
                    <button
                        onClick={() => setCheckoutStep((s) => Math.max(1, s - 1))}
                        className="flex items-center justify-center h-9 w-1/6 hover:bg-gray-100 bg-white border border-gray-300 rounded-lg text-[#111111] font-medium"
                    >
                        Back
                    </button>

                    <button
                        onClick={() => setCheckoutStep((s) => Math.min(4, s + 1))}
                        className="checkout h-9 w-1/3 rounded-lg bg-[#f97316] text-white font-medium hover:bg-[#ea580c]"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}
