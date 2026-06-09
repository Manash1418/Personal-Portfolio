import React, { useState, useEffect } from "react";
import {
  Mail,
  Linkedin,
  Phone,
  MapPin,
  School,
  Code,
  ExternalLink,
  PlusCircle,
  Copy,
  Check,
  Terminal,
  Award,
  BookOpen,
  ChevronRight,
  Sparkles,
  Command,
  ArrowUpRight,
  Camera,
  Upload,
  RefreshCw
} from "lucide-react";

import Navbar from "./components/Navbar";
import ResumeModal from "./components/ResumeModal";
import CodeModal from "./components/CodeModal";
import TerminalSimulator from "./components/TerminalSimulator";
import ContactForm from "./components/ContactForm";

import { PROJECTS, TECHNICAL_SKILLS, PORTFOLIO_OWNER } from "./data";

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [selectedProjectCode, setSelectedProjectCode] = useState<any>(null);

  // Profile photo state with dynamic backup & upload persistence
  const [profileImg, setProfileImg] = useState<string>(() => {
    return localStorage.getItem("portfolio_profile_img") || "https://lh3.googleusercontent.com/aida-public/AB6AXuAGp_f9z_0K8v5C7uA_7E9W7z_4t9e7m_W1P_o_1Wb3gE0Wj7Q_L7mKz3G5j99m_t6yG9vN5Cmt8v_yE4tWk1eL7f6y_G_o9K3tN3G7E9yO_o8L1Czt4x_Gk_vNw3R4_t7C5y6uE7C_o8L9u4t9e_1K9P_0W8_o_g_b_L_1c_4v8y_3z_0K8v5C7uA_7E9W7z";
  });
  const [isImgBroken, setIsImgBroken] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("Please upload an image smaller than 3MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem("portfolio_profile_img", base64String);
        setProfileImg(base64String);
        setIsImgBroken(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    localStorage.removeItem("portfolio_profile_img");
    setProfileImg("https://lh3.googleusercontent.com/aida-public/AB6AXuAGp_f9z_0K8v5C7uA_7E9W7z_4t9e7m_W1P_o_1Wb3gE0Wj7Q_L7mKz3G5j99m_t6yG9vN5Cmt8v_yE4tWk1eL7f6y_G_o9K3tN3G7E9yO_o8L1Czt4x_Gk_vNw3R4_t7C5y6uE7C_o8L9u4t9e_1K9P_0W8_o_g_b_L_1c_4v8y_3z_0K8v5C7uA_7E9W7z");
    setIsImgBroken(false);
  };

  // Copy status feedback states
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedLinkedin, setCopiedLinkedin] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Typewriter effect states (following strict primitive usage rules)
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const typingPhrases = [
    PORTFOLIO_OWNER.name,
    "an AI & ML Student",
    "a C++ Programmer",
    "a Software Developer"
  ];

  useEffect(() => {
    let timer: any;
    const currentPhrase = typingPhrases[phraseIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText((prev) => prev.substring(0, prev.length - 1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setTypedText((prev) => currentPhrase.substring(0, prev.length + 1));
        setTypingSpeed(80);
      }, typingSpeed);
    }

    // Lifecycle transitions
    if (!isDeleting && typedText === currentPhrase) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
      setTypingSpeed(150);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex, typingSpeed]);

  const handleCopy = (text: string, type: "email" | "linkedin" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else if (type === "linkedin") {
      setCopiedLinkedin(true);
      setTimeout(() => setCopiedLinkedin(false), 2000);
    } else if (type === "phone") {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleCtaClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.offsetTop - 85;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-surface-dim text-on-surface selection:bg-primary/25 selection:text-primary relative overflow-x-hidden font-sans">
      
      {/* Background Ambience Underlay */}
      <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none overflow-hidden z-0 bg-radial-[circle_at_top_right] from-primary/10 via-surface-dim/0 to-transparent" />
      <div className="absolute top-[800px] left-0 w-[500px] h-[550px] pointer-events-none overflow-hidden z-0 bg-radial-at-l from-secondary/5 to-transparent blur-3xl" />
      <div className="absolute bottom-[300px] right-0 w-[600px] h-[600px] pointer-events-none overflow-hidden z-0 bg-radial-at-r from-tertiary/5 to-transparent blur-3xl animate-pulse" />

      {/* Top Header Section */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16 relative z-10 space-y-16">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-[75vh] flex items-center scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            
            {/* Left intro copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-mono tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Portfolio 2026/2027</span>
              </div>

              <div className="space-y-3 pb-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-on-surface tracking-tight leading-none">
                  Hi, I'm <span className="text-primary block sm:inline typewriter-cursor pr-1">{typedText}</span>
                </h1>
                <p className="text-xl md:text-2xl font-headline text-on-surface-variant font-medium">
                  {PORTFOLIO_OWNER.role}
                </p>
              </div>

              {/* Badges / Links */}
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center text-sm text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <School className="w-4.5 h-4.5 text-primary shrink-0" />
                  <span className="font-sans leading-snug">{PORTFOLIO_OWNER.university}</span>
                </div>
                <div className="hidden sm:block text-outline-variant/40">•</div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4.5 h-4.5 text-primary shrink-0" />
                  <span>{PORTFOLIO_OWNER.location}</span>
                </div>
              </div>

              {/* Call to actions */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => handleCtaClick("projects")}
                  className="px-6 py-3 bg-primary text-on-primary font-bold text-sm rounded hover:shadow-[0_0_20px_rgba(159,204,239,0.4)] transition-all duration-300 cursor-pointer flex items-center gap-2 group"
                >
                  <span>View Projects</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => handleCtaClick("contact")}
                  className="px-6 py-3 border border-primary/50 hover:border-primary text-primary font-bold text-sm rounded hover:bg-primary/5 transition-all duration-300 cursor-pointer"
                >
                  Contact Me
                </button>
              </div>
            </div>            {/* Right aesthetic portrait block */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group">
                {/* File input (hidden) for custom upload */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                  id="profile-photo-upload"
                />

                <div className="absolute -inset-1.5 bg-gradient-to-r from-primary via-secondary to-tertiary rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-1000" />
                
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 xl:w-96 xl:h-96 rounded-2xl overflow-hidden glass-panel border-primary/30 shadow-2xl flex flex-col items-center justify-center bg-surface-container-low">
                  
                  {isImgBroken ? (
                    /* Premium styled dynamic fallback card if the Google URL fails */
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-surface-container-low to-surface-container-high relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.05),transparent_60%)] pointer-events-none" />
                      
                      {/* Tech styled circular frame with initials */}
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center mb-4 relative group-hover:scale-105 transition-transform duration-500">
                        <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 flex items-center justify-center">
                          <span className="text-3xl sm:text-4xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            MH
                          </span>
                        </div>
                        {/* Spinning border indicator */}
                        <div className="absolute -inset-0.5 rounded-full border border-primary/20 animate-spin-slow pointer-events-none" style={{ animationDuration: '12s' }}></div>
                      </div>

                      <div className="space-y-1 relative z-10">
                        <p className="font-bold text-sm text-on-surface">Profile Photo</p>
                        <p className="text-xs text-on-surface-variant max-w-[200px] mx-auto">
                          Click "Upload Photo" below to add your photo.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={profileImg}
                      alt={PORTFOLIO_OWNER.name}
                      onError={() => setIsImgBroken(true)}
                      className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  {/* Profile Photo Control Overlay */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-surface-container-high/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 shadow-lg">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-white transition-colors cursor-pointer"
                      title="Upload custom portrait photo"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                    </button>

                    {localStorage.getItem("portfolio_profile_img") && (
                      <>
                        <div className="w-[1px] h-3 bg-primary/30" />
                        <button
                          onClick={handleResetPhoto}
                          className="text-on-surface hover:text-red-400 transition-colors cursor-pointer"
                          title="Reset to default image"
                        >
                          <RefreshCw className="w-3.5 h-3.5 animate-spin-hover" />
                        </button>
                      </>
                    )}
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ABOUT ME SECTION (Bento Style Grid) */}
        <section id="about" className="space-y-8 scroll-mt-24">
          <div className="flex items-center gap-4">
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">About Me</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-outline-variant/30 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Professional Summary Card (Col-span 8) */}
            <div className="md:col-span-8 glass-panel rounded-xl p-6 md:p-8 space-y-4 hover:border-primary/20 relative group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded border border-primary/15 text-primary">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="font-headline font-semibold text-lg text-on-surface">Professional Summary</h3>
              </div>
              <p className="text-sm md:text-base text-on-surface-variant font-body leading-relaxed md:leading-relaxed text-justify">
                Dedicated and enthusiastic 2nd-year B.Tech CSE (AI &amp; ML) student with robust knowledge of C and C++ programming. Currently gaining hands-on expertise in Data Structures, structural Problem Solving, and software engineering. Passionate about improving logic building paradigms, establishing structured utilities, and exploring opportunities in Software Architecture, data systems, and ML. Quick learner with high self-discipline and eagerness to expand scope in industry practices.
              </p>
              
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="px-3.5 py-1.5 text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20 rounded-full">
                  C / C++ Codebase
                </span>
                <span className="px-3.5 py-1.5 text-xs font-mono font-bold bg-secondary/10 text-secondary border border-secondary/20 rounded-full">
                  AI &amp; Machine Learning
                </span>
                <span className="px-3.5 py-1.5 text-xs font-mono font-bold bg-tertiary/10 text-tertiary border border-tertiary/20 rounded-full">
                  Software Architecture
                </span>
              </div>
            </div>

            {/* Connect / Socials Card (Col-span 4) */}
            <div className="md:col-span-4 glass-panel rounded-xl p-6 md:p-8 space-y-5 flex flex-col justify-between hover:border-primary/20">
              <h3 className="font-headline font-semibold text-lg text-on-surface pb-1">Connect Details</h3>
              <ul className="space-y-4 flex-grow justify-center flex flex-col">
                
                {/* Email Item */}
                <li className="flex items-center justify-between group/item p-2 rounded hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded bg-[#1e293b] flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-on-primary transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-outline-variant font-mono uppercase tracking-wider">Email</p>
                      <p className="text-xs md:text-sm font-mono text-on-surface">{PORTFOLIO_OWNER.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(PORTFOLIO_OWNER.email, "email")}
                    className="p-1 px-2 text-[10px] font-mono border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary rounded transition-all cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </li>

                {/* LinkedIn Item */}
                <li className="flex items-center justify-between group/item p-2 rounded hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded bg-[#1e293b] flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-on-primary transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-outline-variant font-mono uppercase tracking-wider">LinkedIn</p>
                      <p className="text-xs md:text-sm font-mono text-on-surface truncate max-w-[140px] md:max-w-none">../../manash-harsh-ba43a536b</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(PORTFOLIO_OWNER.linkedin, "linkedin")}
                    className="p-1 px-2 text-[10px] font-mono border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary rounded transition-all cursor-pointer"
                  >
                    {copiedLinkedin ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </li>

                {/* Phone Item */}
                <li className="flex items-center justify-between group/item p-2 rounded hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded bg-[#1e293b] flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-on-primary transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-outline-variant font-mono uppercase tracking-wider">Phone</p>
                      <p className="text-xs md:text-sm font-mono text-on-surface">{PORTFOLIO_OWNER.phone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(PORTFOLIO_OWNER.phone, "phone")}
                    className="p-1 px-2 text-[10px] font-mono border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary rounded transition-all cursor-pointer"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </li>

              </ul>
            </div>

            {/* Education Card (Col-span 4) */}
            <div className="md:col-span-4 glass-panel rounded-xl p-6 md:p-8 space-y-5 hover:border-primary/20">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-semibold text-lg text-on-surface">Education</h3>
              </div>
              <div className="border-l-2 border-primary/30 pl-4 py-1 relative space-y-4">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(159,204,239,0.8)]" />
                <div>
                  <h4 className="text-sm font-bold text-on-surface leading-tight">B.Tech in Computer Science Engineering (AI &amp; ML)</h4>
                  <p className="text-xs text-primary mt-1">{PORTFOLIO_OWNER.university}</p>
                  <p className="text-xs font-mono text-on-surface-variant mt-2">2025 — Present</p>
                  <p className="text-[11px] text-on-surface-variant/85 italic mt-1 font-body">Current Year: 2nd Year</p>
                </div>
              </div>

              <div className="pt-2 border-t border-outline-variant/10">
                <p className="text-xs text-on-surface font-mono uppercase tracking-widest mb-3">Key Subjects</p>
                <ul className="space-y-1.5 text-xs text-on-surface-variant">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Programming in C/C++</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Data Structures</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Maths &amp; Computational Foundations</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Technical Skills Card (Col-span 4) */}
            <div className="md:col-span-4 glass-panel rounded-xl p-6 md:p-8 space-y-6 hover:border-primary/20">
              <h3 className="font-headline font-semibold text-lg text-on-surface">Tech Stack</h3>
              <div className="space-y-4">
                {TECHNICAL_SKILLS.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-on-surface">{skill.name}</span>
                      <span className="text-primary font-bold">{skill.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-outline-variant/10 flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 text-[10px] bg-primary/5 text-primary border border-primary/25 rounded font-mono font-bold">
                  PROBLEM SOLVING
                </span>
                <span className="px-2.5 py-1 text-[10px] bg-secondary/5 text-secondary border border-secondary/25 rounded font-mono font-bold">
                  SYSTEM ARCHITECTURE
                </span>
                <span className="px-2.5 py-1 text-[10px] bg-tertiary/5 text-tertiary border border-tertiary/25 rounded font-mono font-bold">
                  AI BASICS
                </span>
              </div>
            </div>

            {/* Soft Skills Card (Col-span 4) */}
            <div className="md:col-span-4 glass-panel rounded-xl p-6 md:p-8 space-y-6 hover:border-primary/20">
              <h3 className="font-headline font-semibold text-lg text-on-surface">Soft Skills</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-surface-container-low rounded border border-outline-variant/10 hover:border-primary/30 transition-all flex flex-col items-center text-center justify-center gap-1">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-[11px] font-mono text-on-surface font-semibold">Teamwork</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded border border-outline-variant/10 hover:border-primary/30 transition-all flex flex-col items-center text-center justify-center gap-1">
                  <Mail className="w-5 h-5 text-secondary" />
                  <span className="text-[11px] font-mono text-on-surface font-semibold">Communication</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded border border-outline-variant/10 hover:border-primary/30 transition-all flex flex-col items-center text-center justify-center gap-1">
                  <Command className="w-5 h-5 text-tertiary" />
                  <span className="text-[11px] font-mono text-on-surface font-semibold">Time Mgmt</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded border border-outline-variant/10 hover:border-primary/30 transition-all flex flex-col items-center text-center justify-center gap-1">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-[11px] font-mono text-on-surface font-semibold">Quick Learning</span>
                </div>
              </div>

              <div className="pt-2 border-t border-outline-variant/10">
                <p className="text-xs text-on-surface-variant font-mono uppercase tracking-wider mb-2">Languages</p>
                <p className="text-xs md:text-sm text-on-surface font-semibold">
                  English (Fluent) • Hindi (Native)
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* PROJECTS HIGHLIGHT SECTION */}
        <section id="projects" className="space-y-8 scroll-mt-24">
          <div className="flex items-center gap-4">
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">Recent Projects</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-outline-variant/30 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Project 1: Supermarket billing */}
            {PROJECTS.map((project) => (
              <div key={project.id} className="group glass-panel rounded-xl overflow-hidden hover:border-primary/25 bg-[#12192c]/20 flex flex-col justify-between">
                <div>
                  <div className="h-60 sm:h-64 md:h-72 w-full overflow-hidden relative border-b border-outline-variant/15">
                    <div className="absolute inset-0 bg-primary/10 mix-blend-multiply group-hover:bg-transparent transition-all duration-500 z-10" />
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#090e1a]/95 backdrop-blur-md rounded border border-primary/30 z-20">
                      <span className="font-mono text-xs text-primary font-bold">{project.tech[0]}</span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 space-y-4">
                    <h3 className="font-headline font-bold text-xl md:text-2xl text-on-surface leading-tight transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant font-body leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 md:px-8 pb-6 md:pb-8 flex flex-wrap gap-5 items-center">
                  {project.codeUrl && project.codeUrl.startsWith("http") ? (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-primary hover:underline cursor-pointer group/link"
                    >
                      <Code className="w-4 h-4" />
                      <span>View Code</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                  ) : project.fullCodeSnippet ? (
                    <button
                      onClick={() => {
                        setSelectedProjectCode(project);
                        setIsCodeOpen(true);
                      }}
                      className="flex items-center gap-2 text-sm font-bold text-primary hover:underline cursor-pointer group/link"
                    >
                      <Code className="w-4 h-4" />
                      <span>View Code</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </button>
                  ) : (
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-primary hover:underline cursor-pointer group/link"
                    >
                      <Code className="w-4 h-4" />
                      <span>Request Code</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                  )}

                  {project.demoUrl && project.demoUrl.startsWith("http") ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-on-surface hover:text-primary transition-colors cursor-pointer group/link"
                    >
                      <ExternalLink className="w-4 h-4 text-primary" />
                      <span>Launch Live App</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <button
                      onClick={() => setIsTerminalOpen(true)}
                      className="flex items-center gap-2 text-sm font-bold text-on-surface hover:text-primary transition-colors cursor-pointer group/link"
                    >
                      <Terminal className="w-4 h-4 text-purple-400" />
                      <span>Live Local Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Project 2: Next Projects incoming */}
            <div className="glass-panel border-dashed border-2 border-outline-variant/35 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-6 min-h-[350px]">
              <div className="w-20 h-20 rounded-full bg-surface-container-high/40 flex items-center justify-center border border-outline-variant/15 text-primary shadow-[0_0_20px_rgba(159,204,239,0.05)] animate-pulse">
                <PlusCircle className="w-9 h-9" />
              </div>
              
              <div className="space-y-2 max-w-sm">
                <h3 className="font-headline font-bold text-lg md:text-xl text-on-surface">New Projects Incoming</h3>
                <p className="text-xs md:text-sm text-on-surface-variant font-body leading-relaxed">
                  Currently working on some exciting AI and ML focused concepts. Stay tuned for updates on my active GitHub repositories!
                </p>
              </div>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 border border-primary text-primary font-bold text-xs rounded hover:bg-primary/10 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Explore My GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </section>


        {/* INTERACTIVE CONTACT FORM SECTION */}
        <ContactForm />

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/15 py-12 mt-16 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left space-y-1.5">
            <h4 className="font-headline font-bold text-lg text-on-surface tracking-tight">{PORTFOLIO_OWNER.name}</h4>
            <p className="text-xs text-on-surface-variant font-mono">
              © {new Date().getFullYear()} {PORTFOLIO_OWNER.name}. Developed with Precision.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono font-semibold">
            <a
              href={`#`}
              onClick={(e) => {
                e.preventDefault();
                handleCopy(PORTFOLIO_OWNER.email, "email");
              }}
              className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              Email
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>

      {/* MODAL SYSTEM */}
      
      {/* 1. Resume sheet view / Print PDF trigger */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* 2. C++ Source file interactive viewer */}
      {isCodeOpen && (
        <CodeModal
          isOpen={isCodeOpen}
          onClose={() => {
            setIsCodeOpen(false);
            setSelectedProjectCode(null);
          }}
          title={selectedProjectCode?.title || PROJECTS[0].title}
          code={selectedProjectCode?.fullCodeSnippet || PROJECTS[0].fullCodeSnippet}
        />
      )}

      {/* 3. Compiled supermark billing application shell simulation */}
      <TerminalSimulator isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

    </div>
  );
}
