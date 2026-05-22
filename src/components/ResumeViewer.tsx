import React, { useState } from 'react';
import { FileText, Download, Briefcase, GraduationCap, Award, ExternalLink, Info, Plus, Trash2 } from 'lucide-react';
import { UserBio } from '../types';
import { EditableText } from './EditableText';

interface ResumeViewerProps {
  bio: UserBio;
  accentColor: string;
  currentMode: 'light' | 'dark';
  highlightColor?: string;
  creatorMode?: boolean;
  onSelfUpdateBio?: (updated: UserBio) => void;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({
  bio,
  accentColor,
  currentMode,
  highlightColor,
  creatorMode = false,
  onSelfUpdateBio,
}) => {
  const [notification, setNotification] = useState<string | null>(null);

  // Retrieve current cv data block, providing a fallback matching her updated CV
  const cvData = bio.cv || {
    experiences: [],
    education: [],
    credentials: [],
    skills: [],
    tools: []
  };

  // Helper trigger to update state
  const notifyParent = (newCv: typeof cvData) => {
    if (onSelfUpdateBio) {
      onSelfUpdateBio({
        ...bio,
        cv: newCv
      });
    }
  };

  // Experiences Helpers
  const handleExperienceChange = (expIdx: number, field: string, val: string) => {
    const nextExps = [...cvData.experiences];
    nextExps[expIdx] = { ...nextExps[expIdx], [field]: val };
    notifyParent({ ...cvData, experiences: nextExps });
  };

  const handleBulletChange = (expIdx: number, bulIdx: number, val: string) => {
    const nextExps = [...cvData.experiences];
    const nextBullets = [...nextExps[expIdx].bullets];
    nextBullets[bulIdx] = val;
    nextExps[expIdx] = { ...nextExps[expIdx], bullets: nextBullets };
    notifyParent({ ...cvData, experiences: nextExps });
  };

  const handleAddBullet = (expIdx: number) => {
    const nextExps = [...cvData.experiences];
    nextExps[expIdx] = {
      ...nextExps[expIdx],
      bullets: [...nextExps[expIdx].bullets, "New user research impact summary bullet point."]
    };
    notifyParent({ ...cvData, experiences: nextExps });
  };

  const handleRemoveBullet = (expIdx: number, bulIdx: number) => {
    const nextExps = [...cvData.experiences];
    const nextBullets = nextExps[expIdx].bullets.filter((_, i) => i !== bulIdx);
    nextExps[expIdx] = { ...nextExps[expIdx], bullets: nextBullets };
    notifyParent({ ...cvData, experiences: nextExps });
  };

  const handleAddExperience = () => {
    const newExp = {
      role: "Lead User Researcher",
      company: "New Innovation Lab · Tupelo, MS",
      period: "2026 – current",
      bullets: ["Coordinated multi-disciplinary studies aligning user requirements with systems architecture."]
    };
    notifyParent({ ...cvData, experiences: [newExp, ...cvData.experiences] });
  };

  const handleRemoveExperience = (expIdx: number) => {
    const nextExps = cvData.experiences.filter((_, i) => i !== expIdx);
    notifyParent({ ...cvData, experiences: nextExps });
  };

  // Education Helpers
  const handleEducationChange = (eduIdx: number, field: string, val: string) => {
    const nextEdu = [...cvData.education];
    nextEdu[eduIdx] = { ...nextEdu[eduIdx], [field]: val };
    notifyParent({ ...cvData, education: nextEdu });
  };

  const handleAddEducation = () => {
    const newEdu = {
      degree: "Certified Specialist Degree",
      school: "Design Research Academy",
      period: "2020 – 2021"
    };
    notifyParent({ ...cvData, education: [...cvData.education, newEdu] });
  };

  const handleRemoveEducation = (eduIdx: number) => {
    notifyParent({ ...cvData, education: cvData.education.filter((_, i) => i !== eduIdx) });
  };

  // Credentials Helpers
  const handleCredentialChange = (idx: number, val: string) => {
    const nextCerts = [...cvData.credentials];
    nextCerts[idx] = val;
    notifyParent({ ...cvData, credentials: nextCerts });
  };

  const handleAddCredential = () => {
    notifyParent({ ...cvData, credentials: [...cvData.credentials, "New Certification / Honor (2026)"] });
  };

  const handleRemoveCredential = (idx: number) => {
    notifyParent({ ...cvData, credentials: cvData.credentials.filter((_, i) => i !== idx) });
  };

  // Skills Helpers
  const handleSkillChange = (idx: number, val: string) => {
    const nextSkills = [...cvData.skills];
    nextSkills[idx] = val;
    notifyParent({ ...cvData, skills: nextSkills });
  };

  const handleAddSkill = () => {
    notifyParent({ ...cvData, skills: [...cvData.skills, "New Skill"] });
  };

  const handleRemoveSkill = (idx: number) => {
    notifyParent({ ...cvData, skills: cvData.skills.filter((_, i) => i !== idx) });
  };

  // Tools Helpers
  const handleToolChange = (idx: number, val: string) => {
    const nextTools = [...cvData.tools];
    nextTools[idx] = val;
    notifyParent({ ...cvData, tools: nextTools });
  };

  const handleAddTool = () => {
    notifyParent({ ...cvData, tools: [...cvData.tools, "New Tool"] });
  };

  const handleRemoveTool = (idx: number) => {
    notifyParent({ ...cvData, tools: cvData.tools.filter((_, i) => i !== idx) });
  };

  return (
    <div className="rounded-2xl p-6 md:p-8 border border-black/10 bg-black/[0.01]" id="resume-viewer-container">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/10 mb-8">
        <div>
          <h3 className="text-2xl font-serif font-black tracking-tight" style={{ color: currentMode === 'dark' ? '#FFFFFF' : '#000000' }}>
            <span className="px-3.5 py-1.5 rounded-xl inline-block highlight-text-force" style={{ backgroundColor: highlightColor, color: currentMode === 'dark' ? '#FFFFFF' : '#000000' }}>
              <EditableText
                value={bio.resumeTabLabel || "Curriculum Vitae"}
                onChange={(val) => onSelfUpdateBio && onSelfUpdateBio({ ...bio, resumeTabLabel: val })}
                active={creatorMode}
              />
            </span>
          </h3>
          <p className="text-xs font-mono opacity-50 mt-1 uppercase font-bold tracking-wider">Interactive Authorized CV</p>
        </div>
        
        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {bio.resumeUrl ? (
            <a
              id="resume-download-link"
              href={bio.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border border-current/20 hover:border-current bg-current/5 transition-all"
            >
              <Download size={13} />
              <span>Download Resume PDF</span>
            </a>
          ) : (
            <button
              id="resume-download-mock"
              onClick={() => {
                setNotification(`Simulated download trigger: Active portfolio copy downloaded in standard layout template. To host a static PDF file, specify your direct PDF link in the Biography Settings panel.`);
                setTimeout(() => setNotification(null), 7000);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border border-current/20 hover:border-current bg-current/5 transition-all cursor-pointer"
            >
              <FileText size={13} />
              <span>Download PDF {bio.resumeFilename ? `(${bio.resumeFilename})` : ''}</span>
            </button>
          )}

          <a
            id="resume-linkedin-link"
            href={bio.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all text-white hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: accentColor }}
          >
            <span>LinkedIn Profile</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {notification && (
        <div className="mb-6 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-600 text-xs flex gap-2.5 items-start animate-fade-in" id="resume-notif-toast">
          <Info size={16} className="shrink-0 mt-0.5" />
          <div className="flex-grow text-left">
            <p className="font-semibold mb-0.5">Offline-Ready PDF Notice</p>
            <p className="opacity-90">{notification}</p>
          </div>
          <button id="close-resume-notif-btn" onClick={() => setNotification(null)} className="font-bold hover:opacity-80 px-1">✕</button>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Summary, expertise, tools & certificates */}
        <div className="space-y-6 lg:border-r lg:border-black/10 lg:pr-8">
          <div>
            <h4 className="text-[10px] uppercase font-mono tracking-wider font-extrabold px-2.5 py-1 rounded-md inline-block mb-3 text-left highlight-text-force" style={{ backgroundColor: highlightColor, color: currentMode === 'dark' ? '#FFFFFF' : '#000000' }}>Professional focus</h4>
            <p className="text-sm font-semibold leading-relaxed text-black/80 text-justify">
              <EditableText
                value={bio.summary}
                onChange={(val) => onSelfUpdateBio && onSelfUpdateBio({ ...bio, summary: val })}
                active={creatorMode}
                type="textarea"
              />
            </p>
          </div>

          <div>
            <h4 className="text-[10px] uppercase font-mono tracking-wider font-extrabold px-2.5 py-1 rounded-md inline-block mb-3 text-left highlight-text-force" style={{ backgroundColor: highlightColor, color: currentMode === 'dark' ? '#FFFFFF' : '#000000' }}>Location & Base</h4>
            <div className="text-sm font-bold text-black text-left">
              <EditableText
                value={bio.location}
                onChange={(val) => onSelfUpdateBio && onSelfUpdateBio({ ...bio, location: val })}
                active={creatorMode}
              />
            </div>
          </div>

          {/* Core Research Skills */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-[10px] uppercase font-mono tracking-wider font-extrabold px-2.5 py-1 rounded-md inline-block text-left highlight-text-force" style={{ backgroundColor: highlightColor, color: currentMode === 'dark' ? '#FFFFFF' : '#000000' }}>Core Skills</h4>
              {creatorMode && (
                <button
                  onClick={handleAddSkill}
                  className="p-1 rounded hover:bg-black/5 text-[10px] font-mono text-emerald-700 flex items-center gap-0.5"
                >
                  <Plus size={10} /> Add
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {cvData.skills.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-mono border inline-flex items-center gap-1"
                  style={{
                    borderColor: `${accentColor}25`,
                    backgroundColor: `${accentColor}06`,
                  }}
                >
                  <EditableText
                    value={tag}
                    onChange={(val) => handleSkillChange(idx, val)}
                    active={creatorMode}
                  />
                  {creatorMode && (
                    <button
                      onClick={() => handleRemoveSkill(idx)}
                      className="text-rose-600 hover:text-rose-900 font-bold text-[10px] ml-0.5"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Tools of Trade */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-[10px] uppercase font-mono tracking-wider font-extrabold px-2.5 py-1 rounded-md inline-block text-left highlight-text-force" style={{ backgroundColor: highlightColor, color: currentMode === 'dark' ? '#FFFFFF' : '#000000' }}>Research Tools</h4>
              {creatorMode && (
                <button
                  onClick={handleAddTool}
                  className="p-1 rounded hover:bg-black/5 text-[10px] font-mono text-emerald-700 flex items-center gap-0.5"
                >
                  <Plus size={10} /> Add
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {cvData.tools.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-mono border inline-flex items-center gap-1"
                  style={{
                    borderColor: `#00000020`,
                    backgroundColor: `rgba(0,0,0,0.02)`,
                  }}
                >
                  <EditableText
                    value={tag}
                    onChange={(val) => handleToolChange(idx, val)}
                    active={creatorMode}
                  />
                  {creatorMode && (
                    <button
                      onClick={() => handleRemoveTool(idx)}
                      className="text-rose-600 hover:text-rose-900 font-bold text-[10px] ml-0.5"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications and credentials list */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-[10px] uppercase font-mono tracking-wider font-extrabold px-2.5 py-1 rounded-md inline-block text-left highlight-text-force" style={{ backgroundColor: highlightColor, color: currentMode === 'dark' ? '#FFFFFF' : '#000000' }}>Credentials & Affiliations</h4>
              {creatorMode && (
                <button
                  onClick={handleAddCredential}
                  className="p-1 rounded hover:bg-black/5 text-[10px] font-mono text-emerald-700 flex items-center gap-0.5"
                >
                  <Plus size={10} /> Add
                </button>
              )}
            </div>
            <div className="space-y-3 text-left">
              {cvData.credentials.map((cert, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <Award size={14} className="mt-0.5 opacity-60 flex-shrink-0" style={{ color: accentColor }} />
                  <div className="flex-grow text-xs leading-normal font-medium opacity-80">
                    <EditableText
                      value={cert}
                      onChange={(val) => handleCredentialChange(idx, val)}
                      active={creatorMode}
                    />
                  </div>
                  {creatorMode && (
                    <button
                      onClick={() => handleRemoveCredential(idx)}
                      className="text-rose-500 hover:text-rose-800 p-0.5"
                    >
                      <Trash2 size={11} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Work Experience & Education details */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase size={15} style={{ color: accentColor }} />
                <h4 className="text-xs font-mono uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md inline-block highlight-text-force" style={{ backgroundColor: highlightColor, color: currentMode === 'dark' ? '#FFFFFF' : '#000000' }}>Core Experience</h4>
              </div>
              {creatorMode && (
                <button
                  onClick={handleAddExperience}
                  className="px-2.5 py-1 rounded bg-black text-white text-[10px] font-mono hover:opacity-85 flex items-center gap-1"
                >
                  <Plus size={11} /> Add Experience
                </button>
              )}
            </div>
            
            <div className="space-y-6 text-left">
              {cvData.experiences.map((exp, idx) => (
                <div key={idx} className="relative pl-4 border-l border-black/10">
                  <div className="absolute w-2.5 h-2.5 rounded-full -left-[5.5px] top-1.5 transition-colors" style={{ backgroundColor: accentColor }} />
                  
                  <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1.5">
                    <h5 className="text-sm font-bold text-black flex-grow">
                      <EditableText
                        value={exp.role}
                        onChange={(val) => handleExperienceChange(idx, 'role', val)}
                        active={creatorMode}
                      />
                    </h5>
                    <span className="text-[10px] font-mono opacity-50 font-bold shrink-0">
                      <EditableText
                        value={exp.period}
                        onChange={(val) => handleExperienceChange(idx, 'period', val)}
                        active={creatorMode}
                      />
                    </span>
                  </div>
                  
                  <div className="text-xs font-semibold opacity-80 mb-2 flex justify-between items-center">
                    <div className="flex-grow">
                      <EditableText
                        value={exp.company}
                        onChange={(val) => handleExperienceChange(idx, 'company', val)}
                        active={creatorMode}
                      />
                    </div>
                    {creatorMode && (
                      <button
                        onClick={() => handleRemoveExperience(idx)}
                        className="text-rose-500 hover:text-rose-700 text-[10px] font-semibold underline ml-2 shrink-0"
                        title="Delete Role"
                      >
                        Remove Role
                      </button>
                    )}
                  </div>
                  
                  <ul className="space-y-1.5">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-justify leading-relaxed opacity-80 pl-4 relative group">
                        <span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-black/40" />
                        <div className="flex-grow pr-6">
                          <EditableText
                            value={bullet}
                            onChange={(val) => handleBulletChange(idx, bIdx, val)}
                            active={creatorMode}
                            type="textarea"
                          />
                        </div>
                        {creatorMode && (
                          <button
                            onClick={() => handleRemoveBullet(idx, bIdx)}
                            className="absolute right-0 top-1 text-rose-500 opacity-0 group-hover:opacity-100 hover:text-rose-700 p-0.5"
                            title="Remove bullet point"
                          >
                            ×
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>

                  {creatorMode && (
                    <button
                      onClick={() => handleAddBullet(idx)}
                      className="mt-2 text-[10px] font-mono text-emerald-600 hover:underline flex items-center gap-0.5 ml-4"
                    >
                      <Plus size={10} /> Add bullet point
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education timeline list */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GraduationCap size={15} style={{ color: accentColor }} />
                <h4 className="text-xs font-mono uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md inline-block highlight-text-force" style={{ backgroundColor: highlightColor, color: currentMode === 'dark' ? '#FFFFFF' : '#000000' }}>Academic Training</h4>
              </div>
              {creatorMode && (
                <button
                  onClick={handleAddEducation}
                  className="px-2.5 py-1 rounded bg-black text-white text-[10px] font-mono hover:opacity-85 flex items-center gap-1"
                >
                  <Plus size={11} /> Add Degree
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {cvData.education.map((edu, idx) => (
                <div key={idx} className="p-3.5 rounded-lg border border-black/5 bg-black/[0.01] relative group">
                  {creatorMode && (
                    <button
                      onClick={() => handleRemoveEducation(idx)}
                      className="absolute right-2 top-2 p-1 rounded-md hover:bg-black/5 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete education node"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                  <span className="text-[10px] font-mono opacity-40 block mb-1 font-bold">
                    <EditableText
                      value={edu.period}
                      onChange={(val) => handleEducationChange(idx, 'period', val)}
                      active={creatorMode}
                    />
                  </span>
                  <h5 className="text-xs font-bold leading-tight mb-0.5 text-black">
                    <EditableText
                      value={edu.degree}
                      onChange={(val) => handleEducationChange(idx, 'degree', val)}
                      active={creatorMode}
                    />
                  </h5>
                  <p className="text-[11px] opacity-70">
                    <EditableText
                      value={edu.school}
                      onChange={(val) => handleEducationChange(idx, 'school', val)}
                      active={creatorMode}
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
