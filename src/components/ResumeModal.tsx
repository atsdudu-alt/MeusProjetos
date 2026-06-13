import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, Printer, Mail, Phone, MapPin, Copy, Check, ExternalLink, Award } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Close with ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("eduardoj.a@outlook.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+5513991973159");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      {/* Background overlay click */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Main Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 print:static print:border-none print:bg-white print:m-0 print:p-0 print:shadow-none"
      >
        {/* Top Control Bar (Hidden in Print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 print:hidden">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Currículo Interativo & Impresso
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/curriculo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all duration-200 cursor-pointer border border-slate-750 hover:border-slate-600"
            >
              <ExternalLink size={14} className="text-brand-400" />
              <span>Ver PDF Original</span>
            </a>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-500 hover:bg-brand-600 text-white transition-all duration-200 cursor-pointer shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20"
            >
              <Printer size={14} />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all cursor-pointer"
              title="Fechar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-10 max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible print:p-0">
          
          {/* PRINT-ONLY HEADER INSTRUCTIONS (Hidden in screen) */}
          <div className="hidden print:block text-right text-[10px] text-slate-400 mb-8 border-b pb-2">
            Currículo de Eduardo José Araújo — Gerado via portfólio digital
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:block">
            {/* Left Column (Main Info - Screen: dark theme, Print: light theme) */}
            <div className="md:col-span-1 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-slate-800/60 pb-6 md:pb-0 md:pr-6 print:border-none print:p-0 print:mb-6">
              <div className="flex flex-col items-center md:items-start text-center md:text-left print:text-left">
                {/* Visual Accent */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-400 to-indigo-600 flex items-center justify-center text-white font-display text-2xl font-bold mb-4 shadow-lg shadow-brand-500/20 print:hidden">
                  EA
                </div>
                <h1 className="text-2xl font-bold font-display text-slate-50 print:text-slate-900 print:text-3xl">
                  Eduardo José Araújo
                </h1>
                <p className="text-sm font-medium text-brand-400 mt-1.5 print:text-indigo-700 print:font-semibold">
                  Engenharia de Software & IA
                </p>
              </div>

              {/* Contact Block */}
              <div className="flex flex-col gap-3.5 text-sm py-4 print:py-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 print:text-slate-700 print:border-b print:pb-1">
                  Contato
                </h3>
                
                {/* Email Item */}
                <div className="flex items-center gap-3 text-slate-300 md:justify-start print:text-slate-800">
                  <Mail size={16} className="text-brand-400 shrink-0 print:text-slate-600" />
                  <a href="mailto:eduardoj.a@outlook.com" className="hover:text-brand-300 hover:underline break-all">
                    eduardoj.a@outlook.com
                  </a>
                  <button 
                    onClick={handleCopyEmail}
                    className="p-1 text-slate-500 hover:text-slate-300 rounded cursor-pointer print:hidden shrink-0"
                    title="Copiar e-mail"
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald-500" /> : <Copy size={13} />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="flex items-center gap-3 text-slate-300 md:justify-start print:text-slate-800">
                  <Phone size={16} className="text-brand-400 shrink-0 print:text-slate-600" />
                  <a href="tel:+5513991973159" className="hover:text-brand-300 hover:underline">
                    +55 (13) 99197-3159
                  </a>
                  <button 
                    onClick={handleCopyPhone}
                    className="p-1 text-slate-500 hover:text-slate-300 rounded cursor-pointer print:hidden shrink-0"
                    title="Copiar telefone"
                  >
                    {copiedPhone ? <Check size={14} className="text-emerald-500" /> : <Copy size={13} />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="flex items-center gap-3 text-slate-300 md:justify-start print:text-slate-800">
                  <MapPin size={16} className="text-brand-400 shrink-0 print:text-slate-600" />
                  <span>Cajati, SP - Brasil</span>
                </div>
              </div>

              {/* Focus of studies */}
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 print:hidden">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={16} className="text-brand-400" />
                  <span className="text-xs font-semibold text-slate-300">Foco Profissional</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Buscando transição de carreira para a área de Tecnologia, aproveitando vasta bagagem em análise laboratorial e liderança de processos.
                </p>
              </div>
            </div>

            {/* Right Column (CV Sections) */}
            <div className="md:col-span-2 flex flex-col gap-8 print:block print:w-full">
              
              {/* OBJETIVO Section */}
              <section className="print:mb-6">
                <h2 className="text-base font-semibold text-slate-100 font-display flex items-center gap-2 border-b border-slate-800 pb-2 mb-3.5 print:text-slate-900 print:text-lg print:border-slate-300">
                  Objetivo
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed print:text-slate-800 text-justify">
                  5 anos de experiência prática em liderança na gestão de processos industriais, combinados
                  com habilidades no desenvolvimento de aplicações com uso de IA. Busca contribuir usando
                  meu conhecimento em inteligência artificial, aplicando uma mentalidade analítica e orientada
                  a resultados em projetos de pesquisa e desenvolvimento.
                </p>
              </section>

              {/* FORMAÇÃO ACADÊMICA */}
              <section className="print:mb-6">
                <h2 className="text-base font-semibold text-slate-100 font-display flex items-center gap-2 border-b border-slate-800 pb-2 mb-3.5 print:text-slate-900 print:text-lg print:border-slate-300">
                  Formação Acadêmica
                </h2>
                <div className="flex flex-col gap-4">
                  {/* Grad 1 */}
                  <div className="flex flex-col">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <h4 className="text-sm font-semibold text-slate-200 print:text-slate-950">
                        Bacharelado em Engenharia de Software
                      </h4>
                      <span className="text-xs text-brand-400 font-medium print:text-slate-600">
                        Conclusão: 2030
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 print:text-slate-700">
                      Unicesumar • Cursando
                    </p>
                  </div>

                  {/* Grad 2 */}
                  <div className="flex flex-col">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <h4 className="text-sm font-semibold text-slate-200 print:text-slate-950">
                        Técnico em Química (CRQ ATIVO)
                      </h4>
                      <span className="text-xs text-slate-400 font-medium print:text-slate-600">
                        Concluído
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 print:text-slate-700">
                      ESA (Escola de Saúde e Ambiente)
                    </p>
                  </div>
                </div>
              </section>

              {/* EXPERIÊNCIA PROFISSIONAL */}
              <section className="print:mb-6">
                <h2 className="text-base font-semibold text-slate-100 font-display flex items-center gap-2 border-b border-slate-800 pb-2 mb-3.5 print:text-slate-900 print:text-lg print:border-slate-300">
                  Experiência Profissional
                </h2>
                <div className="flex flex-col">
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <h4 className="text-sm font-semibold text-slate-200 print:text-slate-950">
                      Técnico de Processos
                    </h4>
                    <span className="text-xs text-brand-400 font-medium print:text-slate-600">
                      6 anos • Atual
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 mb-2.5 print:text-slate-700">
                    Araxa Ambiental
                  </p>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed text-justify print:text-slate-850">
                    Atuação como técnico de processos em empresa de serviços ambientais, com forte foco em
                    liderança de equipe, monitoramento e controle de processos operacionais, gestão de
                    indicadores (KPIs) e resolução de problemas em ambiente industrial. A experiência em
                    liderança contribuiu para o desenvolvimento de habilidades analíticas e de tomada de decisão,
                    diretamente aplicáveis a contextos de pesquisa e desenvolvimento tecnológico.
                  </p>
                </div>
              </section>

              {/* HABILIDADES & COMPETÊNCIAS */}
              <section className="print:mb-4">
                <h2 className="text-base font-semibold text-slate-100 font-display flex items-center gap-2 border-b border-slate-800 pb-2 mb-3.5 print:text-slate-900 print:text-lg print:border-slate-300">
                  Habilidades & Competências
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs print:grid-cols-1 print:gap-2">
                  <div className="p-3 bg-slate-950/30 border border-slate-800/40 rounded-lg print:border-none print:bg-transparent print:p-0">
                    <h5 className="font-semibold text-slate-200 mb-1 print:text-slate-950">
                      Inteligência Artificial Aplicada
                    </h5>
                    <p className="text-slate-400 print:text-slate-800">
                      Experiência prática na criação e prototipagem de aplicações utilizando ferramentas e APIs de IA.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/30 border border-slate-800/40 rounded-lg print:border-none print:bg-transparent print:p-0">
                    <h5 className="font-semibold text-slate-200 mb-1 print:text-slate-950">
                      Liderança & Gestão de Equipes
                    </h5>
                    <p className="text-slate-400 print:text-slate-800">
                      Coordenação de processos e pessoas em planta industrial. Gestão de KPIs focada em performance.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/30 border border-slate-800/40 rounded-lg print:border-none print:bg-transparent print:p-0">
                    <h5 className="font-semibold text-slate-200 mb-1 print:text-slate-950">
                      Programação & Lógica
                    </h5>
                    <p className="text-slate-400 print:text-slate-800">
                      Conhecimentos de lógica de programação e bases de engenharia de software e web.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/30 border border-slate-800/40 rounded-lg print:border-none print:bg-transparent print:p-0">
                    <h5 className="font-semibold text-slate-200 mb-1 print:text-slate-950">
                      Pensamento Analítico
                    </h5>
                    <p className="text-slate-400 print:text-slate-800">
                      Análise crítica de desempenho, melhoria contínua de rotinas e tratamento de anomalias industriais.
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-brand-500/5 border border-brand-500/10 rounded-lg text-xs text-slate-300 print:border-none print:bg-transparent print:p-0 print:text-slate-800 print:mt-2">
                  <span className="font-semibold text-brand-300 print:text-indigo-950">Diferencial Operacional: </span>
                  Conhecimento avançado na atualização e manutenção de planilhas complexas da Usina de beneficiamento industrial.
                </div>
              </section>

            </div>
          </div>

        </div>

        {/* Print Helper CSS Injected Locally */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body { 
              background: white !important; 
              color: #111827 !important;
            }
            /* Hide the main website in the background, only show print node */
            #root > *:not(.fixed) {
              display: none !important;
            }
            .fixed {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              background: white !important;
              width: 100% !important;
              height: auto !important;
              overflow: visible !important;
              display: block !important;
            }
            /* Reset dark elements */
            .text-slate-50, .text-slate-100, .text-slate-200, .text-slate-300, .text-slate-400 {
              color: #1a202c !important;
            }
            .text-indigo-300, .text-brand-300, .text-brand-400 {
              color: #4338ca !important;
            }
          }
        `}} />
      </motion.div>
    </div>
  );
}
