import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";

export default function Hero() {
    const [displayText, setDisplayText] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const fullText = "BYTEZ";
        let i = 0;
        let interval;
        let cursorTimeout;

        const startDelay = setTimeout(() => {
            interval = setInterval(() => {
                i++;
                setDisplayText(fullText.slice(0, i));
                if (i >= fullText.length) {
                    clearInterval(interval);
                    cursorTimeout = setTimeout(() => setShowCursor(false), 2000);
                }
            }, 110);
        }, 600);

        return () => {
            clearTimeout(startDelay);
            clearInterval(interval);
            clearTimeout(cursorTimeout);
        };
    }, []);

    return (
        <section className="min-h-screen flex flex-col justify-center px-8 lg:px-16 relative">
            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex items-center gap-2 mb-12"
                >
                    <span className="relative flex h-2 w-2">
                        <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                            style={{ backgroundColor: "var(--color-available)" }}
                        />
                        <span
                            className="relative inline-flex rounded-full h-2 w-2"
                            style={{ backgroundColor: "var(--color-available)" }}
                        />
                    </span>
                    <span className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>
                        Available for work
                    </span>
                </motion.div>

                <h1 className="text-[clamp(5rem,15vw,14rem)] font-black leading-[0.9] tracking-[-0.04em] mb-8">
                    {displayText}
                    <motion.span
                        className="inline-block font-light ml-1"
                        style={{ color: "var(--color-text-muted)" }}
                        animate={
                            showCursor
                                ? { opacity: [1, 1, 0, 0] }
                                : { opacity: 0 }
                        }
                        transition={
                            showCursor
                                ? { duration: 1, repeat: Infinity, times: [0, 0.45, 0.5, 1] }
                                : { duration: 0.4 }
                        }
                    >
                        |
                    </motion.span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-[clamp(1.25rem,3vw,2.5rem)] font-normal leading-tight mb-16 max-w-2xl"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    Minecraft Developer & Configurator
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.7, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <motion.a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="chrome-btn group inline-flex items-center justify-center gap-3 px-8 py-4 text-black font-semibold rounded-xl transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(165,180,252,0.2)]"
                    >
                        Get in Touch
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </motion.a>
                    <motion.a
                        href="https://github.com/bytezlol"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold rounded-xl transition-all duration-300 hover:bg-white/5"
                        style={{ border: "1px solid var(--color-border)", color: "var(--color-text-primary)" }}
                    >
                        <Github className="w-5 h-5" />
                        GitHub
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
