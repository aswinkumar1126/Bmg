import React from 'react';
import './Testimonial.css';

const Testimonial = ({ videoUrl, setVideoUrl, loading, error }) => {
   

    const testimonials = [
        {
            quote: "This product has truly exceeded my expectations! The quality is top-notch and the customer service is amazing.",
            name: "John Doe",
            role: "CEO, Company"
        },
        {
            quote: "Incredible experience. I will definitely be back for more. Highly recommend!",
            name: "Jane Smith",
            role: "Marketing Specialist"
        },
        {
            quote: "The best service I've ever experienced. Fast delivery and excellent quality products.",
            name: "Robert Johnson",
            role: "Product Manager"
        }
    ];

    return (
        <section className="testimonial-section">
            <div className="container">
                <header className="section-header">
                    <h2>Client Testimonials</h2>
                    <p className="section-subtitle">Hear what our customers say about us</p>
                </header>

                <div className="video-testimonial">
                    {loading ? (
                        <div className="video-placeholder">
                            <div className="spinner"></div>
                            <p>Loading testimonial video...</p>
                        </div>
                    ) : error ? (
                        <div className="video-error">
                            <p>{error}</p>
                            <button
                                className="retry-button"
                                onClick={() => window.location.reload()}
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <div className="video-wrapper">
                                    <video
                                        controls
                                        className="responsive-video"
                                        poster="/video-poster.jpg"
                                        preload="metadata"
                                        autoPlay
                                        loop
                                        muted
                                    >
                                <source src={videoUrl} type="video/mp4" />
                                Your browser does not support HTML5 video.
                            </video>
                        </div>
                    )}
                </div>

                <div className="testimonial-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <div className="quote-icon">“</div>
                            <blockquote className="testimonial-text">
                                {testimonial.quote}
                            </blockquote>
                            <div className="testimonial-meta">
                                <h4 className="testimonial-name">{testimonial.name}</h4>
                                <p className="testimonial-role">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;