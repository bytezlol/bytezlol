import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Copy, Check, ArrowRight, Github } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-150px" });

    const copyToClipboard = () => {
        navigator.clipboard.writeText("bytezlol");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="min-h-screen flex flex-col items-center justify-center px-8 lg:px-16 relative"
        >

            <div className="max-w-3xl w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full"
                    style={{
                        backgroundColor: "var(--color-accent-muted)",
                        border: "1px solid rgba(99, 102, 241, 0.2)",
                    }}
                >
                    <FaDiscord className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
                    <span className="text-sm font-medium" style={{ color: "var(--color-accent)" }}>
                        Preferred contact
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tight leading-[1.05] mb-6"
                >
                    Let's work
                    <br />
                    together.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg md:text-xl max-w-md mx-auto mb-14 leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    Reach out on Discord. I typically respond within 24 hours.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex items-center justify-center mb-10"
                >
                    <motion.div
                        whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(99, 102, 241, 0.15)" }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center rounded-xl overflow-hidden"
                        style={{
                            backgroundColor: "var(--color-surface-raised)",
                            border: "1px solid var(--color-border)",
                            boxShadow: "0 0 15px rgba(99, 102, 241, 0.06)",
                        }}
                    >
                        <span
                            className="inline-flex items-center gap-2.5 font-mono text-xl font-medium px-5 py-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            <FaDiscord className="w-5 h-5" style={{ color: "var(--color-text-secondary)" }} />
                            bytezlol
                        </span>
                        <span
                            className="w-px h-8 flex-shrink-0"
                            style={{ backgroundColor: "var(--color-border)" }}
                        />
                        <button
                            onClick={copyToClipboard}
                            className="cursor-pointer inline-flex items-center justify-center gap-2 min-w-[110px] px-5 py-3 font-semibold transition-colors duration-200 hover:bg-white/5"
                            style={{
                                color: copied ? "var(--color-available)" : "var(--color-text-primary)",
                            }}
                        >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            {copied ? "Copied" : "Copy"}
                        </button>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <motion.a
                        href="https://discord.com/users/505864551074365453"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="chrome-btn group inline-flex items-center justify-center gap-3 px-8 py-4 text-black font-semibold rounded-xl transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(165,180,252,0.2)]"
                    >
                        <FaDiscord className="w-5 h-5" />
                        Open Discord
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-xs mt-14 font-medium"
                    style={{ color: "var(--color-text-muted)" }}
                >
                    Discord ID: 505864551074365453
                </motion.p>
            </div>
        </section>
    );
}
