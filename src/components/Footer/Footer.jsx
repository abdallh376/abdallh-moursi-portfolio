import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">AM</div>
          <div className="footer-name-wrap">
            <span className="footer-name">Abdallh Moursi</span>
            <span className="footer-role">Full Stack Developer</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="footer-nav" aria-label="Footer navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="footer-nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Socials */}
        <div className="footer-socials">
          <a
            href="https://github.com/abdallh376"
            className="footer-social-btn"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/abdallh-moursi/"
            className="footer-social-btn"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={20} />
          </a>
        </div>

        {/* Copyright */}
        <p className="footer-copy">
          &copy; 2026 Abdallh Moursi. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
