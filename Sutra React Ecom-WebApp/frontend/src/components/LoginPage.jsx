import { useState } from "react"

export default function LoginPage(setIsLoggedIn, isLoggedIn) {

    const [mode, setMode] = useState("login")
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="fixed inset-0 z-999 bg-gray-50 grid md:grid-cols-2">

            {/* LEFT IMAGE PANEL */}
            <div className="hidden md:block">
                <img
                    src="/public/upscaled image(cropped).png"
                    alt="Sutra Art"
                    className="h-full w-full object-cover"
                />
            </div>

            {/* RIGHT LOGIN PANEL */}
            <div className="flex items-center flex-col justify-center px-6 gap-6">
                {/* LOGO */}
                <svg

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

                <div className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl p-8 space-y-6">

                    {/* Tabs */}
                    <div className="relative flex justify-center gap-10 border-b">

                        <button
                            onClick={() => setMode("login")}
                            className={`pb-2 transition ${mode === "login" ? "text-[#f97316]" : "text-gray-400"}`}
                        >
                            Login
                        </button>

                        <button
                            onClick={() => setMode("signup")}
                            className={`pb-2 transition ${mode === "signup" ? "text-[#f97316]" : "text-gray-400"}`}
                        >
                            Sign Up
                        </button>

                        {/* Animated underline */}
                        <span
                            className="absolute bottom-0 h-[2px] w-12 bg-[#f97316] rounded-full transition-all duration-300 ease-in-out"
                            style={{
                                left: mode === "login" ? "calc(50% - 4.5rem)" : "calc(50% + 1rem)",
                            }}
                        />

                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-center">
                        {mode === "signup"
                            ? "Create an Account"
                            : "Welcome Back"
                        }
                    </h2>


                    {/* FORM */}
                    <div
                        key={mode}
                        className="space-y-4 animate-[fade_.3s_ease-out] "
                    >

                        {mode === "signup" && (
                            <input
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-11 px-4 bg-gray-100 rounded-xl outline-none border border-transparent focus:border-[#f97316] transition-all"
                            />
                        )}

                        {mode === "signup" && (
                            < input
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-11 px-4 bg-gray-100 rounded-xl outline-none border border-transparent focus:border-[#f97316] transition-all"
                            />
                        )}
                        {mode === "login" && (
                            < input
                                placeholder="Email"
                                type="email"
                                className="w-full h-11 px-4 bg-gray-100 rounded-xl outline-none border border-transparent focus:border-[#f97316] transition-all"
                            />
                        )}

                        {mode === "signup" && (
                            <input
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                                className="w-full h-11 px-4 bg-gray-100 rounded-xl outline-none border border-transparent focus:border-[#f97316] transition-all"
                            />
                        )}
                        {mode === "login" && (
                            <input
                                placeholder="Password"
                                type="password"
                                className="w-full h-11 px-4 bg-gray-100 rounded-xl outline-none border border-transparent focus:border-[#f97316] transition-all"
                            />
                        )}

                        {mode === "login" && (
                            <div className="text-sm text-right text-gray-500 cursor-pointer hover:text-[#f97316] transition duration-200 ease-in-out">
                                Forgot Password?
                            </div>
                        )}

                        {mode === "signup" && (
                            <input
                                placeholder="Confirm Password"
                                type="password"
                                className="w-full h-11 px-4 bg-gray-100 rounded-xl outline-none border border-transparent focus:border-[#f97316] transition-all"
                            />
                        )}


                        <button
                            className="w-full h-11 rounded-full bg-[#f97316] text-white font-medium hover:bg-[#ea580c] transition-all"
                        >
                            {mode === "signup"
                                ? "Sign Up"
                                : "Login"
                            }
                        </button>


                        <div className="text-center text-sm text-gray-400">
                            {mode === "signup"
                                ? <div>
                                    Already have an account?{"  "}

                                    <span onClick={() => setMode("login")}
                                        className="text-[#f97316] cursor-pointer">
                                        Login
                                    </span>
                                </div>
                                : <div>
                                    New here?{"  "}

                                    <span onClick={() => setMode("signup")}
                                        className="text-[#f97316] cursor-pointer">
                                        Create account
                                    </span>
                                </div>
                            }
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}
