import React from 'react';
import { Search, Bell, Plus, MessageSquare } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

export const Header: React.FC = () => {
  const { notifications, currentUser } = useAppContext();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="px-6 py-4 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects, tasks, or people..."
              className="w-full py-2 pl-10 pr-4 transition-colors border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 space-x-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>

          <button className="p-2 transition-colors duration-200 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100">
            <MessageSquare className="w-5 h-5" />
          </button>

          <button className="relative p-2 transition-colors duration-200 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                {unreadCount}
              </span>
            )}
          </button>

          <div className="flex items-center space-x-3">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="object-cover w-8 h-8 rounded-full"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-800">{currentUser?.name}</p>
              <p className="text-xs capitalize text-slate-500">{currentUser?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};