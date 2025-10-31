import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectManagement = () => {
  const navigate = useNavigate();

  // Mock data - Replace with API calls
  const [projects] = useState([
    {
      id: 1,
      projectName: 'Mobile App Development',
      projectCode: 'PROJ-2024-001',
      team: 'Engineering Team',
      projectManager: 'Jane Smith',
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      budget: 75000,
      priority: 'High',
      status: 'in_progress',
      progress: 45,
      tasksTotal: 24,
      tasksCompleted: 11,
    },
    {
      id: 2,
      projectName: 'Marketing Campaign Q1',
      projectCode: 'PROJ-2024-002',
      team: 'Marketing Team',
      projectManager: 'Mike Johnson',
      startDate: '2024-02-01',
      endDate: '2024-03-31',
      budget: 30000,
      priority: 'Medium',
      status: 'in_progress',
      progress: 70,
      tasksTotal: 15,
      tasksCompleted: 10,
    },
    {
      id: 3,
      projectName: 'Sales Process Optimization',
      projectCode: 'PROJ-2024-003',
      team: 'Sales Team',
      projectManager: 'John Doe',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      budget: 50000,
      priority: 'Critical',
      status: 'in_progress',
      progress: 30,
      tasksTotal: 32,
      tasksCompleted: 9,
    },
    {
      id: 4,
      projectName: 'Customer Support Portal',
      projectCode: 'PROJ-2023-015',
      team: 'Support Team',
      projectManager: 'Sarah Williams',
      startDate: '2023-11-01',
      endDate: '2024-01-15',
      budget: 40000,
      priority: 'High',
      status: 'completed',
      progress: 100,
      tasksTotal: 18,
      tasksCompleted: 18,
    },
    {
      id: 5,
      projectName: 'Financial System Upgrade',
      projectCode: 'PROJ-2024-004',
      team: 'Finance Team',
      projectManager: 'David Brown',
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      budget: 120000,
      priority: 'Critical',
      status: 'planning',
      progress: 5,
      tasksTotal: 45,
      tasksCompleted: 2,
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status) => {
    const colors = {
      planning: 'bg-gray-100 text-gray-700 border-gray-300',
      in_progress: 'bg-blue-100 text-blue-700 border-blue-300',
      on_hold: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      completed: 'bg-green-100 text-green-700 border-green-300',
      cancelled: 'bg-red-100 text-red-700 border-red-300',
    };
    return colors[status] || colors.planning;
  };

  const getStatusLabel = (status) => {
    const labels = {
      planning: 'Planning',
      in_progress: 'In Progress',
      on_hold: 'On Hold',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      Low: 'text-gray-600',
      Medium: 'text-blue-600',
      High: 'text-orange-600',
      Critical: 'text-red-600',
    };
    return colors[priority] || 'text-gray-600';
  };

  const filteredProjects = projects.filter((project) => {
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.team.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleViewProject = (projectId) => {
    console.log('View project:', projectId);
    // Navigate to project details page
  };

  const handleEditProject = (projectId) => {
    console.log('Edit project:', projectId);
    // Navigate to edit project page
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      console.log('Delete project:', projectId);
      // Add API call to delete project
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600">
            Project Management
          </h1>
          <button
            onClick={() => navigate('/create-project')}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + Create Project
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Projects
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, code, or team..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="planning">Planning</option>
                <option value="in_progress">In Progress</option>
                <option value="on_hold">On Hold</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Total Projects</p>
            <p className="text-2xl font-bold text-blue-600">{projects.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-gray-600 mb-1">In Progress</p>
            <p className="text-2xl font-bold text-green-600">
              {projects.filter((p) => p.status === 'in_progress').length}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <p className="text-sm text-gray-600 mb-1">Planning</p>
            <p className="text-2xl font-bold text-yellow-600">
              {projects.filter((p) => p.status === 'planning').length}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="text-2xl font-bold text-purple-600">
              {projects.filter((p) => p.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No projects found matching your criteria.</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Project Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {project.projectName}
                      </h3>
                      <span className="text-sm text-gray-500">
                        ({project.projectCode})
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {getStatusLabel(project.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Team:</span>{' '}
                        <span className="font-medium">{project.team}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Manager:</span>{' '}
                        <span className="font-medium">{project.projectManager}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Priority:</span>{' '}
                        <span className={`font-medium ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Start:</span>{' '}
                        <span className="font-medium">{project.startDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">End:</span>{' '}
                        <span className="font-medium">{project.endDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Budget:</span>{' '}
                        <span className="font-medium">${project.budget.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress: {project.progress}%</span>
                        <span>
                          Tasks: {project.tasksCompleted}/{project.tasksTotal}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2">
                    <button
                      onClick={() => handleViewProject(project.id)}
                      className="flex-1 lg:flex-none px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 whitespace-nowrap"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleEditProject(project.id)}
                      className="flex-1 lg:flex-none px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 whitespace-nowrap"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="flex-1 lg:flex-none px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Back Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;
