import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import type { ChatMessage } from '../types';

const aiSuggestions = [
  { icon: TrendingUp, text: "Show project progress summary" },
  { icon: Clock, text: "What tasks are due this week?" },
  { icon: AlertTriangle, text: "Identify project bottlenecks" },
  { icon: Sparkles, text: "Suggest task optimizations" },
];

export const AIAssistant: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Project Management Assistant. I can help you with project insights, task recommendations, and progress tracking. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date().toISOString(),
      isAI: true,
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser, tasks } = useAppContext();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: currentUser!,
      timestamp: new Date().toISOString(),
      isAI: false,
    };

    setChatMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        isAI: true,
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('progress') || input.includes('status')) {
      const completedTasks = tasks.filter(t => t.status === 'done').length;
      return `Based on current data, you have ${completedTasks} completed tasks out of ${tasks.length} total. Your E-Commerce Platform project is at 68% completion and on track for the June deadline. The Mobile App Redesign is at 32% and may need attention to meet its August deadline.`;
    }
    
    if (input.includes('due') || input.includes('deadline')) {
      const dueTasks = tasks.filter(t => new Date(t.dueDate) <= new Date(Date.now() + 7*24*60*60*1000)).length;
      return `You have ${dueTasks} tasks due this week. I recommend prioritizing "Design user authentication flow" as it's marked high priority and due soon. Would you like me to create a detailed schedule?`;
    }
    
    if (input.includes('bottleneck') || input.includes('block')) {
      return `I've analyzed your project velocity and identified potential bottlenecks: 1) The "Implement payment gateway" task has been in planning for 5 days - consider breaking it into smaller tasks. 2) Review stage has 3 tasks pending - you might need additional reviewers.`;
    }
    
    if (input.includes('optimize') || input.includes('improve')) {
      return `Here are my optimization suggestions: 1) Batch similar tasks together to reduce context switching. 2) Your highest productivity is on Tuesday-Thursday - schedule complex tasks then. 3) Consider pairing junior members with seniors on critical tasks.`;
    }
    
    return `I understand you're asking about "${userInput}". Based on your current project data, I can provide insights on task progress, deadline management, team productivity, and resource optimization. Could you be more specific about what aspect you'd like me to analyze?`;
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white rounded-lg bg-opacity-20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Project Assistant</h1>
            <p className="text-blue-100">Get intelligent insights and recommendations for your projects</p>
          </div>
        </div>
      </div>

      <div className="grid flex-1 min-h-0 grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Suggestions Panel */}
        <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
          <h3 className="flex items-center mb-4 text-lg font-semibold text-slate-800">
            <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
            Quick Actions
          </h3>
          
          <div className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.text)}
                className="flex items-center w-full p-3 space-x-3 text-left transition-all duration-200 border rounded-lg border-slate-200 hover:border-blue-300 hover:bg-blue-50"
              >
                <suggestion.icon className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-slate-700">{suggestion.text}</span>
              </button>
            ))}
          </div>

          {/* AI Stats */}
          <div className="p-4 mt-6 border border-blue-200 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
            <h4 className="mb-2 text-sm font-medium text-slate-800">AI Analysis Today</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Insights generated</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex justify-between">
                <span>Recommendations</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span>Accuracy rate</span>
                <span className="font-medium text-emerald-600">94%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col bg-white border shadow-sm lg:col-span-2 rounded-xl border-slate-200">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-800">AI Assistant - Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 min-h-0 p-4 space-y-4 overflow-y-auto">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isAI ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-3 max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg ${msg.isAI ? '' : 'flex-row-reverse space-x-reverse'}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.isAI ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-slate-200'}`}>
                    {msg.isAI ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                  
                  <div className={`rounded-2xl px-4 py-3 ${
                    msg.isAI 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200' 
                      : 'bg-blue-600 text-white'
                  }`}>
                    <p className={`text-sm ${msg.isAI ? 'text-slate-800' : 'text-white'}`}>
                      {msg.content}
                    </p>
                    <p className={`text-xs mt-2 ${msg.isAI ? 'text-slate-500' : 'text-blue-100'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="px-4 py-3 border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage(message)}
                  placeholder="Ask me about your projects, tasks, or team performance..."
                  className="w-full px-4 py-3 transition-colors border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => sendMessage(message)}
                disabled={!message.trim() || isTyping}
                className="p-3 text-white transition-colors duration-200 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 rounded-xl"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};