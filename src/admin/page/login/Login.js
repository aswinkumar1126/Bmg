import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { motion } from "framer-motion";
import "./Login.css";

const Login = () => {
    const {
        mobileNumber,
        name,
        password,
        email,
        loading,
        error,
        mode,
        key,
        setMobileNumber,
        setName,
        setEmail,
        setPassword,
        setKey,
        setMode,
        handleAuth,
    } = useContext(AuthContext);

    const isSignup = mode === "signup";

    const toggleMode = () => {
        setMode(isSignup ? "login" : "signup");
        setEmail("");
        setMobileNumber("");
        setName("");
        setPassword("");
        setKey("");
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren",
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.div
            className="login-container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div className="login-card" variants={itemVariants}>
                <div className="text-center">
                    <motion.h2 className="login-title" variants={itemVariants}>
                        Admin {isSignup ? "Sign Up" : "Login"}
                    </motion.h2>
                </div>

                {error && (
                    <motion.div className="login-error" variants={itemVariants}>
                        {error}
                    </motion.div>
                )}

                <form
                    className="login-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAuth();
                    }}
                >
                    <motion.input
                        className="login-input"
                        type="tel"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        variants={itemVariants}
                        required
                    />

                    {isSignup && (
                        <>
                            <motion.input
                                className="login-input"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                variants={itemVariants}
                                required
                            />
                            <motion.input
                                className="login-input"
                                type="text"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variants={itemVariants}
                                required
                            />
                            <motion.input
                                className="login-input"
                                type="text"
                                placeholder="Secret Key"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                variants={itemVariants}
                                required
                            />
                        </>
                    )}

                    <motion.input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variants={itemVariants}
                        required
                        minLength={6}
                    />

                    <motion.button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                        variants={itemVariants}
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                        aria-busy={loading}
                        role="button"
                    >
                        {loading ? (
                            <span className="loading-spinner">
                                <svg
                                    className="spinner"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    width="20"
                                    height="20"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"
                                    />
                                </svg>
                                &nbsp;Processing...
                            </span>
                        ) : (
                            <span>{isSignup ? "Sign Up" : "Login"}</span>
                        )}
                    </motion.button>
                </form>

                <motion.p
                    className="login-toggle"
                    onClick={toggleMode}
                    variants={itemVariants}
                    style={{ cursor: "pointer", marginTop: "1rem", color: "#007BFF" }}
                >
                    {isSignup
                        ? "Already have an account? Login"
                        : "Don't have an account? Sign Up"}
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

export default Login;
