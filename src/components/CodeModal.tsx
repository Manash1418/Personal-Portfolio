import React, { useState } from "react";
import { X, Copy, Check, Terminal, TerminalSquare } from "lucide-react";

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  code: string;
}

export default function CodeModal({ isOpen, onClose, title, code }: CodeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const lines = code.split("\n");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-[#0E1525] rounded-xl overflow-hidden border border-outline-variant/30 flex flex-col shadow-2xl">
        
        {/* IDE Titlebar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-outline-variant/15 bg-[#0a0f1b]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="h-4 w-[1px] bg-outline-variant/20 mx-1" />
            <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
              <Terminal className="w-3.5 h-3.5 text-primary" />
              <span>{title}.cpp</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded border border-outline-variant/25 hover:border-primary/40 bg-surface-container/30 hover:bg-surface-container text-on-surface-variant lg:text-on-surface transition-all cursor-pointer"
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-on-surface-variant hover:text-on-surface rounded hover:bg-surface-container transition-all cursor-pointer"
              aria-label="Close code window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Code Content Area (styled like dark theme) */}
        <div className="flex-grow overflow-auto font-mono text-sm leading-relaxed p-6 bg-[#0B0F19] selection:bg-primary/25">
          <pre className="flex">
            {/* Line numbers column */}
            <div className="text-right select-none text-outline-variant/50 pr-4 border-r border-[#1e293b] text-xs space-y-0.5">
              {lines.map((_, i) => (
                <div key={i} className="h-[21px] pr-1">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Actual code column with primitive syntax styling simulation */}
            <code id="code-block-ref" className="text-left pl-4 text-[#e2e8f0] text-xs md:text-sm space-y-0.5 block flex-grow">
              {lines.map((line, index) => {
                // Return simple colored highlight for presentation
                let styledLine = line;
                
                // Color keyword matches
                const highlightKeywords = (txt: string) => {
                  // Direct color substitution of strings
                  let formatted = txt
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">");
                    
                  return formatted;
                };

                return (
                  <div key={index} className="h-[21px] whitespace-pre hover:bg-surface-container/20 px-1 rounded transition-colors">
                    {/* Render raw code, simple high precision styles */}
                    <span className={
                      line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")
                        ? "text-green-500/85 italic"
                        : line.trim().startsWith("#")
                        ? "text-[#f43f5e]" // preprocessors
                        : "text-on-surface"
                    }>
                      {line}
                    </span>
                  </div>
                );
              })}
            </code>
          </pre>
        </div>

        {/* IDE Footer */}
        <div className="px-6 py-2 border-t border-outline-variant/15 bg-[#0a0f1b] flex justify-between items-center text-[11px] font-mono text-outline-variant">
          <div className="flex items-center gap-3">
            <span>C++ Standard: C++17</span>
            <span>Tab Size: 4</span>
            <span>UTF-8</span>
          </div>
          <div>
            <span>Lines: {lines.length}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
