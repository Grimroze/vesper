import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTheme } from '../themeContext';
import { CATEGORIES_DATA } from '../data/flowsData';
import type { FlowCategory, SystemFlow, FlowStage } from '../data/flowsData';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  ExternalLink,
  Copy,
  Check,
  X,
  Layers,
  Database,
  Cpu,
  Compass,
  FolderOpen
} from 'lucide-react';

export default function FlowsHub() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Active Category: 'hld' | 'databases' | 'genai'
  const [activeCategoryKey, setActiveCategoryKey] = useState<FlowCategory>('hld');
  const currentCategory = useMemo(() => CATEGORIES_DATA[activeCategoryKey], [activeCategoryKey]);

  // Selected flow ID within the active category
  const [selectedFlowId, setSelectedFlowId] = useState<string>(CATEGORIES_DATA.hld.flows[0].id);

  // Active flow object
  const selectedFlow = useMemo<SystemFlow>(() => {
    const found = currentCategory.flows.find(f => f.id === selectedFlowId);
    return found || currentCategory.flows[0];
  }, [currentCategory, selectedFlowId]);

  // Active Stage object
  const activeStage = useMemo<FlowStage>(() => {
    const found = currentCategory.stages.find(s => s.number === selectedFlow.stageNumber);
    return found || currentCategory.stages[0];
  }, [currentCategory, selectedFlow]);

  // Current global index within active category
  const currentGlobalIndex = useMemo(() => {
    return currentCategory.flows.findIndex(f => f.id === selectedFlow.id);
  }, [currentCategory, selectedFlow]);

  // Collapsed stages state (optional accordion expansion)
  const [collapsedStages, setCollapsedStages] = useState<Record<string, boolean>>({});

  const toggleStageCollapse = (stageNumber: string) => {
    setCollapsedStages(prev => ({
      ...prev,
      [stageNumber]: !prev[stageNumber]
    }));
  };

  // Sidebar controls & search
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Zoom & Rotation controls for main viewport
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Fullscreen Inspection Modal
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
  const [modalZoom, setModalZoom] = useState(1);
  const [modalRotation, setModalRotation] = useState(0);

  // Copied feedback
  const [copiedLink, setCopiedLink] = useState(false);

  // Category switch handler
  const handleCategorySwitch = (newKey: FlowCategory) => {
    if (newKey === activeCategoryKey) return;
    setActiveCategoryKey(newKey);
    const newCategory = CATEGORIES_DATA[newKey];
    if (newCategory.flows.length > 0) {
      setSelectedFlowId(newCategory.flows[0].id);
    }
    setZoomLevel(1);
    setRotation(0);
    setSearchQuery('');
  };

  // Filter flows based on search query
  const filteredFlows = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return currentCategory.flows.filter(f => 
      f.title.toLowerCase().includes(q) || 
      f.stageTitle.toLowerCase().includes(q) ||
      (f.subCategory && f.subCategory.toLowerCase().includes(q)) ||
      f.fileName.toLowerCase().includes(q)
    );
  }, [searchQuery, currentCategory]);

  // Navigation handlers
  const handleNextFlow = useCallback(() => {
    if (currentGlobalIndex < currentCategory.flows.length - 1) {
      setSelectedFlowId(currentCategory.flows[currentGlobalIndex + 1].id);
      setZoomLevel(1);
      setRotation(0);
    }
  }, [currentGlobalIndex, currentCategory]);

  const handlePrevFlow = useCallback(() => {
    if (currentGlobalIndex > 0) {
      setSelectedFlowId(currentCategory.flows[currentGlobalIndex - 1].id);
      setZoomLevel(1);
      setRotation(0);
    }
  }, [currentGlobalIndex, currentCategory]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight') {
        handleNextFlow();
      } else if (e.key === 'ArrowLeft') {
        handlePrevFlow();
      } else if (e.key === 'Escape' && isFullscreenModalOpen) {
        setIsFullscreenModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextFlow, handlePrevFlow, isFullscreenModalOpen]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}${selectedFlow.svgUrl}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  // Calculate percentage through active category
  const progressPercent = currentCategory.flows.length > 0 
    ? Math.round(((currentGlobalIndex + 1) / currentCategory.flows.length) * 100) 
    : 0;

  return (
    <div className="w-full h-[calc(100vh-3.5rem)] flex flex-col bg-background text-primary select-none overflow-hidden transition-colors duration-200">
      
      {/* ========================================================
          Top Subsections Bar: HLD | Databases | GenAI & AI
          ======================================================== */}
      <header className="h-13 border-b border-border bg-surface px-4 sm:px-6 flex items-center justify-between gap-3 flex-shrink-0 z-30 transition-colors duration-200">
        
        {/* Subsection Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-border bg-background/80">
          <button
            onClick={() => handleCategorySwitch('hld')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeCategoryKey === 'hld'
                ? isDark 
                  ? 'bg-white text-black font-bold shadow-xs' 
                  : 'bg-slate-900 text-white font-bold shadow-xs'
                : isDark
                  ? 'text-zinc-400 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <Layers size={13} strokeWidth={activeCategoryKey === 'hld' ? 2.4 : 1.8} />
            <span>HLD (High Level Design)</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              activeCategoryKey === 'hld' 
                ? isDark ? 'bg-black/20 text-black' : 'bg-white/20 text-white'
                : 'opacity-70 border border-current'
            }`}>
              {CATEGORIES_DATA.hld.flowCount}
            </span>
          </button>

          <button
            onClick={() => handleCategorySwitch('databases')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeCategoryKey === 'databases'
                ? isDark 
                  ? 'bg-white text-black font-bold shadow-xs' 
                  : 'bg-slate-900 text-white font-bold shadow-xs'
                : isDark
                  ? 'text-zinc-400 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <Database size={13} strokeWidth={activeCategoryKey === 'databases' ? 2.4 : 1.8} />
            <span>Databases</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              activeCategoryKey === 'databases' 
                ? isDark ? 'bg-black/20 text-black' : 'bg-white/20 text-white'
                : 'opacity-70 border border-current'
            }`}>
              {CATEGORIES_DATA.databases.flowCount}
            </span>
          </button>

          <button
            onClick={() => handleCategorySwitch('genai')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeCategoryKey === 'genai'
                ? isDark 
                  ? 'bg-white text-black font-bold shadow-xs' 
                  : 'bg-slate-900 text-white font-bold shadow-xs'
                : isDark
                  ? 'text-zinc-400 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <Cpu size={13} strokeWidth={activeCategoryKey === 'genai' ? 2.4 : 1.8} />
            <span>GenAI & AI</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              activeCategoryKey === 'genai' 
                ? isDark ? 'bg-black/20 text-black' : 'bg-white/20 text-white'
                : 'opacity-70 border border-current'
            }`}>
              {CATEGORIES_DATA.genai.flowCount}
            </span>
          </button>
        </div>

        {/* Category Description & Stage Badge */}
        <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-muted">
          <span className="truncate max-w-sm xl:max-w-md">
            {currentCategory.description}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full border border-border bg-background flex-shrink-0">
            {currentCategory.stageCount} Stages Total
          </span>
        </div>
      </header>

      {/* ========================================================
          Category Explorer Experience (HLD, Databases, GenAI)
          ======================================================== */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* ----------------------------------------------------
            Left Sidebar: Stages Curriculum & Flows Index
            ---------------------------------------------------- */}
        <aside className={`border-r border-border bg-surface flex flex-col transition-all duration-300 ease-in-out z-20 flex-shrink-0 ${
          isSidebarCollapsed 
            ? 'w-0 opacity-0 overflow-hidden border-r-0' 
            : 'w-72 sm:w-80 md:w-84 opacity-100'
        }`}>
          
          {/* Sidebar Header & Search */}
          <div className="p-3 border-b border-border space-y-2 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass size={14} className="text-primary" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
                  {currentCategory.shortTitle} Curriculum
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-background border border-border text-muted">
                  {currentCategory.flowCount} Flows
                </span>
              </div>

              <button
                onClick={() => setIsSidebarCollapsed(true)}
                className="p-1 rounded-lg text-muted hover:text-primary hover:bg-surface-elevated transition-colors cursor-pointer"
                title="Collapse Sidebar"
              >
                <PanelLeftClose size={15} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder={`Search ${currentCategory.flowCount} ${currentCategory.shortTitle} flows...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-8 pr-3 py-1.5 rounded-lg border text-xs font-mono outline-none transition-colors ${
                  isDark 
                    ? 'bg-[#15161b] border-[#2e313d] text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-400' 
                    : 'bg-white border-[#dbe0e9] text-slate-900 placeholder:text-slate-400 focus:border-slate-500'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Sidebar Scrollable Stage/Flows List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-3">
            
            {/* If Searching: Flat Filtered List */}
            {filteredFlows ? (
              <div className="space-y-1">
                <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-muted font-bold">
                  Search Results ({filteredFlows.length})
                </div>
                {filteredFlows.map(flow => {
                  const isSelected = flow.id === selectedFlow.id;
                  return (
                    <button
                      key={flow.id}
                      onClick={() => setSelectedFlowId(flow.id)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer flex flex-col gap-0.5 ${
                        isSelected
                          ? isDark
                            ? 'bg-white text-black border-white font-bold shadow-xs'
                            : 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
                          : isDark
                            ? 'bg-[#15161b] border-[#252834] text-zinc-300 hover:border-zinc-500'
                            : 'bg-white border-[#dbe0e9] text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <span className="text-[10px] font-mono opacity-70 uppercase tracking-wider">
                        Stage {flow.stageNumber} • {flow.stageTitle}
                      </span>
                      <span className="truncate">{flow.title}</span>
                    </button>
                  );
                })}
                {filteredFlows.length === 0 && (
                  <div className="p-4 text-center text-xs text-muted font-mono">
                    No flows matching "{searchQuery}"
                  </div>
                )}
              </div>
            ) : (
              /* Sequential Stage-by-Stage Curriculum */
              <div className="space-y-2.5">
                {currentCategory.stages.map((stage) => {
                  const isCurrentStage = stage.number === selectedFlow.stageNumber;
                  const isCollapsed = collapsedStages[stage.number];

                  return (
                    <div 
                      key={stage.number}
                      className={`rounded-xl border overflow-hidden transition-colors ${
                        isCurrentStage
                          ? isDark ? 'border-zinc-500/60 bg-[#181920]' : 'border-slate-400 bg-slate-50/50'
                          : isDark ? 'border-[#2e313d]/60 bg-[#15161b]/60' : 'border-[#e2e8f0] bg-white/70'
                      }`}
                    >
                      {/* Stage Accordion Header */}
                      <div 
                        onClick={() => toggleStageCollapse(stage.number)}
                        className={`p-2.5 px-3 flex items-center justify-between gap-2 border-b cursor-pointer select-none transition-colors ${
                          isCurrentStage 
                            ? isDark ? 'border-zinc-700/60 bg-[#1e2027]' : 'border-slate-200 bg-slate-100'
                            : isDark ? 'border-border/40 hover:bg-white/5' : 'border-border/40 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                            isCurrentStage
                              ? isDark ? 'bg-white text-black' : 'bg-slate-900 text-white'
                              : isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {stage.number}
                          </span>
                          <span className="text-xs font-bold text-primary truncate">
                            {stage.shortName}
                          </span>
                        </div>

                        <span className="text-[10px] font-mono text-muted flex-shrink-0">
                          {stage.flowCount} flows
                        </span>
                      </div>

                      {/* Flows inside Stage */}
                      {!isCollapsed && (
                        <div className="p-1 space-y-0.5">
                          {stage.flows.map((flow, flowIdx) => {
                            const isSelected = flow.id === selectedFlow.id;

                            return (
                              <button
                                key={flow.id}
                                onClick={() => {
                                  setSelectedFlowId(flow.id);
                                  setZoomLevel(1);
                                  setRotation(0);
                                }}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-reading transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                  isSelected
                                    ? isDark
                                      ? 'bg-white text-black font-semibold shadow-xs'
                                      : 'bg-slate-900 text-white font-semibold shadow-xs'
                                    : isDark
                                      ? 'text-zinc-300 hover:text-white hover:bg-white/5'
                                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-[10px] font-mono opacity-50 flex-shrink-0">
                                    {flowIdx + 1}.
                                  </span>
                                  <span className="truncate">{flow.title}</span>
                                </div>

                                {flow.subCategory && (
                                  <span className={`text-[9px] font-mono px-1 py-0.2 rounded border flex-shrink-0 ${
                                    isSelected 
                                      ? isDark ? 'border-black/30 opacity-80' : 'border-white/30 opacity-80'
                                      : isDark ? 'border-zinc-700 text-zinc-400' : 'border-slate-200 text-slate-500'
                                  }`}>
                                    {flow.subCategory.split(' ')[0]}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </aside>

        {/* ----------------------------------------------------
            Main Center Stage: Hero Diagram Viewport
            ---------------------------------------------------- */}
        <main className="flex-1 flex flex-col h-full bg-background overflow-hidden relative">
          
          {/* Subtle Progress Bar at the top of the canvas */}
          <div className="w-full h-[2px] bg-border/40 relative z-20">
            <div 
              className={`h-full transition-all duration-300 ${
                isDark ? 'bg-white' : 'bg-slate-900'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Viewport Action Header Bar */}
          <div className="px-4 py-2.5 border-b border-border bg-surface flex flex-wrap items-center justify-between gap-3 flex-shrink-0 z-10 transition-colors duration-200">
            
            {/* Left: Sidebar uncollapse + Breadcrumb & Title */}
            <div className="flex items-center gap-2.5 min-w-0">
              {isSidebarCollapsed && (
                <button
                  onClick={() => setIsSidebarCollapsed(false)}
                  className="p-1.5 rounded-lg border border-border text-muted hover:text-primary hover:bg-surface-elevated transition-colors cursor-pointer mr-1"
                  title="Open Learning Sequence Sidebar"
                >
                  <PanelLeftOpen size={16} />
                </button>
              )}

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted mb-0.5">
                  <span className="font-bold text-primary">{currentCategory.shortTitle}</span>
                  <span className="opacity-40">•</span>
                  <span className="font-semibold text-primary">Stage {selectedFlow.stageNumber}</span>
                  <span className="opacity-40">•</span>
                  <span className="truncate">{activeStage.shortName}</span>
                  {selectedFlow.subCategory && (
                    <>
                      <span className="opacity-40">•</span>
                      <span className="text-primary font-medium truncate max-w-[140px] sm:max-w-none">{selectedFlow.subCategory}</span>
                    </>
                  )}
                </div>
                <h1 className="text-base sm:text-lg md:text-xl font-bold text-primary truncate font-vesper">
                  {selectedFlow.title}
                </h1>
              </div>
            </div>

            {/* Right: Minimal Elegant Stepper & Canvas Viewport Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              
              {/* Minimal Unified Stepper Pill */}
              <div className="flex items-center border border-border rounded-xl bg-background p-0.5 shadow-2xs">
                <button
                  onClick={handlePrevFlow}
                  disabled={currentGlobalIndex === 0}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono text-muted hover:text-primary hover:bg-surface-elevated disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer group"
                  title="Previous Diagram (Left Arrow Key)"
                >
                  <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                <div className="px-2.5 py-0.5 text-xs font-mono flex items-center gap-1 border-x border-border/60">
                  <span className="font-bold text-primary">
                    {String(currentGlobalIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="opacity-30">/</span>
                  <span className="text-muted">
                    {String(currentCategory.flows.length).padStart(2, '0')}
                  </span>
                </div>

                <button
                  onClick={handleNextFlow}
                  disabled={currentGlobalIndex === currentCategory.flows.length - 1}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono text-muted hover:text-primary hover:bg-surface-elevated disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer group"
                  title="Next Diagram (Right Arrow Key)"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center border border-border rounded-xl bg-background p-0.5">
                <button
                  onClick={() => setZoomLevel(prev => Math.max(0.4, Number((prev - 0.2).toFixed(1))))}
                  className="p-1 rounded-lg text-muted hover:text-primary hover:bg-surface-elevated transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>

                <button
                  onClick={handleResetZoom}
                  className="px-2 py-0.5 text-[11px] font-mono text-muted hover:text-primary transition-colors cursor-pointer"
                  title="Reset to 100%"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>

                <button
                  onClick={() => setZoomLevel(prev => Math.min(2.5, Number((prev + 0.2).toFixed(1))))}
                  className="p-1 rounded-lg text-muted hover:text-primary hover:bg-surface-elevated transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
              </div>

              {/* Rotate 90 deg */}
              <button
                onClick={() => setRotation(prev => (prev + 90) % 360)}
                className={`p-1.5 rounded-lg border text-muted hover:text-primary hover:bg-surface-elevated transition-colors cursor-pointer ${
                  rotation !== 0 ? 'border-primary text-primary font-bold' : 'border-border'
                }`}
                title="Rotate Diagram 90°"
              >
                <RotateCw size={14} />
              </button>

              {/* Open Raw SVG in New Tab */}
              <a
                href={selectedFlow.svgUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg border border-border text-muted hover:text-primary hover:bg-surface-elevated transition-colors cursor-pointer"
                title="Open raw vector SVG"
              >
                <ExternalLink size={14} />
              </a>

              {/* Copy SVG Link */}
              <button
                onClick={handleCopyLink}
                className="p-1.5 rounded-lg border border-border text-muted hover:text-primary hover:bg-surface-elevated transition-colors cursor-pointer"
                title={copiedLink ? "Copied!" : "Copy SVG URL"}
              >
                {copiedLink ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </button>

              {/* Fullscreen Expand */}
              <button
                onClick={() => {
                  setIsFullscreenModalOpen(true);
                  setModalZoom(1);
                  setModalRotation(0);
                }}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
                title="Inspect Full-Screen"
              >
                <Maximize2 size={14} />
              </button>
            </div>

          </div>

          {/* Diagram Viewport Canvas with Smooth Edge Navigators */}
          <div className={`flex-1 overflow-auto custom-scrollbar p-4 sm:p-8 flex items-center justify-center relative transition-colors duration-200 ${
            isDark ? 'bg-[#0f1014]' : 'bg-[#eef1f6]'
          }`}>

            {/* Floating Left Edge Navigator (Gallery Style) */}
            {currentGlobalIndex > 0 && (
              <button
                onClick={handlePrevFlow}
                className={`absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border shadow-md flex items-center justify-center transition-all cursor-pointer opacity-50 hover:opacity-100 hover:scale-110 group ${
                  isDark 
                    ? 'bg-[#181920]/90 border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-400' 
                    : 'bg-white/95 border-slate-200 text-slate-700 hover:text-black hover:border-slate-400'
                }`}
                title={`Previous: ${currentCategory.flows[currentGlobalIndex - 1]?.title}`}
              >
                <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
            )}

            {/* Floating Right Edge Navigator (Gallery Style) */}
            {currentGlobalIndex < currentCategory.flows.length - 1 && (
              <button
                onClick={handleNextFlow}
                className={`absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border shadow-md flex items-center justify-center transition-all cursor-pointer opacity-50 hover:opacity-100 hover:scale-110 group ${
                  isDark 
                    ? 'bg-[#181920]/90 border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-400' 
                    : 'bg-white/95 border-slate-200 text-slate-700 hover:text-black hover:border-slate-400'
                }`}
                title={`Next: ${currentCategory.flows[currentGlobalIndex + 1]?.title}`}
              >
                <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
            
            {/* Scalable Vector Card Container */}
            <div 
              className={`max-w-6xl w-full rounded-2xl border shadow-xl flex items-center justify-center p-4 sm:p-8 transition-transform duration-200 overflow-hidden ${
                isDark 
                  ? 'bg-[#181920] border-[#2e313d] text-zinc-100' 
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                transformOrigin: 'center center'
              }}
            >
              <img
                src={selectedFlow.svgUrl}
                alt={selectedFlow.title}
                className="w-full h-auto max-h-[66vh] object-contain pointer-events-auto"
              />
            </div>

          </div>

          {/* Slim Anchored Status Footer (Never covers diagram!) */}
          <footer className="h-9 px-4 border-t border-border bg-surface flex items-center justify-between text-xs font-mono flex-shrink-0 z-10 transition-colors duration-200">
            {/* Left: Stage and file reference */}
            <div className="flex items-center gap-2 text-muted truncate max-w-sm sm:max-w-md">
              <FolderOpen size={12} className="opacity-70 flex-shrink-0" />
              <span className="truncate">
                Stage {selectedFlow.stageNumber} • <span className="text-primary font-medium">{selectedFlow.fileName}</span>
              </span>
            </div>

            {/* Center: Keyboard hint */}
            <div className="hidden md:flex items-center gap-1.5 text-muted opacity-80 text-[11px]">
              <kbd className="px-1.5 py-0.2 rounded bg-background border border-border text-[10px]">←</kbd>
              <kbd className="px-1.5 py-0.2 rounded bg-background border border-border text-[10px]">→</kbd>
              <span>Arrow keys to navigate</span>
            </div>

            {/* Right: Next diagram jump or finished status */}
            <div className="flex items-center gap-2">
              {currentGlobalIndex < currentCategory.flows.length - 1 ? (
                <button
                  onClick={handleNextFlow}
                  className="flex items-center gap-1.5 text-muted hover:text-primary transition-colors cursor-pointer group text-[11px] truncate max-w-[220px] sm:max-w-[300px]"
                >
                  <span className="opacity-60">Next:</span>
                  <span className="truncate underline-offset-2 group-hover:underline text-primary font-medium">
                    {currentCategory.flows[currentGlobalIndex + 1].title}
                  </span>
                  <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                </button>
              ) : (
                <span className="text-[11px] text-muted opacity-70">
                  Completed all {currentCategory.flows.length} flows in {currentCategory.shortTitle}
                </span>
              )}
            </div>
          </footer>

        </main>
      </div>

      {/* ========================================================
          FULLSCREEN INSPECTION MODAL (Edge-to-Edge True Fullscreen)
          ======================================================== */}
      {isFullscreenModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex flex-col bg-background/98 backdrop-blur-xl animate-in fade-in duration-150 select-none overflow-hidden"
        >
          {/* Fullscreen Action Header */}
          <header className="h-14 px-4 sm:px-6 border-b border-border bg-surface flex items-center justify-between gap-3 flex-shrink-0 z-20 transition-colors duration-200">
            {/* Left: Category & Title */}
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-primary text-background flex-shrink-0">
                {currentCategory.shortTitle} • Stage {selectedFlow.stageNumber}
              </span>
              <h2 className="text-sm sm:text-base font-bold truncate text-primary font-vesper">
                {selectedFlow.title}
              </h2>
            </div>

            {/* Center: Stepper Pill */}
            <div className="hidden md:flex items-center border border-border rounded-xl bg-background p-0.5 shadow-2xs">
              <button
                onClick={handlePrevFlow}
                disabled={currentGlobalIndex === 0}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono text-muted hover:text-primary hover:bg-surface-elevated disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer group"
                title="Previous Diagram (Left Arrow)"
              >
                <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>Prev</span>
              </button>

              <div className="px-2.5 py-0.5 text-xs font-mono flex items-center gap-1 border-x border-border/60">
                <span className="font-bold text-primary">
                  {String(currentGlobalIndex + 1).padStart(2, '0')}
                </span>
                <span className="opacity-30">/</span>
                <span className="text-muted">
                  {String(currentCategory.flows.length).padStart(2, '0')}
                </span>
              </div>

              <button
                onClick={handleNextFlow}
                disabled={currentGlobalIndex === currentCategory.flows.length - 1}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono text-muted hover:text-primary hover:bg-surface-elevated disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer group"
                title="Next Diagram (Right Arrow)"
              >
                <span>Next</span>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Right: Modal Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Zoom Controls */}
              <div className="flex items-center border border-border rounded-xl bg-background p-0.5">
                <button
                  onClick={() => setModalZoom(prev => Math.max(0.4, Number((prev - 0.2).toFixed(1))))}
                  className="p-1 rounded-lg text-muted hover:text-primary hover:bg-surface-elevated transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>

                <button
                  onClick={() => {
                    setModalZoom(1);
                    setModalRotation(0);
                  }}
                  className="px-2 py-0.5 text-[11px] font-mono text-muted hover:text-primary transition-colors cursor-pointer"
                  title="Reset to 100%"
                >
                  {Math.round(modalZoom * 100)}%
                </button>

                <button
                  onClick={() => setModalZoom(prev => Math.min(3.0, Number((prev + 0.2).toFixed(1))))}
                  className="p-1 rounded-lg text-muted hover:text-primary hover:bg-surface-elevated transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
              </div>

              {/* Rotate 90 deg */}
              <button
                onClick={() => setModalRotation(prev => (prev + 90) % 360)}
                className={`p-1.5 rounded-lg border text-muted hover:text-primary hover:bg-surface-elevated transition-colors cursor-pointer ${
                  modalRotation !== 0 ? 'border-primary text-primary font-bold' : 'border-border'
                }`}
                title="Rotate Diagram 90°"
              >
                <RotateCw size={14} />
              </button>

              {/* Open Raw SVG */}
              <a
                href={selectedFlow.svgUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg border border-border text-muted hover:text-primary hover:bg-surface-elevated transition-colors cursor-pointer"
                title="Open raw vector SVG"
              >
                <ExternalLink size={14} />
              </a>

              {/* Close Fullscreen */}
              <button
                onClick={() => setIsFullscreenModalOpen(false)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-colors cursor-pointer ml-1 ${
                  isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
                title="Exit Fullscreen (Esc)"
              >
                <X size={15} />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>
          </header>

          {/* Fullscreen Canvas Viewport */}
          <div className={`flex-1 overflow-auto custom-scrollbar p-4 sm:p-10 flex items-center justify-center relative transition-colors duration-200 ${
            isDark ? 'bg-[#0a0b0e]' : 'bg-[#eef1f6]'
          }`}>

            {/* Floating Left Edge Navigator */}
            {currentGlobalIndex > 0 && (
              <button
                onClick={handlePrevFlow}
                className={`absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border shadow-xl flex items-center justify-center transition-all cursor-pointer opacity-50 hover:opacity-100 hover:scale-110 group ${
                  isDark 
                    ? 'bg-[#181920]/90 border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-400' 
                    : 'bg-white/95 border-slate-200 text-slate-700 hover:text-black hover:border-slate-400'
                }`}
                title={`Previous: ${currentCategory.flows[currentGlobalIndex - 1]?.title}`}
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
            )}

            {/* Floating Right Edge Navigator */}
            {currentGlobalIndex < currentCategory.flows.length - 1 && (
              <button
                onClick={handleNextFlow}
                className={`absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border shadow-xl flex items-center justify-center transition-all cursor-pointer opacity-50 hover:opacity-100 hover:scale-110 group ${
                  isDark 
                    ? 'bg-[#181920]/90 border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-400' 
                    : 'bg-white/95 border-slate-200 text-slate-700 hover:text-black hover:border-slate-400'
                }`}
                title={`Next: ${currentCategory.flows[currentGlobalIndex + 1]?.title}`}
              >
                <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}

            {/* Framed Scalable Vector Card Container */}
            <div 
              className={`w-full max-w-7xl rounded-2xl border shadow-2xl flex items-center justify-center p-4 sm:p-10 transition-transform duration-200 overflow-hidden ${
                isDark 
                  ? 'bg-[#181920] border-[#2e313d] text-zinc-100' 
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
              style={{
                transform: `scale(${modalZoom}) rotate(${modalRotation}deg)`,
                transformOrigin: 'center center'
              }}
            >
              <img
                src={selectedFlow.svgUrl}
                alt={selectedFlow.title}
                className="w-full h-auto max-h-[78vh] object-contain pointer-events-auto select-none"
              />
            </div>

          </div>

          {/* Fullscreen Slim Status Footer */}
          <footer className="h-9 px-4 sm:px-6 border-t border-border bg-surface flex items-center justify-between text-xs font-mono flex-shrink-0 z-20 transition-colors duration-200">
            <span className="text-muted truncate max-w-xs sm:max-w-md">
              File: <span className="text-primary font-medium">{selectedFlow.fileName}</span>
            </span>

            <div className="flex items-center gap-2 text-muted opacity-80 text-[11px]">
              <kbd className="px-1.5 py-0.2 rounded bg-background border border-border text-[10px]">←</kbd>
              <kbd className="px-1.5 py-0.2 rounded bg-background border border-border text-[10px]">→</kbd>
              <span className="hidden sm:inline">Navigate flows</span>
              <span className="opacity-40">•</span>
              <kbd className="px-1.5 py-0.2 rounded bg-background border border-border text-[10px]">Esc</kbd>
              <span>Exit Fullscreen</span>
            </div>

            <div className="flex items-center gap-1.5 text-muted text-[11px]">
              <span>Flow</span>
              <span className="font-bold text-primary">{currentGlobalIndex + 1}</span>
              <span>of</span>
              <span className="font-bold text-primary">{currentCategory.flows.length}</span>
            </div>
          </footer>
        </div>
      )}

    </div>
  );
}
