// Login.js
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import "./Login.css"; // Import custom CSS

const Login = () => {
    const {
        mobileNumber,
        name,
        password,
        loading,
        error,
        setMobileNumber,
        setName,
        setPassword,
        handleLogin,
    } = useContext(AuthContext);

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
                        Admin Sign Up
                    </motion.h2>
                </div>

                {error && (
                    <motion.div className="login-error" variants={itemVariants}>
                        {error}
                    </motion.div>
                )}

                <form className="login-form">
                    <motion.input
                        className="login-input"
                        type="text"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        variants={itemVariants}
                    />
                    <motion.input
                        className="login-input"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variants={itemVariants}
                    />
                    <motion.input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variants={itemVariants}
                    />
                    <motion.button
                        type="button"
                        onClick={handleLogin}
                        className="login-button"
                        disabled={loading}
                        variants={itemVariants}
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                    >
                        {loading ? (
                            <span className="flex items-center">
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
                                Processing...
                            </span>
                        ) : (
                            <span>Sign Up</span>
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default Login;
