import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AgentType } from '../types/ai';
import { AGENT_DEFINITIONS } from '../ai/agents';
import { 
  Sparkles, 
  Send, 
  Trash2, 
  Database, 
  Zap, 
  Layers, 
  ChevronRight, 
  Copy, 
  Check, 
  Bot, 
  User, 
  Compass, 
  Crosshair, 
  Users, 
  FileCheck, 
  TrendingUp, 
  Presentation, 
  Mic, 
  DollarSign
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const AIAssistantPage: React.FC = () => {
  const { 
    chatHistory, 
    addChatMessage, 
    clearChatHistory, 
    askAgent, 
    isAiLoading, 
    masterMemory, 
    tokenStats,
    tokenSaverMode,
    addToast
  } = useApp();

  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<AgentType>('NOVA');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showMemoryPreview, setShowMemoryPreview] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isAiLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isAiLoading) return;

    const userText = inputPrompt.trim();
    setInputPrompt('');

    // Add user message
    addChatMessage({
      sender: 'user',
      text: userText,
      agentType: selectedAgent
    });

    try {
      // Call AI Provider with token optimizer
      const response = await askAgent(selectedAgent, userText);
      addChatMessage({
        sender: 'agent',
        text: response,
        agentType: selectedAgent
      });
    } catch (err: any) {
      addChatMessage({
        sender: 'agent',
        text: `Error: Unable to process response. (${err.message || 'Check network or API key.'})`,
        agentType: selectedAgent
      });
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast({ title: 'Copied to clipboard', type: 'success' });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentAgent = AGENT_DEFINITIONS[selectedAgent];

  const quickPrompts = [
    {
      agent: 'NOVA' as AgentType,
      text: 'Analyze my current career profile against a ₹1Cr Director of Engineering benchmark.'
    },
    {
      agent: 'NAVIGATOR' as AgentType,
      text: 'Audit my function, role, and industry trajectory for maximum executive positioning.'
    },
    {
      agent: 'TAILOR' as AgentType,
      text: 'How should I position my CAR story on zero-downtime banking migration for Tier 1 GCCs?'
    },
    {
      agent: 'NEGOTIATOR' as AgentType,
      text: 'Draft a high-leverage counter-offer script anchoring on ₹95L fixed + ₹20L RSUs.'
    }
  ];

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col max-w-7xl mx-auto pb-4">
      {/* Top Bar: Agent Selector & Token Optimizer Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {(Object.keys(AGENT_DEFINITIONS) as AgentType[]).map((agentKey) => {
            const ag = AGENT_DEFINITIONS[agentKey];
            const isSelected = selectedAgent === agentKey;
            return (
              <button
                key={agentKey}
                onClick={() => setSelectedAgent(agentKey)}
                id={`agent-pill-${agentKey.toLowerCase()}`}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition ${
                  isSelected
                    ? 'bg-teal-500 text-slate-950 shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>{ag.name}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                    isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {ag.badge}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowMemoryPreview(!showMemoryPreview)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition ${
              showMemoryPreview
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-teal-400" />
            <span>Grounded Memory</span>
          </button>

          <button
            onClick={clearChatHistory}
            className="p-1.5 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-slate-800 transition"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Memory Preview Drawer (Collapsible) */}
      {showMemoryPreview && (
        <div className="bg-slate-900/95 border border-teal-500/30 rounded-xl p-3 my-2 text-xs text-slate-300 space-y-2 shrink-0 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between text-teal-400 font-bold">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Token-Optimized Memory Injection Active
            </span>
            <span className="text-[11px] text-slate-400 font-normal">
              Candidate: <strong>{masterMemory.identity.fullName}</strong>
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            NOVA extracts relevant CAR metrics & career timeline fragments strictly on demand, saving up to 85% token overhead per interaction.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 text-[10px] font-mono">
              Target: {masterMemory.targetProfile.targetRole}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 text-[10px] font-mono">
              Comp: {masterMemory.targetProfile.targetCompensation.target}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 text-[10px] font-mono">
              {masterMemory.carStories.length} CAR Stories Grounded
            </span>
          </div>
        </div>
      )}

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
        {chatHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7" />
            </div>

            <div className="space-y-1.5 max-w-md">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {currentAgent.name}: {currentAgent.tagline}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {currentAgent.systemRole || currentAgent.description}
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-2xl w-full text-left">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedAgent(qp.agent);
                    setInputPrompt(qp.text);
                  }}
                  className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition group flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-center justify-between text-[10px] font-bold text-teal-400 uppercase">
                    <span>{qp.agent}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="line-clamp-2 text-slate-300 font-medium">
                    "{qp.text}"
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          chatHistory.map((msg) => {
            const isUser = msg.sender === 'user';
            const agentMeta = msg.agentType ? AGENT_DEFINITIONS[msg.agentType] : currentAgent;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`rounded-2xl p-4 text-xs leading-relaxed space-y-2 relative group shadow-sm ${
                    isUser
                      ? 'bg-teal-600 text-white rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 pb-1 border-b border-white/10 text-[10px]">
                    <span className="font-bold opacity-80 uppercase tracking-wider">
                      {isUser ? 'You' : `${agentMeta?.name || 'NOVA'} (${agentMeta?.badge || 'AI'})`}
                    </span>
                    <span className="opacity-50">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="prose prose-invert prose-xs max-w-none prose-p:leading-relaxed prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>

                  {!isUser && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="absolute right-2 bottom-2 p-1 text-slate-400 hover:text-white bg-slate-950/80 rounded-md border border-slate-800 opacity-0 group-hover:opacity-100 transition"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })
        )}

        {isAiLoading && (
          <div className="flex items-center gap-3 text-xs text-slate-400 max-w-3xl mr-auto">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0 animate-pulse">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-slate-300 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-[11px] font-mono text-teal-400">
                {currentAgent.name} synthesizing grounded intelligence...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="pt-2 shrink-0">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 focus-within:border-teal-500 transition shadow-xl">
          <textarea
            rows={2}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            placeholder={`Ask ${currentAgent.name} (${currentAgent.tagline})... (Press Enter to send)`}
            className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none resize-none"
          />

          <div className="flex items-center justify-between px-2 pt-1 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
              <span>Shift+Enter for newline</span>
              <span>•</span>
              <span className="text-emerald-400">Local Memory Grounded</span>
            </div>

            <button
              type="submit"
              disabled={!inputPrompt.trim() || isAiLoading}
              className="px-4 py-1.5 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
