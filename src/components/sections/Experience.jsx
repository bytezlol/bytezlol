import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Copy, Check, ExternalLink, Users } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import maplemp from "../../assets/maplesmp.gif";
import acspvp from "../../assets/acspvp.webp"
import minefruit from "../../assets/minefruit.png"
import monkeysmp from "../../assets/monkeysmp.webp"

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        title: "MapleSMP",
        role: "Developer & Configurator",
        description: "Lead config & development developer at MapleSMP, offering various features such as PvP, Economy and more!",
        startDate: "Mar '3",
        endDate: "Now",
        players: null,
        image: maplemp,
        link: "https://discord.gg/maplemp",
        ip: "play.maplesmp.fun",
        ongoing: true,
    },
    {
        title: "AcsPvP",
        role: "Developer",
        description: "Developer at acspvp, an practice server for the crystalpvp gamemode. Advanced, and extremely modern.",
        startDate: "Jan '5",
        endDate: "Now",
        players: null,
        image: acspvp,
        link: "https://discord.gg/acspvp",
        ip: "acspvp.de",
        ongoing: true,
    },
        {
        title: "MonkeySMP",
        role: "Developer & Configurator",
        description: "Plugin development & configurations for MonkeySMP, an amazing crystalpvp based server with many custom features!",
        startDate: "Mar '7",
        endDate: "Now",
        players: null,
        image: monkeysmp,
        link: "https://discord.gg/maplemp",
        ip: "play.maplesmp.fun",
        ongoing: true,
    },
    {
        title: "Minefruit",
        role: "Developer",
        description: "Incredible server with unique concepts, always looked forward to expanding and creating new gamemodes.",
        startDate: "Nov '22",
        endDate: "Apr '24",
        players: null,
        image: minefruit,
        link: "https://discord.gg/minefruit",
        ip: "play.minefruit.org",
    },
    {
        title: "Freelancing",
        role: "Freelance Developer",
        description: "Working with clients on a variety of projects, from small plugins to large server networks. Always looking for new opportunities ;)",
        startDate: "2020",
        endDate: "Now",
        players: null,
        image: "https://mc-heads.net/avatar/neqing/128",
        link: "https://discord.com/users/505864551074365453",
        ip: null,
        ongoing: true,
    },
];

function CopyIPButton({ ip, offline }) {
    const [copied, setCopied] = useState(false);

    if (!ip) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(ip);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-white/5 hover:border-[var(--color-border-hover)]"
            style={{
                border: "1px solid var(--color-border)",
                color: copied ? "var(--color-available)" : "var(--color-text-primary)",
            }}
        >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : offline ? `${ip} (offline)` : ip}
        </button>
    );
}

function ProjectSlide({ experience }) {
    return (
        <div className="flex items-center project-slide h-screen">
            <motion.div
                className="w-full max-w-xl"
                initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ margin: "-15%" }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <div className="flex items-center gap-5 mb-6">
                    <img
                        src={experience.image}
                        alt={experience.title}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover"
                        style={{
                            border: "1px solid var(--color-border)",
                            boxShadow: "0 0 20px rgba(99, 102, 241, 0.1)",
                        }}
                    />
                    <div>
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                            {experience.title}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>
                            {experience.role}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <span
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text-secondary)" }}
                    >
                        {experience.startDate} — {experience.endDate}
                    </span>
                    {experience.ongoing && (
                        <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{
                                backgroundColor: "var(--color-accent-muted)",
                                color: "var(--color-accent)",
                            }}
                        >
                            Active
                        </span>
                    )}
                </div>

                <p
                    className="text-base leading-relaxed mb-6 max-w-lg"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    {experience.description}
                </p>

                {experience.players && (
                    <div
                        className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-lg"
                        style={{
                            backgroundColor: "rgba(99, 102, 241, 0.08)",
                            border: "1px solid rgba(99, 102, 241, 0.15)",
                        }}
                    >
                        <Users className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
                        <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                            {experience.players}
                        </span>
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                    <a
                        href={experience.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/5 hover:border-[var(--color-border-hover)]"
                        style={{
                            border: "1px solid var(--color-border)",
                            color: "var(--color-text-primary)",
                        }}
                    >
                        <FaDiscord className="w-4 h-4" />
                        Discord
                    </a>
                    {experience.website && (
                        <a
                            href={experience.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/5 hover:border-[var(--color-border-hover)]"
                            style={{
                                border: "1px solid var(--color-border)",
                                color: "var(--color-text-primary)",
                            }}
                        >
                            <ExternalLink className="w-4 h-4" />
                            Website
                        </a>
                    )}
                    <CopyIPButton ip={experience.ip} offline={experience.ipOffline} />
                </div>
            </motion.div>
        </div>
    );
}

function MobileProject({ experience, index }) {
    return (
        <motion.div
            className="py-10 border-b"
            style={{ borderColor: "var(--color-border)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-10%" }}
            transition={{ duration: 0.6, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <div className="flex items-center gap-4 mb-4">
                <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-12 h-12 rounded-xl object-cover"
                    style={{ border: "1px solid var(--color-border)" }}
                />
                <div>
                    <h3 className="text-xl font-bold">{experience.title}</h3>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                        {experience.role} · {experience.startDate} — {experience.endDate}
                    </p>
                </div>
                {experience.ongoing && (
                    <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium ml-auto"
                        style={{
                            backgroundColor: "var(--color-accent-muted)",
                            color: "var(--color-accent)",
                        }}
                    >
                        Active
                    </span>
                )}
            </div>

            <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--color-text-secondary)" }}
            >
                {experience.description}
            </p>

            {experience.players && (
                <p className="text-xs mb-4" style={{ color: "var(--color-text-muted)" }}>
                    {experience.players}
                </p>
            )}

            <div className="flex flex-wrap gap-2">
                <a
                    href={experience.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}
                >
                    <FaDiscord className="w-3 h-3" />
                    Discord
                </a>
                {experience.website && (
                    <a
                        href={experience.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{ border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}
                    >
                        <ExternalLink className="w-3 h-3" />
                        Website
                    </a>
                )}
                <CopyIPButton ip={experience.ip} offline={experience.ipOffline} />
            </div>
        </motion.div>
    );
}

export default function Experience() {
    const sectionRef = useRef(null);
    const leftColRef = useRef(null);
    const progressRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true });

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const section = sectionRef.current;
        const slides = section.querySelectorAll(".project-slide");

        const pinTrigger = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: leftColRef.current,
            pinSpacing: false,
            pinType: "transform",
        });

        const progressTween = gsap.to(progressRef.current, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            },
        });

        const slideTriggers = [];
        slides.forEach((slide, index) => {
            slideTriggers.push(
                ScrollTrigger.create({
                    trigger: slide,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => setActiveIndex(index),
                    onEnterBack: () => setActiveIndex(index),
                })
            );
        });

        return () => {
            pinTrigger.kill();
            progressTween.scrollTrigger?.kill();
            progressTween.kill();
            slideTriggers.forEach((st) => st.kill());
        };
    }, [isMobile]);

    if (isMobile) {
        return (
            <section id="experience" className="py-20 px-8">
                <div className="max-w-2xl mx-auto">
                    <motion.h2
                        ref={headerRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-black tracking-tight mb-2"
                    >
                        Experience
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isHeaderInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-sm mb-8"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        {String(experiences.length).padStart(2, "0")} projects
                    </motion.p>
                    {experiences.map((exp, i) => (
                        <MobileProject key={exp.title} experience={exp} index={i} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative px-8 lg:px-16"
            style={{ height: `${experiences.length * 100}vh` }}
        >
            <div className="max-w-7xl mx-auto h-full relative">
                <div className="flex h-full">
                    <div
                        ref={leftColRef}
                        className="w-[30%] flex-shrink-0 h-screen flex flex-col justify-center pr-12"
                    >
                        <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-8">
                            Experience
                        </h2>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-4xl font-black" style={{ color: "var(--color-text-primary)" }}>
                                {String(activeIndex + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                                / {String(experiences.length).padStart(2, "0")}
                            </span>
                        </div>

                        <div
                            className="w-px h-32 relative overflow-hidden"
                            style={{ backgroundColor: "var(--color-border)" }}
                        >
                            <div
                                ref={progressRef}
                                className="absolute top-0 left-0 w-full origin-top"
                                style={{
                                    backgroundColor: "var(--color-accent)",
                                    height: "100%",
                                    transform: "scaleY(0)",
                                    boxShadow: "0 0 8px rgba(99, 102, 241, 0.4)",
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-[70%] flex-shrink-0">
                        {experiences.map((exp) => (
                            <ProjectSlide
                                key={exp.title}
                                experience={exp}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
