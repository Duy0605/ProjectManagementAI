import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  Activity,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const velocityData = [
  { sprint: 'Sprint 1', planned: 25, completed: 23 },
  { sprint: 'Sprint 2', planned: 30, completed: 28 },
  { sprint: 'Sprint 3', planned: 28, completed: 32 },
  { sprint: 'Sprint 4', planned: 35, completed: 31 },
  { sprint: 'Sprint 5', planned: 32, completed: 35 },
];

const burndownData = [
  { day: 'Day 1', remaining: 120, ideal: 120 },
  { day: 'Day 2', remaining: 110, ideal: 108 },
  { day: 'Day 3', remaining: 98, ideal: 96 },
  { day: 'Day 4', remaining: 85, ideal: 84 },
  { day: 'Day 5', remaining: 75, ideal: 72 },
  { day: 'Day 6', remaining: 68, ideal: 60 },
  { day: 'Day 7', remaining: 52, ideal: 48 },
  { day: 'Day 8', remaining: 42, ideal: 36 },
  { day: 'Day 9', remaining: 35, ideal: 24 },
  { day: 'Day 10', remaining: 28, ideal: 12 },
];

const teamPerformance = [
  { name: 'Anh', tasksCompleted: 28, hoursLogged: 156, efficiency: 94 },
  { name: 'Duy', tasksCompleted: 24, hoursLogged: 142, efficiency: 88 },
  { name: 'Đức', tasksCompleted: 22, hoursLogged: 138, efficiency: 85 },
  { name: 'Minh', tasksCompleted: 26, hoursLogged: 148, efficiency: 92 },
];

const teamMembers = [
  { name: 'Anh', avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=3B82F6&color=fff' },
  { name: 'Duy', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=10B981&color=fff' },
  { name: 'Đức', avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=F59E0B&color=fff' },
  { name: 'Minh', avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=8B5CF6&color=fff' },
];

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Analytics & Reports</h1>
        <p className="text-slate-600">Track team performance and project insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Sprint Velocity</p>
              <p className="mt-1 text-2xl font-bold text-slate-800">31.2</p>
              <p className="mt-1 text-xs font-medium text-emerald-600">↑ 12% from last sprint</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Team Utilization</p>
              <p className="mt-1 text-2xl font-bold text-slate-800">87%</p>
              <p className="mt-1 text-xs font-medium text-amber-600">Optimal range: 80-90%</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-100">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg. Task Time</p>
              <p className="mt-1 text-2xl font-bold text-slate-800">4.2h</p>
              <p className="mt-1 text-xs font-medium text-emerald-600">↓ 8% faster than target</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-100">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">On-Time Delivery</p>
              <p className="mt-1 text-2xl font-bold text-slate-800">94%</p>
              <p className="mt-1 text-xs font-medium text-emerald-600">Above 90% target</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sprint Velocity */}
        <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
          <h3 className="flex items-center mb-4 text-lg font-semibold text-slate-800">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            Sprint Velocity Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={velocityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="sprint" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                }}
              />
              <Bar dataKey="planned" fill="#cbd5e1" name="Planned" radius={[2, 2, 0, 0]} />
              <Bar dataKey="completed" fill="#3B82F6" name="Completed" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Burndown Chart */}
        <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
          <h3 className="flex items-center mb-4 text-lg font-semibold text-slate-800">
            <Activity className="w-5 h-5 mr-2 text-emerald-600" />
            Sprint Burndown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={burndownData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                }}
              />
              <Area
                type="monotone"
                dataKey="ideal"
                stroke="#10B981"
                fill="#d1fae5"
                fillOpacity={0.6}
                name="Ideal"
                strokeDasharray="5 5"
              />
              <Area
                type="monotone"
                dataKey="remaining"
                stroke="#3B82F6"
                fill="#dbeafe"
                fillOpacity={0.6}
                name="Actual"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Team Performance */}
      <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
        <h3 className="flex items-center mb-6 text-lg font-semibold text-slate-800">
          <Users className="w-5 h-5 mr-2 text-purple-600" />
          Team Performance
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-3 text-sm font-medium text-left text-slate-600">Team Member</th>
                <th className="pb-3 text-sm font-medium text-left text-slate-600">Tasks Completed</th>
                <th className="pb-3 text-sm font-medium text-left text-slate-600">Hours Logged</th>
                <th className="pb-3 text-sm font-medium text-left text-slate-600">Efficiency</th>
                <th className="pb-3 text-sm font-medium text-left text-slate-600">Performance</th>
              </tr>
            </thead>
            <tbody>
              {teamPerformance.map((member, index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={teamMembers.find(m => m.name === member.name)?.avatar}
                        alt={member.name}
                        className="object-cover w-8 h-8 rounded-full"
                      />
                      <span className="font-medium text-slate-800">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-slate-600">{member.tasksCompleted}</td>
                  <td className="py-4 text-slate-600">{member.hoursLogged}h</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.efficiency >= 90 ? 'bg-emerald-100 text-emerald-700' :
                      member.efficiency >= 80 ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {member.efficiency}%
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="w-full h-2 rounded-full bg-slate-200">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          member.efficiency >= 90 ? 'bg-emerald-500' :
                          member.efficiency >= 80 ? 'bg-amber-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${member.efficiency}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};