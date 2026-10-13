import { useState } from 'react';
import { useTheme } from '../themeContext';
import {
  Layers,
  Network,
  Code2,
  FileText,
  ArrowRight,
  Maximize2
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (tab: 'dsa' | 'ai' | 'flows' | 'papers') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState<number>(0);

  const PREVIEWS = [
    {
      id: 'protocols',
      label: 'Protocols',
      category: 'High Level Design',
      title: 'Communication Protocols & IPC Comparison',
      subtitle: 'HTTP/1.1 vs HTTP/2 vs HTTP/3 vs WebSockets vs gRPC vs SSE',
      svgUrl: '/flows/hld/02_Communication_Protocols/comm_protocol_comparison.svg',
    },
    {
      id: 'lsm',
      label: 'Storage Internals',
      category: 'Databases',
      title: 'LSM-Tree Write Path & Storage Internals',
      subtitle: 'MemTable write buffer, WAL, SSTable flush & Leveled Compaction',
      svgUrl: '/flows/databases/02_Storage_Engines_Internals/db_lsm_tree_write_path.svg',
    },
    {
      id: 'graphrag',
      label: 'GraphRAG',
      category: 'GenAI Systems',
      title: 'GraphRAG & Multi-Hop Reasoning Pipeline',
      subtitle: 'Entity extraction, graph community summaries, hybrid dense + graph retrieval',
      svgUrl: '/flows/genai/01_GraphRAG_Agentic_Workflows/01_graphrag_pipeline_architecture.svg',
    },
    {
      id: 'evals',
      label: 'LLM Evals',
      category: 'GenAI & AI Evals',
      title: 'LLM Evaluations & Benchmarking Landscape',
      subtitle: 'Unit evals, G-Eval, RAG Triad, LLM-as-a-Judge, and regression gating',
      svgUrl: '/flows/genai/03_LLM_Evaluations_And_Benchmarking/01_llm_eval_taxonomy_and_landscape.svg',
    },
    {
      id: 'sql_nosql',
      label: 'SQL vs NoSQL',
      category: 'Databases',
      title: 'SQL vs NoSQL Paradigms & Decision Matrix',
      subtitle: 'ACID transactions, relational normalization vs distributed BASE models',
      svgUrl: '/flows/databases/01_SQL_vs_NoSQL_Paradigms/db_sql_vs_nosql.svg',
    }
  ];

  const currentPreview = PREVIEWS[activeShowcaseIdx];

  const SECTIONS = [
    {
      tab: 'flows' as const,
      icon: Layers,
      title: 'System Design Flows',
      count: '103 Flows',
      desc: 'High Level Design, database storage internals, and generative AI systems organized in progressive learning sequence.',
    },
    {
      tab: 'ai' as const,
      icon: Network,
      title: 'AI Systems Roadmap',
      count: '8 Phases',
      desc: 'Structured curriculum spanning mathematical foundations, transformer architectures, agentic loops, and scalable inference.',
    },
    {
      tab: 'papers' as const,
      icon: FileText,
      title: 'Research Papers',
      count: 'vLLM Deep Dive',
      desc: 'Systems paper breakdowns with extracted high-resolution diagrams, PagedAttention mechanics, and mathematical notes.',
    },
    {
      tab: 'dsa' as const,
      icon: Code2,
      title: 'Data Structures & Algorithms',
      count: '14 Patterns',
      desc: 'Pattern-driven problem revision with clean syntax highlighting, complexity analysis, and implementation mental models.',
    }
  ];

  return (
    <div className="w-full min-h-screen bg-background text-primary selection:bg-primary selection:text-background transition-colors duration-200">
      
      {/* Hero Section */}
      <section className="pt-16 sm:pt-24 pb-14 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto text-center space-y-6">
        
        <div className="space-y-3">
          <p className="text-xs font-mono tracking-widest text-muted uppercase">
            Architecture &amp; Systems Studio
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-vesper tracking-tight text-primary">
            Vesper
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto font-reading leading-relaxed">
            A clean, focused workspace for distributed system designs, AI architectures, research papers, and algorithmic foundations.
          </p>
        </div>

        {/* Quick Nav Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            return (
              <button
                key={sec.tab}
                onClick={() => onNavigate(sec.tab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                  isDark
                    ? 'border-[#2e313d] bg-[#181920] text-zinc-300 hover:bg-[#22242d] hover:text-white hover:border-zinc-500'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-black hover:border-slate-400'
                }`}
              >
                <Icon size={14} className="opacity-70" />
                <span>{sec.title}</span>
                <ArrowRight size={12} className="opacity-40" />
              </button>
            );
          })}
        </div>

      </section>

      {/* Interactive Diagram Preview */}
      <section className="px-4 sm:px-6 md:px-8 max-w-5xl mx-auto pb-16">
        <div className={`rounded-2xl border overflow-hidden ${
          isDark ? 'border-[#2e313d] bg-[#181920]' : 'border-slate-200 bg-white'
        }`}>
          
          {/* Preview Navigation Bar */}
          <div className={`px-4 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
            isDark ? 'border-[#2e313d] bg-[#1c1e26]' : 'border-slate-200 bg-slate-50'
          }`}>
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 custom-scrollbar">
              {PREVIEWS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveShowcaseIdx(idx)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                    activeShowcaseIdx === idx
                      ? isDark
                        ? 'bg-white text-black font-semibold'
                        : 'bg-slate-900 text-white font-semibold'
                      : isDark
                        ? 'text-zinc-400 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 hover:text-black hover:bg-slate-200/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Direct Open Button */}
            <button
              onClick={() => onNavigate('flows')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                isDark 
                  ? 'bg-[#262833] hover:bg-[#323544] text-zinc-200' 
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
              }`}
            >
              <Maximize2 size={12} />
              <span>Open in Flows</span>
            </button>
          </div>

          {/* Diagram Title Header */}
          <div className="px-5 pt-4 pb-2">
            <span className="text-[11px] font-mono text-muted uppercase tracking-wider">
              {currentPreview.category}
            </span>
            <h3 className="text-base sm:text-lg font-bold font-vesper text-primary mt-0.5">
              {currentPreview.title}
            </h3>
            <p className="text-xs text-muted font-reading mt-0.5">
              {currentPreview.subtitle}
            </p>
          </div>

          {/* Image Canvas */}
          <div className={`p-4 sm:p-8 flex items-center justify-center min-h-[300px] max-h-[500px] overflow-hidden ${
            isDark ? 'bg-[#0f1014]' : 'bg-[#f1f4f8]'
          }`}>
            <div className={`w-full max-w-4xl rounded-xl border p-3 sm:p-5 flex items-center justify-center ${
              isDark ? 'bg-[#181920] border-[#2e313d]' : 'bg-white border-slate-200'
            }`}>
              <img
                src={currentPreview.svgUrl}
                alt={currentPreview.title}
                className="w-full h-auto max-h-[420px] object-contain select-none"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 4 Core Pillars Grid */}
      <section className="px-4 sm:px-6 md:px-8 max-w-5xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.tab}
                onClick={() => onNavigate(sec.tab)}
                className={`group p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isDark
                    ? 'border-[#2e313d] bg-[#181920] hover:border-zinc-400 hover:bg-[#1d1f27]'
                    : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50/50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${
                      isDark ? 'bg-[#22242e] text-zinc-200' : 'bg-slate-100 text-slate-800'
                    }`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-border text-muted">
                      {sec.count}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-vesper text-primary group-hover:text-primary transition-colors">
                      {sec.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted font-reading leading-relaxed mt-1">
                      {sec.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-border/50 mt-4 text-xs font-mono text-muted group-hover:text-primary transition-colors">
                  <span>Explore section</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-border py-8 px-4 text-center text-xs font-mono text-muted">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span>Vesper</span>
          <span>•</span>
          <button onClick={() => onNavigate('flows')} className="hover:text-primary transition-colors cursor-pointer">Flows</button>
          <span>•</span>
          <button onClick={() => onNavigate('ai')} className="hover:text-primary transition-colors cursor-pointer">AI</button>
          <span>•</span>
          <button onClick={() => onNavigate('papers')} className="hover:text-primary transition-colors cursor-pointer">Papers</button>
          <span>•</span>
          <button onClick={() => onNavigate('dsa')} className="hover:text-primary transition-colors cursor-pointer">DS &amp; Algo</button>
        </div>
      </footer>

    </div>
  );
}
