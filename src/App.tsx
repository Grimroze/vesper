import { useState } from 'react';
import LandingPage from './components/LandingPage';
import DSARevision from './DSARevision';
import Roadmap from './components/Roadmap';
import FlowsHub from './components/FlowsHub';
import PapersHub from './components/PapersHub';
import { ThemeProvider, useTheme } from './themeContext';
import { 
  Sun, 
  Moon, 
  Code2, 
  Network, 
  Layers, 
  FileText,
  Compass,
  Briefcase
} from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'home' | 'dsa' | 'ai' | 'flows' | 'papers' | 'projects'>('home');
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleNavigate = (tab: 'dsa' | 'ai' | 'flows' | 'papers' | 'projects') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-primary transition-colors duration-200">
      {/* Global Top Navbar (Clean Architectural Aesthetic) */}
      <nav className="h-14 border-b border-border bg-surface flex items-center justify-between px-4 sm:px-6 z-50 sticky top-0 transition-colors duration-200">
        
        {/* Left: Brand Identity (Clicking Vesper always returns to Landing Page) */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group text-left"
          title="Return to Vesper Home"
        >
          <span className="font-bold text-xl tracking-tight text-primary font-vesper select-none group-hover:opacity-85 transition-opacity">
            Vesper
          </span>
          <span className="hidden md:inline-block h-3.5 w-px bg-border/80" />
          <span className="hidden md:inline-block text-[11px] font-mono uppercase tracking-widest text-muted select-none group-hover:text-primary transition-colors">
            Engineering Studio
          </span>
        </button>
        
        {/* Center: Polished Segmented Navigation Tabs */}
        <div className="flex items-center gap-1 bg-background/90 border border-border/90 p-1 rounded-xl shadow-2xs backdrop-blur-md">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm rounded-lg transition-all cursor-pointer select-none font-reading ${
              activeTab === 'home' 
                ? isDark 
                  ? 'bg-white text-black font-semibold shadow-xs' 
                  : 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'text-muted hover:text-primary hover:bg-surface-elevated/70'
            }`}
          >
            <Compass size={14} strokeWidth={activeTab === 'home' ? 2.3 : 1.8} />
            <span className="hidden xs:inline">Overview</span>
          </button>

          <button 
            onClick={() => setActiveTab('dsa')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm rounded-lg transition-all cursor-pointer select-none font-reading ${
              activeTab === 'dsa' 
                ? isDark 
                  ? 'bg-white text-black font-semibold shadow-xs' 
                  : 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'text-muted hover:text-primary hover:bg-surface-elevated/70'
            }`}
          >
            <Code2 size={14} strokeWidth={activeTab === 'dsa' ? 2.3 : 1.8} />
            <span>DS & Algo</span>
          </button>

          <button 
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm rounded-lg transition-all cursor-pointer select-none font-reading ${
              activeTab === 'ai' 
                ? isDark 
                  ? 'bg-white text-black font-semibold shadow-xs' 
                  : 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'text-muted hover:text-primary hover:bg-surface-elevated/70'
            }`}
          >
            <Network size={14} strokeWidth={activeTab === 'ai' ? 2.3 : 1.8} />
            <span>AI</span>
          </button>

          <button 
            onClick={() => setActiveTab('flows')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm rounded-lg transition-all cursor-pointer select-none font-reading ${
              activeTab === 'flows' 
                ? isDark 
                  ? 'bg-white text-black font-semibold shadow-xs' 
                  : 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'text-muted hover:text-primary hover:bg-surface-elevated/70'
            }`}
          >
            <Layers size={14} strokeWidth={activeTab === 'flows' ? 2.3 : 1.8} />
            <span>Flows</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
              activeTab === 'flows'
                ? isDark ? 'bg-black/20 text-black' : 'bg-white/20 text-white'
                : 'border border-border text-muted'
            }`}>
              103
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('papers')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm rounded-lg transition-all cursor-pointer select-none font-reading ${
              activeTab === 'papers' 
                ? isDark 
                  ? 'bg-white text-black font-semibold shadow-xs' 
                  : 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'text-muted hover:text-primary hover:bg-surface-elevated/70'
            }`}
          >
            <FileText size={14} strokeWidth={activeTab === 'papers' ? 2.3 : 1.8} />
            <span>Papers</span>
          </button>

          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm rounded-lg transition-all cursor-pointer select-none font-reading ${
              activeTab === 'projects' 
                ? isDark 
                  ? 'bg-white text-black font-semibold shadow-xs' 
                  : 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'text-muted hover:text-primary hover:bg-surface-elevated/70'
            }`}
          >
            <Briefcase size={14} strokeWidth={activeTab === 'projects' ? 2.3 : 1.8} />
            <span>Projects</span>
          </button>
        </div>
        
        {/* Right: Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-border bg-surface hover:bg-surface-elevated text-muted hover:text-primary transition-all cursor-pointer flex items-center justify-center shadow-xs"
          title={theme === 'dark' ? "Switch to Off-White" : "Switch to Lesser Black"}
          aria-label={theme === 'dark' ? "Switch to Off-White" : "Switch to Lesser Black"}
        >
          {theme === 'dark' ? (
            <Sun size={17} className="text-amber-400 hover:rotate-12 transition-transform" />
          ) : (
            <Moon size={17} className="text-slate-700 hover:-rotate-12 transition-transform" />
          )}
        </button>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto relative">
        {activeTab === 'home' && <LandingPage onNavigate={handleNavigate} />}
        {activeTab === 'dsa' && <DSARevision />}
        {activeTab === 'ai' && <Roadmap />}
        {activeTab === 'flows' && <FlowsHub />}
        {activeTab === 'papers' && <PapersHub />}
        {activeTab === 'projects' && (
          <div className="w-full h-[calc(100vh-3.5rem)]">
            <iframe 
              src="/projects_revision.html" 
              className="w-full h-full border-0" 
              title="Resume Projects Revision"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
