import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy, Code2 } from 'lucide-react';
import { useTheme } from '../themeContext';

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-border mt-4 transition-colors shadow-sm">
      {/* Top Header Bar */}
      <div className={`flex items-center justify-between px-4 py-2 border-b border-border text-xs font-mono select-none ${
        isDark ? 'bg-[#1e2027]' : 'bg-[#f1f3f7]'
      }`}>
        <div className="flex items-center gap-2 text-muted">
          <Code2 size={14} />
          <span className="font-medium tracking-wide">python</span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all text-xs font-mono cursor-pointer ${
            copied
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : isDark
                ? 'bg-[#262833] border-[#2e313d] text-zinc-300 hover:text-white hover:bg-[#2e313d]'
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-500" />
              <span className="text-emerald-500 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Syntax Highlighted Code with Inconsolata */}
      <SyntaxHighlighter
        language="python"
        style={isDark ? vscDarkPlus : vs}
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
          }
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
