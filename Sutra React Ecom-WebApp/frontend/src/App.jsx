import React, { useEffect, useState, useRef } from "react";
import CartModal2 from "./components/CartModal2";
import ProductCard from "./components/ProductCards";
import { useCart } from "./context/CartContext";
import AdminSection from "./components/AdminAuth";
import AccessCRUD from "./components/AccessCRUD";

export default function App() {

  const [isProductEditOpen, setProductEditOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, [])

  // product states from Database
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${import.meta.env.VITE_API_URL}`);
        if (!res.ok) throw new Error("API fetch failed");

        const finalData = await res.json();

        if (!finalData || finalData.length === 0) {
          throw new Error("No products found");
        }

        setProducts(finalData);
      }
      catch (err) {
        const reload = window.confirm(
          "⚠️ Products failed to load.\n\nPress OK to reload or Cancel to stay here."
        );
    
        if (reload) {
          fetchProducts(); 
        } else {
          setError("Products couldn't load.");
        }
    
      } 
      finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <h2 style={{ textAlign: "center" }}>{error}</h2>;
  }

  // Admin Modal states
  const [adminKey, setAdminKey] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const unlockAdmin = () => {
    if (adminKey === import.meta.env.VITE_ADMIN_KEY) {
      setIsAdmin(true);
      setAdminModalOpen(false);
      setIsAccessingCRUD(true);
    }
    else {
      alert("Invalid Admin Key");
    }
  };

  // Crud Section state
  const [isAccessingCRUD, setIsAccessingCRUD] = useState(false);

  // Checkout state
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);

  const { cartItems, subtotal, totalItems, clearCart } = useCart();

  // Checkout Modal Ref for scrolling to top
  const checkoutModalRef = useRef(null);

  useEffect(() => {
    if (checkoutModalRef.current) {
      setTimeout(() => {
        checkoutModalRef.current.scrollTo({ top: 0, behavior: "auto" });
      }, 0);
    }
  }, [checkoutStep]);

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
      }
      else if (paymentMethod === "upi") {
        if (!upiId) {
          alert("Please enter your UPI ID.");
          return;
        }
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

    // Clear all form data
    setShippingInfo({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
    });

    setPaymentMethod("card");

    setCardInfo({
      number: "",
      name: "",
      expiry: "",
      cvv: "",
    });

    setUpiId("");
    setOrderNO("");
  };

  useEffect(() => {
    if (checkoutOpen || adminModalOpen || isAccessingCRUD || cartOpen || isProductEditOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [checkoutOpen, adminModalOpen, isAccessingCRUD, cartOpen, isProductEditOpen]);

  // Handle browser back button for checkout modal
  useEffect(() => {
    if (!checkoutOpen) return;

    const handleBack = () => {
      if (checkoutStep === 4) {
        resetOrderFlow();
      }
      else if (checkoutStep > 1) {
        setCheckoutStep((s) => s - 1);
      }
      else {
        resetCheckout();
      }
    };

    window.history.pushState({ modal: "checkout", step: checkoutStep }, "");

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };

  }, [checkoutOpen, checkoutStep]);

  const getStepClasses = (step) => {
    if (checkoutStep > step) {
      return "bg-green-500 text-white";
    }
    if (checkoutStep === step) {
      return "bg-[#f97316] text-white";
    }
    return "bg-gray-200 text-gray-400";
  };

  //Creating Order No.
  const [orderNO, setOrderNO] = useState("");

  const orderNoGenarator = () => {
    let orderID = "FD9";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";


    for (let i = 0; i < 6; i++) {
      let char = Math.floor(Math.random() * str.length);
      orderID += str.charAt(char);
    }

    setOrderNO(`SUTRA-${orderID}`);

  }

  useEffect(() => {
    if (checkoutStep === 3 && !orderNO) {
      orderNoGenarator();
    }
  }, [checkoutStep]);

  const resetOrderFlow = () => {

    setCheckoutOpen(false);

    setCheckoutStep(1);

    setShippingInfo({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
    });

    setPaymentMethod("card");

    setCardInfo({
      number: "",
      name: "",
      expiry: "",
      cvv: "",
    });

    setUpiId("");

    setOrderNO("");

    clearCart();
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      resetOrderFlow();
    }
  }, [cartItems.length]);


  // order placed successfully message 
  const [showOrderMsg, setShowOrderMsg] = useState(false);
  const [msgClosing, setMsgClosing] = useState(false);


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
          <div className={`hidden lg:flex gap-9 text-[#111]`}>
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
            {/* <button className="h-9 w-9 flex items-center justify-center hover:bg-gray-50 rounded-lg">
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
            </button> */}
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

      {showOrderMsg && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 z-987 w-[90%] max-w-80 mt-4">

          <div 
            className={`bg-green-950 border border-green-400 text-green-200 p-4 rounded-xl shadow-xl flex gap-3 items-start
                  ${msgClosing ? "animate-[slideUp_.4s_ease-in_forwards]" : "animate-[slideDown_.4s_ease-out]"}`}>

            {/* Tick */}
            <svg className="h-5 w-5 mt-0.5" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 11 3 3L22 4" />
              <path d="M21.801 10A10 10 0 1 1 17 3.335" />
            </svg>

            <div>
              <p className="font-semibold leading-tight text-sm">
                Order placed successfully
              </p>
              <p className="text-xs text-white">
                Check your email for order confirmation
              </p>
            </div>

          </div>
        </div>
      )}


      {/* page main content start */}
      {/* Explore Section  */}
      <div className="justify-center max-w-6xl my-0 mx-auto">
        <div className="mt-22 py-20 px-6 lg:px-0 flex lg:flex-row flex-col gap-8 items-center">
          <div className="w-full lg:w-[50%] p-8 flex flex-col items-center lg:items-start">
            <p className="lg:mb-5 mb-3">Sanskrit Quotes for Your Space</p>
            <p className="lg:mb-5 mb-3">Calm, meaningful, timeless wall art.</p>
            <div onClick={() => {
              if (window.innerWidth > 1024){
                window.scrollTo({
                  top: 970,
                  behavior: "smooth"
                })
              }
              else if(window.innerWidth < 576){
                window.scrollTo({
                  top: 1100,
                  behavior: "smooth"
                })
              }
          
          }}
              className="bg-[#f97316] hover:bg-[#ea580c] transition-all duration-150 ease-in-out cursor-default h-12 px-9 py-6 rounded-4xl flex w-fit justify-center items-center text-white text-sm font-semibold">
              Explore Posters
            </div>
          </div>
          <div className="lg:w-[50%] w-full flex items-center justify-center box-border">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-[#F97316]/10 to-transparent blur-3xl"></div>
              <div className="relative bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-sm w-full max-w-sm md:max-w-md">
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
      <div className="py-12 flex lg:flex-nowrap flex-wrap gap-4 justify-center mx-2.5 lg:mx-0">
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
            <div className="lg:mb-12 mb-6">
              <h2 className="h-[30px] lg:text-[20px] text-lg lg:mb-3 mb-0 text-[#111111] w-full text-center font-medium lg:font-normal">
                Featured Posters
              </h2>
              <p className="h-6 lg:text-base text-sm text-gray-600 w-full text-center">
                Handpicked quotes for your sanctuary
              </p>
            </div>

            <div className="px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8">

              {products.map((item) => (
                <ProductCard
                  key={item._id}
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
      <footer className="bg-white flex flex-col items-center pb-3 px-12 pt-12 my-0 mx-auto max-w-7xl">
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
          <span className="text-gray-300 cursor-default">·</span>
          <div onClick={() => isAdmin ? null : setAdminModalOpen(true)}
            className={`${isAdmin ? "text-[#f97316]" : "text-gray-400"} flex lg:flex-row flex-col gap-1 lg:justify-center items-center text-center hover:text-[#f97316] text-sm transition-all duration-200 ease-in-out font-medium cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            {isAdmin ? "Admin Active" : "Admin Access"}
          </div>
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

        <div className="p-3 text-gray-500 font-medium text-sm">Made with ❤️ by Himanshu Singh Dangi</div>

        {/* Manual Button for testing checkout section */}
        {/* <button
          onClick={() => setCheckoutOpen(true)}
          className="mt-6 px-6 py-2 rounded-lg bg-[#f97316] text-white text-sm hover:bg-[#ea580c]"
        >
          Test Checkout Modal
        </button>
        <button
          onClick={() => setAdminModalOpen(true)}
          className="mt-6 px-6 py-2 rounded-lg bg-[#f97316] text-white text-sm hover:bg-[#ea580c]"
        >
          Test Admin Modal
        </button>
        <button
          onClick={() => setIsAccessingCRUD(true)}
          className="mt-6 px-6 py-2 rounded-lg bg-[#f97316] text-white text-sm hover:bg-[#ea580c]"
        >
          Test CRUD Modal
        </button> */}

      </footer>

      {/* CHECKOUT MODAL */}
      {checkoutOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-1000 backdrop-brightness-55">
          <div ref={checkoutModalRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 lg:h-[90vh] h-[85vh] shadow-lg flex flex-col gap-4 w-full overflow-y-auto max-w-100/100 lg:max-w-lg rounded-xl">

            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Checkout</h3>
              <button
                className="transition-colors duration-200 ease-in-out rounded-sm hover:bg-gray-200 cursor-default size-6 flex justify-center items-center"
                onClick={() => {
                  if (checkoutStep === 4) {
                    resetOrderFlow();

                    setShowOrderMsg(true);

                    setTimeout(() => {
                      setMsgClosing(true);
                    }, 3000);

                    setTimeout(() => {
                      setShowOrderMsg(false);
                      setMsgClosing(false);
                    }, 3400);
                  } else {
                    resetCheckout();
                  }
                }}


              >
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
                    className={`h-2 w-full bg-[#030213] transition-transform duration-400 ease-in-out`}
                    style={{
                      transform: `translateX(-${100 - checkoutStep * 25}%)`
                    }}
                  ></div>
                </div>
                {/* Step 1 */}
                <div className="flex items-center w-full justify-between">
                  <div className="flex flex-1 items-center gap-2 flex-col">
                    <div className={`h-10 w-10 flex justify-center items-center rounded-full ${getStepClasses(1)}`}>
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
                    <div className={`h-10 w-10 flex justify-center items-center rounded-full ${getStepClasses(2)}
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
                    <div className={`h-10 w-10 flex justify-center items-center rounded-full ${getStepClasses(3)}
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
                    <div className={`h-10 w-10 flex justify-center items-center rounded-full ${getStepClasses(4)}
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
                    <label className="flex items-start w-fit text-sm font-medium" htmlFor="name">Full Name *</label>
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
                      <label className="flex items-start w-fit text-sm font-medium" htmlFor="email">Email *</label>
                      <input type="text" required id="email" placeholder="RadheShyam@gmail.com"
                        className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col w-1/2 h-auto">
                      <label className="flex items-start w-fit text-sm font-medium" htmlFor="phone">Phone No. *</label>
                      <input type="text" id="phone" placeholder="99711XXXXX" required
                        className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value.replace(/\D/g, "") })}
                      />
                    </div>
                  </div>

                  {/* Address Input */}
                  <div className="flex flex-col w-full h-auto">
                    <label className="flex items-start w-fit text-sm font-medium" htmlFor="address">Address *</label>
                    <input type="text" id="address" required placeholder="Locality Address"
                      className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    />
                  </div>

                  {/* City and State Input */}
                  <div className="flex items-center w-full h-auto gap-4">
                    <div className="flex flex-col w-1/2 h-auto">
                      <label className="flex items-start w-fit text-sm font-medium" htmlFor="city">City *</label>
                      <input type="text" required id="city" placeholder="New Delhi"
                        className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col w-1/2 h-auto">
                      <label className="flex items-start w-fit text-sm font-medium" htmlFor="state">State *</label>
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
                <div className="lg:py-4 py-0 overflow-y-auto custom-scroll">
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
                      <p className="lg:text-sm text-xs text-gray-400 h-5">GPay, PhonePe, Paytm</p>
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
                      <p className="lg:text-sm text-xs text-gray-400 h-5">Pay when you receive</p>
                    </button>

                    {/* for Card Input */}
                    {paymentMethod === "card" && (
                      <div className="cardInput pt-4 space-y-4">
                        <div className="flex flex-col w-full h-auto">
                          <label className="flex items-start w-fit text-sm font-medium" htmlFor="cardNumber">Card Number *</label>
                          <input type="number" id="cardNumber" required placeholder="e.g., 7467 8736 7384 9375"
                            className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0"
                            value={cardInfo.number}
                            onChange={(e) =>
                              setCardInfo({ ...cardInfo, number: e.target.value.replace(/\D/g, "") })
                            }

                          />
                        </div>

                        <div className="flex flex-col w-full h-auto">
                          <label className="flex items-start w-fit text-sm font-medium" htmlFor="cardholderName">Cardholder Name *</label>
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
                            <label className="flex items-start w-fit text-sm font-medium" htmlFor="expiryDate">Expiry Date *</label>
                            <input type="text" required id="expiryDate" placeholder="MM/YY"
                              className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0"
                              value={cardInfo.expiry}
                              onChange={(e) =>
                                setCardInfo({ ...cardInfo, expiry: e.target.value.replace(/[^0-9/]/g, "") })
                              }
                            />
                          </div>

                          <div className="flex flex-col w-1/2 h-auto">
                            <label className="flex items-start w-fit text-sm font-medium" htmlFor="cvv">CVV *</label>
                            <input type="number" id="cvv" placeholder="e.g., 976" required
                              className="mt-1 px-3 py-1 bg-gray-100 rounded-lg text-sm placeholder:text-sm h-9 w-full focus:border-2 focus:border-gray-400 transition-all duration-150 ease-in-out outline-0"
                              value={cardInfo.cvv}
                              onChange={(e) =>
                                setCardInfo({ ...cardInfo, cvv: e.target.value.replace(/\D/g, "") })
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
                          <label className="flex items-start w-fit text-sm font-medium" htmlFor="upiID">UPI ID *</label>
                          <input value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            type="text" id="upiID" required placeholder="yourname@upi"
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
              {checkoutStep === 3 && (
                <div className="lg:py-4 py-0 w-full pr-2">
                  <header className="w-full mb-4 text-lg text-left">Order Summary</header>

                  {/* Cart Review */}
                  {cartItems.map((item, i) => (

                    <div key={i}
                      className="flex gap-2 items-center mb-3 border rounded-lg border-gray-200 p-1">
                      <div className="w-16 h-20 m-1 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                        <img
                          src={item.poster ? item.poster : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=="}
                          alt={item.poster}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-72/100 flex flex-col items-start">
                        <h4 className="lg:text-sm text-[12px] overflow-hidden whitespace-nowrap text-ellipsis">{item.title}</h4>
                        <p className="text-xs text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis">{item.subtitle}</p>
                        <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                      </div>
                      <div className="flex items-center justify-center">
                        <p className="text-sm">₹{item.price * item.qty}</p>
                      </div>
                    </div>
                  ))}
                  <div className="border h-0 w-full border-gray-200 mb-6"></div>
                  {/* Shipping Address */}
                  <div>
                    <h2 className="text-lg text-[#111] mb-2 text-left">Shipping Address</h2>
                    <div className="text-gray-600 text-sm space-y-1 text-left mb-4">
                      <p>{shippingInfo.name}</p>
                      <p>{shippingInfo.address}</p>
                      <p>{shippingInfo.city}, {shippingInfo.state}</p>
                      <p>{shippingInfo.email}</p>
                      <p>+91-{shippingInfo.phone}</p>

                    </div>
                  </div>
                  <div className="border h-0 w-full border-gray-200 mb-6"></div>

                  {/* Payment Method Choosen */}
                  <div className="mb-6">
                    <h3 className="text-lg text-[#111] mb-2">Payment Method</h3>
                    <p className="text-sm text-gray-600 capitalize">{paymentMethod === "upi"
                      ? "UPI Payment"
                      : paymentMethod === "card"
                        ? "Credit / Debit Card"
                        : "Cash on Delivery"}</p>
                  </div>
                  <div className="border h-0 w-full border-gray-200 mb-6"></div>

                  {/* Total Calculations */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <p>Subtotal</p>
                      <p>₹{subtotal}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <p>Shipping</p>
                      <p className={`value ${subtotal >= 350 ? "text-green-600 font-medium" : ""}`}>{subtotal >= 350 ? "Free" : "₹61"}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <p>GST(18%)</p>
                      <p>₹{(subtotal * 0.18).toFixed(2)}</p>
                    </div>
                    <div className="border h-0 w-full border-gray-200 mb-2"></div>
                    <div className="flex items-center justify-between text-lg">
                      <p>Total</p>
                      <p>₹{Math.round(subtotal * 1.18 + (subtotal >= 350 ? 0 : 61))}</p>
                    </div>
                  </div>


                </div>
              )}

              {/* STEP 4 UI */}
              {checkoutStep === 4 && (
                <div className="py-8 space-y-6 text-center">
                  <div className="relative size-20 rounded-full bg-green-100 
                flex items-center justify-center mb-6 mx-auto 
                animate-pulse overflow-visible">

                    {/* Uniform halo glow */}
                    <span className="absolute -inset-3 rounded-full 
                   bg-green-300/40 blur-xl"></span>

                    {/* Ripple ring */}
                    <span className="absolute inset-0 rounded-full
                   border-2 border-green-300
                   animate-[ping_2s_ease-out_infinite]"></span>

                    {/* Core circle */}
                    <span className="absolute inset-0 rounded-full bg-green-100"></span>

                    {/* Tick Icon */}
                    <svg
                      className="relative z-10 h-10 w-10 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 11 3 3L22 4" />
                      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                    </svg>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl text-[#111] mb-2">Order Confirmed!</h3>
                    <p className="text-gray-600">Thank you for your purchase</p>
                  </div>
                  <div className="bg-gray-50 p-6 space-y-3 rounded-md">
                    <p className="text-sm text-gray-500 m-0">Order Number</p>
                    <p className="text-lg text-[#111]">{orderNO}</p>
                    <div className="border h-0 w-full border-gray-200"></div>
                    <p className="text-gray-500 text-sm m-0">Estimated Delivery</p>
                    <p className="text-[#111]">5-7 Business Days</p>
                  </div>

                  <div class="text-sm text-gray-600 space-y-2">
                    <p>A confirmation email has been sent to:</p>
                    <p class="text-[#F97316] text-base">{shippingInfo.email}</p>
                  </div>

                  <div class="pt-4 flex items-center justify-center">
                    <button onClick={() => {
                      if (checkoutStep === 4) {
                        resetOrderFlow();
    
                        setShowOrderMsg(true);
    
                        setTimeout(() => {
                          setMsgClosing(true);
                        }, 3000);
    
                        setTimeout(() => {
                          setShowOrderMsg(false);
                          setMsgClosing(false);
                        }, 3400);
                      } else {
                        resetCheckout();
                      }
                    }}
                      className="flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all outline-none h-9 py-2 h bg-[#F97316] hover:bg-[#ea580c] text-white px-8">Continue Shopping</button>
                  </div>

                </div>
              )}

            </div>
            {checkoutStep < 4 && (
              <div className="border h-0 w-full border-gray-200"></div>
            )}
            {/* Footer Buttons */}
            {checkoutStep < 4 && (
              <div className="pt-4 w-full flex justify-between items-center sticky bottom-0">
                <button onClick={goBack}
                  className={`${checkoutStep > 1 ? "flex" : "hidden"} items-center justify-center h-9 w-1/6 hover:bg-gray-100 bg-white border border-gray-300 rounded-lg text-[#111111] text-sm lg:text-base font-medium transition-colors duration-200 ease-in-out `}>
                  Back
                </button>
                <div className="flex flex-col gap-0">
                  <p className="text-sm text-gray-500" id="itemSubTitle">Total Amount</p>
                  <h3 className="lg:text-xl text-lg text-[#111111] flex justify-end items-center font-medium">₹{Math.round(subtotal * 1.18 + (subtotal >= 350 ? 0 : 61))}</h3>
                </div>
                <button onClick={goNext}
                  className="checkout h-9 w-1/3 rounded-lg bg-[#f97316] text-white text-sm lg:text-base font-medium hover:bg-[#ea580c] transition-colors duration-200 ease-in-out">
                  {checkoutStep === 3 ? "Place Order" : "Continue"}
                </button>
              </div>
            )}
          </div>
        </div>
      )
      }

      {/* Cart Modal */}
      <CartModal2
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        setCheckoutOpen={setCheckoutOpen}
      />

      {/* Admin Login Modal */}
      <AdminSection
        isOpen={adminModalOpen}
        onClose={() => { setAdminModalOpen(false), setIsAdmin(null) }}
        adminKey={adminKey}
        setAdminKey={setAdminKey}
        onLogin={() => { unlockAdmin(), setAdminKey("") }}
      />

      {/* Admin CRUD Operation Modal */}
      <AccessCRUD
        isOpen={isAccessingCRUD}
        onClose={() => { setIsAccessingCRUD(false), setIsAdmin(null) }}
        products={products}
        setProducts={setProducts}
        isProductEditOpen={isProductEditOpen}
        setProductEditOpen={setProductEditOpen}
      />


    </div >
  )
}
