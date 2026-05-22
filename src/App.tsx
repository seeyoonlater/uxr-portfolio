import React, { useState, useEffect } from 'react';
import { User, Folder, Linkedin, Sparkles, MapPin, Edit, ArrowRight, BookOpen, ExternalLink, ShieldCheck, Mail, FileText, Save, Plus, Trash2, Heart, Lock, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserBio, CaseStudy, ThemeMode, PaletteMode } from './types';
import { DEFAULT_BIO, DEFAULT_PROJECTS } from './data';
import { PALETTES, ThemeSelector } from './components/ThemeSelector';
import { ResumeViewer } from './components/ResumeViewer';
import { ProjectCard } from './components/ProjectCard';
import { CaseStudyDetail } from './components/CaseStudyDetail';
import { CreatorPanel } from './components/CreatorPanel';
import { DancheongFlower } from './components/DancheongFlower';
import { EditableText } from './components/EditableText';

export default function App() {
  // 1. Core States (Hydrating from localStorage to support physical persistence)
  const [bio, setBio] = useState<UserBio>(() => {
    const saved = localStorage.getItem('dancheong_bio');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.headerFocus5 || parsed.headerFocus1 === "Empathetic") {
          return {
            ...parsed,
            headerFocus1: DEFAULT_BIO.headerFocus1,
            headerFocus2: DEFAULT_BIO.headerFocus2,
            headerFocus3: DEFAULT_BIO.headerFocus3,
            headerFocus4: DEFAULT_BIO.headerFocus4,
            headerFocus5: DEFAULT_BIO.headerFocus5,
            headerFocus6: DEFAULT_BIO.headerFocus6,
          };
        }
        return parsed;
      } catch (e) {
        return DEFAULT_BIO;
      }
    }
    return DEFAULT_BIO;
  });

  const [projects, setProjects] = useState<CaseStudy[]>(() => {
    const saved = localStorage.getItem('dancheong_projects');
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem('dancheong_thememode') as ThemeMode) || 'light';
  });

  const [paletteMode, setPaletteMode] = useState<PaletteMode>(() => {
    return (localStorage.getItem('dancheong_palette') as PaletteMode) || 'celedon';
  });

  const [activeTab, setActiveTab] = useState<'about' | 'projects'>('about');
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);
  const [creatorMode, setCreatorMode] = useState<boolean>(false);

  // Password Protection States
  const [sandboxPassword, setSandboxPassword] = useState<string>(() => {
    return localStorage.getItem('dancheong_sandbox_password') || 'dancheong';
  });
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [typedPassword, setTypedPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordChangeMode, setPasswordChangeMode] = useState<boolean>(false);
  const [newPasswordInput, setNewPasswordInput] = useState<string>('');

  const handleToggleCreatorMode = () => {
    if (creatorMode) {
      // Turn off immediately
      setCreatorMode(false);
    } else {
      // Prompt for password
      setTypedPassword('');
      setPasswordError('');
      setIsPasswordModalOpen(true);
    }
  };

  const handleVerifyPassword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (typedPassword === sandboxPassword) {
      setCreatorMode(true);
      setIsPasswordModalOpen(false);
      setTypedPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Invalid lock phrase. Please try again.');
    }
  };

  const handleChangeMasterPassword = (newPass: string) => {
    const trimmed = newPass.trim();
    if (trimmed.length < 3) {
      alert('Password must be at least 3 characters long.');
      return;
    }
    setSandboxPassword(trimmed);
    localStorage.setItem('dancheong_sandbox_password', trimmed);
    setPasswordChangeMode(false);
    setNewPasswordInput('');
    alert('Master password successfully updated and synchronized.');
  };

  // 2. Sandbox Styling Overrides Configuration State
  const [sandboxTypography, setSandboxTypography] = useState<{
    headingFont: string; // 'sans' | 'space' | 'serif' | 'mono'
    bodyFont: string; // 'sans' | 'serif' | 'mono'
    fontSize: string; // 'sm' | 'base' | 'lg'
    headingWeight: string; // 'medium' | 'bold' | 'black'
  }>(() => {
    const saved = localStorage.getItem('dancheong_sandbox_typography');
    return saved ? JSON.parse(saved) : {
      headingFont: 'sans',
      bodyFont: 'sans',
      fontSize: 'base',
      headingWeight: 'black'
    };
  });

  // Time-tracking variables for Sandbox 30s auto-save trigger
  const [secondsUntilSave, setSecondsUntilSave] = useState<number>(30);
  const [lastAutoSaved, setLastAutoSaved] = useState<string | null>(null);

  // Auto-Save Effect (triggering every 30 seconds in sandbox creatorMode)
  useEffect(() => {
    if (!creatorMode) return;
    const interval = setInterval(() => {
      setSecondsUntilSave((prev) => {
        if (prev <= 1) {
          // Commit current reactive content state to persistence engine
          localStorage.setItem('dancheong_bio', JSON.stringify(bio));
          localStorage.setItem('dancheong_projects', JSON.stringify(projects));
          localStorage.setItem('dancheong_sandbox_typography', JSON.stringify(sandboxTypography));
          
          const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          setLastAutoSaved(now);
          setTimeout(() => setLastAutoSaved(null), 3500);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [creatorMode, bio, projects, sandboxTypography]);

  // Reset clock countdown constraint when creatorMode is toggled
  useEffect(() => {
    if (creatorMode) {
      setSecondsUntilSave(30);
    }
  }, [creatorMode]);

  // 3. Persisting state edits during normal interactions
  useEffect(() => {
    localStorage.setItem('dancheong_bio', JSON.stringify(bio));
  }, [bio]);

  useEffect(() => {
    localStorage.setItem('dancheong_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('dancheong_thememode', themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('dancheong_palette', paletteMode);
  }, [paletteMode]);

  // Locate active palette and highlight values
  const activePalette = PALETTES.find((p) => p.id === paletteMode) || PALETTES[0];
  const accentColor = themeMode === 'light' ? activePalette.primary : activePalette.darkAccent;
  const highlightColor = themeMode === 'dark' ? activePalette.primary : activePalette.lightAccent;

  const getComplementaryAccentColor = (pMode: PaletteMode) => {
    switch (pMode) {
      case 'celedon': return themeMode === 'dark' ? '#3F2296' : '#EDE4FF'; // Placid Lavender complements Mood Mint
      case 'terracotta': return themeMode === 'dark' ? '#2F6122' : '#E2F9DB'; // Mood Mint complements Dusty Rose
      case 'gold': return themeMode === 'dark' ? '#3F2296' : '#EDE4FF'; // Placid Lavender complements Straw Golden
      case 'charcoal': return themeMode === 'dark' ? '#735011' : '#FFF8E5'; // Straw Golden complements Placid Lavender
      default: return themeMode === 'dark' ? '#3F2296' : '#EDE4FF';
    }
  };

  const getSecondComplementaryAccentColor = (pMode: PaletteMode) => {
    switch (pMode) {
      case 'celedon': return themeMode === 'dark' ? '#851E52' : '#FCE6F4'; // Dusty Rose complements Mood Mint
      case 'terracotta': return themeMode === 'dark' ? '#735011' : '#FFF8E5'; // Straw Golden complements Dusty Rose
      case 'gold': return themeMode === 'dark' ? '#2F6122' : '#E2F9DB'; // Mood Mint complements Straw Golden
      case 'charcoal': return themeMode === 'dark' ? '#851E52' : '#FCE6F4'; // Dusty Rose complements Placid Lavender
      default: return themeMode === 'dark' ? '#851E52' : '#FCE6F4';
    }
  };

  // Sandbox Override String Resolvers
  const resolvedHeadingFont = 
    sandboxTypography.headingFont === 'space' ? '"Space Grotesk", sans-serif' :
    sandboxTypography.headingFont === 'serif' ? '"Playfair Display", Georgia, serif' :
    sandboxTypography.headingFont === 'mono' ? '"JetBrains Mono", monospace' :
    '"Outfit", sans-serif';

  const resolvedBodyFont = 
    sandboxTypography.bodyFont === 'serif' ? '"Playfair Display", Georgia, serif' :
    sandboxTypography.bodyFont === 'mono' ? '"JetBrains Mono", monospace' :
    '"Urbanist", sans-serif';

  const resolvedBodySize = 
    sandboxTypography.fontSize === 'sm' ? '14px' :
    sandboxTypography.fontSize === 'lg' ? '17px' :
    '15px';

  const resolvedHeadingWeight = 
    sandboxTypography.headingWeight === 'medium' ? '500' :
    sandboxTypography.headingWeight === 'bold' ? '700' :
    '900';

  // 4. Creator cockpit saving hooks
  const handleSaveBio = (updatedBio: UserBio) => {
    setBio(updatedBio);
  };

  const handleSaveProject = (updatedProject: CaseStudy) => {
    setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
    if (selectedProject && selectedProject.id === updatedProject.id) {
      setSelectedProject(updatedProject);
    }
  };

  const handleCreateProject = (newProject: CaseStudy) => {
    setProjects([newProject, ...projects]);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((p) => p.id !== projectId));
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject(null);
    }
  };

  const handleRestoreDefaults = () => {
    if (window.confirm("Are you sure you want to restore all original biography and default project case studies?")) {
      localStorage.removeItem('dancheong_bio');
      localStorage.removeItem('dancheong_projects');
      localStorage.removeItem('dancheong_sandbox_typography');
      setBio(DEFAULT_BIO);
      setProjects(DEFAULT_PROJECTS);
      setSandboxTypography({
        headingFont: 'sans',
        bodyFont: 'sans',
        fontSize: 'base',
        headingWeight: 'black'
      });
      setSelectedProject(null);
      setCreatorMode(false);
    }
  };

  return (
    <div
      className="min-h-screen transition-all duration-500 overflow-x-hidden flex flex-col relative"
      style={{
        backgroundColor: themeMode === 'dark' ? activePalette.darkBg : '#FFFFFF',
        color: themeMode === 'dark' ? activePalette.darkText : '#000000',
      }}
      id="app-theme-wrapper"
    >
      {/* 5. DYNAMIC STYLE INJECTION FOR SANDBOX OVERRIDES */}
      <style>{`
        :root, body, #app-theme-wrapper {
          font-family: ${resolvedBodyFont} !important;
          font-size: ${resolvedBodySize} !important;
        }
        h1, h2, h3, h4, h5, h6, .theme-heading {
          font-family: ${resolvedHeadingFont} !important;
          font-weight: ${resolvedHeadingWeight} !important;
        }
        ${themeMode === 'dark' ? `
          /* Dark Mode Global Overrides */
          #app-theme-wrapper {
            background-color: ${activePalette.darkBg} !important;
            color: ${activePalette.darkText} !important;
          }
          
          #app-theme-wrapper, 
          #app-theme-wrapper p,
          #app-theme-wrapper span:not([style*="background-color"]):not([style*="backgroundColor"]),
          #app-theme-wrapper h1, 
          #app-theme-wrapper h2, 
          #app-theme-wrapper h3:not([style*="background-color"]):not([style*="backgroundColor"]), 
          #app-theme-wrapper h4, 
          #app-theme-wrapper h5, 
          #app-theme-wrapper h6, 
          #app-theme-wrapper li,
          #app-theme-wrapper .text-black, 
          #app-theme-wrapper .text-gray-900,
          #app-theme-wrapper .text-slate-900,
          #app-theme-wrapper .text-neutral-900 {
            color: ${activePalette.darkText} !important;
          }

           /* Keep black text readable when set as a highlight label with light backgrounds */
          #app-theme-wrapper h2 span,
          #app-theme-wrapper *:not(#theme-selector-container *):not(#theme-selector-container)[style*="background-color"],
          #app-theme-wrapper *:not(#theme-selector-container *):not(#theme-selector-container)[style*="background-color"] *,
          #app-theme-wrapper *:not(#theme-selector-container *):not(#theme-selector-container)[style*="background-color"] span,
          #app-theme-wrapper *:not(#theme-selector-container *):not(#theme-selector-container)[style*="backgroundColor"],
          #app-theme-wrapper *:not(#theme-selector-container *):not(#theme-selector-container)[style*="backgroundColor"] *,
          #app-theme-wrapper *:not(#theme-selector-container *):not(#theme-selector-container)[style*="backgroundColor"] span,
          #app-theme-wrapper .highlight-text,
          #app-theme-wrapper .highlight-text *,
          #app-theme-wrapper .highlight-text-force,
          #app-theme-wrapper .highlight-text-force *,
          #app-theme-wrapper .highlight-text-force span,
          #app-theme-wrapper .highlight-text-force input,
          #app-theme-wrapper .highlight-text-force textarea {
            color: ${themeMode === 'dark' ? '#FFFFFF' : '#000000'} !important;
          }

          /* Medium opacity elements and labels */
          #app-theme-wrapper .text-black\\/90,
          #app-theme-wrapper .text-black\\/80,
          #app-theme-wrapper .text-black\\/70,
          #app-theme-wrapper .text-black\\/60,
          #app-theme-wrapper .text-black\\/50,
          #app-theme-wrapper .opacity-80,
          #app-theme-wrapper .opacity-75,
          #app-theme-wrapper .opacity-70,
          #app-theme-wrapper .opacity-60,
          #app-theme-wrapper .opacity-50 {
            color: ${activePalette.darkText} !important;
            opacity: 0.75 !important;
          }

          /* Muted meta items */
          #app-theme-wrapper .text-black\\/40,
          #app-theme-wrapper .opacity-40 {
            color: ${activePalette.darkText} !important;
            opacity: 0.5 !important;
          }

          /* Subtle white/light borders instead of dark borders */
          #app-theme-wrapper, 
          #app-theme-wrapper *, 
          #app-theme-wrapper .border,
          #app-theme-wrapper .border-black\\/10,
          #app-theme-wrapper .border-black\\/15,
          #app-theme-wrapper .border-black\\/20,
          #app-theme-wrapper .border-current\\/10,
          #app-theme-wrapper .border-current\\/15,
          #app-theme-wrapper .border-current\\/25 {
            border-color: rgba(255, 255, 255, 0.12) !important;
          }

          /* Deep dark card backgrounds */
          #app-theme-wrapper .bg-white,
          #app-theme-wrapper .bg-current-bg,
          #app-theme-wrapper .bg-current-bg\\/50,
          #app-theme-wrapper #resume-viewer-container {
            background-color: ${activePalette.darkCard} !important;
            color: ${activePalette.darkText} !important;
          }

          #app-theme-wrapper .bg-black\\/\\[0\\.01\\] {
            background-color: rgba(255, 255, 255, 0.02) !important;
          }

          #app-theme-wrapper .bg-black\\/\\[0\\.03\\] {
            background-color: rgba(255, 255, 255, 0.04) !important;
          }

          #app-theme-wrapper .bg-black\\/5 {
            background-color: rgba(255, 255, 255, 0.06) !important;
          }

          /* Navigation and active states */
          #app-theme-wrapper #nav-about-btn, 
          #app-theme-wrapper #nav-projects-btn {
            color: ${activePalette.darkText} !important;
          }

          #app-theme-wrapper #nav-about-btn.bg-black,
          #app-theme-wrapper #nav-projects-btn.bg-black {
            background-color: ${activePalette.primary} !important;
            color: #FFFFFF !important;
            border-color: transparent !important;
          }

          #app-theme-wrapper #nav-about-btn.bg-black span,
          #app-theme-wrapper #nav-projects-btn.bg-black span {
            color: #FFFFFF !important;
          }

          #app-theme-wrapper #nav-about-btn:not(.bg-black):hover,
          #app-theme-wrapper #nav-projects-btn:not(.bg-black):hover {
            background-color: rgba(255, 255, 255, 0.05) !important;
            color: #FFFFFF !important;
          }

          #app-theme-wrapper #nav-linkedin-link:hover {
            background-color: rgba(255, 255, 255, 0.05) !important;
          }

          /* Developer Sandbox configurations styles */
          #app-theme-wrapper .bg-amber-50,
          #app-theme-wrapper .bg-amber-100 {
            background-color: rgba(251, 191, 36, 0.08) !important;
            color: #FBBF24 !important;
            border-color: rgba(251, 191, 36, 0.2) !important;
          }

          #app-theme-wrapper .text-amber-700,
          #app-theme-wrapper .text-amber-800,
          #app-theme-wrapper .text-amber-900 {
            color: #FBBF24 !important;
          }

          #app-theme-wrapper select,
          #app-theme-wrapper input {
            background-color: ${activePalette.darkBg} !important;
            color: ${activePalette.darkText} !important;
            border-color: rgba(255, 255, 255, 0.15) !important;
          }
        ` : ''}
      `}</style>

      {/* 6. TOP FLOATING RE-STYLING TOOLBAR BAR */}
      {creatorMode && (
        <div 
          className="sticky top-0 left-0 right-0 z-50 border-b bg-amber-50 border-amber-200 px-4 py-3 text-black animate-fade-in text-xs flex flex-wrap items-center justify-between gap-y-3 shadow-xs shrink-0"
          style={{
            fontFamily: '"Space Grotesk", sans-serif'
          }}
          id="top-sandbox-formatting-bar"
        >
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-700">
              <DancheongFlower size={20} className="animate-spin-slow rotate-12" />
              <span>Sandbox Typography</span>
            </span>
            
            {/* Font Selector for Headings */}
            <div className="flex items-center gap-1 border-l border-amber-300 pl-4">
              <span className="opacity-70 font-semibold">Heading Font:</span>
              <select
                value={sandboxTypography.headingFont}
                onChange={(e) => setSandboxTypography({ ...sandboxTypography, headingFont: e.target.value })}
                className="bg-white border border-amber-300 rounded px-1.5 py-0.5 text-[11px] font-mono focus:outline-none"
              >
                <option value="sans">Outfit / Design Default</option>
                <option value="space">Space Grotesk (Tech)</option>
                <option value="serif">Playfair Display (Serif)</option>
                <option value="mono">JetBrains Mono (Mono)</option>
              </select>
            </div>

            {/* Header Font Weight */}
            <div className="flex items-center gap-1 border-l border-amber-300 pl-4">
              <span className="opacity-70 font-semibold">Weight:</span>
              <select
                value={sandboxTypography.headingWeight}
                onChange={(e) => setSandboxTypography({ ...sandboxTypography, headingWeight: e.target.value })}
                className="bg-white border border-amber-300 rounded px-1.5 py-0.5 text-[11px] font-mono focus:outline-none"
              >
                <option value="medium">Medium (500)</option>
                <option value="bold">Semi-Bold (700)</option>
                <option value="black">Extra Black (900)</option>
              </select>
            </div>

            {/* Font Selector for Body */}
            <div className="flex items-center gap-1 border-l border-amber-300 pl-4">
              <span className="opacity-70 font-semibold">Body Copy:</span>
              <select
                value={sandboxTypography.bodyFont}
                onChange={(e) => setSandboxTypography({ ...sandboxTypography, bodyFont: e.target.value })}
                className="bg-white border border-amber-300 rounded px-1.5 py-0.5 text-[11px] font-mono focus:outline-none"
              >
                <option value="sans">Urbanist / Clean Sans</option>
                <option value="serif">Playfair Display (Serif)</option>
                <option value="mono">JetBrains Mono</option>
              </select>
            </div>

            {/* Global Size Slider */}
            <div className="flex items-center gap-1 border-l border-amber-300 pl-4">
              <span className="opacity-70 font-semibold">Size:</span>
              <select
                value={sandboxTypography.fontSize}
                onChange={(e) => setSandboxTypography({ ...sandboxTypography, fontSize: e.target.value })}
                className="bg-white border border-amber-300 rounded px-1.5 py-0.5 text-[11px] font-mono focus:outline-none"
              >
                <option value="sm">Small (14px)</option>
                <option value="base">Standard (15px)</option>
                <option value="lg">Large (17px)</option>
              </select>
            </div>

            {/* Password security settings */}
            <div className="flex items-center gap-1 border-l border-amber-300 pl-4">
              {passwordChangeMode ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    placeholder="New lock phrase"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    className="bg-white border border-amber-300 rounded px-1.5 py-0.5 text-[11px] font-mono focus:outline-none w-32 text-black font-semibold"
                  />
                  <button
                    onClick={() => handleChangeMasterPassword(newPasswordInput)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] px-2 py-0.5 rounded cursor-pointer font-bold font-mono"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setPasswordChangeMode(false);
                      setNewPasswordInput('');
                    }}
                    className="text-amber-700 hover:text-amber-950 text-[10px] px-1 font-mono"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setPasswordChangeMode(true);
                    setNewPasswordInput('');
                  }}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300/60 rounded px-2 py-0.5 text-[10px] uppercase font-mono flex items-center gap-1 cursor-pointer font-bold"
                >
                  <Lock size={10} className="text-amber-700" />
                  <span>Update Password</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Auto-save timer */}
            <div className="text-[10px] font-mono px-2 py-0.5 bg-amber-100 border border-amber-300/40 text-amber-800 rounded flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              <span>
                {lastAutoSaved ? `Auto-Saved at ${lastAutoSaved}` : `Auto-saving in ${secondsUntilSave}s`}
              </span>
            </div>

            {/* Save Action */}
            <button
              onClick={() => {
                localStorage.setItem('dancheong_bio', JSON.stringify(bio));
                localStorage.setItem('dancheong_projects', JSON.stringify(projects));
                localStorage.setItem('dancheong_sandbox_typography', JSON.stringify(sandboxTypography));
                setLastAutoSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
                setTimeout(() => setLastAutoSaved(null), 3000);
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white text-[10px] uppercase font-mono px-3 py-1 rounded inline-flex items-center gap-1 cursor-pointer font-bold transition-all"
            >
              <Save size={11} />
              <span>Commit Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* CORE SCREEN SPLIT CONTAINER */}
      <div className="flex-1 flex flex-col md:flex-row relative z-10">
        
        {/* Ambient background bloom glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
          <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-b ${activePalette.gradientFrom} ${activePalette.gradientTo} blur-3xl opacity-35 transition-all duration-500`} />
          <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-t ${activePalette.gradientTo} ${activePalette.gradientFrom} blur-3xl opacity-20 transition-all duration-500`} />
        </div>

        {/* LEFT NAVIGATION SIDEBAR */}
        <aside
          className="w-full md:w-80 border-b md:border-b-0 md:border-r border-black/10 p-6 md:p-8 flex flex-col justify-between flex-shrink-0 z-10 relative bg-black/[0.01]"
          id="sidebar-navigation"
        >
          <div className="space-y-8">
            {/* Brand/Centered Medallion Info */}
            <div className="text-left">
              <div className="flex items-center gap-3 mb-4 justify-start">
                <div 
                  className="w-12 h-12 rounded-full border border-black/10 overflow-hidden flex items-center justify-center p-1 bg-white relative transition-all duration-300 hover:rotate-90"
                  style={{ borderColor: `${accentColor}40` }}
                >
                  {bio.photoUrl ? (
                    <img
                      src={bio.photoUrl}
                      alt={bio.name}
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <DancheongFlower size={36} />
                  )}
                </div>
                
                <div className="text-left">
                  <h1 className="text-sm font-extrabold tracking-wide uppercase leading-tight font-serif" style={{ color: accentColor }}>
                    <EditableText
                      value={bio.name}
                      onChange={(val) => setBio({ ...bio, name: val })}
                      active={creatorMode}
                    />
                  </h1>
                  <p className="text-[10px] font-mono opacity-50 tracking-wider font-extrabold mt-0.5">
                    UX Research Portfolio
                  </p>
                </div>
              </div>

              <div className="text-xs font-semibold opacity-80 leading-normal text-left space-y-0.5">
                <div>
                  <EditableText
                    value={bio.title}
                    onChange={(val) => setBio({ ...bio, title: val })}
                    active={creatorMode}
                  />
                </div>
                <div className="text-[11px] opacity-70 font-medium flex items-center gap-1 justify-start">
                  <MapPin size={10} style={{ color: accentColor }} />
                  <EditableText
                    value={bio.location || "Tupelo, MS"}
                    onChange={(val) => setBio({ ...bio, location: val })}
                    active={creatorMode}
                  />
                </div>
              </div>
            </div>

            {/* Core Sidebar Navigation Links */}
            <nav className="flex flex-col gap-1.5 border-t border-b md:border-b-0 md:border-t border-black/10 py-4" id="navigation-list">
              <button
                id="nav-about-btn"
                onClick={() => {
                  setActiveTab('about');
                  setSelectedProject(null);
                }}
                className={`text-left px-3.5 py-3 rounded-xl text-xs font-mono font-medium flex items-center gap-3 transition-all cursor-pointer ${
                  activeTab === 'about'
                    ? 'bg-black text-white font-black shadow-xs'
                    : 'opacity-60 hover:opacity-100 hover:bg-black/[0.03] text-black'
                }`}
              >
                <User size={13} style={activeTab === 'about' ? { color: '#FFFFFF' } : { color: accentColor }} />
                <span className="flex-grow text-left">
                  <EditableText
                    value={bio.aboutTabLabel || "About Persona"}
                    onChange={(val) => setBio({ ...bio, aboutTabLabel: val })}
                    active={creatorMode}
                    className={activeTab === 'about' ? 'text-white' : 'text-black'}
                  />
                </span>
                <DancheongFlower size={14} className="shrink-0 opacity-40 hover:opacity-100" />
              </button>

              <button
                id="nav-projects-btn"
                onClick={() => {
                  setActiveTab('projects');
                  setSelectedProject(null);
                }}
                className={`text-left px-3.5 py-3 rounded-xl text-xs font-mono font-medium flex items-center gap-3 transition-all cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-black text-white font-black shadow-xs'
                    : 'opacity-60 hover:opacity-100 hover:bg-black/[0.03] text-black'
                }`}
              >
                <Folder size={13} style={activeTab === 'projects' ? { color: '#FFFFFF' } : { color: accentColor }} />
                <span className="flex-grow text-left">
                  <EditableText
                    value={bio.projectsTabLabel || "Research Projects"}
                    onChange={(val) => setBio({ ...bio, projectsTabLabel: val })}
                    active={creatorMode}
                    className={activeTab === 'projects' ? 'text-white' : 'text-black'}
                  />
                </span>
                {projects.length > 0 && (
                  <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-current/10 font-bold opacity-80 shrink-0">
                    {projects.length}
                  </span>
                )}
              </button>

              <a
                id="nav-linkedin-link"
                href={bio.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-3 rounded-xl text-xs font-mono font-medium flex items-center gap-3 opacity-60 hover:opacity-100 hover:bg-black/[0.03] text-black transition-all"
              >
                <Linkedin size={13} style={{ color: '#0A66C2' }} />
                <span className="flex-grow text-left">
                  <EditableText
                    value={bio.linkedinTabLabel || "LinkedIn Profile"}
                    onChange={(val) => setBio({ ...bio, linkedinTabLabel: val })}
                    active={creatorMode}
                  />
                </span>
                <ExternalLink size={10} className="ml-auto opacity-40 shrink-0" />
              </a>
            </nav>

            {/* Lydia's Inspired Switcher (Light / Dark + Color Hues) */}
            <div className="pt-2 md:pt-4">
              <ThemeSelector
                currentMode={themeMode}
                currentPalette={paletteMode}
                onModeChange={(m) => {
                  setThemeMode(m);
                  if (m === 'dark') {
                    // Force white background and black text state requested by the user
                    // (we override elements styling natively)
                  }
                }}
                onPaletteChange={setPaletteMode}
              />
            </div>
          </div>

          {/* CREATOR SIDEBAR TOGGLERS */}
          <div className="pt-8 mt-6 border-t border-black/10 hidden md:block">
            <div className="flex flex-col gap-2">
              <button
                id="toggle-creator-cockpit-sidebar"
                onClick={handleToggleCreatorMode}
                className={`text-[10px] font-mono leading-none tracking-wider uppercase inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border transition-all cursor-pointer ${
                  creatorMode
                    ? 'bg-amber-600/10 border-amber-600/30 text-amber-900 font-bold shadow-xs'
                    : 'border-black/15 opacity-60 hover:opacity-100 hover:border-black'
                }`}
              >
                <span>{creatorMode ? '● Close Sandbox' : '⊙ Developer Sandbox'}</span>
              </button>
              
              {creatorMode && (
                <button
                  onClick={handleRestoreDefaults}
                  className="text-[9px] font-mono opacity-50 hover:opacity-100 hover:text-rose-700 py-1 cursor-pointer transition-all text-center"
                >
                  Restore Defaults
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* CORE PORTFOLIO WORKSPACE VIEWPORT */}
        <main className="flex-1 flex flex-col p-6 md:p-12 space-y-12 z-10 relative overflow-y-auto max-w-7xl mx-auto w-full text-justify" id="root-viewport-panel">
          
          {/* Dynamic header greeting card (About Tab only) */}
          <AnimatePresence mode="wait">
            {!selectedProject && activeTab === 'about' && (
              <motion.header
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 pb-6 border-b border-black/10 text-left"
                id="main-homepage-header"
              >
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-loose max-w-4xl text-left text-black" style={{ lineHeight: '1.8' }}>
                  <EditableText
                    value={bio.headerFocus1 || "Asking the "}
                    onChange={(val) => setBio({ ...bio, headerFocus1: val })}
                    active={creatorMode}
                    className="mr-1.5"
                  />
                  
                  <span className="px-4 py-1.5 rounded-2xl border-2 inline-block rotate-[-1deg] shadow-xs font-bold mr-1.5 highlight-text-force" style={{ backgroundColor: highlightColor, color: themeMode === 'dark' ? '#FFFFFF' : '#000000', borderColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.25)' : '#000000' }}>
                    <EditableText
                      value={bio.headerFocus2 || "right questions"}
                      onChange={(val) => setBio({ ...bio, headerFocus2: val })}
                      active={creatorMode}
                      className="inline-block highlight-text-force"
                      style={{ color: themeMode === 'dark' ? '#FFFFFF' : '#000000' }}
                    />
                  </span>
                  
                  <EditableText
                    value={bio.headerFocus3 || ", at the "}
                    onChange={(val) => setBio({ ...bio, headerFocus3: val })}
                    active={creatorMode}
                    className="mr-1.5"
                  />
                  
                  <span className="px-4 py-1.5 rounded-2xl border-2 inline-block rotate-[1deg] shadow-xs font-bold mr-1.5 highlight-text-force" style={{ backgroundColor: getComplementaryAccentColor(paletteMode), color: themeMode === 'dark' ? '#FFFFFF' : '#000000', borderColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.25)' : '#000000' }}>
                    <EditableText
                      value={bio.headerFocus4 || "right time"}
                      onChange={(val) => setBio({ ...bio, headerFocus4: val })}
                      active={creatorMode}
                      className="inline-block highlight-text-force"
                      style={{ color: themeMode === 'dark' ? '#FFFFFF' : '#000000' }}
                    />
                  </span>

                  <EditableText
                    value={bio.headerFocus5 || ", with the "}
                    onChange={(val) => setBio({ ...bio, headerFocus5: val })}
                    active={creatorMode}
                    className="mr-1.5"
                  />
                  
                  <span className="px-4 py-1.5 rounded-2xl border-2 inline-block rotate-[-0.5deg] shadow-xs font-bold mr-1.5 highlight-text-force" style={{ backgroundColor: getSecondComplementaryAccentColor(paletteMode), color: themeMode === 'dark' ? '#FFFFFF' : '#000000', borderColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.25)' : '#000000' }}>
                    <EditableText
                      value={bio.headerFocus6 || "right people."}
                      onChange={(val) => setBio({ ...bio, headerFocus6: val })}
                      active={creatorMode}
                      className="inline-block highlight-text-force"
                      style={{ color: themeMode === 'dark' ? '#FFFFFF' : '#000000' }}
                    />
                  </span>
                </h2>
                
                <div className="text-xs font-mono uppercase tracking-wider opacity-60 block font-bold text-left mt-2 flex items-center gap-2">
                  <DancheongFlower size={18} className="shrink-0 animate-pulse" />
                  <div className="flex-grow">
                    <EditableText
                      value={bio.headerSub || "Inspired by Traditional Rhythms & Responsive Inventions"}
                      onChange={(val) => setBio({ ...bio, headerSub: val })}
                      active={creatorMode}
                      className="w-full font-mono font-bold"
                    />
                  </div>
                </div>
              </motion.header>
            )}
          </AnimatePresence>

          {/* ACTIVE MAIN CONTENT BODY */}
          <section className="flex-1 min-h-[400px]">
            <AnimatePresence mode="wait">
              {/* 1. VIEW SPECIFIC STUDY FOR PROJECT */}
              {selectedProject ? (
                <CaseStudyDetail
                  key="detail-view"
                  project={selectedProject}
                  accentColor={accentColor}
                  currentMode={themeMode}
                  highlightColor={highlightColor}
                  onBack={() => setSelectedProject(null)}
                />
              ) : activeTab === 'about' ? (
                /* 2. ABOUT TAB PAGE */
                <motion.div
                  key="about-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-12 text-left"
                >
                  {/* Biography & Summary (Dancheong Flower details layout) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    
                    {/* Photo / Brand Medallion Container */}
                    <div className="md:col-span-1 border border-black/15 rounded-2xl overflow-hidden p-3 bg-black/[0.01] flex flex-col items-center gap-3">
                      <div className="w-full aspect-square rounded-xl overflow-hidden bg-white relative flex items-center justify-center border border-black/10">
                        {bio.photoUrl ? (
                          <img
                            src={bio.photoUrl}
                            alt={bio.name}
                            className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-300"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                            <DancheongFlower size={120} className="hover:rotate-12 transform transition-transform" />
                            <p className="text-[10px] font-mono uppercase tracking-wider opacity-50 font-bold">Traditional Seal</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Photo custom uploader and controller */}
                      {creatorMode && (
                        <div className="w-full space-y-1.5 text-center">
                          <label className="inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-xl border border-black/10 bg-white hover:bg-black/[0.03] text-xs font-mono font-bold text-black cursor-pointer transition-all shadow-xs">
                            <span>Upload Dancheong Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setBio({
                                      ...bio,
                                      photoUrl: reader.result as string
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                          {bio.photoUrl && (
                            <button
                              onClick={() => setBio({ ...bio, photoUrl: '' })}
                              className="text-[10px] font-mono text-rose-600 hover:text-rose-950 font-bold block mx-auto py-1"
                            >
                              Reset to Default Seal
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Biography Paragraph Blocks with sprinkled cute flower ornaments */}
                    <div className="md:col-span-2 space-y-6 text-left relative">
                      
                      {/* Interactive Featured Bio Summary (No quotation marks) */}
                      <div className="relative p-4 rounded-xl border border-black/10 text-base font-bold leading-relaxed text-black/90 bg-black/[0.01]" style={{ borderLeft: `4px solid ${accentColor}` }}>
                        <div className="absolute -top-3.5 -right-3 block">
                          <DancheongFlower size={24} className="animate-spin-slow opacity-80" />
                        </div>
                        <EditableText
                          value={bio.summary}
                          onChange={(val) => setBio({ ...bio, summary: val })}
                          active={creatorMode}
                          type="textarea"
                          className="text-sm font-semibold text-black"
                        />
                      </div>

                      {/* Multiline Paragraph Statements */}
                      <div className="space-y-4 relative">
                        {bio.paragraphs.map((p, idx) => (
                          <div key={idx} className="relative flex items-start gap-3 group">
                            {/* Intentional cute flower ornament sprinkled beside paragraphs */}
                            <div className="mt-1 shrink-0">
                              <DancheongFlower size={15} className={idx % 2 === 0 ? "rotate-12 animate-pulse" : "rotate-45 opacity-80"} />
                            </div>
                            <div className="flex-grow">
                              <EditableText
                                value={p}
                                onChange={(newParagraph) => {
                                  const updatedPars = [...bio.paragraphs];
                                  updatedPars[idx] = newParagraph;
                                  setBio({ ...bio, paragraphs: updatedPars });
                                }}
                                active={creatorMode}
                                type="textarea"
                                className="text-sm leading-relaxed text-black font-medium"
                              />
                            </div>
                            {creatorMode && bio.paragraphs.length > 1 && (
                              <button
                                onClick={() => {
                                  const nextPars = bio.paragraphs.filter((_, i) => i !== idx);
                                  setBio({ ...bio, paragraphs: nextPars });
                                }}
                                className="text-rose-500 hover:text-rose-700 opacity-0 group-hover:opacity-100 font-mono text-[10px] self-start mt-1 shrink-0 p-0.5"
                              >
                                ✕ Remove
                              </button>
                            )}
                          </div>
                        ))}

                        {creatorMode && (
                          <button
                            onClick={() => {
                              setBio({
                                ...bio,
                                paragraphs: [...bio.paragraphs, "Click to customize this new biographical statement paragraph."]
                              });
                            }}
                            className="text-[10px] font-mono text-emerald-600 hover:underline flex items-center gap-1 mt-2 cursor-pointer font-bold"
                          >
                            <Plus size={10} /> Add Bio Paragraph
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sub-Interactive Resume Grid section (Receives inline editing states) */}
                  <ResumeViewer
                    bio={bio}
                    accentColor={accentColor}
                    currentMode={themeMode}
                    highlightColor={highlightColor}
                    creatorMode={creatorMode}
                    onSelfUpdateBio={(updatedBio) => setBio(updatedBio)}
                  />
                </motion.div>
              ) : (
                /* 3. PROJECTS CATALOGUE TAB */
                <motion.div
                  key="projects-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Intro catalog typography heading */}
                  <div className="text-left pb-4 border-b border-black/10">
                    <h3 className="text-xl font-serif font-black tracking-tight flex items-center gap-2">
                      <span className="px-3.5 py-1 rounded-xl highlight-text-force" style={{ backgroundColor: highlightColor, color: themeMode === 'dark' ? '#FFFFFF' : '#000000' }}>Academic & Field Research Case Studies</span>
                    </h3>
                    <p className="text-xs opacity-60 mt-1 font-mono">Input password phrases to unlock sensitive research studies of active products.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="projects-grid-list">
                    {projects.map((proj) => (
                      <ProjectCard
                        key={proj.id}
                        project={proj}
                        accentColor={accentColor}
                        currentMode={themeMode}
                        highlightColor={highlightColor}
                        onSelect={(p) => setSelectedProject(p)}
                      />
                    ))}
                    {projects.length === 0 && (
                      <div className="col-span-full border border-dashed rounded-2xl p-12 text-center">
                        <p className="text-sm opacity-50 font-mono">No active case studies published in database.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* BOTTOM ACTIVE MOBILE CREATOR DRAWER */}
          <div className="md:hidden pt-4 border-t border-black/10 flex flex-col items-center gap-2.5 shrink-0">
            <button
              id="mobile-sandbox-btn"
              onClick={handleToggleCreatorMode}
              className={`text-xs font-mono leading-none tracking-wider uppercase inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all ${
                creatorMode
                  ? 'bg-amber-600/15 border-amber-600/40 text-amber-700 font-bold shadow-xs'
                  : 'border-black/15 opacity-60'
              }`}
            >
              <span>{creatorMode ? '● Close Sandbox' : '⊙ Open Developer Sandbox'}</span>
            </button>
            {creatorMode && (
              <button
                onClick={handleRestoreDefaults}
                className="text-[9px] font-mono opacity-50 hover:opacity-100 uppercase"
              >
                Restore Defaults
              </button>
            )}
          </div>

          {creatorMode && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-black/15 shrink-0"
              id="drawer-cockpit-workspace"
            >
              <CreatorPanel
                bio={bio}
                projects={projects}
                accentColor={accentColor}
                onSaveBio={handleSaveBio}
                onSaveProject={handleSaveProject}
                onCreateProject={handleCreateProject}
                onDeleteProject={handleDeleteProject}
                onRestoreDefaults={handleRestoreDefaults}
              />
            </motion.div>
          )}
        </main>
      </div>

      {/* PASSWORD PROTECTION DIALOG MODAL */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 text-black"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border-2 border-black rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative text-left"
            >
              {/* Top Accent Dancheong Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 flex">
                <div className="flex-1 bg-[#2F6122]" /> {/* Green */}
                <div className="flex-1 bg-[#851E52]" /> {/* Pink */}
                <div className="flex-1 bg-[#735011]" /> {/* Gold */}
                <div className="flex-1 bg-[#3F2296]" /> {/* Lavender */}
              </div>

              <div className="flex items-start gap-4 pt-2">
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase font-mono tracking-wider">Developer Sandbox</h3>
                  <p className="text-[11px] opacity-60 mt-0.5 font-sans">
                    Authenticate to unlock portfolio editing controls.
                  </p>
                </div>
              </div>

              <form onSubmit={handleVerifyPassword} className="space-y-3.5">
                <div>
                  <label className="text-[10px] font-mono uppercase opacity-55 block mb-1">Enter Lock Phrase</label>
                  <input
                    type="password"
                    autoFocus
                    required
                    placeholder="e.g. dancheong"
                    value={typedPassword}
                    onChange={(e) => {
                      setTypedPassword(e.target.value);
                      setPasswordError('');
                    }}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-black/20 focus:border-black bg-black/[0.01] focus:outline-none font-mono tracking-widest text-center"
                  />
                  {passwordError && (
                    <p className="text-[10px] text-rose-600 font-semibold mt-1.5 font-mono">{passwordError}</p>
                  )}
                </div>

                <div className="bg-amber-50/80 border border-amber-500/10 p-2.5 rounded-lg text-[10px] opacity-75 font-mono leading-relaxed">
                  💡 Default lock phrase is <span className="font-bold underline">dancheong</span>. You can update this phrase in the top toolbar once authenticated.
                </div>

                <div className="flex items-center gap-2 pt-1.5">
                  <button
                    type="submit"
                    className="flex-grow bg-black hover:bg-neutral-800 text-white text-xs font-mono font-bold py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 font-extrabold"
                  >
                    <Key size={12} />
                    <span>Unlock Sandbox</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPasswordModalOpen(false);
                      setTypedPassword('');
                      setPasswordError('');
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold border border-black/15 hover:bg-black/[0.02]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
