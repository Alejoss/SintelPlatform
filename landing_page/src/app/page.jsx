"use client";
import "./Home.scss";

// react + next native commponets and hooks
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useRef } from "react";

// custom components
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import LineChartComponent from "@/components/LineChart/LineChart";

// third party components
// ts particles
import { loadSlim } from "tsparticles-slim";
// Dynamically import Particles component
const Particles = dynamic(() => import("react-tsparticles"), {
    ssr: false,
    loading: () => <></>,
});

// images and data
// header secction
import { particlesConfigOptions } from "@/particlesConfig";

// about section
import aboutIllustration from "../assets/home-about-illustration.webp";

// tokenization section
import tokenizationIllustration1 from "../assets/home-tokenization-1.svg";
import tokenizationIllustration2 from "../assets/home-tokenization-2.svg";
import tokenizationIllustration3 from "../assets/home-tokenization-3.svg";

// benefits section
import benefitIllustration1 from "../assets/benefit-1.webp";
import benefitIllustration2 from "../assets/benefit-2.webp";
import benefitIllustration3 from "../assets/benefit-3.webp";
import benefitIllustration4 from "../assets/benefit-4.webp";

import benefitsBg from "../assets/benefits-grid-pattern-bg.svg";

const benefits = [
    {
        icon: benefitIllustration1,
        title: "Transparencia",
        description:
            "Blockchain asegura un registro claro e inmutable de todas las transacciones, garantizando la transparencia y la confianza.",
    },
    {
        icon: benefitIllustration2,
        title: "Accesibilidad",
        description:
            "Permite la inversión fraccionada, haciendo que activos de alto valor estén al alcance de más personas.",
    },
    {
        icon: benefitIllustration3,
        title: "Liquidez",
        description:
            "La tokenización facilita la compra y venta de activos, aumentando su liquidez en el mercado.",
    },
    {
        icon: benefitIllustration4,
        title: "Seguridad",
        description:
            "Los tokens están respaldados por tecnología de punta que protege su inversión.",
    },
];

// future section
import blog1Media from "../assets/blogs/blog-1.webp";
import blog2Media from "../assets/blogs/blog-2.webp";
import blog3Media from "../assets/blogs/blog-3.webp";

const blogs = [
    {
        media: blog1Media,
        title: "EL 10% de los activos serán tokenizados para el 2030",
        author: "Boston Consulting Group",
    },
    {
        media: blog2Media,
        title: "La tokenización tiene potencial de cambiar el mercado financiero",
        author: "Forbes",
    },
    {
        media: blog3Media,
        title: "La tokenización es la siguiente generación de mercados",
        author: "Larry Fink, Blackrock",
    },
];

// contact section
import contactIllustration from "../assets/contact-illustration.webp";
import { SocialIcon } from "react-social-icons";

// Framer Motion Animations
import { motion, useInView } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
export default function Home() {
    //ts particles
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    // framer motion animations
    //Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    };

    // hero section
    const heroRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

    // about section
    const aboutRef = useRef(null);
    const aboutInView = useInView(aboutRef, {
        once: true,
        amount: 0.3,
        margin: "0px 0px -10% 0px",
    });

    // tokenization section
    const tokenizationRef = useRef(null);
    const tokenizationInView = useInView(tokenizationRef, {
        once: true,
        amount: 0.1, // Trigger animation earlier
        margin: "0px 0px -10% 0px",
    });

    // benefits section
    const benefitsRef = useRef(null);
    const benefitsInView = useInView(benefitsRef, {
        once: true,
        amount: 0.1,
        margin: "0px 0px -10% 0px",
    });

    // future section
    const futureHeaderRef = useRef(null);
    const futureBlogsRef = useRef(null);

    const futureHeaderInView = useInView(futureHeaderRef, {
        once: true,
        amount: 0.3,
        margin: "0px 0px -10% 0px",
    });
    const futureBlogsInView = useInView(futureBlogsRef, {
        once: true,
        amount: 0.1,
        margin: "0px 0px -10% 0px",
    });

    // contact section
    // Contact section refs
    const contactRef = useRef(null);
    const contactInView = useInView(contactRef, {
        once: true,
        amount: 0.1,
    });

    // footer section
    // Footer section ref
    const footerRef = useRef(null);
    const footerInView = useInView(footerRef, {
        once: true,
        amount: 0.3,
    });

    return (
        <main className="home">
            <section className="home__header">
                <Navbar />
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={particlesConfigOptions}
                />
                <motion.div
                    className="home__hero"
                    ref={heroRef}
                    initial="hidden"
                    animate={heroInView ? "visible" : "hidden"}
                    transition={{ duration: 0.5, staggerChildren: 0.2 }}
                >
                    <motion.h1 className="heading-master" variants={fadeInUp}>
                        Expertos en Tokenización
                    </motion.h1>
                    <motion.p className="body-large" variants={fadeInUp}>
                        Convierta sus activos en tokens digitales, acceda a
                        nuevas oportunidades de inversión y amplíe sus
                        horizontes financieros en un entorno seguro y
                        transparente.
                    </motion.p>
                    <motion.a
                        href="#"
                        className="btn btn-primary"
                        variants={fadeInUp}
                    >
                        Comienza Ahora
                    </motion.a>
                </motion.div>
            </section>

            <section
                id="sobre-nosotros"
                className="home__about padding"
                ref={aboutRef}
            >
                <div className="boxed">
                    <motion.div
                        className="home__about__illustration"
                        variants={fadeInLeft}
                        initial="hidden"
                        animate={aboutInView ? "visible" : "hidden"}
                        transition={{ duration: 0.6 }}
                    >
                        <Image
                            className="home__about__illustration__image"
                            src={aboutIllustration}
                            alt="About illustration"
                            width={500}
                            height={500}
                        />
                    </motion.div>
                    <motion.div
                        className="home__about__content"
                        initial="hidden"
                        animate={aboutInView ? "visible" : "hidden"}
                        transition={{
                            staggerChildren: 0.2,
                            delayChildren: 0.3,
                        }}
                    >
                        <motion.h2
                            className="home__about__content__section-title"
                            variants={fadeInUp}
                        >
                            Conoce quienes somos
                        </motion.h2>
                        <motion.h3
                            className="heading-primary highlight-silver"
                            variants={fadeInUp}
                        >
                            Sobre Nosotros
                        </motion.h3>
                        <motion.p className="body-regular" variants={fadeInUp}>
                            Somos pioneros en la{" "}
                            <span className="color-yellow">
                                tokenización de activos
                            </span>{" "}
                            en Latinoamérica, combinando{" "}
                            <span className="color-yellow">
                                tecnología avanzada
                            </span>{" "}
                            con un profundo conocimiento del mercado local.
                            Nuestro objetivo es democratizar las inversiones
                            seguras y rentables, permitiendo a individuos y
                            empresas transformar sus activos en tokens
                            digitales.
                        </motion.p>
                        <motion.p className="body-regular" variants={fadeInUp}>
                            Esto optimiza el comercio y la{" "}
                            <span className="color-yellow">
                                gestión de propiedades
                            </span>
                            , haciendo que las oportunidades de inversión sean
                            más accesibles y eficientes para todos.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <motion.section
                id="tokenizacion"
                className="home__tokenization padding relative"
                ref={tokenizationRef}
                initial="hidden"
                animate={tokenizationInView ? "visible" : "hidden"}
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.2,
                            delayChildren: 0.1,
                        },
                    },
                }}
            >
                <div className="boxed">
                    {/* item 1 */}
                    <motion.div
                        className="home__tokenization__item"
                        variants={fadeInUp}
                    >
                        <Image
                            className="home__tokenization__item__illustration"
                            src={tokenizationIllustration1}
                            alt="Depositar Dinero"
                            width={500}
                            height={500}
                        />
                        <h2 className="heading-secondary highlight-silver">
                            Depositar Dinero
                        </h2>
                    </motion.div>

                    {/*  seperator 1 */}
                    <motion.div
                        className="home__tokenization__seperator seperator-1"
                        variants={fadeInUp}
                    ></motion.div>

                    {/* item 2 */}
                    <motion.div
                        className="home__tokenization__item"
                        variants={fadeInUp}
                    >
                        <Image
                            className="home__tokenization__item__illustration"
                            src={tokenizationIllustration2}
                            alt="Transformación en Tokens"
                            width={500}
                            height={500}
                        />
                        <h2 className="heading-secondary highlight-silver">
                            Transformación en Tokens
                        </h2>
                    </motion.div>

                    {/*  seperator 2 */}
                    <motion.div
                        className="home__tokenization__seperator seperator-2"
                        variants={fadeInUp}
                    ></motion.div>

                    {/* item 3 */}
                    <motion.div
                        className="home__tokenization__item"
                        variants={fadeInUp}
                    >
                        <Image
                            className="home__tokenization__item__illustration"
                            src={tokenizationIllustration3}
                            alt="Tokens a Activo Tangible"
                            width={500}
                            height={500}
                        />
                        <h2 className="heading-secondary highlight-silver">
                            Tokens a Activo Tangible
                        </h2>
                    </motion.div>
                </div>
                <BackgroundBeams />
            </motion.section>

            <motion.section
                id="beneficios"
                className="home__benefits padding"
                ref={benefitsRef}
                initial="hidden"
                animate={benefitsInView ? "visible" : "hidden"}
            >
                <Image
                    className="home__benefits__bg"
                    src={benefitsBg}
                    alt="Benefits background"
                    width={500}
                    height={500}
                />
                <div className="boxed">
                    <motion.h2 className="heading-primary" variants={fadeInUp}>
                        Beneficios de la Tokenizacion
                    </motion.h2>

                    <motion.div
                        className="home__benefits__list"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.2,
                                    delayChildren: 0.3,
                                },
                            },
                        }}
                    >
                        {benefits.map((item, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    className="home__benefits__list__item"
                                    variants={fadeInLeft}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Image
                                        className="home__benefits__list__item__icon"
                                        src={item.icon}
                                        alt={item.title}
                                        width={500}
                                        height={500}
                                    />
                                    <h3 className="heading-tertiary">
                                        {item.title}
                                    </h3>
                                    <p className="body-small">
                                        {item.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </motion.section>

            <section className="home__future padding relative">
                <div className="boxed">
                    <motion.div
                        className="home__future__header"
                        ref={futureHeaderRef}
                        initial="hidden"
                        animate={futureHeaderInView ? "visible" : "hidden"}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.2,
                                },
                            },
                        }}
                    >
                        <motion.h2
                            className="heading-primary highlight-silver"
                            variants={fadeInUp}
                        >
                            El futuro de las Finanzas
                        </motion.h2>
                        <motion.p className="body-regular" variants={fadeInUp}>
                            La adopción de{" "}
                            <span className="color-yellow">
                                tokens digitales
                            </span>{" "}
                            está revolucionando el sector financiero,
                            transformando la manera en que se{" "}
                            <span className="color-yellow">gestionan</span> e
                            <span className="color-yellow">intercambian</span>{" "}
                            los activos. Esta sección destaca el{" "}
                            <span className="color-yellow">crecimiento</span> de
                            los tokens, ilustrando las tendencias actuales y las
                            proyecciones futuras mediante gráficos y noticias
                            relevantes.
                        </motion.p>
                    </motion.div>
                    <div className="home__future__graph">
                        <LineChartComponent />
                    </div>
                    <motion.div
                        className="home__future__blogs"
                        ref={futureBlogsRef}
                        initial="hidden"
                        animate={futureBlogsInView ? "visible" : "hidden"}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.2,
                                    delayChildren: 0.1,
                                },
                            },
                        }}
                    >
                        {blogs.map((blog, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    className="home__future__blogs__item"
                                    variants={fadeInUp}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Image
                                        className="home__future__blogs__item__image"
                                        src={blog.media}
                                        alt={blog.title}
                                        width={500}
                                        height={500}
                                    />
                                    <h3 className="home__future__blogs__item__title ">
                                        {blog.title}
                                    </h3>
                                    <p className="body-small">
                                        {" "}
                                        • {blog.author}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
                <ShootingStars />
                <StarsBackground />
            </section>

            <section
                id="contacto"
                className="home__contact padding"
                ref={contactRef}
            >
                <div className="boxed">
                    <motion.div
                        className="home__contact__content"
                        variants={{
                            visible: {
                                transition: { staggerChildren: 0.2 },
                            },
                        }}
                        initial="hidden"
                        animate={contactInView ? "visible" : "hidden"}
                    >
                        <motion.h2
                            className="heading-primary highlight-silver"
                            variants={fadeInLeft}
                        >
                            Contáctate con nosotros ahora!
                        </motion.h2>
                        <motion.p
                            className="body-regular"
                            variants={fadeInLeft}
                        >
                            Únete a nosotros y transforma el futuro de tus
                            inversiones en Latinoamérica. ¡Descubre nuevas
                            oportunidades hoy!
                        </motion.p>
                        <motion.div
                            className="home__contact__cta"
                            variants={fadeInLeft}
                        >
                            <a href="#" className="btn btn-primary">
                                Contactanos
                            </a>

                            <motion.div
                                className="home__contact__cta__socials"
                                variants={{
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.1,
                                        },
                                    },
                                }}
                            >
                                {["facebook", "linkedin", "x"].map(
                                    (network) => (
                                        <motion.div
                                            key={network}
                                            variants={fadeInUp}
                                        >
                                            <SocialIcon
                                                url={`https://${network}.com`}
                                                target="_blank"
                                                network={network}
                                                fgColor="#ffffff"
                                                bgColor="#F7B044"
                                                style={{
                                                    height: 45,
                                                    width: 45,
                                                }}
                                            />
                                        </motion.div>
                                    )
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="home__contact__illustration"
                        variants={fadeInUp}
                        initial="hidden"
                        animate={contactInView ? "visible" : "hidden"}
                        transition={{ duration: 0.6 }}
                    >
                        <Image
                            className="home__contact__illustration__image"
                            src={contactIllustration}
                            alt="Contact illustration"
                            width={500}
                            height={500}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Footer Animation */}
            <motion.div
                ref={footerRef}
                variants={fadeInUp}
                initial="hidden"
                animate={footerInView ? "visible" : "hidden"}
                transition={{ duration: 0.8 }}
            >
                <Footer />
            </motion.div>
        </main>
    );
}
