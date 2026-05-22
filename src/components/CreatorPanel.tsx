import React, { useState } from 'react';
import { Save, Plus, Trash2, Undo, Upload, Key, Eye, EyeOff, ShieldAlert, Check, Image, FileText, User, FolderPlus } from 'lucide-react';
import { UserBio, CaseStudy, ResearchPhase, Insight } from '../types';

interface CreatorPanelProps {
  bio: UserBio;
  projects: CaseStudy[];
  accentColor: string;
  onSaveBio: (updatedBio: UserBio) => void;
  onSaveProject: (project: CaseStudy) => void;
  onCreateProject: (project: CaseStudy) => void;
  onDeleteProject: (projectId: string) => void;
  onRestoreDefaults: () => void;
}

export const CreatorPanel: React.FC<CreatorPanelProps> = ({
  bio,
  projects,
  accentColor,
  onSaveBio,
  onSaveProject,
  onCreateProject,
  onDeleteProject,
  onRestoreDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'projects'>('bio');

  // Bio Form State
  const [bioName, setBioName] = useState(bio.name);
  const [bioTitle, setBioTitle] = useState(bio.title);
  const [bioLocation, setBioLocation] = useState(bio.location);
  const [bioSummary, setBioSummary] = useState(bio.summary);
  const [bioParagraphs, setBioParagraphs] = useState<string[]>(bio.paragraphs);
  const [bioPhoto, setBioPhoto] = useState(bio.photoUrl || '');
  const [bioResumeUrl, setBioResumeUrl] = useState(bio.resumeUrl || '');
  const [bioResumeFilename, setBioResumeFilename] = useState(bio.resumeFilename || '');
  const [bioLinkedin, setBioLinkedin] = useState(bio.linkedinUrl);

  const [bioSavedMsg, setBioSavedMsg] = useState(false);

  // Projects Form State
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'new');
  
  // Single Project Form Inputs
  const [projTitle, setProjTitle] = useState('');
  const [projSubtitle, setProjSubtitle] = useState('');
  const [projRole, setProjRole] = useState('');
  const [projCompany, setProjCompany] = useState('');
  const [projDuration, setProjDuration] = useState('');
  const [projSummary, setProjSummary] = useState('');
  const [projProblem, setProjProblem] = useState('');
  const [projMethods, setProjMethods] = useState<string[]>([]);
  const [projPhases, setProjPhases] = useState<ResearchPhase[]>([]);
  const [projInsights, setProjInsights] = useState<Insight[]>([]);
  const [projImpact, setProjImpact] = useState('');
  const [projPassword, setProjPassword] = useState('');
  const [projImageUrl, setProjImageUrl] = useState('');
  
  // Helpers
  const [newMethodTag, setNewMethodTag] = useState('');
  const [newPhaseTitle, setNewPhaseTitle] = useState('');
  const [newPhaseDesc, setNewPhaseDesc] = useState('');
  const [newInsightTitle, setNewInsightTitle] = useState('');
  const [newInsightDesc, setNewInsightDesc] = useState('');
  const [projectSavedMsg, setProjectSavedMsg] = useState(false);

  // Sync selected project with inputs
  React.useEffect(() => {
    if (selectedProjectId === 'new') {
      // Clear form
      setProjTitle('');
      setProjSubtitle('');
      setProjRole('Associate UX Researcher');
      setProjDuration('Flexible duration');
      setProjCompany('');
      setProjSummary('');
      setProjProblem('');
      setProjMethods(['User Interviews', 'Usability Testing']);
      setProjPhases([
        { id: '1', phase: 'Contextual Inquiries', description: 'Met extreme users in active physical settings.' },
        { id: '2', phase: 'Prototype Testing', description: 'Iteratively audited high fidelity wireframes in-browser.' }
      ]);
      setProjInsights([
        { id: '1', title: 'Actionable milestone indicator', description: 'Discovered key user roadblocks of latency.' }
      ]);
      setProjImpact('Successfully minimized click through rates by significant margin.');
      setProjPassword('');
      setProjImageUrl('https://picsum.photos/seed/newproject/800/600');
    } else {
      const p = projects.find((x) => x.id === selectedProjectId);
      if (p) {
        setProjTitle(p.title);
        setProjSubtitle(p.subtitle);
        setProjRole(p.role);
        setProjDuration(p.duration);
        setProjCompany(p.company || '');
        setProjSummary(p.summary);
        setProjProblem(p.problem);
        setProjMethods(p.methods || []);
        setProjPhases(p.phases || []);
        setProjInsights(p.insights || []);
        setProjImpact(p.impact || '');
        setProjPassword(p.password || '');
        setProjImageUrl(p.imageUrl || '');
      }
    }
    setProjectSavedMsg(false);
  }, [selectedProjectId, projects]);

  // Handle Photo File Upload Base64 conversion
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBioPhoto(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Project Image Base64 conversion
  const handleProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProjImageUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Biography
  const handleSaveBioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBio({
      ...bio,
      name: bioName,
      title: bioTitle,
      location: bioLocation,
      summary: bioSummary,
      paragraphs: bioParagraphs,
      photoUrl: bioPhoto,
      resumeUrl: bioResumeUrl,
      resumeFilename: bioResumeFilename,
      linkedinUrl: bioLinkedin,
    });
    setBioSavedMsg(true);
    setTimeout(() => setBioSavedMsg(false), 2500);
  };

  // Save / Create Project
  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProject: CaseStudy = {
      id: selectedProjectId === 'new' ? `project-${Date.now()}` : selectedProjectId,
      title: projTitle || "Untitled User Research Project",
      subtitle: projSubtitle,
      role: projRole,
      duration: projDuration,
      company: projCompany || undefined,
      summary: projSummary,
      problem: projProblem,
      methods: projMethods,
      phases: projPhases,
      insights: projInsights,
      impact: projImpact,
      password: projPassword || undefined,
      imageUrl: projImageUrl,
    };

    if (selectedProjectId === 'new') {
      onCreateProject(updatedProject);
      setSelectedProjectId(updatedProject.id);
    } else {
      onSaveProject(updatedProject);
    }
    setProjectSavedMsg(true);
    setTimeout(() => setProjectSavedMsg(false), 2500);
  };

  // Tag manager helpers
  const handleAddMethod = () => {
    if (newMethodTag.trim() && !projMethods.includes(newMethodTag.trim())) {
      setProjMethods([...projMethods, newMethodTag.trim()]);
      setNewMethodTag('');
    }
  };

  const handleRemoveMethod = (tag: string) => {
    setProjMethods(projMethods.filter((t) => t !== tag));
  };

  // Study Phase helpers
  const handleAddPhase = () => {
    if (newPhaseTitle.trim()) {
      const newPhase: ResearchPhase = {
        id: `phase-${Date.now()}`,
        phase: newPhaseTitle.trim(),
        description: newPhaseDesc.trim() || 'No description provided.',
      };
      setProjPhases([...projPhases, newPhase]);
      setNewPhaseTitle('');
      setNewPhaseDesc('');
    }
  };

  const handleRemovePhase = (phaseId: string) => {
    setProjPhases(projPhases.filter((p) => p.id !== phaseId));
  };

  // Insights helper
  const handleAddInsight = () => {
    if (newInsightTitle.trim()) {
      const newIn: Insight = {
        id: `insight-${Date.now()}`,
        title: newInsightTitle.trim(),
        description: newInsightDesc.trim() || 'No description provided.',
      };
      setProjInsights([...projInsights, newIn]);
      setNewInsightTitle('');
      setNewInsightDesc('');
    }
  };

  const handleRemoveInsight = (insightId: string) => {
    setProjInsights(projInsights.filter((i) => i.id !== insightId));
  };

  const bioParaUpdate = (index: number, val: string) => {
    const updated = [...bioParagraphs];
    updated[index] = val;
    setBioParagraphs(updated);
  };

  const deleteBioPara = (index: number) => {
    setBioParagraphs(bioParagraphs.filter((_, idx) => idx !== index));
  };

  const addBioPara = () => {
    setBioParagraphs([...bioParagraphs, 'New bio paragraph. Fill in details.']);
  };

  return (
    <div className="bg-current/[0.02] border border-current/10 rounded-2xl p-5 md:p-6 text-left" id="creator-workspace">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-current/10 mb-6">
        <div>
          <h2 className="text-base font-bold tracking-tight uppercase font-mono">
            Portfolio Creator & Admin Cockpit
          </h2>
          <p className="text-[11px] opacity-60">
            Real-time customization panel to preview, create, delete, and password protect everything on this portfolio.
          </p>
        </div>

        <button
          id="restore-defaults-btn"
          onClick={() => {
            if (confirm('Are you sure you want to restore the default pristine Dancheong UX Portfolio? Your local edits will be reset.')) {
              onRestoreDefaults();
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-current/25 hover:border-current text-[10px] font-mono leading-none bg-current-bg font-bold shadow-sm"
        >
          <Undo size={11} />
          <span>Restore Default Templets</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-current/10 mb-6" id="creator-tabs">
        <button
          id="creator-tab-bio"
          onClick={() => setActiveTab('bio')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-medium -mb-px transition-all ${
            activeTab === 'bio'
              ? 'border-b-2 border-current font-bold'
              : 'opacity-50 hover:opacity-100'
          }`}
          style={activeTab === 'bio' ? { borderBottomColor: accentColor } : {}}
        >
          <User size={13} />
          <span>Customize Profile (About Page)</span>
        </button>
        <button
          id="creator-tab-projects"
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-medium -mb-px transition-all ${
            activeTab === 'projects'
              ? 'border-b-2 border-current font-bold'
              : 'opacity-50 hover:opacity-100'
          }`}
          style={activeTab === 'projects' ? { borderBottomColor: accentColor } : {}}
        >
          <FolderPlus size={13} />
          <span>Case Studies Builder (Projects)</span>
        </button>
      </div>

      {/* Tab CONTENT 1: BIO EDIT */}
      {activeTab === 'bio' && (
        <form onSubmit={handleSaveBioSubmit} className="space-y-6" id="creator-bio-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Inputs */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase opacity-55 block mb-1">Your Full Name</label>
                <input
                  required
                  id="author-name-input"
                  type="text"
                  value={bioName}
                  onChange={(e) => setBioName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-current/25 bg-current-bg focus:outline-none focus:border-current"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase opacity-55 block mb-1">Professional Title</label>
                <input
                  required
                  id="author-title-input"
                  type="text"
                  value={bioTitle}
                  onChange={(e) => setBioTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-current/25 bg-current-bg focus:outline-none focus:border-current"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase opacity-55 block mb-1">Office Location</label>
                <input
                  required
                  id="author-location-input"
                  type="text"
                  value={bioLocation}
                  onChange={(e) => setBioLocation(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-current/25 bg-current-bg focus:outline-none focus:border-current"
                />
              </div>
            </div>

            {/* Right Profile Photo & Resume */}
            <div className="space-y-4">
              {/* Photo Upload representation */}
              <div>
                <label className="text-[10px] font-mono uppercase opacity-55 block mb-1">Profile Photo (Converts to Base64 Offline)</label>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border border-current/20 overflow-hidden flex-shrink-0 bg-current/5 flex items-center justify-center">
                    {bioPhoto ? (
                      <img src={bioPhoto} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User size={18} className="opacity-40" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-current/20 hover:border-current bg-current-bg text-xs font-mono leading-none cursor-pointer">
                      <Upload size={12} />
                      <span>Upload Profile Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                    <p className="text-[9px] opacity-40 mt-1">Accepts JPEG/PNG. Stored securely inside localStorage.</p>
                  </div>
                </div>
              </div>

              {/* Resume Settings */}
              <div className="p-3.5 rounded-lg border border-current/10 bg-current/[0.01]">
                <span className="text-[10px] font-bold font-mono uppercase opacity-60 block mb-2">Resume link & Attachments</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[9px] font-mono opacity-50 block mb-0.5">Resume Label Filename</label>
                    <input
                      type="text"
                      placeholder="e.g. Clara_Yoon_UXR_Resume.pdf"
                      value={bioResumeFilename}
                      onChange={(e) => setBioResumeFilename(e.target.value)}
                      className="w-full text-[11px] px-2.5 py-1.5 rounded border border-current/20 bg-current-bg"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-mono opacity-50 block mb-0.5">External URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="e.g. https://domain.com/cv.pdf"
                      value={bioResumeUrl}
                      onChange={(e) => setBioResumeUrl(e.target.value)}
                      className="w-full text-[11px] px-2.5 py-1.5 rounded border border-current/20 bg-current-bg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Summary Quote */}
          <div>
            <label className="text-[10px] font-mono uppercase opacity-55 block mb-1">Executive Summary (Featured Core Statement)</label>
            <textarea
              required
              rows={2}
              value={bioSummary}
              onChange={(e) => setBioSummary(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-current/25 bg-current-bg focus:outline-none focus:border-current text-justify"
            />
          </div>

          {/* Paragraphs */}
          <div className="space-y-3.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-mono uppercase opacity-55">Detailed Biography Paragraphs</label>
              <button
                type="button"
                onClick={addBioPara}
                className="text-[10px] font-mono text-emerald-700 hover:underline flex items-center gap-1"
              >
                <Plus size={10} />
                <span>Add bio paragraph</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {bioParagraphs.map((para, paraIdx) => (
                <div key={paraIdx} className="flex gap-2">
                  <span className="text-[11px] font-mono opacity-30 mt-2.5">0{paraIdx + 1}</span>
                  <textarea
                    rows={2}
                    value={para}
                    onChange={(e) => bioParaUpdate(paraIdx, e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-current/15 bg-current-bg text-justify"
                  />
                  <button
                    type="button"
                    onClick={() => deleteBioPara(paraIdx)}
                    className="p-2.5 text-rose-600 hover:bg-rose-50 rounded-lg self-center"
                    disabled={bioParagraphs.length === 1}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <label className="text-[10px] font-mono uppercase opacity-55 block mb-1">LinkedIn URL</label>
            <input
              required
              type="url"
              value={bioLinkedin}
              onChange={(e) => setBioLinkedin(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-current/25 bg-current-bg focus:outline-none focus:border-current"
            />
          </div>

          {/* Saved message */}
          <div className="pt-2 border-t border-current/10 flex justify-end items-center gap-2">
            {bioSavedMsg && (
              <span className="text-xs font-mono text-emerald-600 flex items-center gap-1">
                <Check size={12} />
                <span>Profile Saved Successfully!</span>
              </span>
            )}
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium text-xs shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              style={{ backgroundColor: accentColor }}
            >
              <Save size={13} />
              <span>Save Biography Profile</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab CONTENT 2: CASE STUDIES (PROJECTS) BUILDER */}
      {activeTab === 'projects' && (
        <div className="space-y-6" id="projects-builder-container">
          {/* Project Selector / Creator Switch */}
          <div className="p-3 bg-current/[0.02] border border-current/10 rounded-xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold opacity-60">SELECT STUDY:</span>
              <select
                id="select-project-to-edit"
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-current/25 bg-current-bg focus:outline-none"
              >
                <option value="new">[ + Create Completely New Case Study ]</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title.length > 50 ? `${p.title.substring(0, 47)}...` : p.title} {p.password ? '🔐' : ''}
                  </option>
                ))}
              </select>
            </div>

            {selectedProjectId !== 'new' && (
              <button
                id="delete-selected-project-btn"
                type="button"
                onClick={() => {
                  if (confirm('Are you absolutely sure you want to delete this case study from your active portfolio?')) {
                    onDeleteProject(selectedProjectId);
                    setSelectedProjectId(projects[0]?.id || 'new');
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-[10px] font-mono leading-none"
              >
                <Trash2 size={11} />
                <span>Delete Selected Case Study</span>
              </button>
            )}
          </div>

          {/* Project Form */}
          <form onSubmit={handleSaveProjectForm} className="space-y-6" id="project-edit-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Box Left */}
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase opacity-55 block mb-1">Project Title</label>
                  <input
                    required
                    type="text"
                    value={projTitle}
                    placeholder="e.g. Redesigning Healthcare Dashboards for Nurses"
                    onChange={(e) => setProjTitle(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-current/25 bg-current-bg focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase opacity-55 block mb-1">Project Subtitle / TL;DR</label>
                  <input
                    required
                    type="text"
                    value={projSubtitle}
                    placeholder="e.g. Contextual inquiry and responsive prototyping under emergency room pressures."
                    onChange={(e) => setProjSubtitle(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-current/25 bg-current-bg focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase opacity-55 block mb-1">Company</label>
                    <input
                      type="text"
                      value={projCompany}
                      placeholder="e.g. Hungryroot"
                      onChange={(e) => setProjCompany(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-current/25 bg-current-bg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase opacity-55 block mb-1">My Role</label>
                    <input
                      required
                      type="text"
                      value={projRole}
                      placeholder="e.g. Lead Researcher"
                      onChange={(e) => setProjRole(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-current/25 bg-current-bg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase opacity-55 block mb-1">Project Duration</label>
                    <input
                      required
                      type="text"
                      value={projDuration}
                      placeholder="e.g. 5 Months (Spring 2025)"
                      onChange={(e) => setProjDuration(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-current/25 bg-current-bg focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Box Right */}
              <div className="space-y-4">
                {/* Security settings */}
                <div className="p-4 rounded-xl border border-current/10 bg-current/[0.01]">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <Key size={12} style={{ color: accentColor }} />
                    <span className="text-[10px] font-bold font-mono uppercase opacity-60">Security & Password Safeguards</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] opacity-60 mb-2 leading-relaxed">
                        To protect sensitive user insights, secure this case study behind a password. Leave blank to make this project entirely public.
                      </p>
                      
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Passphrase code (leave blank to disable lock)"
                          value={projPassword}
                          onChange={(e) => setProjPassword(e.target.value)}
                          className="flex-grow text-xs px-3 py-2 rounded-lg border border-current/25 bg-current-bg font-mono"
                        />
                        {projPassword ? (
                          <div className="px-2.5 py-1.5 rounded-lg bg-amber-600/10 text-amber-600 flex items-center justify-center border border-amber-500/20">
                            <Key size={13} className="animate-spin-slow" />
                          </div>
                        ) : (
                          <div className="px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center border">
                            <EyeOff size={13} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload Image banner */}
                <div>
                  <label className="text-[10px] font-mono uppercase opacity-55 block mb-1">Banner Image / Case Study Thumbnail </label>
                  <div className="flex gap-4">
                    <div className="w-16 h-12 rounded-lg border border-current/20 overflow-hidden flex-shrink-0 bg-current/5 flex items-center justify-center">
                      {projImageUrl ? (
                        <img src={projImageUrl} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <Image size={18} className="opacity-40" />
                      )}
                    </div>
                    <div className="flex-grow space-y-2">
                      <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-current/20 hover:border-current bg-current-bg text-xs font-mono leading-none cursor-pointer">
                        <Upload size={12} />
                        <span>Upload Custom Banner</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleProjectImageUpload}
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Or specify placeholder URL"
                        value={projImageUrl}
                        onChange={(e) => setProjImageUrl(e.target.value)}
                        className="w-full text-[11px] px-2.5 py-1 rounded border border-current/20 bg-current-bg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summaries & problems */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-mono uppercase opacity-55 block mb-1">Extended Executive Summary</label>
                <textarea
                  required
                  rows={3}
                  value={projSummary}
                  placeholder="Detailed layout of why this project was initiated and the strategic outcome..."
                  onChange={(e) => setProjSummary(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-current/25 bg-current-bg text-justify"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase opacity-55 block mb-1">The Problem</label>
                <textarea
                  required
                  rows={3}
                  value={projProblem}
                  placeholder="What was the principal obstacle preventing users from succeeding, or the deep design unknown?"
                  onChange={(e) => setProjProblem(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-current/25 bg-current-bg text-justify"
                />
              </div>
            </div>

            {/* Sub-Manager for Methods (Tags) */}
            <div className="p-4 rounded-xl border border-current/10 bg-current/[0.01] space-y-3">
              <span className="text-[10px] font-bold font-mono uppercase opacity-65 block">Methodology tag managers</span>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type tag (e.g. Usability Testing, Tree Testing, Eye-Tracking)"
                  value={newMethodTag}
                  onChange={(e) => setNewMethodTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddMethod();
                    }
                  }}
                  className="flex-grow text-xs px-3 py-1.5 rounded-lg border border-current/20 bg-current-bg"
                />
                <button
                  type="button"
                  onClick={handleAddMethod}
                  className="px-4 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-medium"
                >
                  Add Tag
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {projMethods.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono border bg-current/5"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMethod(tag)}
                      className="text-rose-600 hover:text-rose-800 font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Sub-Manager for Research Phases */}
            <div className="p-4 rounded-xl border border-current/10 bg-current/[0.01] space-y-4">
              <span className="text-[10px] font-bold font-mono uppercase opacity-65 block">Phases</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-current-bg/50 p-3 rounded-lg border border-current/5">
                <div>
                  <label className="text-[9px] font-mono opacity-50 block mb-0.5">Phase Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Iterative Prototyping"
                    value={newPhaseTitle}
                    onChange={(e) => setNewPhaseTitle(e.target.value)}
                    className="w-full text-xs px-2.5 py-2 rounded border border-current/15 bg-current-bg"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-mono opacity-50 block mb-0.5">Phase Summary / Explanation</label>
                  <input
                    type="text"
                    placeholder="Brief description of milestones..."
                    value={newPhaseDesc}
                    onChange={(e) => setNewPhaseDesc(e.target.value)}
                    className="w-full text-xs px-2.5 py-2 rounded border border-current/15 bg-current-bg"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddPhase}
                    className="text-xs px-3.5 py-1.5 rounded border border-current/20 bg-current-bg hover:border-current flex items-center gap-1"
                  >
                    <Plus size={11} />
                    <span>Append Phase Stage</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2 mt-2">
                {projPhases.map((phase, idx) => (
                  <div key={phase.id} className="p-3 rounded-lg bg-current-bg border flex items-center justify-between text-justify">
                    <div>
                      <div className="text-xs font-bold font-mono" style={{ color: accentColor }}>
                        Stage 0{idx + 1}: {phase.phase}
                      </div>
                      <div className="text-[11px] opacity-70 mt-1">{phase.description}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemovePhase(phase.id)}
                      className="text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-Manager for Insights */}
            <div className="p-4 rounded-xl border border-current/10 bg-current/[0.01] space-y-4">
              <span className="text-[10px] font-bold font-mono uppercase opacity-65 block">Insights</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-current-bg/50 p-3 rounded-lg border border-current/5">
                <div>
                  <label className="text-[9px] font-mono opacity-50 block mb-0.5">Insight Headline</label>
                  <input
                    type="text"
                    placeholder="e.g. Cognitive counting bottlenecks"
                    value={newInsightTitle}
                    onChange={(e) => setNewInsightTitle(e.target.value)}
                    className="w-full text-xs px-2.5 py-2 rounded border border-current/15 bg-current-bg"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-mono opacity-50 block mb-0.5">Insight Detail Explanation</label>
                  <input
                    type="text"
                    placeholder="What evidence led to this discovery..."
                    value={newInsightDesc}
                    onChange={(e) => setNewInsightDesc(e.target.value)}
                    className="w-full text-xs px-2.5 py-2 rounded border border-current/15 bg-current-bg"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddInsight}
                    className="text-xs px-3.5 py-1.5 rounded border border-current/20 bg-current-bg hover:border-current flex items-center gap-1"
                  >
                    <Plus size={11} />
                    <span>Append Core Insight</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2 mt-2">
                {projInsights.map((ins, idx) => (
                  <div key={ins.id} className="p-3 rounded-lg bg-current-bg border flex items-center justify-between text-justify">
                    <div>
                      <div className="text-xs font-bold font-mono">
                        Insight 0{idx + 1}: {ins.title}
                      </div>
                      <div className="text-[11px] opacity-70 mt-1">{ins.description}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveInsight(ins.id)}
                      className="text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact field */}
            <div>
              <label className="text-[10px] font-mono uppercase opacity-55 block mb-1">Impact & Outcomes</label>
              <textarea
                required
                rows={2}
                value={projImpact}
                placeholder="Brief summary of measurable achievements or qualitative feedback..."
                onChange={(e) => setProjImpact(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-current/25 bg-current-bg text-justify"
              />
            </div>

            {/* Submit Block */}
            <div className="pt-2 border-t border-current/10 flex justify-end items-center gap-2">
              {projectSavedMsg && (
                <span className="text-xs font-mono text-emerald-600 flex items-center gap-1">
                  <Check size={12} />
                  <span>Case Study Saved & Secured!</span>
                </span>
              )}
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium text-xs shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                style={{ backgroundColor: accentColor }}
              >
                {selectedProjectId === 'new' ? (
                  <>
                    <Plus size={13} />
                    <span>Create & Publish New Project</span>
                  </>
                ) : (
                  <>
                    <Save size={13} />
                    <span>Update Active Case Study</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
