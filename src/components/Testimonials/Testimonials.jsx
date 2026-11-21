import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials.js';
import './Testimonials.css';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];
  useEffect(() => {
    const timer = window.setInterval(() => setActive((index) => (index + 1) % testimonials.length), 6000);
    return () => window.clearInterval(timer);
  }, []);
  const move = (direction) => setActive((index) => (index + direction + testimonials.length) % testimonials.length);

  if (!current) return null;

  return (
    <section id="testimonials" className="testimonials-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Kind words</span>
          <h2 className="section-title">Testimonials</h2>
          <p className="section-subtitle">Feedback from people I have worked and learned with.</p>
        </div>
        <div className="testimonial-slider">
          <AnimatePresence mode="wait">
            <motion.article key={current.id} className="testimonial-card"
              initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -35 }} transition={{ duration: 0.3 }}>
              <Quote className="testimonial-quote" size={42} />
              <div className="testimonial-stars" aria-label={`${current.rating} out of 5 stars`}>
                {Array.from({ length: current.rating }, (_, i) => <Star key={i} size={17} fill="currentColor" />)}
              </div>
              <p className="testimonial-text">“{current.text}”</p>
              <div className="testimonial-person">
                {current.avatar ? <img src={current.avatar} alt="" /> : <span className="testimonial-avatar">{current.name.slice(0, 1)}</span>}
                <div><strong>{current.name}</strong><span>{current.title}</span></div>
              </div>
            </motion.article>
          </AnimatePresence>
          <div className="testimonial-controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous testimonial"><ChevronLeft /></button>
            <div className="testimonial-dots">{testimonials.map((item, index) => <button key={item.id} type="button" aria-label={`Show testimonial ${index + 1}`} className={index === active ? 'active' : ''} onClick={() => setActive(index)} />)}</div>
            <button type="button" onClick={() => move(1)} aria-label="Next testimonial"><ChevronRight /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
