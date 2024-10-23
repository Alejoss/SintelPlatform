import React from "react";
import "./Footer.scss";
import { BackgroundBeams } from "../ui/background-beams";

const Footer = () => {
    const navLinks = [
        { text: "Sobre Nosotros", href: "#" },
        { text: "Tokenizacion", href: "#" },
        { text: "Beneficios", href: "#" },
        { text: "Testimonios", href: "#" },
    ];

    const socialLinks = [
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/516c7f34c87656fc53285e79ed1593e911d99b9cad9bf8d0e6ff1fee1c2dfb85?placeholderIfAbsent=true&apiKey=80d5f18ba8094950acd839524012858f",
            href: "#",
        },
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3fec2507849ebda1232b49c56d7fe8d27d52d85d150f14fcbde237649fa51007?placeholderIfAbsent=true&apiKey=80d5f18ba8094950acd839524012858f",
            href: "#",
        },
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/eb9dcf44ad50c539bc9008cd0dbb9a9d7f351d4305df2a9ce08854a231cc6745?placeholderIfAbsent=true&apiKey=80d5f18ba8094950acd839524012858f",
            href: "#",
        },
    ];

    return (
        <footer className="footer padding relative">
            <div className="boxed">
                <div className="footer__content">
                    <div className="footer__company-info">
                        <div className="footer__logo">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/248c727be7576f8866a55bc053fbba1aa808e0bcffa54ca0d26f6b8142a060fc?placeholderIfAbsent=true&apiKey=80d5f18ba8094950acd839524012858f"
                                className="footer__logo-image"
                                alt="Company Logo"
                            />
                        </div>
                        <p className="footer__company-description">
                            Innovación, transparencia y acceso global. Síguenos
                            en nuestras redes sociales para mantenerte informado
                            sobre las últimas tendencias en tokenización y
                            blockchain.
                        </p>
                        <div className="footer__contact-info">
                            <div className="footer__contact-item">
                                <div className="footer__icon-button">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b80dd2cb20fd92660eff14fdfa81a273e792b0b66823ead2c417d9dea7ec302?placeholderIfAbsent=true&apiKey=80d5f18ba8094950acd839524012858f"
                                        className="footer__icon"
                                        alt=""
                                    />
                                </div>
                                <div className="footer__contact-text">
                                    <div className="footer__contact-label">
                                        Have a Question?
                                    </div>
                                    <div className="footer__contact-value">
                                        +XX XXXX-XX
                                    </div>
                                </div>
                            </div>
                            <div className="footer__contact-item">
                                <div className="footer__icon-button">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3bd1080fa788cc1578efa5e3271f814c908b65a90aaab3c6cfce1d60a17b9b69?placeholderIfAbsent=true&apiKey=80d5f18ba8094950acd839524012858f"
                                        className="footer__icon"
                                        alt=""
                                    />
                                </div>
                                <div className="footer__contact-text">
                                    <div className="footer__contact-label">
                                        Contact Us at
                                    </div>
                                    <div className="footer__contact-value">
                                        contacto@gmail.com
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="footer__copyright">
                        © COPYRIGHT 2024 SINTELLAB
                    </p>
                </div>
                <nav className="footer__nav-links">
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className="footer__nav-link"
                        >
                            {link.text}
                        </a>
                    ))}
                </nav>
                <div className="footer__subscribe-section">
                    <div className="footer__subscribe-text">
                        <h2 className="footer__subscribe-title">Subscribe</h2>
                        <p className="footer__subscribe-description">
                            Stay up-to-date on discounts, offers and events.
                            Unsubscribe at any time.
                        </p>
                    </div>
                    <form className="footer__subscribe-form">
                        <label htmlFor="emailInput" className="visually-hidden">
                            Email Address
                        </label>
                        <input
                            id="emailInput"
                            className="footer__email-input"
                            type="email"
                            placeholder="Email Address"
                            aria-label="Email Address"
                        />
                        <button type="submit" aria-label="Submit">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/12e9abad9636b794285256dbeb99b2a29011dc7d5be3471ddcb2d3e7511211a6?placeholderIfAbsent=true&apiKey=80d5f18ba8094950acd839524012858f"
                                className="footer__submit-icon"
                                alt=""
                            />
                        </button>
                    </form>
                    <div className="footer__social-links">
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="footer__social-button"
                            >
                                <img
                                    loading="lazy"
                                    src={link.icon}
                                    className="footer__social-icon"
                                    alt="Social Media Icon"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <BackgroundBeams />
        </footer>
    );
};

export default Footer;
