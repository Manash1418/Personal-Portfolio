import React from "react";
import { X, Printer, Mail, Linkedin, Phone, MapPin, School, FileText, Award } from "lucide-react";
import { PORTFOLIO_OWNER } from "../data";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    // Elegant system print wrapper
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-surface-container rounded-xl overflow-hidden shadow-2xl border border-outline-variant/30 flex flex-col">
        
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20 bg-surface-container-high print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-headline font-semibold text-on-surface">Curriculum Vitae</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-on-primary rounded hover:bg-primary/95 hover:shadow-[0_0_15px_rgba(159,204,239,0.4)] transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 text-on-surface-variant hover:text-on-surface bg-surface-container-highest/50 hover:bg-surface-container-highest rounded-full transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Container */}
        <div id="resume-print-area" className="flex-grow overflow-y-auto p-8 md:p-12 text-on-surface bg-surface-container">
          <div className="max-w-2xl mx-auto space-y-8 print:text-black">
            
            {/* Document Header */}
            <div className="border-b border-outline-variant/20 pb-6 text-center md:text-left print:border-black">
              <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface print:text-black">
                {PORTFOLIO_OWNER.name}
              </h1>
              <p className="text-primary font-medium mt-2 print:text-gray-800">
                {PORTFOLIO_OWNER.role}
              </p>
              
              <div className="mt-6 p-4 rounded-xl border border-outline-variant/30 bg-surface-container-low/50 shadow-sm print:border-black print:bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-sm text-on-surface-variant print:text-gray-900">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail className="w-4 h-4 text-primary shrink-0 print:text-black" />
                    <span className="truncate" title={PORTFOLIO_OWNER.email}>{PORTFOLIO_OWNER.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Linkedin className="w-4 h-4 text-primary shrink-0 print:text-black" />
                    <span className="break-all text-xs sm:text-sm" title={PORTFOLIO_OWNER.linkedin}>{PORTFOLIO_OWNER.linkedin}</span>
                  </div>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Phone className="w-4 h-4 text-primary shrink-0 print:text-black" />
                    <span>{PORTFOLIO_OWNER.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <MapPin className="w-4 h-4 text-primary shrink-0 print:text-black" />
                    <span className="truncate">{PORTFOLIO_OWNER.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Body */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Left Column (Main details of academic flow & career projects) */}
              <div className="md:col-span-2 space-y-8">
                
                {/* Profile section */}
                <section className="space-y-3">
                  <h2 className="text-lg font-headline font-semibold text-primary uppercase tracking-wider border-b border-outline-variant/10 pb-1 print:text-black print:border-black">
                    Professional Summary
                  </h2>
                  <p className="text-sm text-on-surface-variant leading-relaxed text-justify print:text-gray-800">
                    Dedicated and enthusiastic 2nd-year B.Tech CSE (AI &amp; ML) student with robust fundamental knowledge of C and C++ programming. Currently focusing on Data Structures, Problem Solving, and software engineering. Passionate about improving problem solving skills via dynamic challenges, building utilities, and exploring concepts in Machine Learning and Software Architecture. Proactive, fast learner, disciplined, and eager to contribute.
                  </p>
                </section>

                {/* Education section */}
                <section className="space-y-4">
                  <h2 className="text-lg font-headline font-semibold text-primary uppercase tracking-wider border-b border-outline-variant/10 pb-1 print:text-black print:border-black">
                    Education
                  </h2>
                  <div className="space-y-2 relative pl-4 border-l-2 border-primary/30 print:border-black">
                    <div className="flex justify-between items-baseline flex-wrap gap-2">
                      <h3 className="text-base font-bold text-on-surface print:text-black">
                        B.Tech in Computer Science Engineering (AI &amp; ML)
                      </h3>
                      <span className="text-xs text-primary font-mono font-semibold print:text-gray-700">
                        2025 — Present
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant print:text-gray-800">
                      Jaypee University of Information Technology
                    </p>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Current status: 2nd Year Student • CGPA active
                    </p>
                  </div>
                </section>

                {/* Notable academic & personal projects section */}
                <section className="space-y-4">
                  <h2 className="text-lg font-headline font-semibold text-primary uppercase tracking-wider border-b border-outline-variant/10 pb-1 print:text-black print:border-black">
                    Featured Projects
                  </h2>
                  <div className="space-y-5">
                    
                    {/* Supermarket Billing System */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline flex-wrap gap-2">
                        <h3 className="font-bold text-on-surface print:text-black">
                          Supermarket Billing System
                        </h3>
                        <span className="text-xs text-primary font-mono print:text-gray-700 font-semibold">
                          C++ / Console UI
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant leading-relaxed print:text-gray-800">
                        Designed an interactive purchase and checkout flow to process transactions dynamically. Programmed nested stock counts, calculated sales tax rates, and formatted outputs to print sleek receipts inside console environments.
                      </p>
                    </div>

                    {/* AI Placement Co-Pilot */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline flex-wrap gap-2">
                        <h3 className="font-bold text-on-surface print:text-black">
                          AI Placement Co-Pilot
                        </h3>
                        <span className="text-xs text-primary font-mono print:text-gray-700 font-semibold">
                          Next.js / LLM AI
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant leading-relaxed print:text-gray-800">
                        Built a web platform supporting career development. Programmed resume analysis checkers, dynamic smart interviews, and personalized AI diagnostic feedback powered by the Google Gemini API.
                      </p>
                    </div>

                    {/* JUIT AI Assistant */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline flex-wrap gap-2">
                        <h3 className="font-bold text-on-surface print:text-black">
                          JUIT AI Assistant
                        </h3>
                        <span className="text-xs text-primary font-mono print:text-gray-700 font-semibold">
                          Python / Streamlit
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant leading-relaxed print:text-gray-800">
                        Designed an LLM-powered discovery tool and RAG pipeline for Jaypee University. Automates complex query answering and research search indexes over campus data and textbooks.
                      </p>
                    </div>

                    {/* Personal Portfolio Website */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline flex-wrap gap-2">
                        <h3 className="font-bold text-on-surface print:text-black">
                          Personal Portfolio Website
                        </h3>
                        <span className="text-xs text-primary font-mono print:text-gray-700 font-semibold">
                          React / TypeScript
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant leading-relaxed print:text-gray-800">
                        Created a developer portfolio with inline code playrooms, terminal action controllers, and robust local profile photo upload handlers with dynamic SVG fallbacks.
                      </p>
                    </div>

                  </div>
                </section>
                
              </div>

              {/* Right Column (Skills & extra info) */}
              <div className="space-y-8">
                
                {/* Tech Skills */}
                <section className="space-y-3">
                  <h2 className="text-lg font-headline font-semibold text-primary uppercase tracking-wider border-b border-outline-variant/10 pb-1 print:text-black print:border-black">
                    Programming
                  </h2>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">C / C++ Programming</span>
                      <span className="text-primary print:text-black font-semibold">85%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-highest print:bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary print:bg-black rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">Data Structures &amp; Algo</span>
                      <span className="text-primary print:text-black font-semibold">70%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-highest print:bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary print:bg-black rounded-full" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">Git &amp; Version Control</span>
                      <span className="text-primary print:text-black font-semibold">60%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-highest print:bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary print:bg-black rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                </section>

                {/* Focus areas */}
                <section className="space-y-3">
                  <h2 className="text-lg font-headline font-semibold text-primary uppercase tracking-wider border-b border-outline-variant/10 pb-1 print:text-black print:border-black">
                    Focus Areas
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 text-xs bg-surface-container-high border border-outline-variant/20 rounded font-mono print:text-black print:border-black">
                      PROBLEM SOLVING
                    </span>
                    <span className="px-2.5 py-1 text-xs bg-surface-container-high border border-outline-variant/20 rounded font-mono print:text-black print:border-black">
                      SYSTEM ARCHITECTURE
                    </span>
                    <span className="px-2.5 py-1 text-xs bg-surface-container-high border border-outline-variant/20 rounded font-mono print:text-black print:border-black">
                      AI BASICS
                    </span>
                  </div>
                </section>

                {/* Soft Skills */}
                <section className="space-y-2">
                  <h2 className="text-lg font-headline font-semibold text-primary uppercase tracking-wider border-b border-outline-variant/10 pb-1 print:text-black print:border-black">
                    Soft Skills
                  </h2>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-on-surface-variant print:text-gray-800">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary print:bg-black"></span> Teamwork
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary print:bg-black"></span> Communication
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary print:bg-black"></span> Time Mgmt
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary print:bg-black"></span> Quick Learner
                    </li>
                  </ul>
                </section>

                {/* Languages */}
                <section className="space-y-2">
                  <h2 className="text-lg font-headline font-semibold text-primary uppercase tracking-wider border-b border-outline-variant/10 pb-1 print:text-black print:border-black">
                    Languages
                  </h2>
                  <p className="text-xs text-on-surface-variant print:text-gray-800">
                    English (Fluent)<br />Hindi (Native)
                  </p>
                </section>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
