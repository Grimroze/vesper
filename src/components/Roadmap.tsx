'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import type { Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTheme } from '../themeContext';

import {
  Clock, Terminal, 
  ChevronRight, X, Target, Compass, Network, ListTodo, 
  ExternalLink, FileText, HelpCircle, ChevronDown, ChevronUp,
  CheckSquare, Award, BarChart3, MoveHorizontal, MoveVertical, RotateCcw,
  Check, Copy, Sparkles
} from 'lucide-react';
import { HighlightedText } from '../utils/highlight';

import {
  PHASES,
  RAW_NODE_DATA,
  LAYOUT_TB,
  LAYOUT_LR,
  NODE_DATA_MAP,
  getConnectedPaths,
  calculateReadinessMetrics,
  type ProgressStatus,
  type NodeData,
  type PhaseGroupInfo,
} from './roadmapData';

const PHASE_META: Record<string, { subtitle: string; modules: number; hours: number; tag: string }> = {
  'All': { subtitle: 'Full AI Systems Curriculum', modules: 35, hours: 740, tag: 'Overview' },
  'Foundations': { subtitle: 'Math, CUDA & PyTorch Internals', modules: 4, hours: 80, tag: 'Phase 01' },
  'Architecture': { subtitle: 'Transformers, FlashAttention & SSMs', modules: 5, hours: 95, tag: 'Phase 02' },
  'Data Pipeline': { subtitle: 'Vector DBs, ColBERT & GraphRAG', modules: 4, hours: 85, tag: 'Phase 03' },
  'Agents': { subtitle: 'ReAct, Function Calling & LangGraph', modules: 5, hours: 110, tag: 'Phase 04' },
  'Fine-Tuning': { subtitle: 'LoRA, QLoRA, Axolotl & Data', modules: 5, hours: 105, tag: 'Phase 05' },
  'Alignment': { subtitle: 'RLHF, DPO, ORPO & Eval', modules: 4, hours: 80, tag: 'Phase 06' },
  'Inference': { subtitle: 'vLLM, PagedAttention & Speculative', modules: 4, hours: 95, tag: 'Phase 07' },
  'Ops & Scale': { subtitle: 'Megatron, Ray, K8s & Autoscaling', modules: 4, hours: 90, tag: 'Phase 08' },
};

// ==========================================
// Custom React Flow Node: Phase Cluster Backdrop
// ==========================================
const PhaseClusterNode = ({ data }: { data: PhaseGroupInfo }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isCozy = false;

  return (
    <div
      style={{ width: data.width, height: data.height }}
      className={`rounded-2xl border transition-all duration-200 pointer-events-none p-5 select-none ${
        isDark 
          ? 'bg-[#1e2027]/30 border-[#2e313d]/50' 
          : isCozy
            ? 'bg-[#f1f3f7]/40 border-[#d8dce6]/70'
            : 'bg-slate-50/60 border-slate-200/80'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-mono tracking-widest uppercase ${isCozy ? 'text-[#626d82]' : 'text-zinc-500'}`}>
          // {String(data.number).padStart(2, '0')} : {data.title}
        </span>
        <span className={`text-[10px] font-mono ${isCozy ? 'text-[#94a3b8]' : 'text-zinc-600'}`}>
          {data.totalHours}h
        </span>
      </div>
    </div>
  );
};

// ==========================================
// Custom React Flow Node: Streamlined High-Readability Card
// ==========================================
interface CourseNodeProps {
  data: NodeData & {
    subtaskProgress?: { checked: number; total: number };
    pathRole?: 'active' | 'upstream' | 'downstream' | 'dimmed';
  };
  selected: boolean;
}

const CourseNode = ({ data, selected }: CourseNodeProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isCozy = false;
  const status = data.status || 'Todo';
  const pathRole = data.pathRole;

  // Dynamic Pathway classes
  let pathClass = '';
  if (pathRole === 'active') {
    pathClass = isDark 
      ? 'ring-1 ring-indigo-500 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.25)]' 
      : isCozy
        ? 'ring-2 ring-[#6366f1] border-[#6366f1] shadow-[0_0_15px_rgba(99,102,241,0.25)]'
        : 'ring-2 ring-indigo-600 border-indigo-600 shadow-md';
  } else if (pathRole === 'upstream') {
    pathClass = isDark ? 'ring-1 ring-cyan-500/80 border-cyan-500' : isCozy ? 'ring-1 ring-indigo-500 border-indigo-500' : 'ring-1 ring-cyan-600 border-cyan-600';
  } else if (pathRole === 'downstream') {
    pathClass = isDark ? 'ring-1 ring-emerald-500/80 border-emerald-500' : isCozy ? 'ring-1 ring-emerald-600 border-emerald-600' : 'ring-1 ring-emerald-600 border-emerald-600';
  } else if (pathRole === 'dimmed') {
    pathClass = 'opacity-20 grayscale pointer-events-auto';
  }

  return (
    <div
      className={`relative w-[280px] p-3.5 rounded-xl border transition-colors duration-150 cursor-pointer select-none ${
        isDark 
          ? 'bg-[#1e2027] ' + (selected ? 'border-indigo-500 ring-1 ring-indigo-500/40 shadow-sm' : 'border-[#2e313d] hover:border-[#3f3f46]')
          : isCozy
            ? 'bg-white ' + (selected ? 'border-[#6366f1] ring-2 ring-[#6366f1]/20 shadow-md' : 'border-[#d8dce6] hover:border-[#c5cbd9] shadow-sm')
            : 'bg-white ' + (selected ? 'border-indigo-600 ring-2 ring-indigo-600/20 shadow-md' : 'border-slate-200 hover:border-slate-300 shadow-sm')
      } ${
        status === 'Completed' && pathRole !== 'active' ? 'opacity-70' : 'opacity-100'
      } ${pathClass}`}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        className={`!w-2 !h-2 !border-0 ${
          pathRole === 'upstream' ? (isCozy ? '!bg-indigo-500' : '!bg-cyan-500') : isDark ? '!bg-zinc-600' : isCozy ? '!bg-[#94a3b8]' : '!bg-slate-400'
        }`} 
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id="left"
        className={`!w-2 !h-2 !border-0 ${
          pathRole === 'upstream' ? (isCozy ? '!bg-indigo-500' : '!bg-cyan-500') : isDark ? '!bg-zinc-600' : isCozy ? '!bg-[#94a3b8]' : '!bg-slate-400'
        }`} 
      />
      
      <div className="flex flex-col gap-2">
        {/* Top: Tag + Duration & Status */}
        <div className={`flex items-center justify-between text-[10px] font-mono ${
          isDark ? 'text-zinc-400' : isCozy ? 'text-[#626d82] font-medium' : 'text-slate-600 font-medium'
        }`}>
          <span className="uppercase tracking-wider">{data.tag}</span>
          <div className="flex items-center gap-1.5">
            {status === 'Completed' && (
              <span className={`w-1.5 h-1.5 rounded-full ${isCozy ? 'bg-emerald-600' : 'bg-emerald-500'}`}></span>
            )}
            {status === 'In Progress' && (
              <span className={`w-1.5 h-1.5 rounded-full ${isCozy ? 'bg-[#6366f1]' : 'bg-blue-500'}`}></span>
            )}
            <span>{data.duration}</span>
          </div>
        </div>
        
        {/* Title */}
        <div>
          <h3 className={`text-sm font-semibold tracking-tight leading-snug ${
            status === 'Completed' 
              ? (isDark ? 'text-zinc-500 line-through' : isCozy ? 'text-[#94a3b8] line-through' : 'text-slate-400 line-through')
              : (isDark ? 'text-zinc-100' : isCozy ? 'text-[#1e2330]' : 'text-slate-900')
          }`}>
            <HighlightedText text={data.title} />
          </h3>
        </div>

        {/* Tools */}
        <div className="flex flex-wrap items-center gap-1 pt-0.5">
          {data.tools.slice(0, 3).map((tool: string) => (
            <span key={tool} className={`text-[9px] font-mono px-1.5 py-0.2 rounded border font-medium ${
              isDark 
                ? 'bg-[#18181b] border-[#2e313d] text-zinc-400' 
                : isCozy
                  ? 'bg-[#f1f3f7] border-[#d8dce6] text-[#475569]'
                  : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}>
              {tool}
            </span>
          ))}
          {data.tools.length > 3 && (
            <span className="text-[9px] font-mono text-muted pl-0.5">+{data.tools.length - 3}</span>
          )}
        </div>
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className={`!w-2 !h-2 !border-0 ${
          pathRole === 'downstream' ? '!bg-emerald-500' : isDark ? '!bg-zinc-600' : '!bg-slate-400'
        }`} 
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        id="right"
        className={`!w-2 !h-2 !border-0 ${
          pathRole === 'downstream' ? '!bg-emerald-500' : isDark ? '!bg-zinc-600' : '!bg-slate-400'
        }`} 
      />
    </div>
  );
};

const nodeTypes = {
  courseNode: CourseNode,
  phaseClusterNode: PhaseClusterNode,
};

// ==========================================
// Inner Flow Component
// ==========================================
function RoadmapFlow() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isCozy = false;
  const reactFlowInstance = useReactFlow();

  // Layout Direction State: 'TB' (Vertical Tree) vs 'LR' (Horizontal Pipeline)
  const [layoutDirection, setLayoutDirection] = useState<'TB' | 'LR'>('TB');

  // Active Layout Data
  const activeLayout = useMemo(() => {
    return layoutDirection === 'LR' ? LAYOUT_LR : LAYOUT_TB;
  }, [layoutDirection]);

  // State Management
  const [progress, setProgress] = useState<Record<string, ProgressStatus>>({});
  const [subtasks, setSubtasks] = useState<Record<string, Record<string, boolean>>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [nodes, setNodes, onNodesChange] = useNodesState(activeLayout.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(activeLayout.edges);
  
  // Navigation & Interactive Path Tracing
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isInspectorMinimized, setIsInspectorMinimized] = useState(false);
  const [inspectorTab, setInspectorTab] = useState<'tasks' | 'notes' | 'interview'>('tasks');
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph');
  const [selectedPhase, setSelectedPhase] = useState<string>('All');
  const [isPhaseDropdownOpen, setIsPhaseDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openInterviewIndex, setOpenInterviewIndex] = useState<number | null>(null);
  const [showReadinessModal, setShowReadinessModal] = useState(false);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as unknown as HTMLElement)) {
        setIsPhaseDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsPhaseDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Initialize from LocalStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedProgress = localStorage.getItem('vesper-roadmap-progress');
        if (savedProgress) setProgress(JSON.parse(savedProgress));

        const savedSubtasks = localStorage.getItem('vesper-roadmap-subtasks');
        if (savedSubtasks) setSubtasks(JSON.parse(savedSubtasks));

        const savedNotes = localStorage.getItem('vesper-roadmap-notes');
        if (savedNotes) setNotes(JSON.parse(savedNotes));

        const savedView = localStorage.getItem('vesper-roadmap-view');
        if (savedView === 'graph' || savedView === 'list') setViewMode(savedView);

        const savedDir = localStorage.getItem('vesper-roadmap-direction');
        if (savedDir === 'TB' || savedDir === 'LR') setLayoutDirection(savedDir);
      } catch (e) {
        console.error('Failed to load roadmap storage', e);
      }
    }
  }, []);

  // Update layout when direction changes
  useEffect(() => {
    setNodes(activeLayout.nodes);
    setEdges(activeLayout.edges);
    setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.15, duration: 600 });
    }, 50);
  }, [activeLayout, reactFlowInstance, setNodes, setEdges]);

  // Compute Active Dependency Path
  const focusedNodeId = hoveredNodeId || selectedNodeId;
  const pathInfo = useMemo(() => {
    if (!focusedNodeId) return null;
    return getConnectedPaths(focusedNodeId, activeLayout.edges);
  }, [focusedNodeId, activeLayout.edges]);

  // Sync nodes data with progress, subtasks & interactive path tracing
  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.type === 'phaseClusterNode') {
          return n;
        }
        const nodeRaw = NODE_DATA_MAP[n.id];
        const taskMap = subtasks[n.id] || {};
        const checkedCount = Object.values(taskMap).filter(Boolean).length;
        const totalConcepts = nodeRaw ? nodeRaw.concepts.length : 0;

        // Path role assignment
        let pathRole: 'active' | 'upstream' | 'downstream' | 'dimmed' | undefined = undefined;
        if (pathInfo) {
          if (n.id === focusedNodeId) {
            pathRole = 'active';
          } else if (pathInfo.upstreamNodes.has(n.id)) {
            pathRole = 'upstream';
          } else if (pathInfo.downstreamNodes.has(n.id)) {
            pathRole = 'downstream';
          } else {
            pathRole = 'dimmed';
          }
        }

        return {
          ...n,
          data: {
            ...n.data,
            status: progress[n.id] || 'Todo',
            pathRole,
            subtaskProgress: {
              checked: checkedCount,
              total: totalConcepts,
            },
          }
        };
      })
    );
  }, [progress, subtasks, pathInfo, focusedNodeId, setNodes]);

  // Handle edge styling based on progress, theme, and interactive path tracing
  useEffect(() => {
    setEdges((eds) => 
      eds.map((e) => {
        const sourceStatus = progress[e.source];
        const isCompleted = sourceStatus === 'Completed';

        // Check if edge is part of active path
        const isUpstreamEdge = pathInfo?.upstreamEdges.has(e.id);
        const isDownstreamEdge = pathInfo?.downstreamEdges.has(e.id);
        const isDimmed = pathInfo && !pathInfo.allConnectedEdges.has(e.id);

        let strokeColor = isCompleted 
          ? (isCozy ? '#10b981' : '#10b981')
          : (isDark ? '#2e313d' : isCozy ? '#d8dce6' : '#cbd5e1');
        let strokeWidth = isCompleted ? 2 : 1.5;
        let animated = false;

        if (isUpstreamEdge) {
          strokeColor = isCozy ? '#6366f1' : '#06b6d4'; // Iris indigo for soft muted / Clean Cyan for prerequisites
          strokeWidth = 2.5;
        } else if (isDownstreamEdge) {
          strokeColor = isCozy ? '#10b981' : '#10b981'; // Universal Emerald for unlocked next
          strokeWidth = 2.5;
        } else if (isDimmed) {
          strokeColor = isDark ? '#18181b' : isCozy ? '#e2e8f0' : '#f1f5f9';
          strokeWidth = 1;
          animated = false;
        }

        return {
          ...e,
          animated,
          style: {
            stroke: strokeColor,
            strokeWidth,
          }
        };
      })
    );
  }, [progress, pathInfo, setEdges, isDark, isCozy]);

  // Status Updater
  const updateNodeStatus = (id: string, status: ProgressStatus) => {
    setProgress((prev) => {
      const next = { ...prev, [id]: status };
      localStorage.setItem('vesper-roadmap-progress', JSON.stringify(next));
      return next;
    });
  };

  // Subtask Checkbox Toggle
  const toggleSubtask = (nodeId: string, concept: string) => {
    setSubtasks((prev) => {
      const nodeTasks = prev[nodeId] || {};
      const next = {
        ...prev,
        [nodeId]: {
          ...nodeTasks,
          [concept]: !nodeTasks[concept]
        }
      };
      localStorage.setItem('vesper-roadmap-subtasks', JSON.stringify(next));
      return next;
    });
  };

  // Note Saver
  const updateNote = (nodeId: string, text: string) => {
    setNotes((prev) => {
      const next = { ...prev, [nodeId]: text };
      localStorage.setItem('vesper-roadmap-notes', JSON.stringify(next));
      return next;
    });
  };

  // View Mode Saver
  const handleViewChange = (mode: 'graph' | 'list') => {
    setViewMode(mode);
    localStorage.setItem('vesper-roadmap-view', mode);
  };

  // Toggle Layout Direction (Vertical Tree vs Horizontal Pipeline)
  const toggleLayoutDirection = () => {
    const next = layoutDirection === 'TB' ? 'LR' : 'TB';
    setLayoutDirection(next);
    localStorage.setItem('vesper-roadmap-direction', next);
  };

  // Phase Selection & Deep Graph Camera Jump
  const handlePhaseSelect = (phase: string) => {
    setSelectedPhase(phase);
    
    if (viewMode === 'graph') {
      if (phase === 'All') {
        reactFlowInstance.fitView({ padding: 0.15, duration: 800 });
      } else {
        const bounds = activeLayout.phaseBounds[phase];
        if (bounds) {
          reactFlowInstance.fitBounds(
            { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height },
            { padding: 0.25, duration: 800 }
          );
        }
      }
    }
  };

  // Node Selection
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.type === 'phaseClusterNode') return;
    setSelectedNodeId(node.id);
    setIsInspectorMinimized(false);
  }, []);

  const closeInspector = () => setSelectedNodeId(null);
  const toggleMinimize = () => setIsInspectorMinimized(!isInspectorMinimized);

  // Clear Path Focus
  const handleClearPathFocus = () => {
    setSelectedNodeId(null);
    setHoveredNodeId(null);
  };

  // Next Up Smart Recommendation Jump
  const handleNextUp = () => {
    let target = RAW_NODE_DATA.find(n => progress[n.id] === 'In Progress');
    if (!target) {
      target = RAW_NODE_DATA.find(n => !progress[n.id] || progress[n.id] === 'Todo');
    }
    if (target) {
      setSelectedNodeId(target.id);
      setIsInspectorMinimized(false);
      if (viewMode === 'graph') {
        const layoutNode = activeLayout.nodes.find(n => n.id === target?.id);
        if (layoutNode) {
          reactFlowInstance.setCenter(
            layoutNode.position.x + 160,
            layoutNode.position.y + 80,
            { zoom: 1.1, duration: 800 }
          );
        }
      }
    }
  };

  // Readiness Metrics Evaluation
  const readiness = useMemo(() => {
    return calculateReadinessMetrics(progress, subtasks);
  }, [progress, subtasks]);

  // Phase Progress Statistics for Navigation Bubbles
  const phaseProgressMap = useMemo(() => {
    const map: Record<string, { total: number; completed: number }> = {
      'All': { total: RAW_NODE_DATA.length, completed: Object.values(progress).filter(s => s === 'Completed').length }
    };
    PHASES.forEach(p => {
      if (p === 'All') return;
      const phaseNodes = RAW_NODE_DATA.filter(n => n.tag.toLowerCase() === p.toLowerCase());
      const completed = phaseNodes.filter(n => progress[n.id] === 'Completed').length;
      map[p] = { total: phaseNodes.length, completed };
    });
    return map;
  }, [progress]);

  const selectedData = selectedNodeId ? NODE_DATA_MAP[selectedNodeId] : null;
  const currentStatus = selectedNodeId ? progress[selectedNodeId] || 'Todo' : 'Todo';
  const currentNodeSubtasks = selectedNodeId ? subtasks[selectedNodeId] || {} : {};
  const currentNodeNote = selectedNodeId ? notes[selectedNodeId] || '' : '';

  // Filtered List for Sprint View
  const filteredList = useMemo(() => {
    if (selectedPhase === 'All') return RAW_NODE_DATA;
    return RAW_NODE_DATA.filter(n => n.tag.toLowerCase() === selectedPhase.toLowerCase());
  }, [selectedPhase]);

  // Grouped by Phase for Sprint View
  const groupedPhases = useMemo(() => {
    const map = new Map<string, typeof RAW_NODE_DATA>();
    filteredList.forEach(item => {
      const group = map.get(item.tag) || [];
      group.push(item);
      map.set(item.tag, group);
    });
    return Array.from(map.entries());
  }, [filteredList]);

  return (
    <div className="w-full h-full absolute inset-0 bg-background font-sans overflow-hidden transition-colors duration-200">
      
      {/* ==========================================
          Top Command Center (Clean, Never Clips, High Utility)
          ========================================== */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-col gap-2.5 pointer-events-auto">
        
        {/* Row 1: Actions, Readiness Score, Orientation & View Switcher */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          
          {/* Left: Active Stage Selector + View Switcher (Graph vs Sprints) */}
          <div className="flex items-center gap-2 select-none flex-wrap">
            
            {/* Stage Selector with Dropdown */}
            <div ref={dropdownRef} className="relative flex items-center gap-1.5">
              <button
                onClick={() => setIsPhaseDropdownOpen(!isPhaseDropdownOpen)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border backdrop-blur-md text-xs font-mono transition-all duration-200 cursor-pointer shadow-xs ${
                  isPhaseDropdownOpen
                    ? (isDark 
                        ? 'bg-[#222430] border-zinc-400 ring-2 ring-white/10 text-white shadow-md' 
                        : isCozy 
                          ? 'bg-[#f1f3f7] border-[#6366f1]/70 ring-2 ring-[#6366f1]/20 text-[#1e2330] shadow-md' 
                          : 'bg-slate-100 border-slate-400 ring-2 ring-slate-900/10 text-slate-950 shadow-md')
                    : (isDark 
                        ? 'bg-[#181920]/95 border-[#2e313d] text-zinc-200 hover:border-zinc-500 hover:bg-[#222430]' 
                        : isCozy 
                          ? 'bg-white/95 border-[#d8dce6] text-[#1e2330] hover:border-[#c5cbd9]' 
                          : 'bg-white/95 border-[#dbe0e9] text-slate-800 hover:border-slate-400 hover:bg-slate-50')
                }`}
                title="Click to switch curriculum stages"
              >
                <span className="text-muted text-[10px] uppercase tracking-wider font-bold">Stage:</span>
                <span className={`font-bold ${isDark ? 'text-zinc-100' : isCozy ? 'text-[#1e2330]' : 'text-slate-950'}`}>
                  {selectedPhase}
                </span>
                <ChevronDown 
                  size={13} 
                  className={`transition-transform duration-200 text-muted ${isPhaseDropdownOpen ? 'rotate-180 text-primary' : ''}`} 
                />
              </button>

              {selectedPhase !== 'All' && (
                <button
                  onClick={() => handlePhaseSelect('All')}
                  className={`px-2.5 py-1.5 rounded-xl border backdrop-blur-md transition-all duration-150 cursor-pointer flex items-center gap-1.5 text-xs font-mono shadow-xs ${
                    isDark 
                      ? 'bg-[#181920]/95 border-[#2e313d] text-zinc-300 hover:text-white hover:border-zinc-500 hover:bg-[#222430]' 
                      : isCozy 
                        ? 'bg-white/95 border-[#d8dce6] text-[#626d82] hover:text-[#1e2330]' 
                        : 'bg-white/95 border-[#dbe0e9] text-slate-700 hover:text-slate-950 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                  title="Reset to view all phases"
                >
                  <RotateCcw size={11} />
                  <span className="font-medium">All</span>
                </button>
              )}

              {/* Cool Animated Dropdown Panel */}
              <div 
                className={`absolute left-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border backdrop-blur-2xl shadow-2xl p-2 z-50 transition-all duration-200 ease-out origin-top-left ${
                  isPhaseDropdownOpen
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                } ${
                  isDark 
                    ? 'bg-[#1e2027]/98 border-[#2e313d] text-zinc-200 shadow-[0_20px_60px_rgba(0,0,0,0.8)]' 
                    : isCozy 
                      ? 'bg-white/98 border-[#d8dce6] text-[#1e2330] shadow-[0_20px_50px_rgba(99,102,241,0.08)]' 
                      : 'bg-white/98 border-slate-200 text-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)]'
                }`}
              >
                {/* Dropdown Header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-border/50 text-[11px] font-mono">
                  <span className="text-muted uppercase tracking-wider font-semibold">Curriculum Stages</span>
                  <span className="text-muted">35 Modules • 740h</span>
                </div>

                {/* Stage Items List */}
                <div className="flex flex-col gap-1 mt-1 max-h-[60vh] overflow-y-auto custom-scrollbar p-0.5">
                  {PHASES.map((phase) => {
                    const isSelected = selectedPhase === phase;
                    const meta = PHASE_META[phase] || { subtitle: phase, modules: 0, hours: 0, tag: 'Phase' };
                    const stats = phaseProgressMap[phase] || { total: 0, completed: 0 };
                    const percent = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

                    return (
                      <button
                        key={phase}
                        onClick={() => {
                          handlePhaseSelect(phase);
                          setIsPhaseDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer group ${
                          isSelected
                            ? (isDark 
                                ? 'bg-[#18181b] border border-indigo-500/40 shadow-sm' 
                                : isCozy 
                                  ? 'bg-[#f1f3f7] border border-[#6366f1]/30 shadow-sm' 
                                  : 'bg-slate-100 border border-indigo-600/30 shadow-sm')
                            : (isDark 
                                ? 'hover:bg-[#18181b]/70 border border-transparent' 
                                : isCozy 
                                  ? 'hover:bg-[#f1f3f7]/70 border border-transparent' 
                                  : 'hover:bg-slate-50 border border-transparent')
                        }`}
                      >
                        {/* Left: Tag + Title + Subtitle */}
                        <div className="flex items-start gap-2.5 min-w-0">
                          {/* Active Indicator Dot */}
                          <div className="mt-1 flex-shrink-0">
                            <span 
                              className={`w-2 h-2 rounded-full block transition-all ${
                                isSelected
                                  ? (isCozy ? 'bg-[#6366f1] shadow-[0_0_8px_rgba(99,102,241,0.6)] scale-110' : 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.9)] scale-110')
                                  : 'bg-zinc-600/40 group-hover:bg-zinc-400/60'
                              }`}
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold uppercase ${
                                isDark 
                                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                                  : isCozy 
                                    ? 'bg-indigo-50/80 text-[#6366f1] border border-indigo-200/60' 
                                    : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                              }`}>
                                {meta.tag}
                              </span>
                              <span className={`text-xs font-semibold truncate ${
                                isSelected
                                  ? (isDark ? 'text-zinc-100' : isCozy ? 'text-[#1e2330]' : 'text-slate-900')
                                  : (isDark ? 'text-zinc-300 group-hover:text-zinc-100' : isCozy ? 'text-[#475569] group-hover:text-[#1e2330]' : 'text-slate-700 group-hover:text-slate-900')
                              }`}>
                                {phase === 'All' ? 'Complete Roadmap' : phase}
                              </span>
                            </div>
                            <p className="text-[11px] text-muted truncate mt-0.5">
                              {meta.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Right: Progress stats & hours */}
                        <div className="flex flex-col items-end flex-shrink-0 text-[10px] font-mono">
                          <span className={percent === 100 ? (isCozy ? 'text-emerald-600 font-bold' : 'text-emerald-500 font-bold') : 'text-muted'}>
                            {stats.completed}/{stats.total} ({percent}%)
                          </span>
                          <span className="text-muted mt-0.5">
                            {meta.hours}h
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Dropdown Footer */}
                <div className="pt-2 mt-1 border-t border-border/50 px-3 py-1 flex items-center justify-between text-[10px] font-mono text-muted">
                  <span>Click to focus canvas</span>
                  <span className="text-[9px]">Esc to close</span>
                </div>
              </div>
            </div>

            {/* View Switcher: Graph vs Sprints (Positioned directly next to stages for high visibility) */}
            <div className={`flex items-center p-1 rounded-xl border backdrop-blur-md transition-all shadow-xs gap-1 ${
              isDark ? 'bg-[#181920]/95 border-[#2e313d]' : isCozy ? 'bg-white/95 border-[#d8dce6]' : 'bg-white/95 border-[#dbe0e9]'
            }`}>
              <button
                onClick={() => handleViewChange('graph')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all duration-150 cursor-pointer ${
                  viewMode === 'graph'
                    ? (isDark 
                        ? 'bg-white text-black font-bold shadow-xs' 
                        : isCozy 
                          ? 'bg-[#1e2330] text-white font-bold shadow-sm' 
                          : 'bg-slate-900 text-white font-bold shadow-xs')
                    : (isDark 
                        ? 'text-zinc-400 hover:text-white hover:bg-white/5 font-medium' 
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 font-medium')
                }`}
                title="Interactive Graph Canvas"
              >
                <Network size={14} strokeWidth={viewMode === 'graph' ? 2.4 : 1.8} />
                <span>Graph</span>
              </button>
              <button
                onClick={() => handleViewChange('list')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all duration-150 cursor-pointer ${
                  viewMode === 'list'
                    ? (isDark 
                        ? 'bg-white text-black font-bold shadow-xs' 
                        : isCozy 
                          ? 'bg-[#1e2330] text-white font-bold shadow-sm' 
                          : 'bg-slate-900 text-white font-bold shadow-xs')
                    : (isDark 
                        ? 'text-zinc-400 hover:text-white hover:bg-white/5 font-medium' 
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 font-medium')
                }`}
                title="Sprint Execution Checklist"
              >
                <ListTodo size={14} strokeWidth={viewMode === 'list' ? 2.4 : 1.8} />
                <span>Sprints</span>
              </button>
            </div>

          </div>

          {/* Right: Next Up, Orientation & Readiness Score Actions */}
          <div className="flex items-center gap-2">
            
            {/* Next Up Smart Recommendation Jump */}
            <button
              onClick={handleNextUp}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all duration-150 cursor-pointer shadow-xs ${
                isDark 
                  ? 'bg-[#181920]/95 border-[#2e313d] text-zinc-200 hover:text-white hover:border-zinc-500 hover:bg-[#252834]' 
                  : isCozy
                    ? 'bg-white border-[#d8dce6] text-[#1e2330] hover:bg-[#f1f3f7] hover:border-[#c5cbd9] shadow-sm'
                    : 'bg-white/95 border-[#dbe0e9] text-slate-800 hover:text-slate-950 hover:border-slate-400 hover:bg-slate-50'
              }`}
              title="Jump to current active learning step"
            >
              <Compass size={14} className={isDark ? "text-sky-400" : isCozy ? "text-[#6366f1]" : "text-blue-600"} />
              <span className="font-semibold hidden sm:inline">Next Up</span>
            </button>

            {/* Orientation Switcher (Vertical Tree vs Horizontal Pipeline) */}
            {viewMode === 'graph' && (
              <button
                onClick={toggleLayoutDirection}
                className={`p-2 rounded-xl border backdrop-blur-md transition-all duration-150 cursor-pointer shadow-xs ${
                  isDark 
                    ? 'bg-[#181920]/95 border-[#2e313d] text-zinc-300 hover:text-white hover:border-zinc-500 hover:bg-[#252834]' 
                    : isCozy 
                      ? 'bg-white/95 border-[#d8dce6] hover:bg-[#f1f3f7]' 
                      : 'bg-white/95 border-[#dbe0e9] text-slate-700 hover:text-slate-950 hover:border-slate-400 hover:bg-slate-50'
                }`}
                title={`Switch to ${layoutDirection === 'TB' ? 'Horizontal Pipeline' : 'Vertical Tree'} layout`}
              >
                {layoutDirection === 'TB' ? <MoveHorizontal size={14} /> : <MoveVertical size={14} />}
              </button>
            )}

            {/* Progress Score Button (Opens Analytics Modal) */}
            <button
              onClick={() => setShowReadinessModal(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-md transition-all duration-150 cursor-pointer shadow-xs ${
                isDark 
                  ? 'bg-[#181920]/95 border-[#2e313d] text-zinc-100 hover:border-zinc-500 hover:bg-[#252834]' 
                  : isCozy
                    ? 'bg-white border-[#d8dce6] text-[#1e2330] hover:border-[#c5cbd9] shadow-sm'
                    : 'bg-white/95 border-[#dbe0e9] text-slate-900 hover:border-slate-400 hover:bg-slate-50'
              }`}
              title="Click to view full Progress & Skill Matrix"
            >
              <Award size={14} className={isDark ? "text-amber-400" : isCozy ? "text-[#6366f1]" : "text-amber-500"} />
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-muted hidden sm:inline">Progress</span>
                <span className={`font-bold ${isDark ? "text-white" : isCozy ? "text-[#1e2330]" : "text-slate-950"}`}>{readiness.readinessPercentage}%</span>
              </div>
              <BarChart3 size={13} className="text-muted hover:text-primary ml-0.5" />
            </button>

          </div>
        </div>

      </div>

      {/* ==========================================
          View 1: Interactive Canvas Graph with Dynamic Pathway Tracing
          ========================================== */}
      {viewMode === 'graph' && (
        <div className="w-full h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.03}
            maxZoom={1.5}
            className={isDark ? 'bg-[#15161b]' : isCozy ? 'bg-[#f1f3f7]' : 'bg-[#f8fafc]'}
          >
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={24} 
              size={1.5} 
              color={isDark ? '#2e313d' : isCozy ? '#d8dce6' : '#e2e8f0'} 
            />
            <Controls 
              className="overflow-hidden rounded-lg !bottom-6 !left-6 border border-[#2e313d]"
              showInteractive={false}
            />
          </ReactFlow>

          {/* Dynamic Pathway Tracing Legend & Controls (Bottom-Left) */}
          <div className={`absolute bottom-6 left-20 z-10 flex items-center gap-3 px-3.5 py-2 rounded-xl border backdrop-blur-md text-xs font-mono select-none ${
            isDark ? 'bg-[#1e2027]/95 border-[#2e313d] text-zinc-300' : isCozy ? 'bg-white/95 border-[#d8dce6] text-[#1e2330]' : 'bg-white/95 border-slate-200 text-slate-700'
          }`}>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${isCozy ? 'bg-[#6366f1]' : 'bg-cyan-500'}`}></span>
                <span className="text-[11px] text-muted">Prerequisites</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${isCozy ? 'bg-emerald-600' : 'bg-emerald-500'}`}></span>
                <span className="text-[11px] text-muted">Unlocks Next</span>
              </span>
            </div>

            {pathInfo && (
              <>
                <div className="h-4 w-[1px] bg-border mx-1"></div>
                <button
                  onClick={handleClearPathFocus}
                  className={`flex items-center gap-1 text-[11px] font-medium cursor-pointer ${
                    isCozy ? 'text-[#6366f1] hover:text-[#4f46e5]' : 'text-sky-500 hover:text-sky-400'
                  }`}
                >
                  <RotateCcw size={11} />
                  <span>Reset Path</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          View 2: Sprint Execution List View
          ========================================== */}
      {viewMode === 'list' && (
        <div className="w-full h-full pt-24 pb-16 px-4 sm:px-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-5xl mx-auto space-y-10">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-primary">
                  Sprint Execution & Curriculum
                </h2>
                <p className="text-xs text-muted mt-1">
                  Structured checklist organized by engineering stages. Progress tracks into your overall Readiness Evaluation.
                </p>
              </div>

              {/* Progress summary card */}
              <div 
                onClick={() => setShowReadinessModal(true)}
                className="flex items-center gap-3 px-4 py-2 rounded-xl border border-border bg-surface text-xs font-mono cursor-pointer hover:border-muted/50 transition-colors"
              >
                <div>
                  <span className="text-muted block text-[10px]">Progress</span>
                  <span className="text-primary font-bold">{readiness.readinessPercentage}%</span>
                </div>
                <div className="h-6 w-[1px] bg-border"></div>
                <div>
                  <span className="text-muted block text-[10px]">Concepts Mastered</span>
                  <span className="text-primary font-bold">{readiness.masteredConceptsCount}/{readiness.totalConceptsCount}</span>
                </div>
              </div>
            </div>

            {/* Grouped Phases List */}
            {groupedPhases.map(([phaseName, phaseNodes]) => {
              const phaseCompleted = phaseNodes.filter(n => progress[n.id] === 'Completed').length;
              const phaseHours = phaseNodes.reduce((acc, curr) => acc + curr.hours, 0);

              return (
                <div key={phaseName} className="space-y-3">
                  {/* Phase Section Title */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-muted font-bold">
                        {phaseName}
                      </span>
                      <span className="text-[11px] font-mono text-muted">
                        • {phaseCompleted}/{phaseNodes.length} modules ({phaseHours}h)
                      </span>
                    </div>
                  </div>

                  {/* Node Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phaseNodes.map((item) => {
                      const st = progress[item.id] || 'Todo';
                      const isDone = st === 'Completed';
                      const taskMap = subtasks[item.id] || {};
                      const checkedCount = Object.values(taskMap).filter(Boolean).length;
                      const hasNotes = !!notes[item.id];
                      const isSelected = selectedNodeId === item.id;

                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedNodeId(item.id);
                            setIsInspectorMinimized(false);
                          }}
                          className={`p-4 rounded-xl border transition-colors cursor-pointer flex flex-col justify-between gap-3 ${
                            isSelected
                              ? (isDark ? 'border-indigo-500 bg-[#151518] ring-1 ring-indigo-500/30' : 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20 shadow-md')
                              : (isDark ? 'border-[#2e313d] bg-[#1e2027] hover:border-[#3f3f46]' : 'border-slate-300 bg-white hover:border-slate-400 shadow-sm')
                          } ${isDone ? 'opacity-70' : 'opacity-100'}`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h3 className={`text-sm font-semibold tracking-tight ${isDone ? 'line-through text-muted' : 'text-primary'}`}>
                                <HighlightedText text={item.title} />
                              </h3>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border whitespace-nowrap font-medium ${
                                st === 'Completed'
                                  ? (isDark ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40' : 'bg-emerald-50 text-emerald-800 border-emerald-300')
                                  : st === 'In Progress'
                                    ? (isDark ? 'bg-blue-950/40 text-blue-400 border-blue-800/40' : 'bg-blue-50 text-blue-800 border-blue-300')
                                    : (isDark ? 'bg-[#18181b] text-zinc-400 border-[#2e313d]' : 'bg-slate-100 text-slate-700 border-slate-300')
                              }`}>
                                {st}
                              </span>
                            </div>

                            <p className="text-xs text-muted mt-1.5 line-clamp-2 leading-relaxed">
                              <HighlightedText text={item.description} />
                            </p>
                          </div>

                          <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] font-mono text-muted">
                            <span className="flex items-center gap-1.5">
                              <Clock size={12} /> {item.duration}
                            </span>
                            <div className="flex items-center gap-3">
                              {hasNotes && (
                                <span className={`flex items-center gap-1 ${isDark ? "text-sky-400" : "text-sky-700"}`} title="Notes added">
                                  <FileText size={12} />
                                </span>
                              )}
                              <span>{checkedCount}/{item.concepts.length} concepts</span>
                              <span className="text-primary flex items-center gap-0.5 font-sans font-medium">
                                Details <ChevronRight size={12} />
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      )}

      {/* ==========================================
          Readiness & Skill Analytics Modal
          ========================================== */}
      {showReadinessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-2xl rounded-2xl border shadow-2xl p-6 sm:p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto custom-scrollbar ${
              isDark ? 'bg-[#0e0e11] border-[#2e313d] text-zinc-100' : isCozy ? 'bg-white border-[#d8dce6] text-[#1e2330]' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-widest font-bold flex items-center gap-1.5 mb-1 ${isDark ? "text-amber-400" : isCozy ? "text-[#6366f1]" : "text-amber-600"}`}>
                  <Award size={14} /> Evaluation Matrix
                </span>
                <h3 className="text-2xl font-bold tracking-tight">AI Systems Engineering Readiness</h3>
                <p className="text-xs text-muted mt-1">
                  Multi-dimensional readiness score derived from 35 core production modules, 140 concept validations, and 740 curriculum hours.
                </p>
              </div>
              <button 
                onClick={() => setShowReadinessModal(false)}
                className="p-1.5 rounded-lg text-muted hover:text-primary transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scorecard Hero */}
            <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-6 ${
              isDark ? 'bg-[#141418] border-[#2e313d]' : isCozy ? 'bg-[#f1f3f7] border-[#d8dce6]' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[11px] font-mono text-muted uppercase">Current Engineering Tier</span>
                <h4 className="text-xl font-bold text-primary flex items-center gap-2 justify-center sm:justify-start">
                  <Award size={18} className={isDark ? "text-amber-400" : "text-amber-500"} />
                  {readiness.currentTier.title}
                </h4>
                <p className="text-xs text-muted max-w-md">
                  {readiness.currentTier.subtitle}
                </p>
              </div>

              {/* Radial Score */}
              <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-border bg-background min-w-[120px]">
                <span className="text-3xl font-extrabold font-mono text-primary">
                  {readiness.readinessPercentage}%
                </span>
                <span className="text-[10px] font-mono uppercase text-muted tracking-wider">
                  Production Ready
                </span>
              </div>
            </div>

            {/* 3 Metric Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-900/30 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[10px] font-mono uppercase text-muted">Concepts Mastered</span>
                <div className="text-lg font-bold font-mono text-primary mt-1">
                  {readiness.masteredConceptsCount} <span className="text-xs text-muted font-normal">/ {readiness.totalConceptsCount}</span>
                </div>
                <div className="h-1 w-full bg-border rounded-full overflow-hidden mt-2">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ width: `${(readiness.masteredConceptsCount / readiness.totalConceptsCount) * 100}%` }} 
                  />
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-900/30 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[10px] font-mono uppercase text-muted">Capstones Shipped</span>
                <div className="text-lg font-bold font-mono text-primary mt-1">
                  {readiness.completedNodesCount} <span className="text-xs text-muted font-normal">/ {readiness.totalNodesCount}</span>
                </div>
                <div className="h-1 w-full bg-border rounded-full overflow-hidden mt-2">
                  <div 
                    className="h-full bg-emerald-500" 
                    style={{ width: `${(readiness.completedNodesCount / readiness.totalNodesCount) * 100}%` }} 
                  />
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-900/30 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[10px] font-mono uppercase text-muted">Hours Invested</span>
                <div className="text-lg font-bold font-mono text-primary mt-1">
                  {readiness.earnedHours}h <span className="text-xs text-muted font-normal">/ {readiness.totalHours}h</span>
                </div>
                <div className="h-1 w-full bg-border rounded-full overflow-hidden mt-2">
                  <div 
                    className="h-full bg-purple-500" 
                    style={{ width: `${(readiness.earnedHours / readiness.totalHours) * 100}%` }} 
                  />
                </div>
              </div>
            </div>

            {/* Pillar Breakdown Progress Bars */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-muted font-bold tracking-wider">
                Pillar-by-Pillar Mastery Index
              </span>
              <div className="space-y-2.5">
                {Object.entries(readiness.phaseProgress).map(([phase, stats]) => (
                  <div key={phase} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-primary">{phase}</span>
                      <span className="font-mono text-muted text-[11px]">
                        {stats.completed}/{stats.total} modules ({stats.percentage}%)
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`}>
                      <div 
                        className={`h-full transition-all duration-500 ${
                          stats.percentage === 100 ? 'bg-emerald-500' : isDark ? 'bg-zinc-200' : 'bg-slate-800'
                        }`} 
                        style={{ width: `${stats.percentage}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Milestone Footer */}
            <div className={`p-4 rounded-xl border flex items-center justify-between text-xs font-mono ${
              isDark ? 'bg-zinc-900/40 border-zinc-800 text-zinc-300' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
              <div className="flex items-center gap-2">
                <Target size={16} className="text-blue-500" />
                <span>Next Milestone: {readiness.nextMilestone}</span>
              </div>
              <button
                onClick={() => {
                  setShowReadinessModal(false);
                  handleNextUp();
                }}
                className="px-3 py-1 rounded-lg bg-primary text-background font-semibold cursor-pointer"
              >
                Continue Training
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          Floating / Sliding Inspector Panel
          ========================================== */}
      {selectedData && (
        <div className={`absolute right-4 sm:right-6 transition-all duration-300 transform-gpu z-30 flex flex-col border rounded-2xl overflow-hidden shadow-2xl ${
          isDark 
            ? 'bg-[#101013]/98 border-[#2e313d] shadow-black/80 backdrop-blur-2xl' 
            : isCozy
              ? 'bg-white/98 border-[#d8dce6] shadow-[0_15px_40px_rgba(99,102,241,0.08)] backdrop-blur-2xl'
              : 'bg-white/98 border-slate-200 shadow-slate-400/20 backdrop-blur-2xl'
        } ${
          isInspectorMinimized ? 'top-auto bottom-6 w-auto h-auto' : 'top-20 bottom-6 w-[430px] max-w-[calc(100vw-2rem)]'
        }`}>
          
          {/* Header */}
          {isInspectorMinimized ? (
            <div className="flex items-center gap-3 p-3 px-4 select-none">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className={`w-2 h-2 rounded-full ${
                  currentStatus === 'Completed' ? 'bg-emerald-500' : currentStatus === 'In Progress' ? 'bg-blue-500' : 'bg-zinc-600'
                }`} />
                <span className="text-zinc-500 uppercase text-[10px] tracking-wider font-semibold">{selectedData.tag}</span>
                <span className="text-zinc-600">•</span>
                <span className="font-semibold text-primary">{selectedData.title}</span>
              </div>
              <div className="flex items-center gap-1 ml-auto">
                <button 
                  onClick={toggleMinimize} 
                  className={`p-1 rounded-md text-muted hover:text-primary transition-colors cursor-pointer ${
                    isDark ? 'hover:bg-zinc-800/60' : 'hover:bg-slate-100'
                  }`}
                  title="Expand"
                >
                  <ChevronUp size={14} />
                </button>
                <button 
                  onClick={closeInspector} 
                  className={`p-1 rounded-md text-muted hover:text-primary transition-colors cursor-pointer ${
                    isDark ? 'hover:bg-zinc-800/60' : 'hover:bg-slate-100'
                  }`}
                  title="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className={`p-5 pb-4 ${isDark ? 'border-b border-[#2e313d]' : 'border-b border-slate-100'}`}>
              <div className="flex flex-col gap-2.5">
                {/* Meta Bar: Category Tag, Duration & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border font-semibold ${
                      isDark ? 'bg-[#18181b] border-[#2e313d] text-zinc-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}>
                      {selectedData.tag}
                    </span>
                    <span className="text-[11px] font-mono text-muted flex items-center gap-1">
                      <Clock size={11} /> {selectedData.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button 
                      onClick={toggleMinimize}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isDark 
                          ? 'hover:bg-[#18181b] text-zinc-400 hover:text-zinc-200' 
                          : 'hover:bg-slate-100 text-slate-400 hover:text-slate-700'
                      }`}
                      title="Minimize panel"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={closeInspector}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isDark 
                          ? 'hover:bg-[#18181b] text-zinc-400 hover:text-zinc-200' 
                          : 'hover:bg-slate-100 text-slate-400 hover:text-slate-700'
                      }`}
                      title="Close inspector"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Clean, Bold Title */}
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-primary leading-snug">
                    {selectedData.title}
                  </h2>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Tabs inside Inspector */}
          {!isInspectorMinimized && (
            <div className={`px-5 py-2.5 border-b ${
              isDark ? 'border-[#2e313d] bg-[#0c0c0e]/40' : 'border-slate-100 bg-slate-50/50'
            }`}>
              <div className={`grid grid-cols-3 p-1 rounded-xl border text-xs font-mono ${
                isDark ? 'bg-[#15161b] border-[#2e313d]' : 'bg-slate-200/50 border-slate-200'
              }`}>
                <button
                  onClick={() => setInspectorTab('tasks')}
                  className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer font-medium select-none ${
                    inspectorTab === 'tasks'
                      ? (isDark ? 'bg-[#18181b] text-zinc-100 shadow-sm border border-[#2e313d] font-semibold' : 'bg-white text-slate-900 shadow-sm border border-slate-200 font-semibold')
                      : 'text-muted hover:text-primary'
                  }`}
                >
                  <CheckSquare size={12} className={inspectorTab === 'tasks' ? 'text-indigo-400' : ''} />
                  <span>Tasks</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    inspectorTab === 'tasks' 
                      ? (isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-slate-100 text-slate-700')
                      : 'text-muted'
                  }`}>
                    {Object.values(currentNodeSubtasks).filter(Boolean).length}/{selectedData.concepts.length}
                  </span>
                </button>

                <button
                  onClick={() => setInspectorTab('notes')}
                  className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer font-medium select-none ${
                    inspectorTab === 'notes'
                      ? (isDark ? 'bg-[#18181b] text-zinc-100 shadow-sm border border-[#2e313d] font-semibold' : 'bg-white text-slate-900 shadow-sm border border-slate-200 font-semibold')
                      : 'text-muted hover:text-primary'
                  }`}
                >
                  <FileText size={12} className={inspectorTab === 'notes' ? 'text-sky-400' : ''} />
                  <span>Notes</span>
                  {currentNodeNote && <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>}
                </button>

                <button
                  onClick={() => setInspectorTab('interview')}
                  className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer font-medium select-none ${
                    inspectorTab === 'interview'
                      ? (isDark ? 'bg-[#18181b] text-zinc-100 shadow-sm border border-[#2e313d] font-semibold' : 'bg-white text-slate-900 shadow-sm border border-slate-200 font-semibold')
                      : 'text-muted hover:text-primary'
                  }`}
                >
                  <HelpCircle size={12} className={inspectorTab === 'interview' ? 'text-amber-400' : ''} />
                  <span>Interview</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    inspectorTab === 'interview' 
                      ? (isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-slate-100 text-slate-700')
                      : 'text-muted'
                  }`}>
                    {selectedData.interview?.length || 0}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Scrollable Inspector Body */}
          {!isInspectorMinimized && (
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
              
              {/* TAB 1: CONCEPTS & TASKS */}
              {inspectorTab === 'tasks' && (
                <>
                  {/* Module Overview Card */}
                  <div className={`p-4 rounded-xl border leading-relaxed text-xs sm:text-[13px] ${
                    isDark ? 'bg-[#141418] border-[#2e313d] text-zinc-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <HighlightedText text={selectedData.description} />
                  </div>

                  {/* Interactive Sub-task Concept Checklist with Progress Meter */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className={`text-[11px] font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 ${
                        isDark ? 'text-zinc-400' : 'text-slate-600'
                      }`}>
                        <CheckSquare size={13} className="text-primary" />
                        Curriculum Checklist
                      </div>
                      <span className="text-[11px] font-mono text-muted font-medium">
                        {Object.values(currentNodeSubtasks).filter(Boolean).length} of {selectedData.concepts.length} completed
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`}>
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                        style={{ 
                          width: `${selectedData.concepts.length > 0 ? (Object.values(currentNodeSubtasks).filter(Boolean).length / selectedData.concepts.length) * 100 : 0}%` 
                        }}
                      />
                    </div>

                    <div className="space-y-2 pt-1">
                      {selectedData.concepts.map((concept: string) => {
                        const isChecked = !!currentNodeSubtasks[concept];
                        return (
                          <div
                            key={concept}
                            onClick={() => toggleSubtask(selectedData.id, concept)}
                            className={`group p-3 rounded-xl border flex items-center gap-3 text-xs transition-all duration-150 cursor-pointer select-none ${
                              isChecked
                                ? (isDark ? 'bg-emerald-950/20 border-emerald-900/40 text-zinc-300' : 'bg-emerald-50/60 border-emerald-200 text-slate-800')
                                : (isDark ? 'bg-[#141418] border-[#2e313d] text-zinc-200 hover:border-zinc-600 hover:bg-[#18181b]' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/80')
                            }`}
                          >
                            {/* Sleek Custom Checkbox */}
                            <div className={`w-4 h-4 rounded-md flex items-center justify-center transition-colors flex-shrink-0 ${
                              isChecked
                                ? 'bg-emerald-500 text-black'
                                : (isDark ? 'border border-zinc-700 group-hover:border-zinc-500 bg-zinc-900' : 'border border-slate-300 group-hover:border-slate-400 bg-white')
                            }`}>
                              {isChecked && <Check size={11} strokeWidth={3} />}
                            </div>

                            <span className={`flex-1 font-medium leading-normal tracking-tight ${isChecked ? 'line-through opacity-60 text-muted' : 'text-primary'}`}>
                              {concept}
                            </span>

                            <span className="text-[10px] font-mono text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                              {isChecked ? 'Done' : 'Click to finish'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tools & Frameworks */}
                  <div className="space-y-2.5">
                    <div className={`text-[11px] font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 ${
                      isDark ? 'text-zinc-400' : 'text-slate-600'
                    }`}>
                      <Terminal size={13} className="text-primary" />
                      Tools & Ecosystem
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedData.tools.map((tool: string) => (
                        <span key={tool} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border font-medium ${
                          isDark 
                            ? 'bg-[#141418] border-[#2e313d] text-zinc-300 hover:border-zinc-600' 
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Practical Capstone Deliverable */}
                  <div className={`p-4 rounded-xl space-y-2 border relative overflow-hidden ${
                    isDark ? 'bg-[#141418] border-[#2e313d]' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-indigo-500"></div>
                    <div className={`text-[10px] font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 ${
                      isDark ? 'text-indigo-400' : 'text-indigo-600'
                    }`}>
                      <Target size={13} />
                      Practical Capstone Deliverable
                    </div>
                    <div className={`text-xs font-semibold leading-relaxed ${
                      isDark ? 'text-zinc-200' : 'text-slate-800'
                    }`}>
                      <HighlightedText text={selectedData.deliverable} />
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: MY NOTES & LINKS SCRATCHPAD */}
              {inspectorTab === 'notes' && (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-semibold text-primary flex items-center gap-1.5">
                        <FileText size={13} className="text-sky-400" />
                        Study Notes & Scratchpad
                      </h4>
                      <p className="text-[11px] text-muted mt-0.5">
                        Jot down code snippets, colab links, or takeaway points. Auto-saved locally.
                      </p>
                    </div>
                    {currentNodeNote && (
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(currentNodeNote);
                        }}
                        className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono border transition-colors cursor-pointer ${
                          isDark ? 'bg-[#18181b] border-[#2e313d] text-zinc-300 hover:border-zinc-600' : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                        title="Copy notes to clipboard"
                      >
                        <Copy size={11} />
                        <span>Copy</span>
                      </button>
                    )}
                  </div>

                  <textarea
                    rows={12}
                    value={currentNodeNote}
                    onChange={(e) => updateNote(selectedData.id, e.target.value)}
                    placeholder="e.g. Completed Colab notebook at https://github.com/my-repo... Key command: vllm serve --model meta-llama/Llama-3-8B-Instruct --port 8000"
                    className={`w-full p-3.5 rounded-xl border text-xs font-mono leading-relaxed focus:outline-none transition-colors resize-none ${
                      isDark 
                        ? 'bg-[#15161b] border-[#2e313d] text-zinc-200 focus:border-indigo-500' 
                        : 'bg-white border-slate-200 text-slate-800 focus:border-indigo-500 shadow-sm'
                    }`}
                  />

                  <div className="flex items-center justify-between text-[10px] font-mono text-muted">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Auto-saved in browser
                    </span>
                    <span>{currentNodeNote.length} characters</span>
                  </div>
                </div>
              )}

              {/* TAB 3: INTERVIEW DRILLS & PAPERS */}
              {inspectorTab === 'interview' && (
                <div className="space-y-6">
                  {/* Interview Questions Accordion */}
                  <div className="space-y-3">
                    <div className={`text-[11px] font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 ${
                      isDark ? 'text-zinc-400' : 'text-slate-600'
                    }`}>
                      <HelpCircle size={13} className="text-amber-400" />
                      Top Industry Interview Drills
                    </div>

                    <div className="space-y-2">
                      {selectedData.interview.map((item: any, idx: number) => {
                        const isOpen = openInterviewIndex === idx;
                        return (
                          <div
                            key={idx}
                            className={`rounded-xl border overflow-hidden transition-colors ${
                              isDark ? 'border-[#2e313d] bg-[#141418]' : 'border-slate-200 bg-white'
                            }`}
                          >
                            <button
                              onClick={() => setOpenInterviewIndex(isOpen ? null : idx)}
                              className="w-full p-3.5 text-left flex items-start justify-between gap-3 text-xs font-semibold text-primary hover:opacity-90 cursor-pointer"
                            >
                              <span className="leading-snug">Q: {item.q}</span>
                              <span className="text-muted mt-0.5 flex-shrink-0">
                                {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              </span>
                            </button>
                            {isOpen && (
                              <div className={`p-3.5 pt-0 text-xs leading-relaxed border-t border-dashed ${
                                isDark ? 'text-zinc-300 border-[#2e313d] bg-[#0e0e11]/80' : 'text-slate-700 border-slate-100 bg-slate-50/70'
                              }`}>
                                <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-muted mb-1 flex items-center gap-1">
                                  <Sparkles size={11} className="text-amber-400" /> Model Answer
                                </div>
                                <HighlightedText text={item.a} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Resource & Paper Links */}
                  <div className="space-y-3">
                    <div className={`text-[11px] font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 ${
                      isDark ? 'text-zinc-400' : 'text-slate-600'
                    }`}>
                      <ExternalLink size={13} className="text-primary" />
                      Recommended Papers & Official Docs
                    </div>

                    <div className="space-y-2">
                      {selectedData.links.map((link: any, idx: number) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all group ${
                            isDark 
                              ? 'bg-[#141418] border-[#2e313d] text-zinc-300 hover:border-zinc-500 hover:text-white' 
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900 shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                            <span className="truncate font-medium">{link.label}</span>
                          </div>
                          <ExternalLink size={13} className="text-muted group-hover:text-primary flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* Action Footer: Status Selector */}
          {!isInspectorMinimized && (
            <div className={`p-4 border-t mt-auto ${
              isDark ? 'border-[#2e313d] bg-[#0c0c0e]/95 backdrop-blur-md' : 'border-slate-100 bg-white/95 backdrop-blur-md'
            }`}>
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted font-semibold">
                  Module Status
                </span>
                <span className={`text-[11px] font-mono font-semibold flex items-center gap-1.5 ${
                  currentStatus === 'Completed' ? 'text-emerald-400' : currentStatus === 'In Progress' ? 'text-blue-400' : 'text-muted'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    currentStatus === 'Completed' ? 'bg-emerald-500' : currentStatus === 'In Progress' ? 'bg-blue-500' : 'bg-zinc-600'
                  }`} />
                  {currentStatus}
                </span>
              </div>

              <div className={`grid grid-cols-3 p-1 rounded-xl border ${
                isDark ? 'bg-[#15161b] border-[#2e313d]' : 'bg-slate-100 border-slate-200'
              }`}>
                {(['Todo', 'In Progress', 'Completed'] as ProgressStatus[]).map((st) => {
                  const isActive = currentStatus === st;
                  return (
                    <button
                      key={st}
                      onClick={() => {
                        if (selectedNodeId) updateNodeStatus(selectedNodeId, st);
                      }}
                      className={`py-1.5 text-[11px] font-semibold font-mono uppercase tracking-wider rounded-lg transition-all duration-150 cursor-pointer flex items-center justify-center gap-1 select-none ${
                        isActive
                          ? st === 'Completed'
                            ? 'bg-emerald-500 text-black shadow-xs font-bold'
                            : st === 'In Progress'
                              ? 'bg-blue-600 text-white shadow-xs font-bold'
                              : (isDark ? 'bg-zinc-800 text-zinc-100 shadow-xs border border-zinc-700' : 'bg-white text-slate-900 shadow-xs border border-slate-200')
                          : (isDark 
                              ? 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40' 
                              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/60')
                      }`}
                    >
                      {st === 'Completed' && <Check size={12} strokeWidth={3} />}
                      {st === 'In Progress' && <Clock size={11} />}
                      <span>{st}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}

// Wrapper for ReactFlowProvider
export default function Roadmap() {
  return (
    <ReactFlowProvider>
      <RoadmapFlow />
    </ReactFlowProvider>
  );
}
