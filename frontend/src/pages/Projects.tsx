import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Users,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

export const Projects: React.FC = () => {
  const { projects } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'on-hold': return 'bg-amber-100 text-amber-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-l-red-500';
      case 'high': return 'border-l-orange-500';
      case 'medium': return 'border-l-amber-500';
      case 'low': return 'border-l-slate-500';
      default: return 'border-l-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Projects</h1>
          <p className="text-slate-600">Manage and track your project portfolio</p>
        </div>
        
        <button className="flex items-center px-4 py-2 space-x-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filters */}
      <div className="p-4 bg-white border shadow-sm rounded-xl border-slate-200">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 transition-colors border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-sm border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`bg-white rounded-xl p-6 border-l-4 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${getPriorityColor(project.priority)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold text-slate-800">{project.name}</h3>
                <p className="mb-3 text-sm text-slate-600 line-clamp-2">{project.description}</p>
                
                <div className="flex items-center mb-4 space-x-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600">
                    {project.priority} priority
                  </span>
                </div>
              </div>
              
              <button className="p-2 transition-colors rounded-lg hover:bg-slate-100">
                <MoreVertical className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="flex items-center text-slate-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Progress
                </span>
                <span className="font-medium text-slate-800">{project.progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200">
                <div
                  className="h-2 transition-all duration-300 bg-blue-500 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Project Info */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-slate-600">
                <Users className="w-4 h-4 mr-1" />
                <span>{project.members.length} members</span>
              </div>
              
              <div className="flex items-center text-slate-600">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(project.endDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-12 text-center bg-white border rounded-xl border-slate-200">
          <div className="max-w-md mx-auto">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <h3 className="mb-2 text-lg font-medium text-slate-800">No projects found</h3>
            <p className="mb-6 text-slate-600">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Get started by creating your first project'
              }
            </p>
            <button className="px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
              <Plus className="inline w-4 h-4 mr-2" />
              Create Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};