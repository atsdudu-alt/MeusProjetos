import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText } from "lucide-react";
import HeroScene from "./components/HeroScene";
import ProjectCard from "./components/ProjectCard";
import ResumeModal from "./components/ResumeModal";
import { projects } from "./data";
import { cn } from "./lib/utils";

export default function Portfolio() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-transparent font-sans selection:bg-brand-500/30">
      {/* Fixed 3D background */}
      <HeroScene />

      {/* Intro Overlay */}
      <AnimatePresence>
        {!introFinished && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/30 backdrop-blur-sm"
          >
            <div 
              className="p-12 cursor-pointer group flex flex-col items-center"
              onMouseEnter={() => setIntroFinished(true)}
              onTouchStart={() => setIntroFinished(true)} // Support mobile interactions as well
            >
              <motion.h1
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-5xl sm:text-7xl lg:text-9xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-50 to-slate-400 drop-shadow-2xl text-center group-hover:from-brand-300 group-hover:to-brand-500 transition-all duration-700"
              >
                Eduardo J.A
              </motion.h1>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-12 text-slate-300/60 text-sm tracking-widest uppercase animate-pulse pointer-events-none"
            >
              Passe o mouse
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Projects View (Revealed after intro) */}
      <AnimatePresence>
        {introFinished && (
          <motion.main
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative z-10 pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col"
          >
            {/* Subtle Resume Button (Triggers Interactive Modal) */}
            <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-50">
              <button
                onClick={() => setIsResumeOpen(true)}
                title="Acessar Currículo"
                className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-brand-300 transition-all duration-300 border border-slate-800/60 hover:border-brand-500 bg-slate-950/60 hover:bg-slate-900/80 px-4 py-2 rounded-full cursor-pointer shadow-lg shadow-black/30 backdrop-blur"
              >
                <FileText size={16} className="text-brand-400" />
                <span>Currículo</span>
              </button>
            </div>

            <header className="mb-16 md:mb-24 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md mb-8"
              >
                <span className="flex h-2 w-2 rounded-full bg-brand-500 shadow-[0_0_8px_#4f46e5]"></span>
                <span className="text-sm font-medium text-slate-300">Técnico de Processos & Futuro Engenheiro de Software</span>
              </motion.div>

              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-medium text-slate-50 mb-6 tracking-tight">
                Evoluindo em <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-300">Tecnologia</span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Sou Técnico em Química e de Processos Industriais com 6 anos de experiência prática, realizando minha transição de carreira para Engenharia de Software e IA. Aqui compartilho meus projetos e aprendizados!
              </p>
            </header>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 flex-grow">
              {projects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>

            <footer className="mt-32 pt-12 border-t border-slate-800/50 text-center">
              <div className="flex flex-col items-center gap-6">
                <h2 className="text-2xl font-display font-medium text-slate-100">Vamos trocar ideias?</h2>
                <p className="text-slate-400 max-w-md mx-auto">
                  Estou sempre buscando evoluir. Sinta-se à vontade para enviar dicas, feedbacks ou convites para participar de projetos open-source!
                </p>
                <a 
                  href="mailto:eduardoj.a@outlook.com" 
                  className="px-8 py-4 rounded-full border border-slate-700 bg-slate-900/50 backdrop-blur-md text-brand-400 hover:text-brand-300 hover:border-brand-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.2)] transition-all duration-300"
                >
                  eduardoj.a@outlook.com
                </a>
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Interactive Resume Modal Overlay */}
      <AnimatePresence>
        {isResumeOpen && (
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
