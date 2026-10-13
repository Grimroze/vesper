import { useState, useMemo } from 'react';
import problemsData from './problems.json';
import type { Section } from './types';
import { ProblemCard } from './components/ProblemCard';
import { useBookmarks, useCompleted } from './hooks';
import { Search, List, Zap, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from './utils';

const sections = problemsData as Section[];

export default function App() {
  const [activeSectionId, setActiveSectionId] = useState<string>(sections[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [glanceMode, setGlanceMode] = useState(false);
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const { bookmarks, toggleBookmark } = useBookmarks();
  const { completed, toggleCompleted } = useCompleted();

  const activeSection = sections.find(s => s.id === activeSectionId);

  // Filter problems across all sections if searching, otherwise just active section
  const filteredProblems = useMemo(() => {
    if (searchQuery.trim().length > 0) {
      const lowerQuery = searchQuery.toLowerCase();
      return sections.flatMap(s => s.problems.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) || 
        p.code.toLowerCase().includes(lowerQuery)
      )).filter(p => !showStarredOnly || bookmarks[p.id]);
    }
    
    if (!activeSection) return [];
    
    return activeSection.problems.filter(p => !showStarredOnly || bookmarks[p.id]);
  }, [searchQuery, activeSection, showStarredOnly, bookmarks]);

  return (
    <div className="h-full flex flex-col md:flex-row bg-background">
      
      {/* Sidebar (Collapsible with Minimize / Maximize) */}
      <aside 
        className={cn(
          "border-r border-border bg-surface flex flex-col h-auto md:h-full sticky top-0 transition-all duration-300 ease-in-out z-20",
          isSidebarCollapsed 
            ? "hidden md:flex md:w-0 md:opacity-0 md:overflow-hidden md:border-r-0" 
            : "w-full md:w-64 md:opacity-100"
        )}
      >
        {/* Sidebar Header with Topics Count and Minimize Button */}
        <div className="p-3.5 px-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted font-mono">Topics</span>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-background text-muted border border-border">
              {sections.length}
            </span>
          </div>
          <button
            onClick={() => setIsSidebarCollapsed(true)}
            className="p-1 rounded-lg text-muted hover:text-primary hover:bg-surface-elevated transition-colors cursor-pointer"
            title="Minimize Panel"
            aria-label="Minimize Panel"
          >
            <PanelLeftClose size={16} />
          </button>
        </div>
        
        <div className="p-3 flex flex-col gap-1.5 border-b border-border">
          <button 
            onClick={() => setShowStarredOnly(!showStarredOnly)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors cursor-pointer font-medium",
              showStarredOnly ? "bg-primary text-background font-semibold" : "text-muted hover:bg-surface-elevated hover:text-primary"
            )}
          >
            <List size={15} />
            Starred Only
          </button>
          
          <button 
            onClick={() => setGlanceMode(!glanceMode)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors cursor-pointer font-medium",
              glanceMode ? "bg-primary text-background font-semibold" : "text-muted hover:bg-surface-elevated hover:text-primary"
            )}
          >
            <Zap size={15} />
            Glance Mode
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1 hide-scrollbar">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSectionId(section.id);
                setSearchQuery('');
              }}
              className={cn(
                "text-left px-3 py-2 text-xs sm:text-sm rounded-lg transition-all duration-200 truncate cursor-pointer font-medium",
                activeSectionId === section.id && !searchQuery
                  ? "bg-surface-elevated text-primary font-semibold border border-border shadow-2xs"
                  : "text-muted hover:text-primary hover:bg-surface-elevated/60"
              )}
            >
              {section.title}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main 
        className={cn(
          "flex-1 w-full mx-auto p-4 md:p-8 flex flex-col h-full overflow-hidden transition-all duration-300",
          isSidebarCollapsed ? "max-w-6xl" : "max-w-4xl"
        )}
      >
        
        {/* Topbar / Search with Sidebar Toggle when minimized */}
        <div className="flex items-center gap-3 mb-6 flex-shrink-0">
          {isSidebarCollapsed && (
            <button
              onClick={() => setIsSidebarCollapsed(false)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-border bg-surface hover:bg-surface-elevated text-xs font-mono text-muted hover:text-primary transition-all shadow-xs cursor-pointer flex-shrink-0"
              title="Expand Topics Panel"
              aria-label="Expand Topics Panel"
            >
              <PanelLeftOpen size={16} className="text-primary" />
              <span className="hidden sm:inline font-semibold">Topics</span>
            </button>
          )}

          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={17} />
            <input 
              type="text" 
              placeholder="Search problems, patterns, or code..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-border text-primary rounded-full pl-11 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-muted transition-colors placeholder:text-muted shadow-2xs"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4 pb-20">
          <div className="mb-4">
            <h2 className="text-xl font-medium text-primary">
              {searchQuery ? `Search Results for "${searchQuery}"` : activeSection?.title}
            </h2>
            <p className="text-sm text-muted mt-1">
              {filteredProblems.length} {filteredProblems.length === 1 ? 'problem' : 'problems'}
            </p>
          </div>

          {filteredProblems.length > 0 ? (
            filteredProblems.map(problem => (
              <ProblemCard 
                key={problem.id}
                problem={problem}
                isBookmarked={bookmarks[problem.id] || false}
                isCompleted={completed[problem.id] || false}
                onToggleBookmark={() => toggleBookmark(problem.id)}
                onToggleCompleted={() => toggleCompleted(problem.id)}
                glanceModeActive={glanceMode}
              />
            ))
          ) : (
            <div className="text-center py-20 text-muted">
              No problems found matching your criteria.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
