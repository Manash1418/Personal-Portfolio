import React, { useState, useEffect } from "react";
import { Send, CheckCircle, Trash2, Mail, MessageSquare, ClipboardCheck, History } from "lucide-react";
import { ContactMessage } from "../types";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Load existing messages on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("manash_messages");
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to parse local storage messages", e);
    }
  }, []);

  // Save changes to localStorage
  const saveMessages = (updated: ContactMessage[]) => {
    setMessages(updated);
    localStorage.setItem("manash_messages", JSON.stringify(updated));
  };

  const templates = [
    { label: "🤝 Internship Hook", text: "Hi Manash, I loved your Supermarket Billing project! We are looking for an AI/ML enthusiast for a 2nd-year Summer Internship. Let's connect!" },
    { label: "💻 General Inquiry", text: "Hey! Just wanted to reach out regarding structural programming or academic research collaborations in NLP and computer systems." },
    { label: "☕ Virtual Coffee", text: "Hi Manash, brilliant portfolio! I'd love to jump on a quick 15-minute call to talk about your career plans in Machine Learning." }
  ];

  const handleTemplateClick = (text: string) => {
    setMessage(text);
    if (!subject) {
      setSubject("Opportunities / Connection Request");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage("Please complete all required fields (Name, Email, Message).");
      setStatus("error");
      return;
    }

    setStatus("sending");

    // Simulate network delay
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: Math.random().toString(36).substring(2, 9),
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim() || undefined,
        message: message.trim(),
        timestamp: new Date().toLocaleString(),
      };

      const updated = [newMessage, ...messages];
      saveMessages(updated);

      // Reset Form fields
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setStatus("success");

      // Reset success banner after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }, 850);
  };

  const handleClearMessage = (id: string) => {
    const filtered = messages.filter((m) => m.id !== id);
    saveMessages(filtered);
  };

  return (
    <div id="contact" className="space-y-8 scroll-mt-24">
      <div className="flex items-center gap-4">
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">Get in Touch</h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-outline-variant/30 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Container */}
        <div className="lg:col-span-7 glass-panel rounded-xl p-6 md:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="font-headline font-semibold text-lg text-on-surface">Leave a Message</h3>
            <p className="text-sm text-on-surface-variant font-body">
              Fill out the form below or choose a templates chip to compose a message instantly.
            </p>
          </div>

          {/* Quick templates chips */}
          <div className="space-y-2">
            <p className="text-xs text-on-surface-variant font-mono uppercase tracking-wider">Quick Suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {templates.map((tpl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleTemplateClick(tpl.text)}
                  className="px-3 py-1.5 text-xs bg-surface-container font-mono border border-outline-variant/20 hover:border-primary/40 rounded-full text-on-surface-variant hover:text-primary transition-all cursor-pointer"
                >
                  {tpl.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-on-surface-variant uppercase tracking-wider">
                  Your Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="e.g. Amit Patel"
                  className="w-full px-4 py-2.5 rounded bg-surface-container-low border border-outline-variant/20 focus:border-primary/50 text-on-surface text-sm placeholder-on-surface-variant/40 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-on-surface-variant uppercase tracking-wider">
                  Email Address <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="e.g. recruiter@tech.com"
                  className="w-full px-4 py-2.5 rounded bg-surface-container-low border border-outline-variant/20 focus:border-primary/50 text-on-surface text-sm placeholder-on-surface-variant/40 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-on-surface-variant uppercase tracking-wider">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Intern Opportunity / NLP Project help"
                className="w-full px-4 py-2.5 rounded bg-surface-container-low border border-outline-variant/20 focus:border-primary/50 text-on-surface text-sm placeholder-on-surface-variant/40 outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-on-surface-variant uppercase tracking-wider">
                Message Content <span className="text-primary">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="How can we collaborate? What challenges are we solving?"
                className="w-full px-4 py-2.5 rounded bg-surface-container-low border border-outline-variant/20 focus:border-primary/50 text-on-surface text-sm placeholder-on-surface-variant/40 outline-none transition-all resize-none"
              />
            </div>

            {/* Error banner */}
            {status === "error" && (
              <div className="p-3 bg-red-950/25 border border-red-800/30 rounded text-xs text-red-300">
                {errorMessage}
              </div>
            )}

            {/* Success banner */}
            {status === "success" && (
              <div className="p-4 bg-green-950/35 border border-green-800/40 rounded flex items-start gap-2 text-xs md:text-sm text-green-300 animate-slide-up">
                <CheckCircle className="w-5 h-5 shrink-0 text-green-400" />
                <div>
                  <span className="font-semibold block">Message Sent Successfully!</span>
                  <span>Thank you for reaching out. Your sample message is logged in the Local History panel on the right.</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className={`w-full py-3 px-6 rounded font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                status === "sending"
                  ? "bg-primary/20 text-on-surface-variant/50 cursor-not-allowed"
                  : "bg-primary text-on-primary hover:shadow-[0_0_20px_rgba(159,204,239,0.45)]"
              }`}
            >
              {status === "sending" ? (
                <>
                  <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Message logs / Contact Side panel */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Quick instructions / guestbook details */}
          <div className="glass-panel rounded-xl p-6 space-y-4 flex-grow flex flex-col">
            <div className="flex items-center gap-2.5">
              <History className="w-5 h-5 text-secondary" />
              <h3 className="font-headline font-semibold text-lg text-on-surface">Local Workspace History</h3>
            </div>
            
            <p className="text-xs text-on-surface-variant leading-relaxed">
              In this sandboxed interface, your outgoing communications are verified instantly in standard time. Add a comment or choose a template to test the transaction payload!
            </p>

            <div className="border-t border-outline-variant/15 my-2"></div>

            {/* History Logs Container */}
            <div className="flex-grow space-y-3 max-h-[280px] overflow-y-auto pr-1">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-surface-container-low/20 rounded border border-dashed border-outline-variant/15">
                  <MessageSquare className="w-8 h-8 text-outline-variant/30 mb-2" />
                  <p className="text-xs text-on-surface-variant">No message logged in this session yet.</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-3 bg-surface-container-low/60 rounded border border-outline-variant/10 text-xs relative group animate-slide-up"
                  >
                    <button
                      onClick={() => handleClearMessage(msg.id)}
                      className="absolute top-2 right-2 p-1 text-on-surface-variant hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity rounded cursor-pointer"
                      title="Delete log"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex justify-between text-[11px] text-primary pr-6 font-mono">
                      <span>{msg.name}</span>
                      <span className="text-outline-variant/60">{msg.timestamp}</span>
                    </div>
                    {msg.subject && (
                      <div className="font-semibold text-on-surface mt-1 text-[11.5px] truncate">
                        {msg.subject}
                      </div>
                    )}
                    <p className="text-on-surface-variant mt-1.5 leading-relaxed bg-surface-container/20 p-2 rounded max-h-[80px] overflow-y-auto font-sans break-words">
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
