import { useState } from 'react';
import type { Problem } from '../types';
import { CodeBlock } from './CodeBlock';
import { Bookmark, CheckCircle2, ChevronDown, ChevronUp, AlertTriangle, Lightbulb, Clock } from 'lucide-react';
import { cn } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ProblemCardProps {
  problem: Problem;
  isBookmarked: boolean;
  isCompleted: boolean;
  onToggleBookmark: () => void;
  onToggleCompleted: () => void;
  glanceModeActive: boolean;
}

export function ProblemCard({
  problem,
  isBookmarked,
  isCompleted,
  onToggleBookmark,
  onToggleCompleted,
  glanceModeActive
}: ProblemCardProps) {
  const [expanded, setExpanded] = useState(false);

  // In glance mode, we might auto-expand or keep it collapsed but show different content
  const isOpen = expanded || glanceModeActive;

  return (
    <div className={cn(
      "border border-border rounded-xl bg-surface transition-colors",
      isCompleted && "opacity-60"
    )}>
      {/* Header */}
      <div 
        className="flex items-center justify-between p-5 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleCompleted(); }}
            className={cn("text-muted hover:text-primary transition-colors", isCompleted && "text-primary")}
          >
            <CheckCircle2 size={22} />
          </button>
          <h3 className={cn("font-semibold text-[16px] tracking-wide", isCompleted && "line-through text-muted")}>
            {problem.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleBookmark(); }}
            className={cn("text-muted hover:text-primary transition-colors", isBookmarked && "text-primary")}
          >
            <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
          <div className="text-muted">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>

      {/* Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 border-t border-border mt-2">
              
              {/* Glance Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-4 text-[15px]">
                <div className="bg-background border border-border rounded-lg p-4 transition-colors hover:border-muted/30">
                  <div className="flex items-center gap-2 text-primary font-bold mb-2">
                    <Lightbulb size={16} /> Intuition
                  </div>
                  <p className="text-slate-800 dark:text-zinc-200 leading-relaxed font-normal">{problem.intuition}</p>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="bg-background border border-border rounded-lg px-4 py-3 flex items-center gap-2 flex-1 transition-colors hover:border-muted/30">
                      <Clock size={16} className="text-muted" />
                      <span className="text-muted font-semibold text-sm">Time:</span>
                      <span className="font-mono font-bold text-primary text-sm">{problem.timeComplexity}</span>
                    </div>
                    <div className="bg-background border border-border rounded-lg px-4 py-3 flex items-center gap-2 flex-1 transition-colors hover:border-muted/30">
                      <span className="text-muted font-semibold text-sm">Space:</span>
                      <span className="font-mono font-bold text-primary text-sm">{problem.spaceComplexity}</span>
                    </div>
                  </div>
                  
                  <div className="bg-background border border-border rounded-lg p-4 transition-colors hover:border-muted/30">
                    <div className="flex items-center gap-2 text-primary font-bold mb-2">
                      <AlertTriangle size={16} /> Pitfalls
                    </div>
                    <p className="text-slate-800 dark:text-zinc-200 leading-relaxed font-normal">{problem.traps}</p>
                  </div>
                </div>
              </div>

              {/* Code */}
              {!glanceModeActive && problem.code && (
                <CodeBlock code={problem.code} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
