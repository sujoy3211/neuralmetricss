import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { NeuralNetworkScene } from '../components/three/NeuralNetworkScene';
import { AIInsightCard } from '../components/cards/AIInsightCard';
import { Button } from '../components/ui/Button';
import { useDashboardStore } from '../store/dashboardStore';
import type { ChatMessage } from '../types';

const suggestedQuestions = ['Why did revenue drop last week?', 'Which users are at risk of churning?', 'What actions should I take today?', 'Analyze my top performing regions'];
const aiResponses: Record<string, string> = {
  'Why did revenue drop last week?': 'Based on my analysis, revenue dropped by 4.2% last week primarily due to a temporary API outage on Tuesday that affected 12% of transactions. Additionally, there was a 15% decrease in new signups during the outage window.',
  'Which users are at risk of churning?': 'I\'ve identified 2,341 users showing churn indicators. The top risk factors are: 67% have been inactive for 14+ days, 45% haven\'t upgraded their plan in 90 days, and 23% have submitted support tickets about feature limitations.',
  'What actions should I take today?': 'Here are your prioritized action items:\n\n1. **Urgent**: Address the 8 payment failures from the Stripe incident\n2. **High**: Review the 15 pending Enterprise trial accounts that expire in 48 hours\n3. **Medium**: Approve the 3 new integration requests from Pro tier users',
  'Analyze my top performing regions': 'Your top 3 performing regions this quarter:\n\n**Asia Pacific** - $847K (+34% vs forecast)\n**North America** - $1.2M (+12% vs forecast)\n**Europe** - $892K (+8.7% vs forecast)',
};

export function AIInsights() {
  const { insights, chatMessages, addChatMessage } = useDashboardStore();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMessage: ChatMessage = { id: `msg-${Date.now()}`, role: 'user', content: inputValue, timestamp: new Date().toISOString() };
    addChatMessage(userMessage);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      const response = aiResponses[inputValue] || 'I\'m analyzing your request. Based on the data patterns, I can provide insights on revenue trends, user behavior, and predictive analytics. Could you please specify what aspect you\'d like me to focus on?';
      addChatMessage({ id: `msg-${Date.now() + 1}`, role: 'assistant', content: response, timestamp: new Date().toISOString() });
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-display font-bold text-gray-100">AI Insights</h1><p className="text-gray-400 mt-1">Powered by advanced machine learning algorithms</p></div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl overflow-hidden border border-space-700 relative">
        <NeuralNetworkScene />
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-space-900/80 backdrop-blur rounded-lg"><Sparkles className="w-4 h-4 text-electric-400 animate-pulse" /><span className="text-sm text-gray-300">Neural Network Active</span></div>
          <div className="px-3 py-1.5 bg-space-900/80 backdrop-blur rounded-lg"><span className="text-sm font-mono text-electric-400">56 nodes</span></div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-medium text-gray-200 mb-4">Latest Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.slice(0, 6).map((insight, i) => <AIInsightCard key={insight.id} insight={insight} delay={i * 0.1} />)}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl border border-space-700 flex flex-col h-[600px]">
          <div className="p-4 border-b border-space-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-electric-400 to-neural-500 flex items-center justify-center"><Bot className="w-5 h-5 text-white" /></div>
              <div><h3 className="font-medium text-gray-200">NeuralMetrics AI</h3><p className="text-xs text-gray-400">Ask anything about your data</p></div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-space-800 flex items-center justify-center mx-auto mb-4"><Sparkles className="w-8 h-8 text-electric-400" /></div>
                <p className="text-gray-400 mb-4">Ask me anything about your metrics</p>
              </div>
            )}
            <AnimatePresence>
              {chatMessages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-400 to-neural-500 flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4 text-white" /></div>}
                  <div className={`p-3 rounded-xl max-w-[85%] ${msg.role === 'user' ? 'bg-electric-400/20 text-gray-200' : 'bg-space-800 text-gray-300'}`}>
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  {msg.role === 'user' && <div className="w-8 h-8 rounded-lg bg-space-700 flex items-center justify-center flex-shrink-0"><User className="w-4 h-4 text-gray-400" /></div>}
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-400 to-neural-500 flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4 text-white" /></div>
              <div className="bg-space-800 rounded-xl p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-electric-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-electric-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-electric-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-space-700">
            <div className="flex gap-2">
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about your data..." className="flex-1 bg-space-800 border border-space-700 rounded-lg px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-400/50" />
              <Button onClick={handleSend} disabled={!inputValue.trim() || isTyping}><Send className="w-4 h-4" /></Button>
            </div>
            {chatMessages.length === 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <button key={i} onClick={() => setInputValue(q)} className="text-xs px-2 py-1 bg-space-800/50 hover:bg-space-800 rounded text-gray-400 hover:text-gray-300 transition-colors">{q}</button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
