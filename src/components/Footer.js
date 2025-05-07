import React from 'react';
import { motion } from 'framer-motion';
import './style/Footer.css';

const Footer = () => {
    // const linkVariants = {
    //     hover: {
    //         scale: 1.05,
    //         color: '#f4b400',
    //         transition: {
    //             duration: 0.3,
    //             ease: "easeInOut"
    //         }
    //     },
    //     tap: {
    //         scale: 0.95
    //     }
    // };

    const columnVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    const socialIconVariants = {
        hover: {
            scale: 1.2,
            color: '#f4b400',
            y: -5,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* First Column */}
                <motion.div
                    className="footer-column"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={columnVariants}
                >
                    <h4 className="footer-header">USEFUL LINKS</h4>
                    <ul className="footer-links">
                        {['Privacy Policy', 'Category', 'About Us', 'Gallery', '✓ More'].map((item, index) => (
                            <motion.li
                                key={index}
                                variants={itemVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="footer-link-item"
                            >
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Second Column */}
                <motion.div
                    className="footer-column"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={columnVariants}
                >
                    <h4 className="footer-header">NAVIGATION</h4>
                    <ul className="footer-links">
                        {['Home', 'Products', 'Why Us', 'Videos'].map((item, index) => (
                            <motion.li
                                key={index}
                                variants={itemVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="footer-link-item"
                            >
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Third Column */}
                <motion.div
                    className="footer-column"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={columnVariants}
                >
                    <h4 className="footer-header">CONTACT</h4>
                    <motion.p variants={itemVariants}>
                      Showroom Address : <br /> M/s. BMG Jewellers Private Limited,<br />
                        160, Melamasi Street,<br />
                        Madurai- 625001
                    </motion.p>
                    <motion.p variants={itemVariants}>
                        Primary Contact Numbers :<br /> +91- 70946 70946,<br />
                        86085 96085,<br />
                        86829 96829
                    </motion.p>
                    <motion.p variants={itemVariants}>
                        websupport@justdial.com
                    </motion.p>
                </motion.div>

                {/* Fourth Column */}
                <motion.div
                    className="footer-column"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={columnVariants}
                >
                    <h4 className="footer-header">CONNECT</h4>
                    <motion.div
                        className="social-icons"
                        variants={itemVariants}
                    >
                        {[
                            { icon: 'fab fa-facebook', url: 'https://www.facebook.com' },
                            { icon: 'fab fa-instagram', url: 'https://www.instagram.com' },
                            { icon: 'fab fa-twitter', url: 'https://www.twitter.com' },
                            { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com' },
                            { icon: 'fab fa-youtube', url: 'https://www.youtube.com' }
                        ].map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={socialIconVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <i className={social.icon}></i>
                            </motion.a>
                        ))}
                    </motion.div>
                    <motion.div
                        className="newsletter"
                        variants={itemVariants}
                    >
                        <h5>Subscribe to our newsletter</h5>
                        <div className="newsletter-input">
                            <input type="email" placeholder="Your email" />
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: '#f4b400' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Footer Bottom */}
            <motion.div
                className="footer-bottom"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <p className='copy-rights'>&copy; 2025 BMG Jewellery Private Limited. All rights reserved.</p>
                <p className='design'>Designed by </p>
                <a href='https://www.brightechsoftwaresolution.com/' className='desingedby'>BrightechSoftwareSolution</a>
                <div className="payment-methods">
                    <i className="fab fa-cc-visa"></i>
                    <i className="fab fa-cc-mastercard"></i>
                    <i className="fab fa-cc-paypal"></i>
                    <i className="fab fa-cc-apple-pay"></i>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;