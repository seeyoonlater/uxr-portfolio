import React, { useState } from 'react';
import { Lock, Unlock, Key, ArrowRight, ShieldAlert, Sparkles, Clock, Compass, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CaseStudy } from '../types';

interface ProjectCardProps {
  project: CaseStudy;
  accentColor: string;
  currentMode: 'light' | 'dark';
  onSelect: (project: CaseStudy) => void;
  highlightColor?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  accentColor,
  currentMode,
  onSelect,
  highlightColor,
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showUnlockFlow, setShowUnlockFlow] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const isProtected = !!project.password;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === project.password) {
      setIsUnlocked(true);
      setErrorMsg('');
      onSelect(project); // Open full study!
    } else {
      setErrorMsg('Incorrect credential. Please try again.');
      // Flash animation target
    }
  };

  const handleCardClick = () => {
    if (!isProtected || isUnlocked) {
      onSelect(project);
    } else {
      setShowUnlockFlow(true);
    }
  };

  return (
    <div
      className="relative rounded-2xl border border-current/10 overflow-hidden flex flex-col group transition-all duration-300 hover:border-current/30 hover:shadow-lg hover:-translate-y-0.5 bg-current/[0.01]"
      id={`project-card-${project.id}`}
    >
      {/* Absolute image or decorative pattern header */}
      <div className="relative h-44 overflow-hidden bg-current/5" id="thumbnail-container">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.imageAlt || project.title}
            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-radial from-current/5 to-current/10">
            <span className="text-xs font-mono opacity-20">No thumbnail uploaded</span>
          </div>
        )}
        
        {/* Layer Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-current-bg via-transparent to-transparent opacity-80" />

        {/* Categories / Tags badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          <span className="px-2.5 py-1 rounded-full text-[9px] font-mono font-medium bg-current-bg/90 tracking-wider text-current shadow-sm">
            {project.role}
          </span>
        </div>

        {/* Lock indicator */}
        {isProtected && !isUnlocked && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold bg-amber-600/10 text-amber-600 border border-amber-500/20 backdrop-blur-xs">
            <Lock size={10} className="animate-pulse" />
            <span>PROTECTED</span>
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2 text-[10px] font-mono opacity-50">
            <Clock size={11} />
            <span>{project.duration}</span>
          </div>

          <h3
            className="text-md font-serif font-black tracking-tight mb-2 hover:opacity-90 cursor-pointer text-justify inline-block px-3 py-1.5 rounded-xl transition-transform hover:scale-[1.01] leading-snug highlight-text-force"
            style={{ backgroundColor: highlightColor, color: currentMode === 'dark' ? '#FFFFFF' : '#000000' }}
            onClick={handleCardClick}
          >
            {project.title}
          </h3>

          <p className="text-xs opacity-70 leading-relaxed mb-4 text-justify line-clamp-3">
            {project.subtitle}
          </p>
        </div>

        <div>
          {/* Methods Used snippet */}
          {project.methods && project.methods.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1 mt-1.5">
                {project.methods.slice(0, 3).map((method, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[9px] font-mono border border-current/10 bg-current/5 opacity-80"
                  >
                    {method}
                  </span>
                ))}
                {project.methods.length > 3 && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono opacity-40">
                    +{project.methods.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Trigger button */}
          {!showUnlockFlow ? (
            <button
              id={`read-case-btn-${project.id}`}
              onClick={handleCardClick}
              className="w-full py-2.5 rounded-xl border border-current/15 hover:border-current bg-current/5 hover:bg-current/10 flex items-center justify-center gap-2 text-xs font-medium transition-all"
            >
              {isProtected && !isUnlocked ? (
                <>
                  <Lock size={12} />
                  <span>Unlock Case Study</span>
                </>
              ) : (
                <>
                  <span>Read Case Study</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          ) : (
            <motion.form
              onSubmit={handleUnlock}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="border-t border-current/10 pt-4 space-y-2.5"
              id={`unlock-form-${project.id}`}
            >
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono font-medium flex items-center gap-1 opacity-70">
                  <Key size={10} alt="Password prompt" />
                  <span>Enter Code Phrase:</span>
                </label>
                <div className="group relative">
                  <HelpCircle size={11} className="opacity-40 hover:opacity-100 cursor-help" />
                  <span className="absolute right-0 bottom-4 scale-0 group-hover:scale-100 bg-neutral-800 text-white rounded text-[9px] p-2 font-mono whitespace-nowrap z-30 transition-all opacity-0 group-hover:opacity-100 shadow-lg">
                    Demo key is: <strong className="text-amber-300 font-bold">{project.password}</strong>
                  </span>
                </div>
              </div>

              <div className="flex gap-1.5">
                <input
                  id={`password-input-${project.id}`}
                  type="password"
                  required
                  placeholder="e.g. hanji"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setErrorMsg('');
                  }}
                  className="flex-grow text-xs px-3 py-1.5 rounded-lg border border-current/25 bg-current-bg/50 focus:outline-none focus:border-neutral-500 placeholder-current/30"
                />
                <button
                  id={`submit-unlock-btn-${project.id}`}
                  type="submit"
                  className="px-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center"
                  style={{ backgroundColor: accentColor }}
                >
                  <ArrowRight size={12} />
                </button>
              </div>

              {errorMsg && (
                <div className="text-[10px] font-medium text-rose-600 flex items-center gap-1 leading-none mt-1 animate-pulse">
                  <ShieldAlert size={10} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-[9px] font-mono opacity-50 pt-1.5">
                <span>Hint: enter `{project.password}`</span>
                <button
                  id={`cancel-unlock-btn-${project.id}`}
                  type="button"
                  onClick={() => setShowUnlockFlow(false)}
                  className="hover:underline hover:opacity-100"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
};
