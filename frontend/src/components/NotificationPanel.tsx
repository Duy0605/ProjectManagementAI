import React, { useState } from 'react';
import { X, CheckCheck } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import clsx from 'clsx';

export const NotificationPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, setNotifications } = useAppContext();

  const markAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map(n =>
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (unreadCount === 0 && !isOpen) return null;

  return (
    <>
      {!isOpen && unreadCount > 0 && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed z-40 p-3 text-white transition-all duration-200 bg-blue-600 rounded-full shadow-lg top-20 right-6 hover:bg-blue-700"
        >
          <span className="text-sm font-medium">{unreadCount}</span>
        </button>
      )}

      <div
        className={clsx(
          'fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 border-l border-slate-200',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Notifications</h2>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="p-1.5 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                title="Mark all as read"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="h-full pb-4 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={clsx(
                    'p-4 rounded-lg border transition-colors cursor-pointer',
                    notification.isRead
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-blue-50 border-blue-200'
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-slate-800">
                        {notification.title}
                      </h4>
                      <p className="mt-1 text-sm text-slate-600">
                        {notification.message}
                      </p>
                      <p className="mt-2 text-xs text-slate-500">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 mt-1 bg-blue-500 rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};