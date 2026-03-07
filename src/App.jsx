import SmoothScroll from "./components/layout/SmoothScroll";
import AmbientBackground from "./components/layout/AmbientBackground";
import Hero from "./components/sections/Hero";
import Stats from "./components/sections/Stats";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";

export default function App() {
    return (
        <SmoothScroll>
            <div className="min-h-screen relative overflow-hidden">
                <AmbientBackground />
                <main className="relative z-10">
                    <Hero />
                    <Stats />
                    <Experience />
                    <Skills />
                    <Contact />
                </main>
            </div>
        </SmoothScroll>
    );
}
