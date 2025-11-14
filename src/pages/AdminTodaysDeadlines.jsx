import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminTodaysDeadlines = () => {
  const navigate = useNavigate();
  const [todaysTasks, setTodaysTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionNote, setActionNote] = useState('');
  const [extensionDate, setExtensionDate] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProject, setFilterProject] = useState('all');

  // Mock projects data
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
    
    // Add dummy tasks with today's date if no tasks exist
    const dummyTasks = [
      {
        id: 1001,
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
        id: 1002,
        title: 'Complete User Authentication Module',
        description: 'Implement JWT token validation and refresh mechanism for secure user sessions',
        assignedTo: 'Nitul',
        assignedBy: 'Tech Lead',
        priority: 'High',
        dueDate: today,
        status: 'completed',
        type: 'oneTime',
        projectId: 1,
      },
      {
        id: 1003,
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
        extensionReason: 'Need additional time to test the optimization on production-like data. Current test environment doesn\'t reflect real-world load.',
        extensionRequestDate: '2025-11-14T06:30:00Z',
      },
      {
        id: 1004,
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
        id: 1005,
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
        id: 1006,
        title: 'Security Audit Report',
        description: 'Complete security vulnerability assessment and prepare detailed report',
        assignedTo: 'Nitul',
        assignedBy: 'Security Officer',
        priority: 'Critical',
        dueDate: today,
        status: 'completed',
        type: 'oneTime',
        projectId: 4,
        adminRemarks: 'Excellent work on identifying critical vulnerabilities. Report approved.',
        adminActionDate: '2025-11-14T05:45:00Z',
      },
      {
        id: 1007,
        title: 'Client Presentation Preparation',
        description: 'Prepare demo and presentation materials for upcoming client meeting',
        assignedTo: 'Ankur',
        assignedBy: 'Sales Manager',
        priority: 'High',
        dueDate: today,
        status: 'extension-requested',
        type: 'oneTime',
        projectId: 5,
        requestedExtensionDate: '2025-11-15',
        extensionReason: 'Client requested additional features to be included in the demo. Need extra day to implement and test.',
        extensionRequestDate: '2025-11-14T08:15:00Z',
      },
      {
        id: 1008,
        title: 'Daily Code Review',
        description: 'Review pull requests and provide feedback to team members',
        assignedTo: 'Nitul',
        assignedBy: 'Team Lead',
        priority: 'Low',
        dueDate: today,
        status: 'pending',
        type: 'repetitive',
        projectId: null, // Individual task
      },
      {
        id: 1009,
        title: 'Update Project Documentation',
        description: 'Update API documentation and user guides with latest changes',
        assignedTo: 'Kishalay',
        assignedBy: 'Documentation Lead',
        priority: 'Low',
        dueDate: today,
        status: 'in-progress',
        type: 'oneTime',
        projectId: 6,
      },
      {
        id: 1010,
        title: 'Server Maintenance Check',
        description: 'Perform routine server health checks and update system logs',
        assignedTo: 'Twinkle',
        assignedBy: 'DevOps Lead',
        priority: 'Medium',
        dueDate: today,
        status: 'completed',
        type: 'repetitive',
        projectId: null, // Individual task
      }
    ];
    
    // Combine all tasks including dummy data
    const combinedTasks = [...allTasks, ...individualTasks, ...dummyTasks];
    
    // Filter tasks due today (admin sees all tasks)
    const tasksToday = combinedTasks.filter(task => {
      const taskDueDate = task.dueDate ? task.dueDate.split('T')[0] : null;
      return taskDueDate === today && task.status !== 'abandoned';
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
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'extension-requested':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'extended':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'closed':
        return 'bg-gray-100 text-gray-700 border-gray-300';
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

  const handleTaskAction = (task, action) => {
    setSelectedTask(task);
    setActionType(action);
    setShowActionModal(true);
    setActionNote('');
    setExtensionDate(task.requestedExtensionDate || '');
  };

  const executeAction = () => {
    if (!selectedTask || !actionType) return;

    // Validation
    if ((actionType === 'approve-extension' || actionType === 'grant-extension') && !extensionDate) {
      alert('Please select an extension date');
      return;
    }

    let newStatus = selectedTask.status;
    let actionMessage = '';
    
    switch (actionType) {
      case 'approve-closure':
        newStatus = 'closed';
        actionMessage = 'Task closure approved successfully!';
        break;
      case 'reject-closure':
        newStatus = 'in-progress';
        actionMessage = 'Task closure rejected. Task sent back to in-progress.';
        break;
      case 'approve-extension':
        newStatus = 'in-progress';
        actionMessage = 'Extension approved successfully!';
        break;
      case 'reject-extension':
        newStatus = 'in-progress';
        actionMessage = 'Extension rejected. Task continues with original deadline.';
        break;
      case 'grant-extension':
        newStatus = 'extended';
        actionMessage = 'Extension granted successfully!';
        break;
      case 'close-task':
        newStatus = 'closed';
        actionMessage = 'Task closed successfully!';
        break;
      default:
        break;
    }

    // Update task in localStorage
    const allTasks = JSON.parse(localStorage.getItem('allTasks') || '[]');
    const individualTasks = JSON.parse(localStorage.getItem('individualTasks') || '[]');
    
    const updatedTask = {
      ...selectedTask,
      status: newStatus,
      ...((actionType === 'approve-extension' || actionType === 'grant-extension') && { 
        dueDate: extensionDate 
      }),
      ...(actionNote && { adminRemarks: actionNote, adminActionDate: new Date().toISOString() }),
      // Clear extension request data after processing
      ...((actionType === 'approve-extension' || actionType === 'reject-extension') && {
        requestedExtensionDate: undefined,
        extensionReason: undefined,
        extensionRequestDate: undefined
      }),
    };

    // Update in appropriate localStorage
    if (selectedTask.projectId) {
      const updatedAllTasks = allTasks.map(t => t.id === selectedTask.id ? updatedTask : t);
      localStorage.setItem('allTasks', JSON.stringify(updatedAllTasks));
    } else {
      const updatedIndividualTasks = individualTasks.map(t => t.id === selectedTask.id ? updatedTask : t);
      localStorage.setItem('individualTasks', JSON.stringify(updatedIndividualTasks));
    }

    // Refresh the tasks list
    loadTodaysTasks();
    
    alert(actionMessage);
    setShowActionModal(false);
    setSelectedTask(null);
    setActionType('');
    setActionNote('');
    setExtensionDate('');
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

  // Apply filters
  const filteredTasks = todaysTasks.filter(task => {
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const projectMatch = filterProject === 'all' || 
      (filterProject === 'individual' && !task.projectId) ||
      (task.projectId && task.projectId.toString() === filterProject);
    
    return priorityMatch && statusMatch && projectMatch;
  });

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
              👨‍💼 Admin - Today's Task Deadlines
            </h1>
            <p className="text-gray-600 mt-1">
              {formatTime()}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Manage and oversee all tasks due today across projects and individual assignments
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

        {/* Filters */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Filters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="extension-requested">Extension Requested</option>
                <option value="extended">Extended</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
              <select
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Projects</option>
                <option value="individual">Individual Tasks</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id.toString()}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Total Due Today</p>
                <p className="text-2xl font-bold text-red-700">{filteredTasks.length}</p>
              </div>
              <div className="text-2xl">📅</div>
            </div>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Critical</p>
                <p className="text-2xl font-bold text-orange-700">
                  {filteredTasks.filter(t => t.priority === 'Critical').length}
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
                  {filteredTasks.filter(t => t.status === 'in-progress').length}
                </p>
              </div>
              <div className="text-2xl">⚡</div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Completed</p>
                <p className="text-2xl font-bold text-green-700">
                  {filteredTasks.filter(t => t.status === 'completed').length}
                </p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Extensions</p>
                <p className="text-2xl font-bold text-purple-700">
                  {filteredTasks.filter(t => t.status === 'extension-requested').length}
                </p>
              </div>
              <div className="text-2xl">📋</div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tasks Match Your Filters!</h3>
            <p className="text-gray-500">Try adjusting your filters to see more tasks.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Tasks Due Today ({filteredTasks.length})
            </h2>
            
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
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
                  
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                        {task.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    
                    <div className="flex gap-1">
                      {task.status === 'completed' && (
                        <>
                          <button
                            onClick={() => handleTaskAction(task, 'approve-closure')}
                            className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                            title="Approve Closure"
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => handleTaskAction(task, 'reject-closure')}
                            className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                            title="Reject Closure"
                          >
                            ✗ Reject
                          </button>
                        </>
                      )}
                      
                      {task.status === 'extension-requested' && (
                        <>
                          <button
                            onClick={() => handleTaskAction(task, 'approve-extension')}
                            className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                            title="Approve Extension"
                          >
                            ✓ Approve Ext
                          </button>
                          <button
                            onClick={() => handleTaskAction(task, 'reject-extension')}
                            className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                            title="Reject Extension"
                          >
                            ✗ Reject Ext
                          </button>
                        </>
                      )}
                      
                      {(task.status === 'pending' || task.status === 'in-progress') && (
                        <button
                          onClick={() => handleTaskAction(task, 'grant-extension')}
                          className="px-2 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700"
                          title="Grant Extension"
                        >
                          📅 Extend
                        </button>
                      )}
                      
                      <button
                        onClick={() => navigateToTask(task)}
                        className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                        title="View Details"
                      >
                        👁️ View
                      </button>
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

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {actionType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Task: {selectedTask?.title}</p>
            </div>
            
            {(actionType === 'approve-extension' || actionType === 'grant-extension') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Extension Date
                </label>
                <input
                  type="date"
                  value={extensionDate}
                  onChange={(e) => setExtensionDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin Remarks (Optional)
              </label>
              <textarea
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add any remarks or notes..."
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowActionModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={executeAction}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTodaysDeadlines;
