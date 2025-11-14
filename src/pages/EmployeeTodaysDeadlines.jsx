import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeTodaysDeadlines = () => {
  const navigate = useNavigate();
  const [myTodaysTasks, setMyTodaysTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionNote, setActionNote] = useState('');
  const [extensionDate, setExtensionDate] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Mock current user - in real app, this would come from auth context
  const currentUser = 'Ankur'; // This should be dynamic based on logged-in user

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
    loadMyTodaysTasks();
    setProjects(mockProjects);
  }, []);

  const loadMyTodaysTasks = () => {
    setLoading(true);
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Load all tasks from localStorage
    const allTasks = JSON.parse(localStorage.getItem('allTasks') || '[]');
    const individualTasks = JSON.parse(localStorage.getItem('individualTasks') || '[]');
    
    // Add dummy tasks with today's date for current user
    const dummyTasks = [
      {
        id: 2001,
        title: 'Fix Critical Bug in Payment Gateway',
        description: 'Resolve the timeout issue in payment processing that is affecting customer transactions',
        assignedTo: 'Ankur',
        assignedBy: 'Project Manager',
        priority: 'Critical',
        dueDate: today,
        status: 'in-progress',
        type: 'oneTime',
        projectId: 1,
        employeeRemarks: 'Working on identifying the root cause. Found potential memory leak in connection pooling.',
        employeeActionDate: '2025-11-14T09:30:00Z',
      },
      {
        id: 2002,
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
        id: 2003,
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
        extensionReason: 'Client requested additional features to be included in the demo. Need extra day to implement and test the new dashboard analytics.',
        extensionRequestDate: '2025-11-14T08:15:00Z',
      },
      {
        id: 2004,
        title: 'Code Review - Authentication Module',
        description: 'Review the new JWT implementation and provide feedback on security best practices',
        assignedTo: 'Ankur',
        assignedBy: 'Tech Lead',
        priority: 'Medium',
        dueDate: today,
        status: 'completed',
        type: 'oneTime',
        projectId: 1,
        employeeRemarks: 'Completed review. Found minor security improvements needed in token refresh logic.',
        employeeActionDate: '2025-11-14T07:45:00Z',
      },
      {
        id: 2005,
        title: 'Daily Standup Meeting',
        description: 'Attend daily standup and provide project updates to the team',
        assignedTo: 'Ankur',
        assignedBy: 'Scrum Master',
        priority: 'Low',
        dueDate: today,
        status: 'completed',
        type: 'repetitive',
        projectId: null, // Individual task
        employeeRemarks: 'Attended standup. Discussed blockers and sprint progress.',
        employeeActionDate: '2025-11-14T09:00:00Z',
      },
      {
        id: 2006,
        title: 'Update Team Documentation',
        description: 'Update the team wiki with latest API changes and deployment procedures',
        assignedTo: 'Ankur',
        assignedBy: 'Documentation Lead',
        priority: 'Low',
        dueDate: today,
        status: 'in-progress',
        type: 'oneTime',
        projectId: 3,
        adminRemarks: 'Please ensure all API endpoints are documented with examples.',
        adminActionDate: '2025-11-14T06:00:00Z',
      },
      {
        id: 2007,
        title: 'Performance Optimization Review',
        description: 'Analyze current system performance and identify bottlenecks',
        assignedTo: 'Ankur',
        assignedBy: 'System Architect',
        priority: 'High',
        dueDate: today,
        status: 'pending',
        type: 'oneTime',
        projectId: 4,
        adminRemarks: 'Focus on database query optimization and caching strategies.',
        adminActionDate: '2025-11-14T05:30:00Z',
      }
    ];
    
    // Combine all tasks including dummy data
    const combinedTasks = [...allTasks, ...individualTasks, ...dummyTasks];
    
    // Filter tasks due today and assigned to current user
    const myTasksToday = combinedTasks.filter(task => {
      const taskDueDate = task.dueDate ? task.dueDate.split('T')[0] : null;
      return taskDueDate === today && 
             task.assignedTo === currentUser && 
             task.status !== 'closed' && 
             task.status !== 'abandoned';
    });
    
    setMyTodaysTasks(myTasksToday);
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

  const getUrgencyLevel = (priority, status) => {
    if (priority === 'Critical') return { level: 'URGENT', color: 'text-red-600', bg: 'bg-red-100' };
    if (priority === 'High' && status === 'pending') return { level: 'HIGH PRIORITY', color: 'text-orange-600', bg: 'bg-orange-100' };
    if (status === 'extension-requested') return { level: 'AWAITING APPROVAL', color: 'text-purple-600', bg: 'bg-purple-100' };
    return { level: 'NORMAL', color: 'text-gray-600', bg: 'bg-gray-100' };
  };

  const handleTaskAction = (task, action) => {
    setSelectedTask(task);
    setActionType(action);
    setShowActionModal(true);
    setActionNote('');
    setExtensionDate('');
  };

  const executeAction = () => {
    if (!selectedTask || !actionType) return;

    // Validation
    if (actionType === 'request-extension' && !extensionDate) {
      alert('Please select an extension date');
      return;
    }
    if (actionType === 'request-extension' && !actionNote.trim()) {
      alert('Please provide a reason for extension');
      return;
    }

    let newStatus = selectedTask.status;
    let actionMessage = '';
    let updateData = {};
    
    switch (actionType) {
      case 'mark-completed':
        newStatus = 'completed';
        actionMessage = 'Task marked as completed! Waiting for admin approval.';
        break;
      case 'start-task':
        newStatus = 'in-progress';
        actionMessage = 'Task started successfully!';
        break;
      case 'request-extension':
        newStatus = 'extension-requested';
        actionMessage = 'Extension request submitted successfully! Waiting for admin approval.';
        updateData = {
          requestedExtensionDate: extensionDate,
          extensionReason: actionNote,
          extensionRequestDate: new Date().toISOString()
        };
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
      ...updateData,
      ...(actionNote && actionType !== 'request-extension' && { 
        employeeRemarks: actionNote, 
        employeeActionDate: new Date().toISOString() 
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
    loadMyTodaysTasks();
    
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

  const navigateToMyTasks = () => {
    navigate('/my-tasks');
  };

  // Apply filters
  const filteredTasks = myTodaysTasks.filter(task => {
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    
    return priorityMatch && statusMatch;
  });

  // Calculate time remaining
  const getTimeRemaining = () => {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const diff = endOfDay - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining today`;
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading your tasks for today...</span>
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
            <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 flex items-center gap-2">
              👨‍💻 My Tasks Due Today
            </h1>
            <p className="text-gray-600 mt-1">
              {formatTime()}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Welcome {currentUser}! Here are your tasks due today - {getTimeRemaining()}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadMyTodaysTasks}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              🔄 Refresh
            </button>
            <button
              onClick={navigateToMyTasks}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
            >
              📋 All My Tasks
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              ← Dashboard
            </button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-blue-700 mb-3">Quick Filters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="extension-requested">Extension Requested</option>
                <option value="extended">Extended</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">My Tasks Today</p>
                <p className="text-2xl font-bold text-blue-700">{filteredTasks.length}</p>
              </div>
              <div className="text-2xl">📋</div>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Critical Priority</p>
                <p className="text-2xl font-bold text-red-700">
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
        </div>

        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tasks Due Today!</h3>
            <p className="text-gray-500">Great job! You don't have any tasks due today, or they don't match your current filters.</p>
            <button
              onClick={navigateToMyTasks}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              View All My Tasks
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Your Tasks Due Today ({filteredTasks.length})
            </h2>
            
            {filteredTasks.map((task) => {
              const urgency = getUrgencyLevel(task.priority, task.status);
              return (
                <div
                  key={task.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{getPriorityIcon(task.priority)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{task.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${urgency.color} ${urgency.bg}`}>
                              {urgency.level}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-2 text-sm">
                            <span className="text-gray-500">Project:</span>
                            <span className="font-medium text-blue-600">
                              {getProjectName(task.projectId)} ({getProjectCode(task.projectId)})
                            </span>
                            
                            <span className="text-gray-300">•</span>
                            
                            <span className="text-gray-500">Assigned by:</span>
                            <span className="font-medium text-gray-700">{task.assignedBy}</span>
                            
                            <span className="text-gray-300">•</span>
                            
                            <span className="text-gray-500">Due:</span>
                            <span className="font-medium text-red-600">Today ({task.dueDate})</span>
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
                        {task.status === 'pending' && (
                          <button
                            onClick={() => handleTaskAction(task, 'start-task')}
                            className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                            title="Start Task"
                          >
                            ▶️ Start
                          </button>
                        )}
                        
                        {(task.status === 'in-progress' || task.status === 'pending') && (
                          <>
                            <button
                              onClick={() => handleTaskAction(task, 'mark-completed')}
                              className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                              title="Mark as Completed"
                            >
                              ✓ Complete
                            </button>
                            <button
                              onClick={() => handleTaskAction(task, 'request-extension')}
                              className="px-2 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700"
                              title="Request Extension"
                            >
                              📅 Extend
                            </button>
                          </>
                        )}
                        
                        {task.status === 'completed' && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                            ⏳ Awaiting Approval
                          </span>
                        )}
                        
                        {task.status === 'extension-requested' && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                            ⏳ Extension Pending
                          </span>
                        )}
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
                  
                  {task.adminRemarks && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-sm text-blue-700">
                        <strong>Admin Note:</strong> {task.adminRemarks}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {actionType === 'mark-completed' && 'Mark Task as Completed'}
              {actionType === 'start-task' && 'Start Task'}
              {actionType === 'request-extension' && 'Request Extension'}
            </h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Task: {selectedTask?.title}</p>
            </div>
            
            {actionType === 'request-extension' && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Requested Extension Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={extensionDate}
                    onChange={(e) => setExtensionDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Extension <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={actionNote}
                    onChange={(e) => setActionNote(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please explain why you need an extension..."
                  />
                </div>
              </>
            )}
            
            {(actionType === 'mark-completed' || actionType === 'start-task') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  value={actionNote}
                  onChange={(e) => setActionNote(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add any notes about your progress..."
                />
              </div>
            )}
            
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
                {actionType === 'mark-completed' && 'Mark Complete'}
                {actionType === 'start-task' && 'Start Task'}
                {actionType === 'request-extension' && 'Request Extension'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTodaysDeadlines;
