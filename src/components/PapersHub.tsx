import { useState, useMemo } from 'react';
import { PAPERS_DATA } from '../data/papersData';
import type { ExtractedFigure } from '../types/paper';
import { useTheme } from '../themeContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  FileText,
  ExternalLink, 
  Layers, 
  HelpCircle, 
  X, 
  Copy, 
  Check, 
  Cpu, 
  BookOpen,
  Maximize2,
  Terminal,
  Code2,
  RotateCw,
  ZoomIn,
  ZoomOut,
  BookMarked
} from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

function KaTeXMath({ 
  math, 
  block = true, 
  className = '' 
}: { 
  math: string; 
  block?: boolean; 
  className?: string;
}) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
      });
    } catch (e) {
      console.error('KaTeX render error:', e);
      return math;
    }
  }, [math, block]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function PapersHub() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Active paper state (defaults to Attention Is All You Need)
  const [selectedPaperId, setSelectedPaperId] = useState<string>(PAPERS_DATA[0].id);
  const currentPaper = PAPERS_DATA.find(p => p.id === selectedPaperId) || PAPERS_DATA[0];

  // Navigation tab inside the paper
  const [activeTab, setActiveTab] = useState<'overview' | 'figures' | 'math' | 'code' | 'interview'>('overview');

  // Modal for zoomed figure inspection & controls
  const [zoomedFigure, setZoomedFigure] = useState<ExtractedFigure | null>(null);
  const [modalRotation, setModalRotation] = useState<number>(0);
  const [modalZoomed, setModalZoomed] = useState<boolean>(false);

  const openFigureModal = (fig: ExtractedFigure) => {
    setZoomedFigure(fig);
    setModalRotation(0);
    setModalZoomed(false);
  };

  // Copy code state
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] flex flex-col bg-background text-primary transition-colors duration-200">
      
      {/* ========================================================
          Top Paper Switcher (Clean, Minimal, Fast, No Clutter)
          ======================================================== */}
      <header className="border-b border-border bg-surface px-4 sm:px-8 py-3 transition-colors duration-200">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Paper Selector Pills for All 4 Papers */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar select-none py-1">
            <span className="text-xs font-mono font-bold text-muted uppercase tracking-wider mr-1 flex items-center gap-1.5">
              <BookMarked size={14} className="text-primary" />
              <span className="hidden sm:inline">Papers:</span>
            </span>

            {PAPERS_DATA.map((paper) => {
              const isSelected = paper.id === currentPaper.id;
              return (
                <button
                  key={paper.id}
                  onClick={() => {
                    setSelectedPaperId(paper.id);
                    setZoomedFigure(null);
                    setModalRotation(0);
                    setModalZoomed(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border ${
                    isSelected
                      ? isDark
                        ? 'bg-white text-black border-white font-bold shadow-xs'
                        : 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
                      : isDark
                        ? 'bg-[#15161b] text-zinc-400 border-[#252834] hover:text-white hover:border-zinc-500'
                        : 'bg-white text-slate-600 border-[#dbe0e9] hover:text-black hover:border-slate-400'
                  }`}
                >
                  <span>{paper.shortTitle}</span>
                  <span className="text-[10px] opacity-60">({paper.year})</span>
                </button>
              );
            })}
          </div>

          {/* Quick PDF Link */}
          <a
            href={currentPaper.arxivUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-surface text-xs font-mono text-muted hover:text-primary transition-colors cursor-pointer"
          >
            <ExternalLink size={12} />
            <span>arXiv PDF</span>
          </a>
        </div>
      </header>

      {/* ========================================================
          Active Paper Workspace
          ======================================================== */}
      <div className="border-b border-border bg-surface px-4 sm:px-8 py-5 transition-colors duration-200">
        <div className="max-w-6xl mx-auto space-y-3">

          {/* Title & Metadata */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted mb-1.5">
              <span className="font-semibold text-primary">{currentPaper.conferenceOrArxiv}</span>
              <span>•</span>
              <span>{currentPaper.readTime}</span>
              <span>•</span>
              <span>{currentPaper.difficulty}</span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-primary leading-tight font-vesper">
              {currentPaper.title}
            </h1>

            <p className="text-xs sm:text-sm text-muted font-reading mt-1.5 leading-relaxed">
              {currentPaper.authors.join(', ')} {currentPaper.affiliations ? `• ${currentPaper.affiliations}` : ''}
            </p>
          </div>

          {/* Core Summary (Clean, single box) */}
          <div className={`p-4 rounded-xl border leading-relaxed ${
            isDark ? 'bg-[#15161b] border-[#252834] text-zinc-200' : 'bg-[#f6f7fa] border-[#dbe0e9] text-slate-800'
          }`}>
            <p className="font-vesper text-sm sm:text-base leading-relaxed">
              {currentPaper.eli5Summary}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="pt-2 flex items-center gap-1.5 border-t border-border overflow-x-auto custom-scrollbar select-none">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-primary text-background font-semibold shadow-xs'
                  : 'text-muted hover:text-primary hover:bg-surface-elevated'
              }`}
            >
              <BookOpen size={13} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('figures')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'figures'
                  ? 'bg-primary text-background font-semibold shadow-xs'
                  : 'text-muted hover:text-primary hover:bg-surface-elevated'
              }`}
            >
              <Layers size={13} />
              <span>Figures ({currentPaper.figures.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('math')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'math'
                  ? 'bg-primary text-background font-semibold shadow-xs'
                  : 'text-muted hover:text-primary hover:bg-surface-elevated'
              }`}
            >
              <Cpu size={13} />
              <span>Math ({currentPaper.formulas.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'code'
                  ? 'bg-primary text-background font-semibold shadow-xs'
                  : 'text-muted hover:text-primary hover:bg-surface-elevated'
              }`}
            >
              <Terminal size={13} />
              <span>Code</span>
            </button>

            <button
              onClick={() => setActiveTab('interview')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'interview'
                  ? 'bg-primary text-background font-semibold shadow-xs'
                  : 'text-muted hover:text-primary hover:bg-surface-elevated'
              }`}
            >
              <HelpCircle size={13} />
              <span>Interview Q&A ({currentPaper.interviewQuestions.length})</span>
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================
          Tab Content Sections
          ======================================================== */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 flex-1">
        
        {/* ======================================================
            TAB 1: OVERVIEW & INTUITION
            ====================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* The Real-World Analogy */}
            <section className={`p-6 rounded-2xl border space-y-3 shadow-xs ${
              isDark ? 'bg-[#1e2027] border-[#2e313d]' : 'bg-white border-[#dbe0e9]'
            }`}>
              <div className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider ${
                isDark ? 'text-zinc-400' : 'text-slate-700'
              }`}>
                <FileText size={14} />
                <span>The Core Analogy</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary font-vesper">
                {currentPaper.realWorldAnalogy.title}
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed font-vesper ${
                isDark ? 'text-zinc-200' : 'text-slate-900'
              }`}>
                {currentPaper.realWorldAnalogy.analogyText}
              </p>
              <div className="pt-3 border-t border-border text-xs sm:text-sm text-primary font-medium">
                <strong className={`font-mono uppercase text-[10px] tracking-wider block mb-1 ${
                  isDark ? 'text-zinc-400' : 'text-slate-700'
                }`}>Key Takeaway:</strong>
                <span className={`font-vesper text-sm sm:text-base ${
                  isDark ? 'text-zinc-200' : 'text-slate-900'
                }`}>{currentPaper.realWorldAnalogy.takeaway}</span>
              </div>
            </section>

            {/* Problem vs Breakthrough Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Problem Analysis */}
              <div className={`p-6 rounded-2xl border space-y-4 shadow-xs ${
                isDark ? 'bg-[#1e2027] border-[#2e313d]' : 'bg-white border-[#dbe0e9]'
              }`}>
                <h3 className={`text-sm font-mono font-bold uppercase tracking-wider ${
                  isDark ? 'text-zinc-400' : 'text-slate-900'
                }`}>
                  The Problem in Existing Systems
                </h3>
                
                <div className={`space-y-3 text-xs sm:text-sm leading-relaxed font-reading ${
                  isDark ? 'text-zinc-300' : 'text-slate-800'
                }`}>
                  <div>
                    <strong className="text-primary block font-mono font-semibold">1. Prior State:</strong>
                    <span>{currentPaper.theProblem.beforeState}</span>
                  </div>

                  <div>
                    <strong className="text-primary block font-mono font-semibold">2. The Memory Wall:</strong>
                    <span>{currentPaper.theProblem.bottleneck}</span>
                  </div>

                  <div>
                    <strong className="text-primary block font-mono font-semibold">3. Three Waste Sources:</strong>
                    <span>{currentPaper.theProblem.whyExistingMethodsFailed}</span>
                  </div>
                </div>
              </div>

              {/* Breakthrough Solution */}
              <div className={`p-6 rounded-2xl border space-y-4 shadow-xs ${
                isDark ? 'bg-[#1e2027] border-[#2e313d]' : 'bg-white border-[#dbe0e9]'
              }`}>
                <h3 className={`text-sm font-mono font-bold uppercase tracking-wider ${
                  isDark ? 'text-zinc-400' : 'text-slate-900'
                }`}>
                  The Architecture Breakthrough
                </h3>
                
                <p className={`text-xs sm:text-sm leading-relaxed font-reading ${
                  isDark ? 'text-zinc-300' : 'text-slate-800'
                }`}>
                  {currentPaper.coreBreakthrough.overview}
                </p>

                <ul className={`space-y-2 text-xs sm:text-sm font-reading ${
                  isDark ? 'text-zinc-300' : 'text-slate-800'
                }`}>
                  {currentPaper.coreBreakthrough.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-mono text-primary font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Featured Preview of Key Figures */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-mono uppercase tracking-wider text-muted">
                  Featured Paper Figures & Tables
                </h3>
                <button
                  onClick={() => setActiveTab('figures')}
                  className="text-xs font-mono text-primary underline underline-offset-4 cursor-pointer"
                >
                  View all {currentPaper.figures.length} figures & tables →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentPaper.figures.slice(0, 2).map((fig) => (
                  <div
                    key={fig.id}
                    onClick={() => {
                      setActiveTab('figures');
                      openFigureModal(fig);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer hover:border-primary transition-all shadow-xs ${
                      isDark ? 'bg-[#1e2027] border-[#2e313d]' : 'bg-white border-[#dbe0e9]'
                    }`}
                  >
                    <div className="bg-white rounded-xl p-3 flex items-center justify-center overflow-hidden border border-slate-200">
                      <img 
                        src={fig.imageUrl} 
                        alt={fig.title}
                        className="max-h-48 object-contain"
                      />
                    </div>
                    <div className="mt-3 space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-muted">{fig.figureNumber}</span>
                      <h4 className="text-xs font-bold text-primary truncate">{fig.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ======================================================
            TAB 2: EXTRACTED FIGURES & SCHEMATICS
            ====================================================== */}
        {activeTab === 'figures' && (
          <div className="space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight">Extracted Publication Figures & Tables ({currentPaper.figures.length} Items)</h2>
              <p className="text-xs text-muted font-reading">
                High-resolution diagrams and tables extracted directly from the original publication. Click any figure to expand full-screen.
              </p>
            </div>

            <div className="space-y-8">
              {currentPaper.figures.map((fig) => (
                <div
                  key={fig.id}
                  className={`rounded-2xl border overflow-hidden transition-all shadow-xs ${
                    isDark ? 'bg-[#1e2027] border-[#2e313d]' : 'bg-white border-[#dbe0e9]'
                  }`}
                >
                  {/* Figure Header Bar */}
                  <div className="px-5 py-3 border-b border-border bg-surface flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-primary text-background">
                        {fig.figureNumber}
                      </span>
                      <h3 className="text-sm font-bold text-primary">{fig.title}</h3>
                    </div>

                    <button
                      onClick={() => openFigureModal(fig)}
                      className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-primary transition-colors cursor-pointer"
                      title="Expand diagram"
                    >
                      <Maximize2 size={13} />
                      <span className="hidden sm:inline">Expand</span>
                    </button>
                  </div>

                  {/* Figure Image Viewport (Crisp white backing for high contrast diagrams) */}
                  <div 
                    onClick={() => openFigureModal(fig)}
                    className="p-6 bg-white flex items-center justify-center cursor-pointer border-b border-border/50 group"
                  >
                    <img
                      src={fig.imageUrl}
                      alt={fig.title}
                      className="max-h-[500px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.01]"
                    />
                  </div>

                  {/* Figure Explanation & Breakdown */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="space-y-1">
                      <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                        isDark ? 'text-zinc-400' : 'text-slate-700'
                      }`}>
                        Publication Caption:
                      </span>
                      <p className={`text-xs italic font-reading ${
                        isDark ? 'text-zinc-300' : 'text-slate-700 font-medium'
                      }`}>
                        "{fig.caption}"
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                        isDark ? 'text-zinc-400' : 'text-slate-700'
                      }`}>
                        What This Diagram Shows (Plain Explanation):
                      </span>
                      <p className={`text-sm sm:text-base leading-relaxed font-vesper ${
                        isDark ? 'text-zinc-200' : 'text-slate-900'
                      }`}>
                        {fig.beginnerExplanation}
                      </p>
                    </div>

                    {/* Key Elements Breakdown */}
                    <div className="space-y-2 pt-2">
                      <span className={`text-[11px] font-mono font-semibold uppercase tracking-wider ${
                        isDark ? 'text-zinc-400' : 'text-slate-700'
                      }`}>
                        Component Breakdown:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {fig.keyElements.map((elem, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl border text-xs space-y-1 ${
                              isDark ? 'bg-[#15161b] border-[#2e313d]' : 'bg-[#f6f7fa] border-[#dbe0e9]'
                            }`}
                          >
                            <span className="font-bold text-primary font-mono block">
                              {elem.label}
                            </span>
                            <span className={`text-[11px] leading-relaxed block font-reading ${
                              isDark ? 'text-zinc-300' : 'text-slate-700'
                            }`}>
                              {elem.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================
            TAB 3: ALGORITHM & MATHEMATICS
            ====================================================== */}
        {activeTab === 'math' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight">Mathematical Formulations & Equations</h2>
              <p className="text-xs text-muted font-reading">
                Detailed mathematical breakdown of key equations from {currentPaper.shortTitle} translated into plain English intuition.
              </p>
            </div>

            {currentPaper.formulas.map((formula) => (
              <div
                key={formula.id}
                className={`rounded-2xl border p-6 space-y-6 shadow-xs ${
                  isDark ? 'bg-[#1e2027] border-[#2e313d]' : 'bg-white border-[#dbe0e9]'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted font-semibold">
                    Core Formula
                  </span>
                  <h3 className="text-lg font-bold mt-0.5">{formula.name}</h3>
                </div>

                {/* KaTeX Display */}
                <div className={`py-8 px-6 rounded-xl border flex items-center justify-center overflow-x-auto custom-scrollbar ${
                  isDark ? 'bg-[#15161b] border-[#2e313d]' : 'bg-[#f6f7fa] border-[#dbe0e9]'
                }`}>
                  <div className="text-base sm:text-2xl text-primary font-normal">
                    <KaTeXMath math={formula.latex} block={true} />
                  </div>
                </div>

                {/* Step-by-Step Sub-equations */}
                {formula.steps && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formula.steps.map((st, sidx) => (
                      <div
                        key={sidx}
                        className={`p-4 rounded-xl border space-y-2 ${
                          isDark ? 'bg-[#15161b] border-[#2e313d]' : 'bg-[#f6f7fa] border-[#dbe0e9]'
                        }`}
                      >
                        <span className="text-[11px] font-mono font-bold uppercase text-primary block">
                          {st.label}
                        </span>
                        <div className="py-2 overflow-x-auto custom-scrollbar flex items-center justify-center">
                          <KaTeXMath math={st.latex} block={true} className="text-sm sm:text-base text-primary" />
                        </div>
                        <p className={`text-xs font-reading leading-relaxed ${
                          isDark ? 'text-zinc-400' : 'text-slate-700'
                        }`}>
                          {st.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Plain English Meaning */}
                <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
                  isDark ? 'bg-[#15161b] border-[#2e313d]' : 'bg-[#f6f7fa] border-[#dbe0e9]'
                }`}>
                  <span className={`font-bold font-mono block uppercase text-[10px] tracking-wider ${
                    isDark ? 'text-zinc-400' : 'text-slate-700'
                  }`}>
                    Plain English Translation:
                  </span>
                  <p className={`font-vesper text-sm sm:text-base leading-relaxed ${
                    isDark ? 'text-zinc-200' : 'text-slate-900'
                  }`}>
                    {formula.plainEnglish}
                  </p>
                </div>

                {/* Variable by Variable Breakdown */}
                <div className="space-y-2">
                  <span className={`text-xs font-mono font-semibold uppercase tracking-wider ${
                    isDark ? 'text-zinc-400' : 'text-slate-700'
                  }`}>
                    Variable Anatomy:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {formula.variableBreakdown.map((v, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl border text-xs flex flex-col gap-1.5 ${
                          isDark ? 'bg-[#15161b] border-[#2e313d]' : 'bg-[#f6f7fa] border-[#dbe0e9]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-primary">
                            {v.latexSymbol ? (
                              <KaTeXMath math={v.latexSymbol} block={false} className="text-sm font-semibold text-primary" />
                            ) : (
                              <span className="font-mono text-sm">{v.symbol}</span>
                            )}
                          </div>
                          <span className={`text-[11px] font-reading ${
                            isDark ? 'text-zinc-400' : 'text-slate-700'
                          }`}>{v.meaning}</span>
                        </div>
                        <span className={`text-[11px] italic font-reading ${
                          isDark ? 'text-zinc-400' : 'text-slate-700'
                        }`}>
                          {v.intuition}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why It Matters */}
                <div className={`pt-3 border-t border-border text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-zinc-200' : 'text-slate-900'
                }`}>
                  <strong className={`font-mono text-xs uppercase tracking-wider block mb-1 ${
                    isDark ? 'text-zinc-400' : 'text-slate-700'
                  }`}>Why This Equation Matters:</strong>
                  <span className="font-vesper">{formula.whyItMatters}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ======================================================
            TAB 4: CODE IMPLEMENTATION
            ====================================================== */}
        {activeTab === 'code' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary font-vesper">{currentPaper.codeSnippet.title}</h2>
                <p className={`text-sm font-vesper mt-1 ${
                  isDark ? 'text-zinc-200' : 'text-slate-900'
                }`}>{currentPaper.codeSnippet.description}</p>
              </div>

              <button
                onClick={() => handleCopyCode(currentPaper.codeSnippet.code)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                  copiedCode
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : isDark
                      ? 'bg-[#1e2027] border-[#2e313d] text-zinc-300 hover:text-white'
                      : 'bg-white border-[#dbe0e9] text-slate-700 hover:text-slate-900'
                }`}
              >
                {copiedCode ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className={`rounded-2xl border overflow-hidden transition-colors shadow-xs ${
              isDark ? 'bg-[#15161b] border-[#2e313d]' : 'bg-white border-[#dbe0e9]'
            }`}>
              <div className={`px-4 py-2.5 border-b flex items-center justify-between text-xs font-mono select-none ${
                isDark ? 'bg-[#1e2027] border-[#2e313d] text-zinc-400' : 'bg-[#f1f3f7] border-[#dbe0e9] text-slate-600'
              }`}>
                <div className="flex items-center gap-2">
                  <Code2 size={14} className={isDark ? 'text-indigo-400' : 'text-blue-600'} />
                  <span className="font-semibold uppercase tracking-wider">{currentPaper.codeSnippet.language}</span>
                </div>
                <span>
                  {currentPaper.id === 'transformer-attention-is-all-you-need' 
                    ? 'PyTorch 2.0+ Clean Implementation • Multi-Head Self-Attention' 
                    : 'PyTorch 2.0+ Simulation • Block Table Lookup'
                  }
                </span>
              </div>
              <SyntaxHighlighter
                language={currentPaper.codeSnippet.language}
                style={isDark ? vscDarkPlus : vs}
                showLineNumbers={true}
                lineNumberStyle={{
                  minWidth: '2.5em',
                  paddingRight: '1.25em',
                  color: isDark ? '#4b5563' : '#94a3b8',
                  fontSize: '0.85rem',
                  fontFamily: "'Inconsolata', monospace",
                  userSelect: 'none',
                }}
                customStyle={{
                  margin: 0,
                  padding: '1.25rem 1.5rem',
                  background: isDark ? '#15161b' : '#ffffff',
                  fontSize: '0.95rem',
                  lineHeight: '1.75',
                  fontFamily: "'Inconsolata', monospace",
                }}
                codeTagProps={{
                  style: {
                    fontFamily: "'Inconsolata', monospace",
                    fontSize: '0.95rem',
                  }
                }}
              >
                {currentPaper.codeSnippet.code}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

        {/* ======================================================
            TAB 5: ENGINEERING INTERVIEW Q&A
            ====================================================== */}
        {activeTab === 'interview' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight">AI Systems Engineering Interview Questions</h2>
              <p className="text-xs text-muted font-reading">
                Top technical questions asked about {currentPaper.shortTitle} in senior AI infrastructure interviews.
              </p>
            </div>

            <div className="space-y-4">
              {currentPaper.interviewQuestions.map((qa, index) => (
                <div
                  key={index}
                  className={`rounded-2xl border p-5 sm:p-6 space-y-3 shadow-xs ${
                    isDark ? 'bg-[#1e2027] border-[#2e313d]' : 'bg-white border-[#dbe0e9]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-primary">
                      {qa.question}
                    </h3>
                  </div>

                  <div className={`pl-9 text-sm sm:text-base leading-relaxed font-vesper ${
                    isDark ? 'text-zinc-200' : 'text-slate-900'
                  }`}>
                    {qa.answer}
                  </div>

                  {qa.proTip && (
                    <div className={`ml-9 p-3 rounded-xl border text-xs font-mono flex items-start gap-2 ${
                      isDark ? 'bg-[#15161b] border-[#2e313d] text-zinc-300' : 'bg-[#f6f7fa] border-[#dbe0e9] text-slate-800'
                    }`}>
                      <span className="font-bold text-primary uppercase text-[10px] tracking-wider block flex-shrink-0">
                        Pro Tip:
                      </span>
                      <span>{qa.proTip}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ========================================================
          Floating Right-Side Minimal Section Navigation
          (No background bar/boundary, individual floating bubbles with pop-up effect)
          ======================================================== */}
      <aside 
        aria-label="Section Navigation"
        className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3 pointer-events-auto select-none"
      >
        {[
          { id: 'overview', label: 'Overview', icon: BookOpen, count: null },
          { id: 'figures', label: 'Figures', icon: Layers, count: currentPaper.figures.length },
          { id: 'math', label: 'Math', icon: Cpu, count: currentPaper.formulas.length },
          { id: 'code', label: 'Code', icon: Terminal, count: null },
          { id: 'interview', label: 'Interview Q&A', icon: HelpCircle, count: currentPaper.interviewQuestions.length },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <div key={tab.id} className="relative group flex items-center justify-end">
              {/* Bubble Pop-Up on Hover (Expands to the left with speech bubble pointer) */}
              <div className="absolute right-full mr-3 hidden group-hover:flex items-center pointer-events-none transition-all duration-150 ease-out z-50">
                <div className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap shadow-xl border flex items-center gap-1.5 backdrop-blur-md animate-in fade-in slide-in-from-right-2 duration-150 ${
                  isDark 
                    ? 'bg-[#1e2027]/95 text-white border-[#2e313d] shadow-black/60' 
                    : 'bg-white/95 text-slate-900 border-[#dbe0e9] shadow-slate-300/60'
                }`}>
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      isDark ? 'bg-white/10 text-zinc-300' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                  {/* Speech bubble pointer arrow */}
                  <div className={`absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 rotate-45 border-t border-r ${
                    isDark ? 'bg-[#1e2027] border-[#2e313d]' : 'bg-white border-[#dbe0e9]'
                  }`} />
                </div>
              </div>

              {/* Minimal Floating Bubble Button (Zero boundary/bar on wrapper) */}
              <button
                onClick={() => {
                  setActiveTab(tab.id as any);
                  window.scrollTo({ top: 130, behavior: 'smooth' });
                }}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 cursor-pointer shadow-md group-hover:scale-115 active:scale-95 ${
                  isActive
                    ? isDark
                      ? 'bg-white text-black shadow-lg shadow-white/10 scale-105 ring-2 ring-white/30'
                      : 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105 ring-2 ring-slate-900/30'
                    : isDark
                      ? 'bg-[#181920]/90 text-zinc-400 hover:text-white hover:bg-[#252834] border border-[#2e313d]/80 backdrop-blur-md'
                      : 'bg-white/90 text-slate-600 hover:text-black hover:bg-slate-50 border border-[#dbe0e9]/90 backdrop-blur-md'
                }`}
                title={tab.label}
              >
                <Icon size={16} strokeWidth={isActive ? 2.4 : 1.8} />

                {/* Badge for count (if any) */}
                {tab.count !== null && !isActive && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-background text-[9px] font-mono font-bold flex items-center justify-center shadow-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </aside>

      {/* ========================================================
          Zoom Figure Modal (Full-Screen Inspection & Controls)
          ======================================================== */}
      {zoomedFigure && (
        <div 
          onClick={() => setZoomedFigure(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-5xl max-h-[92vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden ${
              isDark ? 'bg-[#181920] border-[#2e313d] text-zinc-100' : 'bg-white border-[#dbe0e9] text-slate-900'
            }`}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-border flex items-center justify-between bg-surface gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-primary text-background flex-shrink-0">
                  {zoomedFigure.figureNumber}
                </span>
                <span className="text-sm font-bold truncate text-primary">{zoomedFigure.title}</span>
              </div>

              {/* Toolbar Controls */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Rotate 90 deg button */}
                <button
                  onClick={() => setModalRotation((prev) => (prev + 90) % 360)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                    modalRotation !== 0
                      ? 'bg-primary text-background border-primary font-bold'
                      : isDark
                        ? 'border-[#2e313d] text-zinc-300 hover:text-white hover:bg-[#252834]'
                        : 'border-[#dbe0e9] text-slate-700 hover:text-black hover:bg-slate-100'
                  }`}
                  title="Rotate diagram 90° clockwise"
                >
                  <RotateCw size={13} />
                  <span>Rotate {modalRotation !== 0 ? `${modalRotation}°` : '90°'}</span>
                </button>

                {/* Reset button if rotated */}
                {modalRotation !== 0 && (
                  <button
                    onClick={() => setModalRotation(0)}
                    className="px-2.5 py-1.5 rounded-lg border border-border text-xs font-mono text-muted hover:text-primary transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                )}

                {/* Zoom toggle */}
                <button
                  onClick={() => setModalZoomed((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                    modalZoomed
                      ? 'bg-primary text-background border-primary font-bold'
                      : isDark
                        ? 'border-[#2e313d] text-zinc-300 hover:text-white hover:bg-[#252834]'
                        : 'border-[#dbe0e9] text-slate-700 hover:text-black hover:bg-slate-100'
                  }`}
                  title={modalZoomed ? 'Fit to screen' : 'Zoom 100%'}
                >
                  {modalZoomed ? <ZoomOut size={13} /> : <ZoomIn size={13} />}
                  <span>{modalZoomed ? 'Fit View' : 'Zoom In'}</span>
                </button>

                {/* Close button */}
                <button
                  onClick={() => setZoomedFigure(null)}
                  className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-surface-elevated transition-colors cursor-pointer ml-1"
                  title="Close Modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Image Viewport */}
            <div className="flex-1 p-4 sm:p-8 bg-[#ffffff] flex items-center justify-center overflow-auto custom-scrollbar min-h-[350px]">
              <div 
                className="transition-transform duration-200 flex items-center justify-center"
                style={{
                  transform: `rotate(${modalRotation}deg) scale(${modalZoomed ? 1.4 : 1})`,
                  transformOrigin: 'center center'
                }}
              >
                <img
                  src={zoomedFigure.imageUrl}
                  alt={zoomedFigure.title}
                  className={`${
                    modalZoomed 
                      ? 'max-w-none' 
                      : 'max-h-[68vh] max-w-full object-contain'
                  } shadow-xs rounded`}
                />
              </div>
            </div>

            {/* Modal Footer Caption */}
            <div className="p-4 border-t border-border text-xs text-muted font-reading bg-surface leading-relaxed">
              <span className="font-mono font-bold uppercase text-[10px] tracking-wider text-primary block mb-1">
                Publication Caption:
              </span>
              <p className={`italic font-reading ${
                isDark ? 'text-zinc-300' : 'text-slate-800'
              }`}>
                "{zoomedFigure.caption}"
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
