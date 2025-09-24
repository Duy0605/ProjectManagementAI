import React from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Bot,
  Calendar,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAppContext } from '../contexts/AppContext';

const productivityData = [
  { name: 'Mon', tasks: 12 },
  { name: 'Tue', tasks: 19 },
  { name: 'Wed', tasks: 15 },
  { name: 'Thu', tasks: 22 },
  { name: 'Fri', tasks: 18 },
  { name: 'Sat', tasks: 8 },
  { name: 'Sun', tasks: 5 },
];

const projectStatus = [
  { name: 'Completed', value: 35, color: '#10B981' },
  { name: 'In Progress', value: 45, color: '#3B82F6' },
  { name: 'Planned', value: 20, color: '#F59E0B' },
];

const aiInsights = [
  {
    title: 'Sprint Velocity Alert',
    message: 'Current sprint is 15% behind schedule. Consider redistributing 3 high-priority tasks.',
    type: 'warning',
    confidence: 87,
  },
  {
    title: 'Resource Optimization',
    message: 'Sarah Chen has capacity for 2 more tasks this week based on her completion rate.',
    type: 'info',
    confidence: 92,
  },
  {
    title: 'Deadline Risk Detection',
    message: 'E-Commerce Platform project has 78% chance of meeting deadline if current pace continues.',
    type: 'success',
    confidence: 78,
  },
];

export const Dashboard: React.FC = () => {
  const { projects, tasks, currentUser } = useAppContext();
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const overdueTasksCount = tasks.filter(task => new Date(task.dueDate) < new Date()).length;

  const stats = [
    {
      title: 'Active Projects',
      value: projects.filter(p => p.status === 'active').length,
      icon: BarChart3,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Completed Tasks',
      value: completedTasks,
      icon: CheckCircle,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'In Progress',
      value: inProgressTasks,
      icon: Clock,
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50',
    },
    {
      title: 'Team Members',
      value: 12,
      icon: Users,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="p-6 text-white bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold">Welcome back, {currentUser?.name}! 👋</h1>
            <p className="text-blue-100">Here's what's happening with your projects today.</p>
          </div>
          <Bot className="w-16 h-16 text-blue-200" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow duration-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold text-slate-800">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights & Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* AI Insights */}
        <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
          <div className="flex items-center mb-4 space-x-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-800">AI Insights</h3>
          </div>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg bg-slate-50 border-slate-200">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-slate-800">{insight.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    insight.type === 'warning' ? 'bg-amber-100 text-amber-700' :
                    insight.type === 'success' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {insight.confidence}% confidence
                  </span>
                </div>
                <p className="text-sm text-slate-600">{insight.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Productivity */}
        <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">Weekly Productivity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                }}
              />
              <Bar dataKey="tasks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Project Overview & Task Distribution */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Active Projects */}
        <div className="p-6 bg-white border shadow-sm lg:col-span-2 rounded-xl border-slate-200">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">Active Projects</h3>
          <div className="space-y-4">
            {projects.filter(p => p.status === 'active').map((project) => (
              <div key={project.id} className="p-4 transition-shadow duration-200 border rounded-lg border-slate-200 hover:shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-slate-800">{project.name}</h4>
                    <p className="text-sm text-slate-600">{project.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.priority === 'high' ? 'bg-red-100 text-red-700' :
                    project.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {project.priority} priority
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span className="text-slate-600">Progress</span>
                      <span className="font-medium text-slate-800">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200">
                      <div
                        className="h-2 transition-all duration-300 bg-blue-500 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <Calendar className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Distribution */}
        <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">Task Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={projectStatus}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
              >
                {projectStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {projectStatus.map((status, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                  <span className="text-sm text-slate-600">{status.name}</span>
                </div>
                <span className="text-sm font-medium text-slate-800">{status.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Urgent Items */}
      {overdueTasksCount > 0 && (
        <div className="p-6 border border-red-200 bg-red-50 rounded-xl">
          <div className="flex items-center mb-4 space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold text-red-800">Urgent Attention Needed</h3>
          </div>
          <p className="text-red-700">
            You have {overdueTasksCount} overdue task{overdueTasksCount !== 1 ? 's' : ''} that require immediate attention.
          </p>
          <button className="px-4 py-2 mt-3 text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700">
            Review Overdue Tasks
          </button>
        </div>
      )}
    </div>
  );
};