import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
    {
        name: "Languages & Frameworks",
        items: ["Java", "Kotlin", "CSS"],
    },
    {
        name: "Databases",
        items: ["MySQL", "MongoDB", "MariaDB", "Redis"],
    },
    {
        name: "DevOps & Tooling",
        items: ["Kubernetes", "Docker", "Git", "Gradle"],
    },
    {
        name: "Minecraft Platforms",
        items: ["Spigot", "Paper", "Velocity", "BungeeCord"],
    },
];

function SkillColumn({ category, delay }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <h3
                className="text-xs uppercase tracking-[0.2em] font-semibold mb-6"
                style={{ color: "var(--color-text-muted)" }}
            >
                {category.name}
            </h3>
            <ul className="space-y-0">
                {category.items.map((skill, i) => (
                    <motion.li
                        key={skill}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.4, delay: delay + i * 0.05 }}
                        className="group flex items-center gap-3 py-2.5 cursor-default transition-colors duration-200"
                    >
                        <div
                            className="w-0 group-hover:w-4 h-px transition-all duration-300"
                            style={{ backgroundColor: "var(--color-accent)" }}
                        />
                        <span
                            className="text-lg transition-colors duration-200"
                            style={{ color: "var(--color-text-secondary)" }}
                            onMouseEnter={(e) => e.target.style.color = "var(--color-text-primary)"}
                            onMouseLeave={(e) => e.target.style.color = "var(--color-text-secondary)"}
                        >
                            {skill}
                        </span>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
}

export default function Skills() {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true });

    return (
        <section id="skills" className="py-32 px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    ref={headerRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-black tracking-tight mb-20"
                >
                    Technologies
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
                    {skillCategories.map((category, i) => (
                        <SkillColumn key={category.name} category={category} delay={i * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
}
