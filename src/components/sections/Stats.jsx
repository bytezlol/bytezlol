import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedNumber({ value, suffix = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (!isInView || hasStarted) return;
        setHasStarted(true);

        const end = value;
        const duration = 800;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [isInView, value, hasStarted]);

    return <span ref={ref}>{displayValue}{suffix}</span>;
}

const stats = [
    { value: 3, suffix: "+", label: "Years Experience" },
    { value: 20, suffix: "+", label: "Projects Delivered" },
    { value: null, display: "24/7", label: "Support Available" },
];

const availability = [
    { type: "Long-term", color: "var(--color-available)", pulse: true },
    { type: "Commissions", color: "var(--color-limited)", pulse: false },
    { type: "Small projects", color: "var(--color-unavailable)", pulse: false },
];

export default function Stats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-24 px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        {stats.map((stat) => (
                            <motion.div
                                key={stat.label}
                                whileHover={{ backgroundColor: "var(--color-surface)" }}
                                transition={{ duration: 0.3 }}
                                className="text-center py-10 px-6 rounded-2xl cursor-default"
                                style={{ backgroundColor: "transparent" }}
                            >
                                <div className="text-6xl md:text-8xl font-black tracking-tight mb-3">
                                    {stat.value !== null ? (
                                        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                                    ) : (
                                        stat.display
                                    )}
                                </div>
                                <div
                                    className="text-xs uppercase tracking-[0.2em] font-semibold"
                                    style={{ color: "var(--color-text-muted)" }}
                                >
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 py-5">
                        {availability.map((item, i) => (
                            <div key={item.type} className="flex items-center gap-2.5">
                                <span className="relative flex h-2 w-2">
                                    {item.pulse && (
                                        <span
                                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                            style={{ backgroundColor: item.color }}
                                        />
                                    )}
                                    <span
                                        className="relative inline-flex rounded-full h-2 w-2"
                                        style={{ backgroundColor: item.color }}
                                    />
                                </span>
                                <span
                                    className="text-sm font-medium"
                                    style={{ color: item.color }}
                                >
                                    {item.type}
                                </span>
                                {i < availability.length - 1 && (
                                    <span
                                        className="ml-3 text-sm"
                                        style={{ color: "var(--color-border-hover)" }}
                                    >
                                        /
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
