import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Share2, 
  Sparkles, 
  Copy, 
  Check, 
  TrendingUp, 
  MessageSquare, 
  ThumbsUp, 
  Layers, 
  Bookmark,
  Award
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type PostArchetype = 'Architecture Teardown' | 'FinOps Breakdown' | 'Executive Leadership' | 'Incident Post-Mortem' | 'Mentorship & Culture';

export const InfluencerPage: React.FC = () => {
  const { masterMemory, askAgent, isAiLoading, addToast } = useApp();

  const [archetype, setArchetype] = useState<PostArchetype>('Architecture Teardown');
  const [topicPrompt, setTopicPrompt] = useState('How we migrated a Tier-1 core banking platform processing 4.5M TPS to distributed microservices with zero downtime and 99.999% availability SLA.');
  const [targetAudience, setTargetAudience] = useState('Engineering Directors, VPs of Engineering, and CTOs at Top GCCs & FinTechs');

  const [generatedPost, setGeneratedPost] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleGeneratePost = async () => {
    try {
      const prompt = `As INFLUENCER Agent (Elite Executive Thought Leadership & LinkedIn Ghostwriter for Tech Leaders):
Draft a viral, high-authority LinkedIn post for:
Author: ${masterMemory.identity.fullName} (${masterMemory.targetProfile.targetRole})
Post Archetype: ${archetype}
Topic: ${topicPrompt}
Target Audience: ${targetAudience}
Grounding Evidence: 4.5M TPS core banking, zero-downtime, $450K FinOps savings, 35% MTTR reduction.

Format requirements:
1. **Hook:** Scroll-stopping 1-2 line opening (no cheesy emojis, strong contrarian or quantified insight).
2. **Context & Problem:** The high-stakes engineering reality.
3. **Execution Lessons:** 3-4 bullet points with high-density technical and architectural takeaways.
4. **The Bottom Line:** Executive leadership summary.
5. **Call to Discussion:** Open-ended thought-provoking question.
6. **Relevant Hashtags:** 4-5 high-engagement hashtags (#EngineeringLeadership #FinTech #DistributedSystems #CloudArchitecture).`;

      const res = await askAgent('INFLUENCER', prompt);
      setGeneratedPost(res);
      addToast({ title: 'Thought Leadership Post Generated', type: 'success' });
    } catch (err: any) {
      addToast({ title: 'Generation failed', message: err.message, type: 'error' });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    addToast({ title: 'Post copied to clipboard', type: 'success' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Share2 className="w-6 h-6 text-teal-400" />
            Thought Leadership & Executive Brand Engine
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            INFLUENCER Agent: Transform hard-won technical triumphs and CAR stories into high-authority LinkedIn thought leadership.
          </p>
        </div>

        <button
          onClick={handleGeneratePost}
          disabled={isAiLoading}
          id="generate-post-button"
          className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-teal-500/10 transition self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isAiLoading ? 'Synthesizing...' : 'Draft Authority Post'}</span>
        </button>
      </div>

      {/* Archetype Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
        {(['Architecture Teardown', 'FinOps Breakdown', 'Executive Leadership', 'Incident Post-Mortem', 'Mentorship & Culture'] as PostArchetype[]).map((arch) => (
          <button
            key={arch}
            onClick={() => setArchetype(arch)}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              archetype === arch
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <span>{arch}</span>
          </button>
        ))}
      </div>

      {/* 2 Column Layout: Inputs vs Generated Post */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Topic Inputs */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Post Strategy Configuration</h3>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Core Topic / Architectural Achievement</label>
            <textarea
              rows={4}
              value={topicPrompt}
              onChange={(e) => setTopicPrompt(e.target.value)}
              placeholder="What technical transformation or lesson do you want to break down?"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-500 resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Target Audience Profile</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-teal-400 block">
              💡 Ghostwriter Strategy:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              High-ranking engineering leaders do not write basic tutorial summaries. They share high-leverage organizational trade-offs, architecture post-mortems, and metric-grounded FinOps outcomes that prove senior command.
            </p>
          </div>
        </div>

        {/* Right: Generated LinkedIn Post */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col h-[75vh]">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Share2 className="w-4 h-4 text-teal-400" />
              Ready-to-Publish Post
            </span>

            {generatedPost && (
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Post</span>
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto bg-slate-950 p-5 rounded-xl border border-slate-850 text-slate-200 text-xs leading-relaxed space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
            {generatedPost ? (
              <div className="prose prose-invert prose-xs max-w-none prose-p:my-2 prose-h1:text-base prose-h1:text-white prose-hr:border-slate-800">
                <ReactMarkdown>{generatedPost}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
                <Share2 className="w-10 h-10 text-slate-600" />
                <p className="text-xs">
                  Choose a topic and archetype on the left and click <strong>"Draft Authority Post"</strong> to craft a high-engagement LinkedIn piece.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
