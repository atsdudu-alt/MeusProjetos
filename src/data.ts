import { Project } from './types';

export const projects: Project[] = [
  {
    id: 'lab-controle',
    title: 'LAB Control',
    description: 'Sistema de Gestão Laboratorial Offline-First inovador com IA e sincronização na nuvem. Desenhado para resiliência no ambiente industrial, permite gestão de fluxos operacionais, diagnósticos via IA (Google Gemini), geração automatizada de apresentações corporativas e possui arquitetura PWA para instalação nativa.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Google Gemini AI', 'Supabase', 'Recharts'],
    demoUrl: 'https://lab-mosaic.vercel.app/',
    repoUrl: 'https://github.com/atsdudu-alt',
    imageUrl: '/controle-de-laboratorio.png',
    featured: true,
    category: 'Full Stack'
  },
  {
    id: 'portal-igreja',
    title: 'Portal da Igreja Adventista',
    description: 'Portal digital dinâmico para organização de departamentos e comunhão. Possui gestão de escalas, membros, eventos, galeria de mídia, backup/restauração e assistência com IA (Google Gemini) para geração de conteúdo.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Google GenAI SDK', 'React Router'],
    demoUrl: 'https://centralcajati.vercel.app/',
    repoUrl: 'https://github.com/atsdudu-alt',
    imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    category: 'Full Stack'
  },
  {
    id: 'insightflow-bi',
    title: 'InsightFlow BI',
    description: 'Plataforma inteligente de BI que transforma planilhas (Excel, CSV) e documentos (PDF, Word) em dashboards estruturados. Analisa dados com IA (Google Gemini), gera gráficos interativos dinâmicos com drag-and-drop e possui chat conversacional para insights.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Google GenAI SDK', 'Recharts', 'React Grid Layout'],
    demoUrl: 'https://ais-pre-rb2g6woq2z4zt3njk6hw23-438399686026.us-east1.run.app',
    repoUrl: 'https://github.com/atsdudu-alt',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&h=630&fit=crop',
    featured: true,
    category: 'Full Stack'
  }
];
