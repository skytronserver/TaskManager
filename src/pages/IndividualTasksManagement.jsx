import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IndividualTasksManagement = () => {
  const navigate = useNavigate();

  // All users in the system
  const [users] = useState([
    { id: 1, name: 'Ankur', designation: 'Team Leader' },
    { id: 2, name: 'Nitul', designation: 'Senior Developer' },
    { id: 3, name: 'Kishalay', designation: 'Developer' },
    { id: 4, name: 'Kajal', designation: 'App Developer' },
    { id: 5, name: 'Twinkle', designation: 'Developer' },
    { id: 6, name: 'Samudra', designation: 'App Developer' },
  ]);

  // Load individual tasks from localStorage
  const loadIndividualTasks = () => {
    const savedTasks = localStorage.getItem('individualTasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    // Default individual tasks
    return [
      {
        id: 1,
        title: 'Complete Personal Development Plan',
        description: 'Create and submit your personal development plan for Q4',
        assignedTo: 'Ankur',
        assignedBy: 'Admin',
        priority: 'Medium',
        dueDate: '2025-11-20',
        status: 'pending',
        type: 'individual',
        category: 'Personal Development',
      },
      {
        id: 2,
        title: 'Submit Timesheet for October',
        description: 'Fill and submit your timesheet for the month of October',
        assignedTo: 'Nitul',
        assignedBy: 'Admin',
        priority: 'High',
        dueDate: '2025-11-15',
        status: 'completed',
        type: 'individual',
        category: 'Administrative',
      },
      {
        id: 3,
        title: 'Attend Security Training',
        description: 'Complete mandatory cybersecurity training module',
        assignedTo: 'Kishalay',
        assignedBy: 'Admin',
        priority: 'High',
        dueDate: '2025-11-25',
        status: 'in-progress',
        type: 'individual',
        category: 'Training',
      },
    ];
  };

  const [tasks, setTasks] = useState(loadIndividualTasks());
  const [selectedTask, setSelectedTask] = useState(null);
  const [actionType, setActionType] = useState('');
  const [actionNote, setActionNote] = useState('');
  const [extensionDate, setExtensionDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [reassignTo, setReassignTo] = useState('');

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('individualTasks', JSON.stringify(tasks));
  }, [tasks]);

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
      alert('Please select a user to reassign the task');
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

  const filteredTasks = tasks.filter((t) => {
    const statusMatch = filterStatus === 'all' || t.status === filterStatus;
    const userMatch = filterUser === 'all' || t.assignedTo === filterUser;
    return statusMatch && userMatch;
  });


  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-green-600">
              Individual Tasks
            </h1>
            <p className="text-gray-600 mt-1">
              Manage individual tasks assigned to users (not project-related)
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by User
            </label>
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="all">All Users</option>
              {users.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
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
        </div>


        {/* Tasks Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
            <p className="text-2xl font-bold text-green-600">{tasks.length}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {tasks.filter(t => t.status === 'pending').length}
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">In Progress</p>
            <p className="text-2xl font-bold text-blue-600">
              {tasks.filter(t => t.status === 'in-progress').length}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="text-2xl font-bold text-purple-600">
              {tasks.filter(t => t.status === 'completed' || t.status === 'closed').length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tasks List */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4 flex items-center">
              Individual Tasks
              <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
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
                        ? 'border-green-500'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-800 text-sm">{task.title}</h3>
                      <span className={`text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}
                      >
                        {task.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{task.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                      <span>👤 {task.assignedTo}</span>
                      <span>📅 {task.dueDate}</span>
                      <span>🏷️ {task.category}</span>
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
                      <span className="font-medium text-gray-600">Category:</span>
                      <p className="text-gray-800">{selectedTask.category}</p>
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
                      <span className="font-medium text-gray-600">Status:</span>
                      <span
                        className={`ml-2 inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedTask.status)}`}
                      >
                        {selectedTask.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
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
                        placeholder="Add your remarks..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                      >
                        <option value="">Select user</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.name}>
                            {user.name} - {user.designation}
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
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
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

export default IndividualTasksManagement;
