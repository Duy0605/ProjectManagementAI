import React, { useState } from 'react';
import { Send, Hash, Users, Bot, Search, Paperclip } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const channels = [
  { id: '1', name: 'general', description: 'General team discussions' },
  { id: '2', name: 'e-commerce-project', description: 'E-Commerce Platform project chat' },
  { id: '3', name: 'mobile-redesign', description: 'Mobile App Redesign discussions' },
  { id: '4', name: 'announcements', description: 'Important team announcements' },
];

const teamMembers = [
  { id: '1', name: 'Duy', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop', status: 'online' },
  { id: '2', name: 'Anh', avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop', status: 'online' },
  { id: '3', name: 'Đức', avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop', status: 'away' },
  { id: '4', name: 'Minh', avatar: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop', status: 'offline' },
];

export const TeamChat: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: 'Hey team! Just finished the authentication flow designs. Ready for review!',
      sender: teamMembers[1],
      timestamp: '10:30 AM',
      isAI: false,
    },
    {
      id: '2',
      content: 'Great work Sarah! I\'ll review them this afternoon.',
      sender: teamMembers[0],
      timestamp: '10:32 AM',
      isAI: false,
    },
    {
      id: '3',
      content: 'Based on the current sprint velocity, I suggest prioritizing the payment gateway task to maintain timeline. Would you like me to reassign some lower priority tasks?',
      sender: 'AI Assistant',
      timestamp: '10:35 AM',
      isAI: true,
    },
  ]);

  const { currentUser } = useAppContext();

  const sendChatMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      content: message,
      sender: {
        id: currentUser!.id,
        name: currentUser!.name,
        avatar: currentUser!.avatar,
        status: 'online'
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAI: false,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-emerald-500';
      case 'away': return 'bg-amber-500';
      case 'offline': return 'bg-slate-400';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-4">
      {/* Channels Sidebar */}
      <div className="p-4 bg-white border shadow-sm rounded-xl border-slate-200">
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Channels</h2>
          <div className="space-y-1">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel)}
                className={`w-full flex items-center space-x-2 p-2 rounded-lg text-left transition-colors ${
                  selectedChannel.id === channel.id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <Hash className="w-4 h-4" />
                <span className="text-sm font-medium">{channel.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center mb-3 text-sm font-semibold text-slate-800">
            <Users className="w-4 h-4 mr-1" />
            Team ({teamMembers.length})
          </h3>
          <div className="space-y-2">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center p-2 space-x-2 transition-colors rounded-lg cursor-pointer hover:bg-slate-50">
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="object-cover w-6 h-6 rounded-full"
                  />
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
                </div>
                <span className="text-sm text-slate-700">{member.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col bg-white border shadow-sm lg:col-span-3 rounded-xl border-slate-200">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Hash className="w-5 h-5 text-slate-500" />
              <h2 className="text-lg font-semibold text-slate-800">{selectedChannel.name}</h2>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 transition-colors rounded-lg hover:bg-slate-100">
                <Search className="w-4 h-4 text-slate-500" />
              </button>
              <button className="p-2 transition-colors rounded-lg hover:bg-slate-100">
                <Users className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>
          <p className="mt-1 text-sm text-slate-600">{selectedChannel.description}</p>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.isAI ? 'bg-gradient-to-r from-blue-500 to-purple-500' : ''
              }`}>
                {msg.isAI ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <img
                    src={typeof msg.sender === 'object' ? msg.sender.avatar : ''}
                    alt={typeof msg.sender === 'object' ? msg.sender.name : msg.sender}
                    className="object-cover w-8 h-8 rounded-full"
                  />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-1 space-x-2">
                  <span className={`text-sm font-medium ${msg.isAI ? 'text-purple-700' : 'text-slate-800'}`}>
                    {typeof msg.sender === 'object' ? msg.sender.name : msg.sender}
                  </span>
                  {msg.isAI && <Bot className="w-3 h-3 text-purple-500" />}
                  <span className="text-xs text-slate-500">{msg.timestamp}</span>
                </div>
                <div className={`text-sm p-3 rounded-lg ${
                  msg.isAI 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
                    : 'bg-slate-100'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center space-x-3">
            <button className="p-2 transition-colors rounded-lg hover:bg-slate-100">
              <Paperclip className="w-4 h-4 text-slate-500" />
            </button>
            
            <div className="relative flex-1">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                placeholder={`Message #${selectedChannel.name}...`}
                className="w-full px-4 py-3 transition-colors border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={sendChatMessage}
              disabled={!message.trim()}
              className="p-3 text-white transition-colors duration-200 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 rounded-xl"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};