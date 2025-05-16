import React, { useEffect, useRef } from 'react';
import { useTestimonials } from '../../store/testimonial/useTestimonialsQueries';
import './Testimonial.css';

const Testimonial = () => {
    const { data: testimonials = [] } = useTestimonials();
    const trackRef = useRef(null);

    useEffect(() => {
        if (!trackRef.current) return;

        const track = trackRef.current;
        const cards = Array.from(track.children);

        // Duplicate cards for seamless looping
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            track.appendChild(clone);
        });

        // Pause animation on hover
        const handleMouseEnter = () => {
            track.style.animationPlayState = 'paused';
        };

        const handleMouseLeave = () => {
            track.style.animationPlayState = 'running';
        };

        track.addEventListener('mouseenter', handleMouseEnter);
        track.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            track.removeEventListener('mouseenter', handleMouseEnter);
            track.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [testimonials]);

    return (
        <section className="testimonial-section" aria-label="Client testimonials">
            <div className="testimonial-container">
                <header className="testimonial-header">
                    <h2 className="testimonial-title">Client Testimonials</h2>
                    <p className="testimonial-subtitle">What our valued clients say about us</p>
                </header>

                <div className="testimonial-marquee-container">
                    <div className="testimonial-track" ref={trackRef}>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card">
                                <div className="testimonial-content">
                                    <div className="quote-icon">“</div>
                                    <blockquote className="testimonial-text">
                                        {testimonial.message}
                                    </blockquote>
                                    <div className="testimonial-author">
                                        <div className="testimonial-avatar">
                                            <img
                                                src={testimonial.imageUrl}
                                                alt={testimonial.name}
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                        <div className="testimonial-meta">
                                            <h3 className="testimonial-name">{testimonial.name}</h3>
                                            <p className="testimonial-role">{testimonial.designation}</p>
                                            <div className="testimonial-rating">
                                                {Array(5).fill().map((_, i) => (
                                                    <span key={i} className={`star ${i < testimonial.rating ? 'filled' : ''}`}>
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;