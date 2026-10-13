import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { mathTopics, type MathTopic } from './content/math/mathTopics';
import { cn } from './utils';
import { useTheme } from './themeContext';

export default function MathReader() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeTopic, setActiveTopic] = useState<MathTopic>(mathTopics[0]);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Use flat map for simpler left sidebar for now
  const categories = Array.from(new Set(mathTopics.map(t => t.category)));

  useEffect(() => {
    setLoading(true);
    // Dynamically fetch the markdown file with cache-busting
    fetch(`/src/content/math/${activeTopic.file}.md?t=${Date.now()}`)
      .then(res => res.text())
      .then(text => {
        setMarkdownContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load markdown", err);
        setMarkdownContent("# Error loading content");
        setLoading(false);
      });
  }, [activeTopic]);

  return (
    <div className="h-full flex flex-col md:flex-row bg-background transition-colors duration-200">
      
      {/* Sidebar (Index) */}
      <aside className="w-full md:w-64 border-r border-border bg-surface flex flex-col h-auto md:h-full sticky top-0 overflow-y-auto custom-scrollbar transition-colors duration-200">
        <div className="p-5 border-b border-border">
          <h1 className="text-sm font-semibold tracking-wide uppercase text-primary">Mathematics</h1>
          <p className="text-xs text-muted mt-1">CP Algorithms Edition</p>
        </div>

        <div className="p-4 flex flex-col gap-6">
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2 px-3">{category}</h3>
              <div className="flex flex-col gap-1">
                {mathTopics.filter(t => t.category === category).map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => setActiveTopic(topic)}
                    className={cn(
                      "text-left px-3 py-2 text-sm rounded-md transition-all duration-200 truncate",
                      activeTopic.id === topic.id
                        ? "bg-border text-primary font-medium shadow-sm border border-border/50"
                        : "text-muted hover:text-primary hover:bg-border/30"
                    )}
                  >
                    {topic.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Reading Pane */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-10 h-full overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center h-full text-muted">
            Loading...
          </div>
        ) : (
          <article className={cn(
            "font-reading text-base leading-relaxed prose max-w-none transition-colors",
            isDark ? "prose-invert prose-slate" : "prose-slate text-slate-800",
            "prose-headings:font-bold prose-headings:tracking-tight",
            isDark ? "prose-a:text-blue-400 hover:prose-a:text-blue-300" : "prose-a:text-blue-600 hover:prose-a:text-blue-700",
            "prose-pre:bg-surface prose-pre:border prose-pre:border-border",
            "prose-code:text-primary prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded",
            "[&_img]:rounded-2xl [&_img]:shadow-lg [&_img]:mx-auto [&_img]:my-8 [&_img]:max-h-96 [&_img]:object-contain",
            "[&_table]:border-collapse [&_th]:border [&_th]:border-border [&_th]:p-2 [&_td]:border [&_td]:border-border [&_td]:p-2"
          )}>
            <ReactMarkdown 
              remarkPlugins={[remarkMath]}
              rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: false }]]}
            >
              {markdownContent}
            </ReactMarkdown>
          </article>
        )}
      </main>
    </div>
  );
}
