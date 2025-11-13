import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectTaskManagement = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  
  // Mock projects data
  const [projects] = useState([
    {
      id: 1,
      name: 'SKYTRON BACK END',
      code: 'PROJ-2024-001',
      teamMembers: [
        { id: 1, name: 'Ankur', designation: 'Team Leader' },
        { id: 2, name: 'Nitul', designation: 'Senior Developer' },
        { id: 3, name: 'Kishalay', designation: 'Developer' },
      ],
    },
    {
      id: 2,
      name: 'DWARPAL AI',
      code: 'PROJ-2024-002',
      teamMembers: [
        { id: 1, name: 'Ankur', designation: 'Team Leader' },
        { id: 5, name: 'Twinkle', designation: 'Developer' },
      ],
    },
    {
      id: 3,
      name: 'PENDULUM (Task Management App)',
      code: 'PROJ-2024-003',
      teamMembers: [
        { id: 2, name: 'Nitul', designation: 'Senior Developer' },
        { id: 1, name: 'Ankur', designation: 'Team Leader' },
      ],
    },
    {
      id: 4,
      name: 'ROUND THE CLOCK',
      code: 'PROJ-2024-004',
      teamMembers: [
        { id: 2, name: 'Nitul', designation: 'Senior Developer' },
        { id: 1, name: 'Ankur', designation: 'Team Leader' },
      ],
    },
    {
      id: 5,
      name: 'MAPWALA MIS',
      code: 'PROJ-2024-005',
      teamMembers: [
        { id: 2, name: 'Nitul', designation: 'Senior Developer' },
        { id: 1, name: 'Ankur', designation: 'Team Leader' },
      ],
    },
    {
      id: 6,
      name: 'MAPWALA / RAPIDYTARA / E-DISHA TRACKING PLATFORM',
      code: 'PROJ-2024-006',
      teamMembers: [
        { id: 1, name: 'Ankur', designation: 'Team Leader' },
        { id: 2, name: 'Nitul', designation: 'Senior Developer' },
        { id: 3, name: 'Kishalay', designation: 'Developer' },
      ],
    },
    {
      id: 7,
      name: 'MINDGENIX & SKYTRACK WEBSITE',
      code: 'PROJ-2024-007',
      teamMembers: [
        { id: 2, name: 'Nitul', designation: 'Senior Developer' },
      ],
    },
  ]);

  const currentProject = projects.find(p => p.id === parseInt(projectId));

  // Load tasks from localStorage or use default data
  const loadTasks = () => {
    // Temporarily disable localStorage to show dummy tasks
    // const savedTasks = localStorage.getItem('allTasks');
    // if (savedTasks) {
    //   return JSON.parse(savedTasks);
    // }
    
    // Return dummy project tasks
    return [
      // SKYTRON BACK END Project (ID: 1) tasks
      {
        id: 1,
        title: 'Backend API Development',
        description: 'Develop REST APIs for user authentication and data management',
        assignedTo: 'Ankur',
        assignedBy: 'Project Manager',
        priority: 'High',
        dueDate: '2025-11-20',
        startDate: '2025-11-10',
        status: 'in-progress',
        type: 'development',
        projectId: 1,
        category: 'Backend'
      },
      {
        id: 2,
        title: 'Database Integration',
        description: 'Set up PostgreSQL database and create data models',
        assignedTo: 'Nitul',
        assignedBy: 'Tech Lead',
        priority: 'Critical',
        dueDate: '2025-11-18',
        startDate: '2025-11-08',
        status: 'completed',
        type: 'development',
        projectId: 1,
        category: 'Database'
      },
      {
        id: 3,
        title: 'Security Implementation',
        description: 'Implement JWT authentication and authorization',
        assignedTo: 'Kishalay',
        assignedBy: 'Security Lead',
        priority: 'High',
        dueDate: '2025-11-25',
        startDate: '2025-11-15',
        status: 'pending',
        type: 'development',
        projectId: 1,
        category: 'Security'
      },
      {
        id: 4,
        title: 'Performance Testing',
        description: 'Load testing and performance optimization',
        assignedTo: 'Ankur',
        assignedBy: 'QA Lead',
        priority: 'Medium',
        dueDate: '2025-11-28',
        startDate: '2025-11-20',
        status: 'extension-requested',
        type: 'testing',
        projectId: 1,
        category: 'Testing'
      },
      
      // DWARPAL AI Project (ID: 2) tasks
      {
        id: 5,
        title: 'AI Model Training',
        description: 'Train machine learning models for natural language processing',
        assignedTo: 'Ankur',
        assignedBy: 'AI Lead',
        priority: 'Critical',
        dueDate: '2025-11-22',
        startDate: '2025-11-12',
        status: 'in-progress',
        type: 'development',
        projectId: 2,
        category: 'AI/ML'
      },
      {
        id: 6,
        title: 'Data Pipeline Setup',
        description: 'Create data ingestion and processing pipeline',
        assignedTo: 'Twinkle',
        assignedBy: 'Data Engineer',
        priority: 'High',
        dueDate: '2025-11-24',
        startDate: '2025-11-14',
        status: 'pending',
        type: 'development',
        projectId: 2,
        category: 'Data Engineering'
      },
      {
        id: 7,
        title: 'Model Deployment',
        description: 'Deploy AI models to production environment',
        assignedTo: 'Ankur',
        assignedBy: 'DevOps Lead',
        priority: 'High',
        dueDate: '2025-11-30',
        startDate: '2025-11-25',
        status: 'pending',
        type: 'deployment',
        projectId: 2,
        category: 'DevOps'
      },
      
      // PENDULUM Task Management App (ID: 3) tasks
      {
        id: 8,
        title: 'React Frontend Development',
        description: 'Build responsive React components for task management interface',
        assignedTo: 'Nitul',
        assignedBy: 'Frontend Lead',
        priority: 'High',
        dueDate: '2025-11-21',
        startDate: '2025-11-11',
        status: 'in-progress',
        type: 'development',
        projectId: 3,
        category: 'Frontend'
      },
      {
        id: 9,
        title: 'Real-time Notifications',
        description: 'Implement WebSocket-based real-time notifications',
        assignedTo: 'Ankur',
        assignedBy: 'Tech Lead',
        priority: 'Medium',
        dueDate: '2025-11-26',
        startDate: '2025-11-16',
        status: 'pending',
        type: 'development',
        projectId: 3,
        category: 'Backend'
      },
      {
        id: 10,
        title: 'Mobile Responsiveness',
        description: 'Ensure application works perfectly on mobile devices',
        assignedTo: 'Nitul',
        assignedBy: 'UI/UX Designer',
        priority: 'Medium',
        dueDate: '2025-11-28',
        startDate: '2025-11-18',
        status: 'completed',
        type: 'development',
        projectId: 3,
        category: 'Frontend'
      },
      {
        id: 11,
        title: 'Integration Testing',
        description: 'End-to-end testing of all application features',
        assignedTo: 'Ankur',
        assignedBy: 'QA Lead',
        priority: 'High',
        dueDate: '2025-12-02',
        startDate: '2025-11-22',
        status: 'extension-requested',
        type: 'testing',
        projectId: 3,
        category: 'Testing'
      },
      
      // ROUND THE CLOCK Project (ID: 4) tasks
      {
        id: 12,
        title: 'Time Tracking System',
        description: 'Develop comprehensive time tracking and reporting system',
        assignedTo: 'Nitul',
        assignedBy: 'Product Manager',
        priority: 'Critical',
        dueDate: '2025-11-23',
        startDate: '2025-11-13',
        status: 'in-progress',
        type: 'development',
        projectId: 4,
        category: 'Core Features'
      },
      {
        id: 13,
        title: 'Employee Dashboard',
        description: 'Create employee dashboard with analytics and reports',
        assignedTo: 'Ankur',
        assignedBy: 'UI/UX Lead',
        priority: 'High',
        dueDate: '2025-11-27',
        startDate: '2025-11-17',
        status: 'pending',
        type: 'development',
        projectId: 4,
        category: 'Frontend'
      },
      
      // MAPWALA MIS Project (ID: 5) tasks
      {
        id: 14,
        title: 'GIS Integration',
        description: 'Integrate mapping and GIS functionality',
        assignedTo: 'Nitul',
        assignedBy: 'GIS Specialist',
        priority: 'High',
        dueDate: '2025-11-25',
        startDate: '2025-11-15',
        status: 'in-progress',
        type: 'development',
        projectId: 5,
        category: 'GIS'
      },
      {
        id: 15,
        title: 'Data Visualization',
        description: 'Create interactive charts and maps for data visualization',
        assignedTo: 'Ankur',
        assignedBy: 'Data Analyst',
        priority: 'Medium',
        dueDate: '2025-11-29',
        startDate: '2025-11-19',
        status: 'pending',
        type: 'development',
        projectId: 5,
        category: 'Visualization'
      }
    ];
  };

  const [tasks, setTasks] = useState(loadTasks());
  const [selectedTask, setSelectedTask] = useState(null);
  const [actionType, setActionType] = useState('');
  const [actionNote, setActionNote] = useState('');
  const [extensionDate, setExtensionDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'Medium',
    dueDate: '',
  });
  const [reassignTo, setReassignTo] = useState('');

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('allTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Filter tasks for current project
  const projectTasks = tasks.filter(task => task.projectId === parseInt(projectId));

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setActionType('');
    setActionNote('');
    setExtensionDate(task.requestedExtensionDate || '');
    setReassignTo('');
  };

  const handleAction = () => {
    if (!actionType) {
      alert('Please select an action');
      return;
    }

    // Validation for remarks
    if ((actionType === 'reject-closure' || actionType === 'reject-extension' || actionType === 'abandon' || actionType === 'reassign') && !actionNote.trim()) {
      alert('Please provide remarks for this action');
      return;
    }

    if ((actionType === 'approve-extension' || actionType === 'grant-extension') && !extensionDate) {
      alert('Please select an extension date');
      return;
    }

    if (actionType === 'reassign' && !reassignTo) {
      alert('Please select a team member to reassign the task');
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
      case 'grant-extension':
        newStatus = 'extended';
        actionMessage = 'Extension granted successfully!';
        break;
      case 'reject-extension':
        newStatus = 'in-progress';
        actionMessage = 'Extension rejected. Task continues with original deadline.';
        break;
      case 'abandon':
        newStatus = 'abandoned';
        actionMessage = 'Task abandoned successfully!';
        break;
      case 'close':
        newStatus = 'closed';
        actionMessage = 'Task closed successfully!';
        break;
      case 'completed':
        newStatus = 'completed';
        actionMessage = 'Task marked as completed!';
        break;
      case 'reassign':
        newStatus = 'pending';
        actionMessage = `Task reassigned to ${reassignTo} successfully!`;
        break;
      default:
        break;
    }

    const updatedTask = {
      ...selectedTask,
      status: newStatus,
      ...((actionType === 'approve-extension' || actionType === 'grant-extension') && { 
        dueDate: extensionDate || selectedTask.requestedExtensionDate 
      }),
      ...(actionType === 'reassign' && { assignedTo: reassignTo }),
      ...(actionNote && { remarks: actionNote, remarksDate: new Date().toISOString() }),
      // Clear extension request data after processing
      ...((actionType === 'approve-extension' || actionType === 'reject-extension') && {
        requestedExtensionDate: undefined,
        extensionReason: undefined,
        extensionRequestDate: undefined
      }),
    };

    setTasks(
      tasks.map((t) =>
        t.id === selectedTask.id ? updatedTask : t
      )
    );

    alert(actionMessage);
    setSelectedTask(null);
    setActionType('');
    setActionNote('');
    setExtensionDate('');
    setReassignTo('');
  };

  const handleCreateTask = () => {
    if (!newTask.title.trim()) {
      alert('Task title is required');
      return;
    }
    if (!newTask.assignedTo) {
      alert('Please assign the task to a team member');
      return;
    }

    const task = {
      id: Date.now(),
      ...newTask,
      projectId: parseInt(projectId),
      assignedBy: 'Admin',
      status: 'pending',
      type: 'oneTime',
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      assignedTo: '',
      priority: 'Medium',
      dueDate: '',
    });
    setShowCreateTask(false);
    alert('Task created successfully!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
      case 'approved': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'extended': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'extension-requested': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'abandoned': return 'bg-red-100 text-red-700 border-red-300';
      case 'closed': return 'bg-gray-100 text-gray-700 border-gray-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'text-red-600';
      case 'High': return 'text-orange-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredTasks = projectTasks.filter((t) => {
    return filterStatus === 'all' || t.status === filterStatus;
  });

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
            <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600">
              Task Management
            </h1>
            <p className="text-gray-600 mt-1">
              📁 {currentProject.name} ({currentProject.code})
            </p>
          </div>
          <button
            onClick={() => navigate('/project-management')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
          >
            ← Back to Projects
          </button>
        </div>

        {/* Filters and Create Button */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="extension-requested">⏰ Extension Requested</option>
              <option value="completed">Completed</option>
              <option value="approved">Approved</option>
              <option value="extended">Extended</option>
              <option value="abandoned">Abandoned</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <button
            onClick={() => setShowCreateTask(!showCreateTask)}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 whitespace-nowrap"
          >
            {showCreateTask ? '✕ Cancel' : '+ Create Task'}
          </button>
        </div>

        {/* Create Task Form */}
        {showCreateTask && (
          <div className="mb-6 bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">✓ Create New Task</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign To <span className="text-red-500">*</span>
                </label>
                <select
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select team member</option>
                  {currentProject.teamMembers.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name} - {member.designation}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="e.g., Design database schema"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows="2"
                  placeholder="Task description..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3">
                <button
                  onClick={() => setShowCreateTask(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTask}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tasks Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
            <p className="text-2xl font-bold text-blue-600">{projectTasks.length}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {projectTasks.filter(t => t.status === 'pending').length}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {projectTasks.filter(t => t.status === 'completed' || t.status === 'closed').length}
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <p className="text-sm text-gray-600 mb-1">In Progress</p>
            <p className="text-2xl font-bold text-orange-600">
              {projectTasks.filter(t => t.status === 'in-progress').length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tasks List */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4 flex items-center">
              Tasks
              <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {filteredTasks.length}
              </span>
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredTasks.length === 0 ? (
                <p className="text-gray-500 text-sm">No tasks found</p>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleTaskSelect(task)}
                    className={`bg-white rounded-lg p-4 border-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedTask?.id === task.id
                        ? 'border-blue-500'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1 sm:gap-0">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{task.title}</h3>
                      <span className={`text-xs font-semibold ${getPriorityColor(task.priority)} w-fit`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                      {task.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-600 mb-2 gap-1 sm:gap-0">
                      <span className="truncate">👤 {task.assignedTo}</span>
                      <span>📅 {task.dueDate}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <span className="text-xs text-blue-600 font-medium truncate">
                        📁 {currentProject.name}
                      </span>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Task Details & Actions */}
          <div className="bg-gray-50 rounded-lg p-6">
            {selectedTask ? (
              <>
                <h2 className="text-xl font-medium text-gray-700 mb-4">
                  Task Details & Actions
                </h2>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {selectedTask.title}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Description:</span>
                      <p className="text-gray-800 mt-1">{selectedTask.description}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Assigned To:</span>
                      <p className="text-gray-800">{selectedTask.assignedTo}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Assigned By:</span>
                      <p className="text-gray-800">{selectedTask.assignedBy}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Priority:</span>
                      <span className={`ml-2 font-semibold ${getPriorityColor(selectedTask.priority)}`}>
                        {selectedTask.priority}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Due Date:</span>
                      <p className="text-gray-800">{selectedTask.dueDate}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Type:</span>
                      <p className="text-gray-800 capitalize">{selectedTask.type}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Status:</span>
                      <span
                        className={`ml-2 inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          selectedTask.status
                        )}`}
                      >
                        {selectedTask.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    {selectedTask.status === 'extension-requested' && selectedTask.extensionReason && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <span className="font-medium text-gray-600">📋 Extension Request:</span>
                        <div className="mt-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
                          <div className="space-y-2">
                            <div>
                              <span className="text-xs font-medium text-gray-600">Requested Date:</span>
                              <p className="text-sm font-semibold text-orange-700">{selectedTask.requestedExtensionDate}</p>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-gray-600">Reason:</span>
                              <p className="text-sm text-gray-800">{selectedTask.extensionReason}</p>
                            </div>
                            {selectedTask.extensionRequestDate && (
                              <p className="text-xs text-gray-500">
                                Requested on: {new Date(selectedTask.extensionRequestDate).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedTask.remarks && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <span className="font-medium text-gray-600">Admin Remarks:</span>
                        <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <p className="text-sm text-gray-800">{selectedTask.remarks}</p>
                          {selectedTask.remarksDate && (
                            <p className="text-xs text-gray-500 mt-1">
                              Added on: {new Date(selectedTask.remarksDate).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Action
                    </label>
                    <select
                      value={actionType}
                      onChange={(e) => setActionType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Choose an action</option>
                      {selectedTask.status === 'completed' && (
                        <>
                          <option value="approve-closure">✓ Approve Closure</option>
                          <option value="reject-closure">✗ Reject Closure</option>
                        </>
                      )}
                      {selectedTask.status === 'extension-requested' && (
                        <>
                          <option value="approve-extension">Approve Extension</option>
                          <option value="reject-extension">Reject Extension</option>
                        </>
                      )}
                      {(selectedTask.status === 'pending' || selectedTask.status === 'in-progress') && (
                        <>
                          <option value="grant-extension">⏰ Grant Extension</option>
                          <option value="abandon">Abandon Task</option>
                          <option value="completed">Mark as Completed</option>
                        </>
                      )}
                      <option value="reassign">🔄 Re-assign Task</option>
                      <option value="close">Close Task</option>
                    </select>
                  </div>

                  {(actionType === 'approve-extension' || actionType === 'reject-extension' || 
                    actionType === 'approve-closure' || actionType === 'reject-closure' || 
                    actionType === 'abandon' || actionType === 'reassign' || actionType === 'grant-extension') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Remarks {(actionType === 'reject-closure' || actionType === 'reject-extension' || actionType === 'abandon' || actionType === 'reassign') && <span className="text-red-500">*</span>}
                      </label>
                      <textarea
                        value={actionNote}
                        onChange={(e) => setActionNote(e.target.value)}
                        rows="3"
                        placeholder={
                          actionType === 'approve-closure' ? 'Add approval remarks (optional)...' :
                          actionType === 'reject-closure' ? 'Explain why closure is rejected...' :
                          actionType === 'approve-extension' ? 'Add approval remarks (optional)...' :
                          actionType === 'reject-extension' ? 'Explain why extension is rejected...' :
                          actionType === 'grant-extension' ? 'Reason for granting extension (optional)...' :
                          actionType === 'reassign' ? 'Explain why task is being reassigned...' :
                          'Provide a reason...'
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {(actionType === 'approve-extension' || actionType === 'grant-extension') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Due Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={extensionDate}
                        onChange={(e) => setExtensionDate(e.target.value)}
                        min={selectedTask.dueDate}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {actionType === 'reassign' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Re-assign To <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={reassignTo}
                        onChange={(e) => setReassignTo(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">Select team member</option>
                        {currentProject.teamMembers.map((member) => (
                          <option key={member.id} value={member.name}>
                            {member.name} - {member.designation}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => {
                        setSelectedTask(null);
                        setActionType('');
                        setActionNote('');
                        setExtensionDate('');
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAction}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Execute Action
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Select a task to view details and perform actions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTaskManagement;
