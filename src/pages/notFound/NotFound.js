import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NotFound.css'; // We'll create this CSS file next
import CustomButton from '../../components/Button';

function NotFound() {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        console.log("Login clicked");
        navigate('/login');
    };

    return (
        <motion.div
            className="not-found-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="not-found-content">
                <motion.div
                    className="error-code"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        scale: { duration: 1, repeat: Infinity, repeatDelay: 3 },
                        rotate: { duration: 1, repeat: Infinity, repeatDelay: 3 }
                    }}
                >
                    404
                </motion.div>

                <h1 className="error-title">Page Not Found</h1>

                <p className="error-message">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="action-buttons">
                    <motion.button
                        className="home-button"
                        onClick={() => navigate('/')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Return to Home
                    </motion.button>

                    <motion.button
                        className="back-button"
                        onClick={() => navigate(-1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Go Back
                    </motion.button>
                    <br></br>
                    <CustomButton
                        label="Login"
                        onClick={handleLoginClick}
                        variant="primary"
                        size="large"
                        isLoading={false}
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default NotFound;