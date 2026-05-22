import React from 'react';
import { ArrowLeft, BookOpen, Compass, Lightbulb, TrendingUp, Shield, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { CaseStudy } from '../types';

interface CaseStudyDetailProps {
  project: CaseStudy;
  accentColor: string;
  currentMode: 'light' | 'dark';
  onBack: () => void;
  highlightColor?: string;
}

export const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({
  project,
  accentColor,
  currentMode,
  onBack,
  highlightColor,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-10 focus:outline-none"
      id={`study-detail-${project.id}`}
    >
      {/* Return Control */}
      <div className="flex items-center justify-between pb-4 border-b border-current/10">
        <button
          id="back-to-projects-btn"
          onClick={onBack}
          className="inline-flex items-center gap-2 group text-xs font-mono font-medium opacity-60 hover:opacity-100 transition-all cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to All Case Studies</span>
        </button>

        <span className="text-[10px] font-mono opacity-45 uppercase tracking-wider">
          Case Summary / {project.role}
        </span>
      </div>

      {/* Main Feature Banner */}
      <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 bg-current/5" id="detail-banner">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover grayscale opacity-75"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-radial from-current/5 via-current/8 to-current/12" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
        
        {/* Banner Details Overlay */}
        <div className="absolute bottom-6 left-6 right-6 text-white text-left">
          <div className="flex flex-wrap gap-2 mb-2 items-center">
            {project.company && (
              <span className="px-2.5 py-1 rounded text-[10px] font-mono tracking-widest uppercase bg-white/10 border border-white/25 backdrop-blur-md">
                {project.company}
              </span>
            )}
            <span className="px-2.5 py-1 rounded text-[10px] font-mono tracking-widest uppercase bg-white/20 backdrop-blur-md">
              {project.role}
            </span>
            <span className="px-2.5 py-1 rounded text-[10px] font-mono tracking-widest uppercase bg-amber-600/35 backdrop-blur-md">
              {project.duration}
            </span>
          </div>
          <h1 className="text-xl md:text-3xl font-serif font-bold tracking-tight leading-tight max-w-4xl text-[#FDFCF7]">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Overview Block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
        {/* Main Context Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Executive Summary */}
          <div>
            <h3 className="text-xs uppercase font-mono font-black tracking-widest px-2.5 py-1 rounded-md inline-block mb-3 highlight-text-force" style={{ backgroundColor: highlightColor, color: currentMode === 'dark' ? '#FFFFFF' : '#000000' }}>
              Executive Summary
            </h3>
            <p className="text-base leading-relaxed text-justify opacity-90 first-letter:text-3xl first-letter:font-serif first-letter:mr-2 first-letter:float-left">
              {project.summary}
            </p>
          </div>

          {/* Core Roadblock / Problem Statement */}
          <div className="relative pl-6 py-4 border-l-2 bg-current/[0.01] rounded-r-xl" style={{ borderColor: accentColor }} id="problem-callout">
            <h4 className="text-[10px] uppercase font-mono tracking-widest opacity-50 mb-1.5 font-bold">
              The Problem
            </h4>
            <p className="text-sm font-medium leading-relaxed italic text-justify opacity-80">
              {project.problem}
            </p>
          </div>
        </div>

        {/* Project Meta Metrics Column */}
        <div className="p-5 rounded-xl border border-current/10 bg-current/[0.02] space-y-6 flex flex-col justify-between" id="metadata-block">
          <div>
            <h4 className="text-[10px] uppercase font-mono font-extrabold tracking-wider px-2 py-0.5 rounded-md inline-block mb-2.5 highlight-text-force" style={{ backgroundColor: highlightColor, color: currentMode === 'dark' ? '#FFFFFF' : '#000000' }}>
              Research Methodologies
            </h4>
            <div className="flex flex-wrap gap-1.5" id="methodology-tags">
              {project.methods && project.methods.map((method, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded text-[10px] font-mono font-medium border"
                  style={{
                    borderColor: `${accentColor}25`,
                    backgroundColor: `${accentColor}06`,
                  }}
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-current/10 pt-4">
            <h4 className="text-[10px] uppercase font-mono font-extrabold tracking-wider px-2 py-0.5 rounded-md inline-block mb-2 highlight-text-force" style={{ backgroundColor: highlightColor, color: currentMode === 'dark' ? '#FFFFFF' : '#000000' }}>
              Context Protection
            </h4>
            <div className="flex items-center gap-2 text-xs font-medium">
              {project.password ? (
                <>
                  <Shield size={14} className="text-emerald-600" />
                  <span>Password Protected Vault</span>
                </>
              ) : (
                <>
                  <Compass size={14} className="opacity-60" />
                  <span>Public Showcase Access</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Research Phases Line */}
      {project.phases && project.phases.length > 0 && (
        <div className="pt-6 border-t border-current/10" id="phases-timeline">
          <div className="flex items-center gap-2 mb-6">
            <Compass size={15} style={{ color: accentColor }} />
            <h3 className="text-xs uppercase font-mono font-black tracking-widest px-2.5 py-1 rounded-md inline-block highlight-text-force" style={{ backgroundColor: highlightColor, color: currentMode === 'dark' ? '#FFFFFF' : '#000000' }}>
              Phases
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.phases.map((phase, idx) => (
              <div
                key={phase.id}
                className="p-5 rounded-xl border border-current/10 bg-current/[0.01] hover:bg-current/[0.02] transition-colors text-justify"
              >
                <span className="text-[10px] font-mono font-bold opacity-40 block mb-1">
                  STAGE 0{idx + 1}
                </span>
                <h4 className="text-xs font-bold uppercase mb-2" style={{ color: accentColor }}>
                  {phase.phase}
                </h4>
                <p className="text-xs leading-relaxed opacity-85">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* In-depth Insights block */}
      {project.insights && project.insights.length > 0 && (
        <div className="pt-6 border-t border-current/10" id="insights-panel">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb size={15} style={{ color: accentColor }} />
            <h3 className="text-xs uppercase font-mono font-black tracking-widest px-2.5 py-1 rounded-md inline-block highlight-text-force" style={{ backgroundColor: highlightColor, color: currentMode === 'dark' ? '#FFFFFF' : '#000000' }}>
              Insights
            </h3>
          </div>

          <div className="space-y-4">
            {project.insights.map((insight, idx) => (
              <div
                key={insight.id}
                className="p-5 md:p-6 rounded-xl border border-current/10 bg-current/[0.02] flex gap-4 text-justify"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-sm"
                  style={{
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                  }}
                >
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wide mb-1">
                    {insight.title}
                  </h4>
                  <p className="text-xs leading-relaxed opacity-80">
                    {insight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Measured Impact & Outcomes */}
      {project.impact && (
        <div
          className="p-6 rounded-2xl border-t-2 space-y-3 bg-current/[0.01]"
          style={{ borderColor: accentColor }}
          id="impact-panel"
        >
          <div className="flex items-center gap-2 text-justify">
            <TrendingUp size={15} style={{ color: accentColor }} />
            <h3 className="text-xs uppercase font-mono font-black tracking-widest px-2.5 py-1 rounded-md inline-block highlight-text-force" style={{ backgroundColor: highlightColor, color: currentMode === 'dark' ? '#FFFFFF' : '#000000' }}>
              Impact & Outcomes
            </h3>
          </div>
          <p className="text-sm font-semibold leading-relaxed text-justify opacity-90">
            {project.impact}
          </p>
        </div>
      )}
    </motion.div>
  );
};
