import React, { useState } from 'react';
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Mail,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Trash2,
  Save,
  Camera,
  Edit3
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const settingsSections = [
  { id: 'profile', name: 'Profile', icon: User },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'appearance', name: 'Appearance', icon: Palette },
  { id: 'integrations', name: 'Integrations', icon: Globe },
  { id: 'data', name: 'Data & Privacy', icon: Database },
];

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    desktop: false,
    taskAssigned: true,
    taskCompleted: false,
    projectUpdates: true,
    weeklyReports: true,
  });
  const { currentUser } = useAppContext();

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Profile Information</h3>
        
        <div className="flex items-center mb-6 space-x-6">
          <div className="relative">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="object-cover w-20 h-20 rounded-full"
            />
            <button className="absolute bottom-0 right-0 p-2 text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-slate-800">{currentUser?.name}</h4>
            <p className="capitalize text-slate-600">{currentUser?.role}</p>
            <button className="flex items-center mt-2 space-x-1 text-sm font-medium text-blue-600 hover:text-blue-700">
              <Edit3 className="w-4 h-4" />
              <span>Change Photo</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">Full Name</label>
            <input
              type="text"
              defaultValue={currentUser?.name}
              className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              defaultValue={currentUser?.email}
              className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">Phone</label>
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">Time Zone</label>
            <select className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>UTC-8 (Pacific Time)</option>
              <option>UTC-5 (Eastern Time)</option>
              <option>UTC+0 (GMT)</option>
              <option>UTC+7 (Vietnam Time)</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-slate-700">Bio</label>
          <textarea
            rows={4}
            placeholder="Tell us about yourself..."
            className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-slate-700">Skills</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {currentUser?.skills?.map((skill) => (
              <span
                key={skill}
                className="flex items-center px-3 py-1 space-x-1 text-sm text-blue-700 bg-blue-100 rounded-full"
              >
                <span>{skill}</span>
                <button className="text-blue-500 hover:text-blue-700">×</button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add a skill..."
            className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Notification Preferences</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="mb-3 font-medium text-slate-800">Delivery Methods</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg border-slate-200">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="font-medium text-slate-800">Email Notifications</p>
                    <p className="text-sm text-slate-600">Receive notifications via email</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg border-slate-200">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="font-medium text-slate-800">Push Notifications</p>
                    <p className="text-sm text-slate-600">Receive push notifications on mobile</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg border-slate-200">
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="font-medium text-slate-800">Desktop Notifications</p>
                    <p className="text-sm text-slate-600">Show browser notifications</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.desktop}
                    onChange={(e) => setNotifications({...notifications, desktop: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-3 font-medium text-slate-800">Notification Types</h4>
            <div className="space-y-3">
              {[
                { key: 'taskAssigned', label: 'Task Assigned', desc: 'When you are assigned a new task' },
                { key: 'taskCompleted', label: 'Task Completed', desc: 'When tasks you created are completed' },
                { key: 'projectUpdates', label: 'Project Updates', desc: 'Important project announcements' },
                { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Weekly progress summaries' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg border-slate-200">
                  <div>
                    <p className="font-medium text-slate-800">{item.label}</p>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[item.key as keyof typeof notifications]}
                      onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Security Settings</h3>
        
        <div className="space-y-6">
          <div className="p-4 border rounded-lg border-slate-200">
            <h4 className="mb-2 font-medium text-slate-800">Change Password</h4>
            <p className="mb-4 text-sm text-slate-600">Update your password to keep your account secure</p>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current password"
                className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="password"
                placeholder="New password"
                className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                Update Password
              </button>
            </div>
          </div>

          <div className="p-4 border rounded-lg border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-slate-800">Two-Factor Authentication</h4>
                <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
              </div>
              <button className="px-4 py-2 text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700">
                Enable 2FA
              </button>
            </div>
          </div>

          <div className="p-4 border rounded-lg border-slate-200">
            <h4 className="mb-2 font-medium text-slate-800">Active Sessions</h4>
            <p className="mb-4 text-sm text-slate-600">Manage your active sessions across devices</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="font-medium text-slate-800">Chrome on MacBook Pro</p>
                    <p className="text-sm text-slate-600">Current session • San Francisco, CA</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-emerald-600">Active</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="font-medium text-slate-800">Mobile App</p>
                    <p className="text-sm text-slate-600">Last active 2 hours ago • San Francisco, CA</p>
                  </div>
                </div>
                <button className="text-sm font-medium text-red-600 hover:text-red-700">
                  Revoke
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <h4 className="mb-2 font-medium text-red-800">Danger Zone</h4>
            <p className="mb-4 text-sm text-red-700">Permanently delete your account and all associated data</p>
            <button className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700">
              <Trash2 className="w-4 h-4" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Appearance Settings</h3>
        
        <div className="space-y-6">
          <div className="p-4 border rounded-lg border-slate-200">
            <h4 className="mb-3 font-medium text-slate-800">Theme</h4>
            <div className="grid grid-cols-3 gap-3">
              <button className="p-4 text-center border-2 border-blue-500 rounded-lg bg-blue-50">
                <Sun className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium text-blue-800">Light</p>
              </button>
              <button className="p-4 text-center border-2 rounded-lg border-slate-200 hover:border-slate-300">
                <Moon className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                <p className="text-sm font-medium text-slate-800">Dark</p>
              </button>
              <button className="p-4 text-center border-2 rounded-lg border-slate-200 hover:border-slate-300">
                <Monitor className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                <p className="text-sm font-medium text-slate-800">System</p>
              </button>
            </div>
          </div>

          <div className="p-4 border rounded-lg border-slate-200">
            <h4 className="mb-3 font-medium text-slate-800">Accent Color</h4>
            <div className="flex space-x-3">
              {[
                { color: 'bg-blue-500', active: true },
                { color: 'bg-emerald-500', active: false },
                { color: 'bg-purple-500', active: false },
                { color: 'bg-amber-500', active: false },
                { color: 'bg-red-500', active: false },
                { color: 'bg-pink-500', active: false },
              ].map((item, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full ${item.color} ${
                    item.active ? 'ring-2 ring-offset-2 ring-slate-400' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 border rounded-lg border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-slate-800">Compact Mode</h4>
                <p className="text-sm text-slate-600">Reduce spacing and padding for more content</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="p-4 border rounded-lg border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-slate-800">Sidebar Collapsed</h4>
                <p className="text-sm text-slate-600">Keep sidebar collapsed by default</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Integrations</h3>
        
        <div className="space-y-4">
          {[
            { name: 'Slack', desc: 'Get notifications in Slack channels', connected: true, icon: '💬' },
            { name: 'GitHub', desc: 'Link commits and pull requests to tasks', connected: true, icon: '🐙' },
            { name: 'Google Calendar', desc: 'Sync deadlines with your calendar', connected: false, icon: '📅' },
            { name: 'Jira', desc: 'Import issues from Jira projects', connected: false, icon: '🔷' },
            { name: 'Figma', desc: 'Attach design files to tasks', connected: false, icon: '🎨' },
            { name: 'Zoom', desc: 'Create meeting links for tasks', connected: true, icon: '📹' },
          ].map((integration) => (
            <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg border-slate-200">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{integration.icon}</span>
                <div>
                  <h4 className="font-medium text-slate-800">{integration.name}</h4>
                  <p className="text-sm text-slate-600">{integration.desc}</p>
                </div>
              </div>
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  integration.connected
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {integration.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDataSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Data & Privacy</h3>
        
        <div className="space-y-6">
          <div className="p-4 border rounded-lg border-slate-200">
            <h4 className="mb-2 font-medium text-slate-800">Data Export</h4>
            <p className="mb-4 text-sm text-slate-600">Download a copy of your data</p>
            <button className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
              Export Data
            </button>
          </div>

          <div className="p-4 border rounded-lg border-slate-200">
            <h4 className="mb-2 font-medium text-slate-800">Privacy Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800">Profile Visibility</p>
                  <p className="text-sm text-slate-600">Who can see your profile information</p>
                </div>
                <select className="px-3 py-2 text-sm border rounded-lg border-slate-300">
                  <option>Team Members</option>
                  <option>Organization</option>
                  <option>Public</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800">Activity Status</p>
                  <p className="text-sm text-slate-600">Show when you're online</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg border-amber-200 bg-amber-50">
            <h4 className="mb-2 font-medium text-amber-800">Data Retention</h4>
            <p className="mb-4 text-sm text-amber-700">
              Your data is automatically backed up and retained for 90 days after account deletion.
            </p>
            <button className="text-sm font-medium text-amber-700 hover:text-amber-800">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSection();
      case 'notifications': return renderNotificationsSection();
      case 'security': return renderSecuritySection();
      case 'appearance': return renderAppearanceSection();
      case 'integrations': return renderIntegrationsSection();
      case 'data': return renderDataSection();
      default: return renderProfileSection();
    }
  };

  return (
    <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-4">
      {/* Settings Navigation */}
      <div className="p-4 bg-white border shadow-sm rounded-xl border-slate-200 h-fit">
        <h2 className="flex items-center mb-4 text-lg font-semibold text-slate-800">
          <SettingsIcon className="w-5 h-5 mr-2" />
          Settings
        </h2>
        
        <nav className="space-y-1">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <section.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{section.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Content */}
      <div className="p-6 bg-white border shadow-sm lg:col-span-3 rounded-xl border-slate-200">
        {renderContent()}
        
        {/* Save Button */}
        <div className="flex items-center justify-end pt-6 mt-8 space-x-3 border-t border-slate-200">
          <button className="px-4 py-2 transition-colors text-slate-600 hover:text-slate-800">
            Cancel
          </button>
          <button className="flex items-center px-6 py-2 space-x-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};