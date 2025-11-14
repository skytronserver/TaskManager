import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TodaysDeadlines = () => {
  const navigate = useNavigate();
  const [todaysTasks, setTodaysTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock projects data (same as in other components)
  const mockProjects = [
    {
      id: 1,
      name: 'SKYTRON BACK END',
      code: 'PROJ-2024-001',
    },
    {
      id: 2,
      name: 'DWARPAL AI',
      code: 'PROJ-2024-002',
    },
    {
      id: 3,
      name: 'PENDULUM (Task Management App)',
      code: 'PROJ-2024-003',
    },
    {
      id: 4,
      name: 'ROUND THE CLOCK',
      code: 'PROJ-2024-004',
    },
    {
      id: 5,
      name: 'MAPWALA MIS',
      code: 'PROJ-2024-005',
    },
    {
      id: 6,
      name: 'MAPWALA / RAPIDYTARA / E-DISHA TRACKING PLATFORM',
      code: 'PROJ-2024-006',
    },
    {
      id: 7,
      name: 'MINDGENIX & SKYTRACK WEBSITE',
      code: 'PROJ-2024-007',
    },
  ];

  useEffect(() => {
    loadTodaysTasks();
    setProjects(mockProjects);
  }, []);

  const loadTodaysTasks = () => {
    setLoading(true);
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Load all tasks from localStorage
    const allTasks = JSON.parse(localStorage.getItem('allTasks') || '[]');
    const individualTasks = JSON.parse(localStorage.getItem('individualTasks') || '[]');
    
    // Add some dummy tasks with today's date for demonstration
    const dummyTasks = [
      {
        id: 3001,
        title: 'Fix Critical Bug in Payment Gateway',
        description: 'Resolve the timeout issue in payment processing that is affecting customer transactions',
        assignedTo: 'Ankur',
        assignedBy: 'Project Manager',
        priority: 'Critical',
        dueDate: today,
        status: 'in-progress',
        type: 'oneTime',
        projectId: 1,
      },
      {
        id: 3002,
        title: 'Database Performance Optimization',
        description: 'Optimize slow queries and implement proper indexing for better performance',
        assignedTo: 'Kishalay',
        assignedBy: 'Database Admin',
        priority: 'High',
        dueDate: today,
        status: 'extension-requested',
        type: 'oneTime',
        projectId: 1,
        requestedExtensionDate: '2025-11-16',
        extensionReason: 'Need additional time to test the optimization on production-like data.',
        extensionRequestDate: '2025-11-14T06:30:00Z',
      },
      {
        id: 3003,
        title: 'AI Model Training Pipeline',
        description: 'Set up automated training pipeline for natural language processing models',
        assignedTo: 'Ankur',
        assignedBy: 'AI Lead',
        priority: 'Medium',
        dueDate: today,
        status: 'pending',
        type: 'oneTime',
        projectId: 2,
      },
      {
        id: 3004,
        title: 'Mobile App UI Testing',
        description: 'Conduct comprehensive UI testing across different mobile devices and screen sizes',
        assignedTo: 'Twinkle',
        assignedBy: 'QA Manager',
        priority: 'Medium',
        dueDate: today,
        status: 'in-progress',
        type: 'oneTime',
        projectId: 3,
      },
      {
        id: 3005,
        title: 'Daily Code Review',
        description: 'Review pull requests and provide feedback to team members',
        assignedTo: 'Nitul',
        assignedBy: 'Team Lead',
        priority: 'Low',
        dueDate: today,
        status: 'pending',
        type: 'repetitive',
        projectId: null, // Individual task
      }
    ];
    
    // Combine all tasks
    const combinedTasks = [...allTasks, ...individualTasks, ...dummyTasks];
    
    // Filter tasks due today
    const tasksToday = combinedTasks.filter(task => {
      const taskDueDate = task.dueDate ? task.dueDate.split('T')[0] : null;
      return taskDueDate === today && task.status !== 'completed' && task.status !== 'closed' && task.status !== 'abandoned';
    });
    
    setTodaysTasks(tasksToday);
    setLoading(false);
  };

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Individual Task';
  };

  const getProjectCode = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.code : 'IND';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'extension-requested':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'extended':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'High':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'Critical':
        return '🔴';
      case 'High':
        return '🟠';
      case 'Medium':
        return '🟡';
      case 'Low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  const formatTime = () => {
    return new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const navigateToTask = (task) => {
    if (task.projectId) {
      navigate(`/project/${task.projectId}/tasks`);
    } else {
      navigate('/individual-tasks-management');
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading today's deadlines...</span>
          </div>
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
            <h1 className="text-2xl sm:text-3xl font-semibold text-red-600 flex items-center gap-2">
              🗓️ Today's Task Deadlines
            </h1>
            <p className="text-gray-600 mt-1">
              {formatTime()}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Tasks that are due today across all projects
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadTodaysTasks}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              🔄 Refresh
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Total Due Today</p>
                <p className="text-2xl font-bold text-red-700">{todaysTasks.length}</p>
              </div>
              <div className="text-2xl">📅</div>
            </div>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Critical Priority</p>
                <p className="text-2xl font-bold text-orange-700">
                  {todaysTasks.filter(t => t.priority === 'Critical').length}
                </p>
              </div>
              <div className="text-2xl">🔴</div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">In Progress</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {todaysTasks.filter(t => t.status === 'in-progress').length}
                </p>
              </div>
              <div className="text-2xl">⚡</div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Pending</p>
                <p className="text-2xl font-bold text-blue-700">
                  {todaysTasks.filter(t => t.status === 'pending').length}
                </p>
              </div>
              <div className="text-2xl">⏳</div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        {todaysTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tasks Due Today!</h3>
            <p className="text-gray-500">Great job! You don't have any tasks due today.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Tasks Due Today ({todaysTasks.length})
            </h2>
            
            {todaysTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigateToTask(task)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{getPriorityIcon(task.priority)}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="text-gray-500">Project:</span>
                          <span className="font-medium text-blue-600">
                            {getProjectName(task.projectId)} ({getProjectCode(task.projectId)})
                          </span>
                          
                          <span className="text-gray-300">•</span>
                          
                          <span className="text-gray-500">Assigned to:</span>
                          <span className="font-medium text-gray-700">{task.assignedTo}</span>
                          
                          <span className="text-gray-300">•</span>
                          
                          <span className="text-gray-500">By:</span>
                          <span className="font-medium text-gray-700">{task.assignedBy}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                      {task.priority} Priority
                    </span>
                    
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                      {task.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    
                    <div className="text-right">
                      <div className="text-sm font-medium text-red-600">Due Today</div>
                      <div className="text-xs text-gray-500">{task.dueDate}</div>
                    </div>
                  </div>
                </div>
                
                {task.extensionReason && (
                  <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-md">
                    <p className="text-sm text-orange-700">
                      <strong>Extension Requested:</strong> {task.extensionReason}
                    </p>
                    {task.requestedExtensionDate && (
                      <p className="text-xs text-orange-600 mt-1">
                        Requested new date: {task.requestedExtensionDate}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaysDeadlines;
