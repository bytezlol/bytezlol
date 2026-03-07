import { useRef, useEffect, useCallback } from "react";

const CODE_LINES = [
    [{ text: "package ", cls: "kw" }, { text: "com.auvq.core", cls: "tp" }, { text: ";", cls: "pl" }],
    [],
    [{ text: "import ", cls: "kw" }, { text: "org.bukkit.plugin.java.JavaPlugin", cls: "tp" }, { text: ";", cls: "pl" }],
    [{ text: "import ", cls: "kw" }, { text: "org.bukkit.Bukkit", cls: "tp" }, { text: ";", cls: "pl" }],
    [],
    [{ text: "public class ", cls: "kw" }, { text: "Core ", cls: "tp" }, { text: "extends ", cls: "kw" }, { text: "JavaPlugin ", cls: "tp" }, { text: "{", cls: "pl" }],
    [],
    [{ text: "    private ", cls: "kw" }, { text: "CommandManager ", cls: "tp" }, { text: "commandManager", cls: "vr" }, { text: ";", cls: "pl" }],
    [{ text: "    private ", cls: "kw" }, { text: "EventHandler ", cls: "tp" }, { text: "eventHandler", cls: "vr" }, { text: ";", cls: "pl" }],
    [],
    [{ text: "    @Override", cls: "an" }],
    [{ text: "    public void ", cls: "kw" }, { text: "onEnable", cls: "fn" }, { text: "() {", cls: "pl" }],
    [{ text: "        // Initialize core systems", cls: "cm" }],
    [{ text: "        commandManager", cls: "vr" }, { text: " = ", cls: "pl" }, { text: "new ", cls: "kw" }, { text: "CommandManager", cls: "tp" }, { text: "(", cls: "pl" }, { text: "this", cls: "kw" }, { text: ");", cls: "pl" }],
    [{ text: "        eventHandler", cls: "vr" }, { text: " = ", cls: "pl" }, { text: "new ", cls: "kw" }, { text: "EventHandler", cls: "tp" }, { text: "(", cls: "pl" }, { text: "this", cls: "kw" }, { text: ");", cls: "pl" }],
    [],
    [{ text: "        getLogger", cls: "fn" }, { text: "().info(", cls: "pl" }, { text: '"Core enabled!"', cls: "st" }, { text: ");", cls: "pl" }],
    [{ text: "        loadConfig", cls: "fn" }, { text: "();", cls: "pl" }],
    [{ text: "        registerListeners", cls: "fn" }, { text: "();", cls: "pl" }],
    [{ text: "    }", cls: "pl" }],
    [],
    [{ text: "    private void ", cls: "kw" }, { text: "registerListeners", cls: "fn" }, { text: "() {", cls: "pl" }],
    [{ text: "        Bukkit", cls: "tp" }, { text: ".getPluginManager().registerEvents(", cls: "pl" }],
    [{ text: "            new ", cls: "kw" }, { text: "PlayerListener", cls: "tp" }, { text: "(", cls: "pl" }, { text: "this", cls: "kw" }, { text: "),", cls: "pl" }],
    [{ text: "            this", cls: "kw" }],
    [{ text: "        );", cls: "pl" }],
    [{ text: "    }", cls: "pl" }],
    [{ text: "}", cls: "pl" }],
];

// Flatten to chars
function buildChars() {
    const chars = [];
    CODE_LINES.forEach((segs) => {
        if (segs.length === 0) {
            chars.push({ char: "\n", cls: "pl" });
            return;
        }
        segs.forEach((seg) => {
            for (const ch of seg.text) {
                chars.push({ char: ch, cls: seg.cls });
            }
        });
        chars.push({ char: "\n", cls: "pl" });
    });
    return chars;
}

const ALL_CHARS = buildChars();

// Pre-build full HTML for each char count so we can go forward AND backward
function buildHtmlUpTo(count) {
    let html = "";
    for (let i = 0; i < count && i < ALL_CHARS.length; i++) {
        const c = ALL_CHARS[i];
        if (c.char === "\n") {
            html += "\n";
        } else if (c.char === " ") {
            html += " ";
        } else {
            html += `<span class="code-${c.cls}">${c.char}</span>`;
        }
    }
    return html;
}

// Snap to the end of the nearest complete line
function snapToLineEnd(target) {
    for (let i = target; i < ALL_CHARS.length; i++) {
        if (ALL_CHARS[i].char === "\n") return i + 1;
    }
    return target;
}
const INITIAL_COUNT = snapToLineEnd(Math.floor(ALL_CHARS.length * 0.3));
const TYPING_SPEED = 0.5; // chars per frame
const TYPING_DELAY = 200; // ms before typing starts

function TypingCode() {
    const codeRef = useRef(null);
    const cursorRef = useRef(null);
    const prevCount = useRef(-1);
    const scrollRef = useRef(0);
    const smoothScroll = useRef(0);
    const rafRef = useRef(null);
    const introCount = useRef(0);
    const introDone = useRef(false);
    const startTime = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            scrollRef.current = max > 0 ? window.scrollY / max : 0;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const tick = useCallback((now) => {
        if (!startTime.current) startTime.current = now;
        const elapsed = now - startTime.current;

        let charCount;

        if (!introDone.current) {
            // Phase 1: Fast typing animation on load
            if (elapsed < TYPING_DELAY) {
                charCount = 0;
            } else {
                introCount.current = Math.min(
                    introCount.current + TYPING_SPEED,
                    INITIAL_COUNT
                );
                if (introCount.current >= INITIAL_COUNT) {
                    introDone.current = true;
                }
                charCount = introCount.current;
            }
        } else {
            // Phase 2: Scroll-driven (rest of the chars)
            smoothScroll.current +=
                (scrollRef.current - smoothScroll.current) * 0.06;
            const remaining = ALL_CHARS.length - INITIAL_COUNT;
            charCount =
                INITIAL_COUNT + Math.floor(smoothScroll.current * remaining);
        }

        if (charCount !== prevCount.current && codeRef.current) {
            prevCount.current = charCount;
            codeRef.current.innerHTML = buildHtmlUpTo(charCount);
        }

        // Cursor blink
        if (cursorRef.current) {
            cursorRef.current.style.opacity =
                Math.floor(now / 400) % 2 === 0 ? "1" : "0";
        }

        rafRef.current = requestAnimationFrame(tick);
    }, []);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [tick]);

    return (
        <div className="code-terminal">
            <pre className="code-text"><span ref={codeRef} /><span className="code-cursor" ref={cursorRef} /></pre>
        </div>
    );
}

export default function AmbientBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <TypingCode />

            {/* Noise */}
            <svg
                className="absolute inset-0 w-full h-full opacity-[0.03]"
                xmlns="http://www.w3.org/2000/svg"
                style={{ pointerEvents: "none" }}
            >
                <filter id="noise-desktop">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise-desktop)" />
            </svg>

            {/* Vignette */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(5,5,7,0.3) 40%, rgba(5,5,7,0.75) 100%)",
                    pointerEvents: "none",
                }}
            />
        </div>
    );
}
