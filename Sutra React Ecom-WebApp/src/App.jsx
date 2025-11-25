import React, { useEffect, useState } from "react";
import CartModal2 from "./components/CartModal2";
import { posters } from "./data/poster";
import ProductCard from "./components/ProductCards";
import { useCart } from "./context/CartContext";

export default function App() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, [])

  // Checkout state
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);

  const { totalItems } = useCart();

  // Shipping form state
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' | 'upi' | 'cash'
  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");

  // Fake order summary (for now you can change these)
  const subtotal = 129 * 2; // change later when cart logic is added
  const shippingCost = 59;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + shippingCost + gst;

  // STEP NAV HELPERS
  const goNext = () => {
    if (checkoutStep === 1) {
      if (
        !shippingInfo.name ||
        !shippingInfo.email ||
        !shippingInfo.phone ||
        !shippingInfo.address ||
        !shippingInfo.city ||
        !shippingInfo.state
      ) {
        alert("Please fill all shipping fields before continuing.");
        return;
      }
    }
    if (checkoutStep === 2) {
      if (paymentMethod === "card") {
        if (!cardInfo.number || !cardInfo.name || !cardInfo.expiry || !cardInfo.cvv) {
          alert("Please fill all card details.");
          return;
        }
      } else if (paymentMethod === "upi") {
        if (!upiId) {
          alert("Please enter your UPI ID.");
          return;
        }
      } else if (paymentMethod === "cash") {
        // optional: require nothing
      }
    }

    setCheckoutStep((s) => Math.min(s + 1, 4));
  };

  const goBack = () => {
    setCheckoutStep((s) => Math.max(s - 1, 1));
  };

  const resetCheckout = () => {
    setCheckoutOpen(false);
    setCheckoutStep(1);
  };



  return (
    <div className="cursor-default bg-white">
      {/* navBar Section  */}
      <div className="w-full bg-[#ffffffcc] fixed top-0 border-b border-b-gray-100 z-50 backdrop-blur-sm">
        <div className="flex justify-between px-5 py-3 max-w-[90vw] items-center box-border mx-auto my-0">
          {/* Logo */}
          <div 
          className="logo flex items-center justify-center">
            <svg
              onClick={() => window.scrollTo({
                top: 0,
                behavior: "smooth"
              })}
              className="h-16 w-auto cursor-pointer"
              viewBox="0 0 300 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <text
                x="50%"
                y="65"
                textAnchor="middle"
                fontSize="64"
                fill="#F97316"
              >
                सूत्र
              </text>
              <text
                x="50%"
                y="110"
                textAnchor="middle"
                fontFamily="Poppins, sans-serif"
                fontSize="20"
                fill="#111111"
                letterSpacing="3"
              >
                SUTRA
              </text>
              <line
                x1="90"
                y1="120"
                x2="210"
                y2="120"
                stroke="#F97316"
                strokeWidth="2"
                strokeLinecap="round"
              ></line>
            </svg>
          </div>

          {/* Navbar items */}
          <div className="flex gap-9 text-[#111]">
            <p onClick={() => window.scrollTo({
              top: 0,
              behavior: "smooth"
            })}
              className="text-sm cursor-pointer hover:text-[#f97316] transition-all duration-200 ease-in-out">
              Home
            </p>
            <p onClick={() => window.scrollTo({
              top: 970,
              behavior: "smooth"
            })}
              className="text-sm cursor-pointer hover:text-[#f97316] transition-all duration-200 ease-in-out">
              Posters
            </p>
            <p onClick={() => window.scrollTo({
              top: 0,
              behavior: "smooth"
            })}
              className="text-sm cursor-pointer hover:text-[#f97316] transition-all duration-200 ease-in-out">
              About
            </p>
            <p onClick={() => window.scrollTo({
              top: 0,
              behavior: "smooth"
            })}
              className="text-sm cursor-pointer hover:text-[#f97316] transition-all duration-200 ease-in-out">
              Contact
            </p>
          </div>

          {/* Search + cart */}
          <div className="flex gap-5">
            <button className="h-9 w-9 flex items-center justify-center hover:bg-gray-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m21 21-4.34-4.34"></path>
                <circle cx="11" cy="11" r="8"></circle>
              </svg>
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="h-9 w-9 flex items-center justify-center hover:bg-gray-50 rounded-lg relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              <span className={`absolute top-0 right-0 translate-x-2 -translate-y-1 rounded-md h-5 w-5 bg-[#f97316] text-white font-medium text-xs items-center justify-center ${totalItems === 0 ? "hidden" : "flex"}`}>
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* navBar ends */}

      {/* page main content start */}
      {/* Explore Section  */}
      <div className="justify-center max-w-6xl my-0 mx-auto">
        <div className="mt-22 py-20 flex gap-8 items-center">
          <div className="w-[50%] p-8">
            <p className="mb-5">Sanskrit Quotes for Your Space</p>
            <p className="mb-5">Calm, meaningful, timeless wall art.</p>
            <div onClick={() => window.scrollTo({
              top: 970,
              behavior: "smooth"
            })}
              className="bg-[#f97316] hover:bg-[#ea580c] transition-all duration-150 ease-in-out cursor-default h-12 px-9 py-6 rounded-4xl flex w-fit justify-center items-center text-white text-sm font-semibold">
              Explore Posters
            </div>
          </div>
          <div className="w-[50%] flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-[#F97316]/10 to-transparent blur-3xl"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-sm w-md">
                <img
                  src="https://images.unsplash.com/photo-1516715337554-9827022cdb29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Sanskrit Quote Poster Mockup"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Explore Section Ends */}

      {/* Section2 */}
      <div className="py-12 flex gap-4 justify-center">
        {["Peace", "Focus", "Wisdom", "Study", "Calm"].map((t) => (
          <p
            key={t}
            className="border text-[#111] py-2 px-5 font-medium text-sm border-gray-200 rounded-2xl hover:text-[#f97316] hover:border-[#f97316] transition-all duration-200 ease-in-out cursor-pointer"
          >
            {t}
          </p>
        ))}
      </div>
      {/* Section2 Ends here */}

      {/* Featured Posters */}
      <div className="w-full bg-gray-50">
        <div className="max-w-6xl my-0 mx-auto justify-center">
          <div className="py-16">
            <div className="mb-12">
              <h2 className="h-[30px] text-[20px] mb-3 text-[#111111] w-full text-center">
                Featured Posters
              </h2>
              <p className="h-6 text-base text-gray-600 w-full text-center">
                Handpicked quotes for your sanctuary
              </p>
            </div>

            <div className="px-4 py-10 grid grid-cols-2 sm:grid-cols-3 gap-8">

              {posters.map((item) => (
                <ProductCard
                  key={item.title}
                  title={item.title}
                  subtitle={item.subtitle}
                  price={item.price}
                  poster={item.poster}
                />
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white flex flex-col items-center p-12 my-0 mx-auto max-w-7xl">
        <div className="name flex items-center flex-col mb-8 w-full">
          <p className="tracking-wide text-[#111]">सूत्र</p>
          <p className="text-[#111] tracking-[0.2em] text-[10px] items-baseline">
            SUTRA
          </p>
        </div>
        <div className="text-center text-gray-600 text-sm w-full mb-8">
          Bordering timeless Sanskrit wisdom into modern spaces through
          minimal,
          <br /> thoughtfully designed wall art.
        </div>
        <div className="flex gap-5 items-center mb-8 w-full justify-center">
          <a
            href="#"
            className="text-[#111] hover:text-[#f97316] text-sm transition-all duration-200 ease-in-out"
          >
            About
          </a>
          <span className="text-gray-300 cursor-default">·</span>
          <a
            href="#"
            className="text-[#111] hover:text-[#f97316] text-sm transition-all duration-200 ease-in-out"
          >
            FAQ
          </a>
          <span className="text-gray-300 cursor-default">·</span>
          <a
            href="#"
            className="text-[#111] hover:text-[#f97316] text-sm transition-all duration-200 ease-in-out"
          >
            Contact
          </a>
        </div>
        <div className="flex gap-4 pb-8 items-center justify-center w-full border-b border-b-gray-200">
          <button className="border border-gray-200 cursor-pointer bg-white rounded-full h-9 w-9 flex items-center justify-center transition-all duration-200 ease-in-out hover:text-[#f97316] hover:border-[#f97316]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=" h-4 w-4"
              aria-hidden="true"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
          </button>

          <button className="border border-gray-200 cursor-pointer bg-white rounded-full h-9 w-9 flex items-center justify-center transition-all duration-200 ease-in-out hover:text-[#f97316] hover:border-[#f97316]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=" h-4 w-4"
              aria-hidden="true"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </button>

          <button className="border border-gray-200 cursor-pointer bg-white rounded-full h-9 w-9 flex items-center justify-center transition-all duration-200 ease-in-out hover:text-[#f97316] hover:border-[#f97316]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=" h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
              ></path>
            </svg>
          </button>
        </div>

        <div className="text-gray-400 text-[12px] w-full text-center mt-8">
          © 2025 SUTRA. All rights reserved.
        </div>

        {/* Manual Button for testing checkout section */}
        <button
          onClick={() => setCheckoutOpen(true)}
          className="mt-6 px-6 py-2 rounded-lg bg-[#f97316] text-white text-sm hover:bg-[#ea580c]"
        >
          Test Checkout Modal
        </button>

      </footer>

      {/* CHECKOUT MODAL */}
      {
        checkoutOpen && (
          <div className="fixed top-0 left-0 w-full h-full z-1000 backdrop-brightness-55">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 max-h-[90vh] shadow-lg flex flex-col gap-4 w-full overflow-y-auto max-w-2xl sm:max-w-lg rounded-xl">

              {/* Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Checkout</h3>
                <button
                  className="transition-colors duration-200 ease-in-out rounded-sm hover:bg-gray-200 cursor-default size-6 flex justify-center items-center"
                  onClick={resetCheckout}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-x h-5 w-5" aria-hidden="true">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>

                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between py-2 text-sm w-full">

                <div className="w-full">
                  <div className="line mb-4 w-full overflow-hidden rounded-full h-2 bg-[#03021333]">
                    <div
                      className={`h-2 w-full bg-[#030213] transition-transform duration-500`}
                      style={{
                        transform: `translateX(-${100 - checkoutStep * 25}%)`
                      }}
                    ></div>
                  </div>
                  {/* Step 1 */}
                  <div className="flex items-center w-full justify-between">
                    <div className="flex flex-1 items-center gap-2 flex-col">
                      <div className={`h-10 w-10 flex justify-center items-center text-white bg-[#f97316] rounded-full ${checkoutStep === 1 ? "text-[#f97316]" : "text-gray-400"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className="lucide lucide-truck h-5 w-5" aria-hidden="true">
                          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                          <path d="M15 18H9"></path>
                          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                          <circle cx="17" cy="18" r="2"></circle>
                          <circle cx="7" cy="18" r="2"></circle>
                        </svg>
                      </div>
                      <p className={`text-xs ${checkoutStep === 1 ? "text-[#f97316]" : "text-gray-400"}`}>Shipping</p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-1 items-center gap-2 flex-col">
                      <div className={`h-10 w-10 flex justify-center items-center rounded-full
                        ${checkoutStep === 2 ? "text-white bg-[#f97316]" : "text-gray-400 bg-gray-200"}
                        `}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className="lucide lucide-credit-card h-5 w-5" aria-hidden="true">
                          <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                          <line x1="2" x2="22" y1="10" y2="10"></line>
                        </svg>
                      </div>
                      <p className={`text-xs ${checkoutStep === 2 ? "text-[#f97316]" : "text-gray-400"}`}>
                        Payment</p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-1 items-center gap-2 flex-col">
                      <div className={`h-10 w-10 flex justify-center items-center rounded-full
                        ${checkoutStep === 3 ? "text-white bg-[#f97316]" : "text-gray-400 bg-gray-200"}
                        `}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className="lucide lucide-package h-5 w-5" aria-hidden="true">
                          <path
                            d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z">
                          </path>
                          <path d="M12 22V12"></path>
                          <polyline points="3.29 7 12 12 20.71 7"></polyline>
                          <path d="m7.5 4.27 9 5.15"></path>
                        </svg>
                      </div>
                      <p className="text-xs text-gray-400">Review</p>
                    </div>

                    {/* Step 4 */}
                    <div className="flex flex-1 items-center gap-2 flex-col">
                      <div className={`h-10 w-10 flex justify-center items-center rounded-full
                        ${checkoutStep === 4 ? "text-white bg-[#f97316]" : "text-gray-400 bg-gray-200"}
                        `}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className="lucide lucide-circle-check-big h-5 w-5" aria-hidden="true">
                          <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                          <path d="m9 11 3 3L22 4"></path>
                        </svg>
                      </div>
                      <p className="text-xs text-gray-400">Complete</p>
                    </div>
                  </div>
                </div>

              </div>
              {/* Progress Steps Ends Here */}
              <div className="border h-0 w-full border-gray-200"></div>

              {/* Step content */}
              <div className="py-4 overflow-y-auto custom-scroll">

                {/* STEP 1 UI */}
                {checkoutStep === 1 && (
                  <div className="flex flex-col w-full h-auto gap-3">
                    <h3 className="text-lg text-[#111]">Shipping Information</h3>

                    {/* Name Input */}
                    <div className="flex flex-col w-full h-auto">
                      <label className="flex items-start w-fit text-sm font-medium" for="name">Full Name *</label>
                      <input
                        type="text" id="name" required placeholder="RadheShyam"
                        className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0"
                        value={shippingInfo.name}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                      />
                    </div>

                    {/* Email and Phone no. Input*/}
                    <div className="flex items-center w-full h-auto gap-4">
                      <div className="flex flex-col w-1/2 h-auto">
                        <label className="flex items-start w-fit text-sm font-medium" for="email">Email *</label>
                        <input type="text" required id="email" placeholder="RadheShyam@gmail.com"
                          className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        />
                      </div>
                      <div className="flex flex-col w-1/2 h-auto">
                        <label className="flex items-start w-fit text-sm font-medium" for="phone">Phone No. *</label>
                        <input type="text" id="phone" placeholder="99711XXXXX" required
                          className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Address Input */}
                    <div className="flex flex-col w-full h-auto">
                      <label className="flex items-start w-fit text-sm font-medium" for="address">Address *</label>
                      <input type="text" id="address" required placeholder="Locality Address"
                        className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      />
                    </div>

                    {/* City and State Input */}
                    <div className="flex items-center w-full h-auto gap-4">
                      <div className="flex flex-col w-1/2 h-auto">
                        <label className="flex items-start w-fit text-sm font-medium" for="city">City *</label>
                        <input type="text" required id="city" placeholder="New Delhi"
                          className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        />
                      </div>
                      <div className="flex flex-col w-1/2 h-auto">
                        <label className="flex items-start w-fit text-sm font-medium" for="state">State *</label>
                        <input type="text" id="state" placeholder="NCT of Delhi" required
                          className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2 UI */}
                {checkoutStep === 2 && (
                  <div className="py-4 overflow-y-auto custom-scroll">
                    <div className="flex flex-col w-full h-auto gap-3">
                      <h3 className="text-lg text-[#111111]">Payment Method</h3>

                      {/* Payment Moethod Selection */}
                      {/* Payment through Card */}
                      <button id="card" className="flex items-center border border-gray-200 rounded-xl p-4"
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                      >
                        <div className="size-4 relative flex items-center justify-center mr-2 shadow-sm rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className={`fill-black block absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 ${paymentMethod === "card" ? "block" : "hidden"}`}>
                            <circle cx="12" cy="12" r="10"></circle>
                          </svg>
                        </div>
                        <h4 className="text-sm mr-2 w-9/10 text-left">Credit / Debit Card</h4>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className=" h-5 w-5 text-gray-400" aria-hidden="true">
                          <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                          <line x1="2" x2="22" y1="10" y2="10"></line>
                        </svg>
                      </button>

                      {/* Payment through Upi */}
                      <button id="online" className="flex items-center border border-gray-200 rounded-xl p-4"
                        type="button"
                        onClick={() => setPaymentMethod("upi")}
                      >
                        <div className="size-4 relative flex items-center justify-center mr-2 shadow-sm rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className={`fill-black block absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 ${paymentMethod === "upi" ? "block" : "hidden"}`}>
                            <circle cx="12" cy="12" r="10"></circle>
                          </svg>
                        </div>
                        <h4 className="text-sm mr-2 w-6/10 text-left">UPI Payment</h4>
                        <p className="text-sm text-gray-400 h-5">GPay, PhonePe, Paytm</p>
                      </button>

                      {/* Payment through Cash */}
                      <button id="cash" className="flex items-center border border-gray-200 rounded-xl p-4"
                        type="button"
                        onClick={() => setPaymentMethod("cash")}
                      >
                        <div className="size-4 relative flex items-center justify-center mr-2 shadow-sm rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className={`fill-black block absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 ${paymentMethod === "cash" ? "block" : "hidden"}`}>
                            <circle cx="12" cy="12" r="10"></circle>
                          </svg>
                        </div>
                        <h4 className="text-sm w-63/100 text-left">Cash on Delivery</h4>
                        <p className="text-sm text-gray-400 h-5">Pay when you receive</p>
                      </button>

                      {/* for Card Input */}
                      {paymentMethod === "card" && (
                        <div className="cardInput pt-4 space-y-4">
                          <div className="flex flex-col w-full h-auto">
                            <label className="flex items-start w-fit text-sm font-medium" for="cardNumber">Card Number *</label>
                            <input type="text" id="cardNumber" required placeholder="e.g., 7467 8736 7384 9375"
                              className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0"
                              value={cardInfo.number}
                              onChange={(e) =>
                                setCardInfo({ ...cardInfo, number: e.target.value })
                              }
                            />
                          </div>

                          <div className="flex flex-col w-full h-auto">
                            <label className="flex items-start w-fit text-sm font-medium" for="cardholderName">Cardholder Name *</label>
                            <input type="text" id="cardholderName" required placeholder="Name on Card"
                              className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0"
                              value={cardInfo.name}
                              onChange={(e) =>
                                setCardInfo({ ...cardInfo, name: e.target.value })
                              }
                            />
                          </div>

                          <div className="flex items-center w-full h-auto gap-4">
                            <div className="flex flex-col w-1/2 h-auto">
                              <label className="flex items-start w-fit text-sm font-medium" for="expiryDate">Expiry Date *</label>
                              <input type="text" required id="expiryDate" placeholder="MM/YY"
                                className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0"
                                value={cardInfo.expiry}
                                onChange={(e) =>
                                  setCardInfo({ ...cardInfo, expiry: e.target.value })
                                }
                              />
                            </div>

                            <div className="flex flex-col w-1/2 h-auto">
                              <label className="flex items-start w-fit text-sm font-medium" for="cvv">CVV *</label>
                              <input type="text" id="cvv" placeholder="e.g., 976" required
                                className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0"
                                value={cardInfo.cvv}
                                onChange={(e) =>
                                  setCardInfo({ ...cardInfo, cvv: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )}


                      {/* for UPI input */}
                      {paymentMethod === "upi" && (
                        <div className="UpiIdInput pt-4 space-y-4">
                          <div className="flex flex-col w-full h-auto">
                            <label className="flex items-start w-fit text-sm font-medium" for="upiID">UPI ID *</label>
                            <input type="text" id="upiID" required placeholder="yourname@upi"
                              className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0" />
                            <p className="text-xs text-gray-500">
                              You will receive a collect request on your UPI app.
                            </p>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "cash" && (
                        <div className="pt-4 space-y-4">
                          <div className="flex flex-col w-full h-auto">
                            <p className="text-xs text-gray-500">
                              Please keep the approximate amount ready at delivery.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 3 UI */}

              </div>

              <div className="border h-0 w-full border-gray-200"></div>
              {/* Footer Buttons */}
              {checkoutStep < 4 && (
                <div className="pt-4 w-full flex justify-between items-center">
                  <button onClick={goBack}
                    className={`${checkoutStep > 1 ? "flex" : "hidden"} items-center justify-center h-9 w-1/6 hover:bg-gray-100 bg-white border border-gray-300 rounded-lg text-[#111111] font-medium transition-colors duration-200 ease-in-out `}>
                    Back
                  </button>
                  <div className="flex flex-col gap-0">
                    <p className="text-sm text-gray-500" id="itemSubTitle">Total Amount</p>
                    <h3 className="text-xl text-[#111111] flex justify-end items-center font-medium">₹190</h3>
                  </div>
                  <button onClick={goNext}
                    className="checkout h-9 w-1/3 rounded-lg bg-[#f97316] text-white font-medium hover:bg-[#ea580c] transition-colors duration-200 ease-in-out">
                    {checkoutStep === 3 ? "Place Order" : "Continue"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      }

      {/* Cart Modal */}
      <CartModal2 open={cartOpen} onClose={() => setCartOpen(false)} />
    </div >
  )
}
