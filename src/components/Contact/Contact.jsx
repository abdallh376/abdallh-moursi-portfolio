import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { Mail, Copy, Check, ExternalLink, Send } from 'lucide-react';
import './Contact.css';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

const EMAIL_ADDRESS = 'abdalla.m.moursi@gmail.com';
const WHATSAPP_NUMBER = '201554458172';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = EMAIL_ADDRESS;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const constructEmailBody = () => {
    const fromInfo = formData.name ? `From: ${formData.name} (${formData.email || 'No email provided'})\n\n` : '';
    return encodeURIComponent(`${fromInfo}${formData.message}`);
  };

  const getSubject = () => {
    return encodeURIComponent(formData.subject.trim() || 'Portfolio Inquiry');
  };

  const handleSendViaGmail = (e) => {
    e.preventDefault();
    const subject = getSubject();
    const body = constructEmailBody();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSendViaClient = (e) => {
    e.preventDefault();
    const subject = getSubject();
    const body = constructEmailBody();
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-header">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">Let&apos;s Build Something Amazing Together</p>
      </div>

      <div className="contact-cards">
        {/* WhatsApp Card */}
        <motion.div
          className="contact-card"
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
        >
          <div className="contact-icon-circle whatsapp-gradient">
            <FaWhatsapp size={36} color="#fff" />
          </div>
          <h3 className="contact-card-title">Let&apos;s Chat on WhatsApp</h3>
          <p className="contact-card-desc">
            Have a project or an idea? Let&apos;s discuss it directly.
          </p>
          <p className="contact-detail-text">+20 155 445 8172</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Abdallh, I visited your portfolio and would like to get in touch!')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn whatsapp-btn"
          >
            <FaWhatsapp size={18} />
            Contact Me on WhatsApp
          </a>
        </motion.div>

        {/* Email Card */}
        <motion.div
          className="contact-card"
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
        >
          <div className="contact-icon-circle accent-gradient">
            <Mail size={36} color="#fff" strokeWidth={1.5} />
          </div>
          <h3 className="contact-card-title">Send Me an Email</h3>
          <p className="contact-card-desc">
            Feel free to contact me for opportunities, collaborations, or inquiries.
          </p>
          <div className="contact-email-wrapper">
            <a
              href={`mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent('Portfolio Inquiry')}`}
              className="contact-email"
              title="Click to send email"
            >
              {EMAIL_ADDRESS}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="copy-email-btn"
              title="Copy email to clipboard"
              aria-label="Copy email address"
            >
              {copied ? <Check size={16} color="#4ade80" /> : <Copy size={16} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <div className="email-actions-group">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=${encodeURIComponent('Portfolio Inquiry')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn gmail-btn"
              title="Open directly in Gmail"
            >
              <ExternalLink size={16} />
              Open in Gmail
            </a>
            <a
              href={`mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent('Portfolio Inquiry')}`}
              className="contact-btn email-btn"
              title="Open in your default mail app"
            >
              <Mail size={16} />
              Default Mail App
            </a>
          </div>
        </motion.div>
      </div>

      {/* Quick message form */}
      <motion.div
        className="contact-form-container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="form-title">Send a Direct Message</h3>
        <p className="form-subtitle">Fill in the details below to email me directly</p>

        <form className="contact-form" onSubmit={handleSendViaGmail}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Abdallh Moursi"
                value={formData.name}
                onChange={handleFormChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Your Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleFormChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Project Collaboration / Opportunity"
              value={formData.subject}
              onChange={handleFormChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Hi Abdallh, I would like to discuss..."
              value={formData.message}
              onChange={handleFormChange}
              className="form-textarea"
            />
          </div>

          <div className="form-buttons">
            <button
              type="submit"
              className="contact-btn gmail-btn"
              title="Open and send via Gmail"
            >
              <Send size={16} />
              Send via Gmail
            </button>
            <button
              type="button"
              onClick={handleSendViaClient}
              className="contact-btn email-btn"
              title="Send via your default email application"
            >
              <Mail size={16} />
              Send via Mail App
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
