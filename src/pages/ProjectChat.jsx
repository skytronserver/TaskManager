import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from '../components/Chat';

const ProjectChat = () => {
  const navigate = useNavigate();

  // Mock projects data
  const [projects] = useState([
    {
      id: 1,
      name: 'SKYTRON BACK END',
      code: 'PROJ-2024-001',
      teamMembers: ['Ankur', 'Nitul', 'Kishalay'],
      status: 'active',
      description: 'Backend development for SKYTRON platform',
      startDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Mobile App Development',
      code: 'PROJ-2024-002',
      teamMembers: ['Kajal', 'Samudra'],
      status: 'in-progress',
      description: 'Cross-platform mobile application development',
      startDate: '2024-02-01',
    },
    {
      id: 3,
      name: 'Frontend Redesign',
      code: 'PROJ-2024-003',
      teamMembers: ['Twinkle', 'Nitul'],
      status: 'completed',
      description: 'UI/UX redesign for the main application',
      startDate: '2024-01-10',
    },
  ]);

  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'completed':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (filterStatus === 'all') return true;
    return project.status === filterStatus;
  });

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600">
              Project Group Chat
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Collaborate with your team on project discussions
            </p>
          </div>
          <button
            onClick={() => navigate('/project-management')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 text-sm whitespace-nowrap"
          >
            ← Back to Projects
          </button>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Projects</option>
            <option value="active">Active</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Project List Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Projects ({filteredProjects.length})
              </h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedProject.id === project.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                      {project.name}
                    </h3>
                    <p
                      className={`text-xs ${
                        selectedProject.id === project.id
                          ? 'text-blue-100'
                          : 'text-gray-500'
                      }`}
                    >
                      {project.code}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border ${
                          selectedProject?.id === project.id
                            ? 'bg-blue-500 text-white border-blue-400'
                            : getStatusColor(project.status)
                        }`}
                      >
                        {project.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <span
                        className={`text-xs ${
                          selectedProject.id === project.id
                            ? 'text-blue-100'
                            : 'text-gray-600'
                        }`}
                      >
                        👥 {project.teamMembers.length} members
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Team Members
              </h3>
              <div className="space-y-2">
                {selectedProject.teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-white rounded-md"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {member.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-700">{member}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            {/* Project Info Card */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4 border-2 border-blue-200">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {selectedProject.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {selectedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Project Code:</span>
                      <span className="text-blue-600">
                        {selectedProject.code}
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Start Date:</span>
                      <span>{selectedProject.startDate}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Team Size:</span>
                      <span className="text-blue-600">
                        {selectedProject.teamMembers.length} members
                      </span>
                    </span>
                  </div>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    selectedProject.status
                  )} w-fit`}
                >
                  {selectedProject.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
            </div>

            {/* Chat Component */}
            <div className="h-[500px] sm:h-[600px]">
              <Chat
                chatId={selectedProject.id}
                chatType="project"
                chatTitle={selectedProject.name}
                currentUser="Admin"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectChat;
