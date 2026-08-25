import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mic, 
  Sparkles, 
  Play, 
  Square, 
  RotateCcw, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Video, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type InterviewRound = 'Behavioral' | 'Leadership' | 'System Design' | 'Executive Case' | 'Bar Raiser';

export const InterviewerPage: React.FC = () => {
  const { masterMemory, askAgent, isAiLoading, addToast } = useApp();

  const [selectedRound, setSelectedRound] = useState<InterviewRound>('Leadership');
  const [targetCompany, setTargetCompany] = useState('Goldman Sachs');
  const [currentQuestion, setCurrentQuestion] = useState(
    'Tell me about a time when you inherited a mission-critical legacy architecture with severe cost and uptime bottlenecks. How did you align executive stakeholders and lead your engineering teams through the transformation?'
  );
  const [userAnswer, setUserAnswer] = useState('');
  const [feedbackMarkdown, setFeedbackMarkdown] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleGenerateQuestion = async () => {
    try {
      const prompt = `As INTERVIEWER Agent (Elite Executive Bar Raiser for Tier 1 GCCs & Tech Leaders):
Generate a challenging, high-pressure interview question for:
Target Role: ${masterMemory.targetProfile.targetRole}
Target Company: ${targetCompany}
Round Type: ${selectedRound}
Candidate Background: Oversees 40+ engineers, distributed architecture, FinOps, 4.5M TPS core banking systems.

Provide ONLY the interviewer's prompt and a brief 1-sentence context context setting.`;

      const res = await askAgent('INTERVIEWER', prompt);
      setCurrentQuestion(res);
      setUserAnswer('');
      setFeedbackMarkdown('');
      addToast({ title: 'New Simulation Question Generated', type: 'info' });
    } catch (err: any) {
      addToast({ title: 'Failed to generate question', message: err.message, type: 'error' });
    }
  };

  const handleEvaluateAnswer = async () => {
    if (!userAnswer.trim()) {
      addToast({ title: 'Please provide your answer before evaluation', type: 'warning' });
      return;
    }

    try {
      const prompt = `As INTERVIEWER Agent (Strict Executive Bar Raiser):
Evaluate this candidate's interview response:
Question: ${currentQuestion}
Round: ${selectedRound} for ${masterMemory.targetProfile.targetRole} at ${targetCompany}

Candidate's Answer:
"${userAnswer}"

Evaluate strictly on 4 dimensions:
1. **Structure & CAR Adherence:** (Did they follow Challenge -> Action -> Result cleanly?)
2. **Metric Hardness:** (Did they give specific numbers, TPS, %, $, MTTR, or vague generalizations?)
3. **Executive Presence & Ownership:** (Did they use 'I' for strategic decisions and 'we' for team execution?)
4. **Scoring Breakdown:** Provide Score out of 100 with 3 specific suggestions to make the answer bulletproof.`;

      const res = await askAgent('INTERVIEWER', prompt);
      setFeedbackMarkdown(res);
      addToast({ title: 'Evaluation Complete', message: 'Detailed Bar Raiser breakdown ready.', type: 'success' });
    } catch (err: any) {
      addToast({ title: 'Evaluation failed', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Mic className="w-6 h-6 text-teal-400" />
            Interviewer — Bar Raiser Simulation Engine
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            INTERVIEWER Agent: Rigorous mock simulations for Tier-1 GCCs, Engineering Directors, and VP candidates.
          </p>
        </div>

        <button
          onClick={handleGenerateQuestion}
          disabled={isAiLoading}
          id="new-question-button"
          className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-teal-400" />
          <span>New Question</span>
        </button>
      </div>

      {/* Round Type Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
        {(['Behavioral', 'Leadership', 'System Design', 'Executive Case', 'Bar Raiser'] as InterviewRound[]).map((round) => (
          <button
            key={round}
            onClick={() => setSelectedRound(round)}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              selectedRound === round
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <span>{round}</span>
          </button>
        ))}
      </div>

      {/* 2 Column Layout: Question & Response vs AI Evaluation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Active Question & Candidate Answer */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Interviewer Prompt Box */}
            <div className="bg-slate-950/80 border border-teal-500/30 rounded-2xl p-5 space-y-2.5 relative overflow-hidden shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                  Bar Raiser Interviewer • {selectedRound}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {targetCompany}
                </span>
              </div>

              <p className="text-sm font-semibold text-white leading-relaxed">
                "{currentQuestion}"
              </p>
            </div>

            {/* Answer Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Your Answer (Structure: Challenge → Action → Result)
                </label>
                <span className="text-[10px] text-slate-500 font-mono">
                  {userAnswer.length} chars
                </span>
              </div>
              <textarea
                rows={9}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="In my previous role at Morgan Stanley / Goldman Sachs, I faced a challenge where... I took action by architecting... As a result, we achieved 4.5M TPS zero-downtime and reduced compute cost by $450K..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-teal-500 resize-none leading-relaxed font-sans"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Award className="w-4 h-4 text-teal-400" />
              <span>Grounded in Master CAR Evidence</span>
            </div>

            <button
              onClick={handleEvaluateAnswer}
              disabled={isAiLoading || !userAnswer.trim()}
              id="evaluate-answer-button"
              className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-teal-500/10 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAiLoading ? 'Evaluating...' : 'Evaluate Performance'}</span>
            </button>
          </div>
        </div>

        {/* Right: Bar Raiser Scoring Breakdown */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col h-[75vh]">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-400" />
              Bar Raiser Evaluation Breakdown
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 font-mono">
              Expert Grading
            </span>
          </div>

          <div className="flex-1 overflow-y-auto bg-slate-950 p-5 rounded-xl border border-slate-850 text-slate-200 text-xs leading-relaxed space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
            {feedbackMarkdown ? (
              <div className="prose prose-invert prose-xs max-w-none prose-h1:text-base prose-h1:text-white prose-h2:text-xs prose-h2:text-teal-400 prose-hr:border-slate-800">
                <ReactMarkdown>{feedbackMarkdown}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
                <Mic className="w-10 h-10 text-slate-600" />
                <p className="text-xs">
                  Type your structured response on the left and click <strong>"Evaluate Performance"</strong> for an unsparing Bar Raiser critique.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
