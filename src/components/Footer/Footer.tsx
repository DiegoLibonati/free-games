import { FaFacebook, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

import { theme } from "@/styles/theme";

import "@/components/Footer/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        style={{ background: theme.colors.primary }}
      >
        <path
          fill={theme.colors.secondary}
          fillOpacity="1"
          d="M0,64L48,74.7C96,85,192,107,288,133.3C384,160,480,192,576,197.3C672,203,768,181,864,149.3C960,117,1056,75,1152,64C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <div className="footer-wrapper__links">
        <a
          href="https://www.facebook.com/dielibonati/"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit Facebook profile"
        >
          <FaFacebook className="footer-wrapper__icon"></FaFacebook>
        </a>
        <a
          href="https://github.com/DiegoLibonati"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit GitHub profile"
        >
          <FaGithub className="footer-wrapper__icon"></FaGithub>
        </a>
        <a
          href="https://www.instagram.com/die_libonati/"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit Instagram profile"
        >
          <FaInstagram className="footer-wrapper__icon"></FaInstagram>
        </a>
        <a
          href="https://www.linkedin.com/in/diego-libonati-67102419b/"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit LinkedIn profile"
        >
          <FaLinkedinIn className="footer-wrapper__icon"></FaLinkedinIn>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
