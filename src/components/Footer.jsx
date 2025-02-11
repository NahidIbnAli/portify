import { Facebook, Github } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <Link to="/about" className="link link-hover">
          About
        </Link>
        <Link to="/contact" className="link link-hover">
          Contact
        </Link>
        <Link to="/blog" className="link link-hover">
          Blog
        </Link>
        <Link to="/services" className="link link-hover">
          Services
        </Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://github.com/NahidIbnAli"
            target="_blank"
            className="hover:text-primary"
          >
            <Github />
          </a>
          <a
            href="https://x.com/NahidIbnAli_"
            target="_blank"
            className="hover:text-primary"
          >
            <FaXTwitter className="text-xl" />
          </a>
          <a
            href="https://facebook.com/NahidIbnAli"
            target="_blank"
            className="hover:text-primary"
          >
            <Facebook />
          </a>
        </div>
      </nav>
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
