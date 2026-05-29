import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "../types";
import { cn } from "../lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the rapid mouse movements
  const springConfig = { damping: 25, stiffness: 200 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // Map mouse position to rotation angle
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "group relative flex flex-col h-full bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-brand-500/50 transition-colors duration-300",
          project.featured && "md:col-span-2 lg:col-span-2"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent pointer-events-none" />

        {/* --- NOVO LAYOUT: Galeria / Imagem Representativa --- */}
        {project.imageUrl && (
          <div style={{ transform: "translateZ(10px)" }} className="relative h-48 sm:h-56 overflow-hidden border-b border-slate-800/80">
             <div className="absolute inset-0 bg-brand-500/10 mix-blend-overlay z-10 pointer-events-none" />
             <img 
               src={project.imageUrl} 
               alt={project.title} 
               className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none" 
             />
             <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900/90 to-transparent z-10 pointer-events-none" />
          </div>
        )}

        <div className="p-6 flex flex-col flex-grow">
          <div style={{ transform: "translateZ(30px)" }} className="flex justify-between items-start mb-4">
            <h3 className="font-display font-medium text-2xl text-slate-100 drop-shadow-md">
              {project.title}
            </h3>
            <div className="flex gap-3 text-slate-400">
              {project.repoUrl && project.repoUrl !== '#' && (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="hover:text-brand-500 transition-colors cursor-pointer" aria-label={`Repositório`}>
                  <Github size={20} />
                </a>
              )}
              {project.demoUrl && project.demoUrl !== '#' && (
                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="hover:text-brand-500 transition-colors cursor-pointer" aria-label={`Monitor live`}>
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>

          <p style={{ transform: "translateZ(20px)" }} className="text-slate-300 leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>

          <div style={{ transform: "translateZ(40px)" }} className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.map(tech => (
              <span 
                key={tech} 
                className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
