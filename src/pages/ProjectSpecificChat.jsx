import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Chat from '../components/Chat';

const ProjectSpecificChat = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  
  // Get user role from localStorage or context (defaulting to 'member' for employees)
  const currentUser = localStorage.getItem('currentUser') || 'Employee';
  const userRole = localStorage.getItem('userRole') || 'member'; // 'admin' or 'member'

  // Mock projects data
  const [projects] = useState([
    {
      id: 1,
      name: 'SKYTRON BACK END',
      code: 'PROJ-2024-001',
      teamMembers: ['Ankur', 'Nitul', 'Kishalay'],
      status: 'active',
      description: 'Front End: React, Back End: Django',
      startDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'DWARPAL AI',
      code: 'PROJ-2024-002',
      teamMembers: ['Ankur', 'Twinkle'],
      status: 'active',
      description: 'Front End: React, Back End: Django',
      startDate: '2024-02-01',
    },
    {
      id: 3,
      name: 'PENDULUM (Task Management App)',
      code: 'PROJ-2024-003',
      teamMembers: ['Nitul', 'Ankur'],
      status: 'active',
      description: 'MERN STACK',
      startDate: '2024-03-01',
    },
    {
      id: 4,
      name: 'ROUND THE CLOCK',
      code: 'PROJ-2024-004',
      teamMembers: ['Nitul', 'Ankur'],
      status: 'in-progress',
      description: 'MERN STACK',
      startDate: '2024-02-15',
    },
    {
      id: 5,
      name: 'MAPWALA MIS',
      code: 'PROJ-2024-005',
      teamMembers: ['Nitul', 'Ankur'],
      status: 'in-progress',
      description: 'MERN STACK',
      startDate: '2024-04-01',
    },
    {
      id: 6,
      name: 'MAPWALA / RAPIDYTARA / E-DISHA TRACKING PLATFORM',
      code: 'PROJ-2024-006',
      teamMembers: ['Ankur', 'Nitul', 'Kishalay'],
      status: 'active',
      description: 'Front End: React, Back End: Django',
      startDate: '2024-01-10',
    },
    {
      id: 7,
      name: 'MINDGENIX & SKYTRACK WEBSITE',
      code: 'PROJ-2024-007',
      teamMembers: ['Nitul'],
      status: 'completed',
      description: 'Website Development',
      startDate: '2024-05-01',
    },
  ]);

  const currentProject = projects.find(p => p.id === parseInt(projectId));

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
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  if (!currentProject) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate('/project-management')}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Project Management
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-purple-600">
              Project Chat
            </h1>
            <p className="text-gray-600 mt-1">
              💬 {currentProject.name} ({currentProject.code})
            </p>
          </div>
          <button
            onClick={() => navigate(userRole === 'admin' ? '/project-management' : '/my-tasks')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
          >
            ← Back to {userRole === 'admin' ? 'Projects' : 'My Tasks'}
          </button>
        </div>

        {/* Project Info Card */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {currentProject.name}
                </h3>
                <span className="text-sm text-gray-500">
                  ({currentProject.code})
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    currentProject.status
                  )}`}
                >
                  {currentProject.status.toUpperCase()}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{currentProject.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Start Date:</span>{' '}
                  <span className="font-medium">{currentProject.startDate}</span>
                </div>
                <div>
                  <span className="text-gray-600">Team Members:</span>{' '}
                  <span className="font-medium">{currentProject.teamMembers.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Component */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <Chat 
            chatId={`project-${projectId}`}
            chatType="project"
            chatTitle={`${currentProject.name} Team Chat`}
            currentUser={currentUser}
          />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end mt-6">
          {userRole === 'admin' && (
            <button
              onClick={() => navigate(`/project/${projectId}/tasks`)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              📋 Manage Tasks
            </button>
          )}
          <button
            onClick={() => navigate(userRole === 'admin' ? '/project-management' : '/my-tasks')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
          >
            Back to {userRole === 'admin' ? 'Project Management' : 'My Tasks'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectSpecificChat;
