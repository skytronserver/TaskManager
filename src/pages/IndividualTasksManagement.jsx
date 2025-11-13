import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IndividualTasksManagement = () => {
  const navigate = useNavigate();

  // Load registered users from localStorage
  const loadRegisteredUsers = () => {
    const savedUsers = localStorage.getItem('allUsers');
    if (savedUsers) {
      const users = JSON.parse(savedUsers);
      // Return all users (both active and inactive) for management purposes
      return users.map(user => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        designation: user.designation,
        isActive: user.isActive
      }));
    }
    // Default users if localStorage is empty
    return [
      { id: 1, name: 'Ankur Sharma', designation: 'Team Leader', isActive: true },
      { id: 2, name: 'Nitul Das', designation: 'Senior Developer', isActive: true },
      { id: 3, name: 'Kishalay Roy', designation: 'Developer', isActive: false },
      { id: 4, name: 'Kajal Singh', designation: 'App Developer', isActive: true },
      { id: 5, name: 'Twinkle Patel', designation: 'Developer', isActive: true },
    ];
  };

  const [users] = useState(loadRegisteredUsers());

  // Load individual tasks from localStorage
  const loadIndividualTasks = () => {
    // Temporarily disable localStorage to show dummy tasks
    // const savedTasks = localStorage.getItem('individualTasks');
    // if (savedTasks) {
    //   return JSON.parse(savedTasks);
    // }
    // Default individual tasks
    return [
      {
        id: 1,
        title: 'Complete Personal Development Plan',
        description: 'Create and submit your personal development plan for Q4 including skill assessment and learning goals',
        assignedTo: 'Ankur Sharma',
        assignedBy: 'HR Manager',
        priority: 'Medium',
        dueDate: '2025-11-20',
        status: 'pending',
        type: 'individual',
        category: 'Personal Development',
        createdDate: '2025-11-01'
      },
      {
        id: 2,
        title: 'Submit Timesheet for October',
        description: 'Fill and submit your timesheet for the month of October with detailed project hours',
        assignedTo: 'Nitul Das',
        assignedBy: 'Admin',
        priority: 'High',
        dueDate: '2025-11-15',
        status: 'completed',
        type: 'individual',
        category: 'Administrative',
        createdDate: '2025-10-25'
      },
      {
        id: 3,
        title: 'Attend Security Training',
        description: 'Complete mandatory cybersecurity training module and pass the assessment',
        assignedTo: 'Kishalay Roy',
        assignedBy: 'Security Officer',
        priority: 'High',
        dueDate: '2025-11-25',
        status: 'in-progress',
        type: 'individual',
        category: 'Training',
        createdDate: '2025-11-05'
      },
      {
        id: 4,
        title: 'Performance Review Self-Assessment',
        description: 'Complete your quarterly performance review self-assessment form',
        assignedTo: 'Kajal Singh',
        assignedBy: 'Team Leader',
        priority: 'Critical',
        dueDate: '2025-11-18',
        status: 'extension-requested',
        type: 'individual',
        category: 'Performance Review',
        createdDate: '2025-11-03',
        requestedExtensionDate: '2025-11-22',
        extensionReason: 'Need more time to gather project metrics'
      },
      {
        id: 5,
        title: 'Update Emergency Contact Information',
        description: 'Review and update your emergency contact details in the HR system',
        assignedTo: 'Twinkle Patel',
        assignedBy: 'HR Department',
        priority: 'Low',
        dueDate: '2025-11-30',
        status: 'pending',
        type: 'individual',
        category: 'Administrative',
        createdDate: '2025-11-08'
      },
      {
        id: 6,
        title: 'Complete Code Review Certification',
        description: 'Finish the internal code review best practices certification course',
        assignedTo: 'Ankur Sharma',
        assignedBy: 'Tech Lead',
        priority: 'Medium',
        dueDate: '2025-11-28',
        status: 'in-progress',
        type: 'individual',
        category: 'Professional Development',
        createdDate: '2025-11-10'
      },
      {
        id: 7,
        title: 'Submit Expense Report',
        description: 'Submit expense report for business travel and client meetings in October',
        assignedTo: 'Nitul Das',
        assignedBy: 'Finance Team',
        priority: 'High',
        dueDate: '2025-11-16',
        status: 'approved',
        type: 'individual',
        category: 'Financial',
        createdDate: '2025-11-02'
      },
      {
        id: 8,
        title: 'Health & Safety Training',
        description: 'Complete annual health and safety training module and quiz',
        assignedTo: 'Kishalay Roy',
        assignedBy: 'Safety Officer',
        priority: 'Medium',
        dueDate: '2025-12-01',
        status: 'pending',
        type: 'individual',
        category: 'Compliance',
        createdDate: '2025-11-12'
      }
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
  const [showTaskChat, setShowTaskChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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
    setShowTaskChat(false);
    // Load chat messages for this task (from localStorage or API)
    loadTaskChatMessages(task.id);
  };

  const loadTaskChatMessages = (taskId) => {
    const savedMessages = localStorage.getItem(`taskChat_${taskId}`);
    if (savedMessages) {
      setChatMessages(JSON.parse(savedMessages));
    } else {
      setChatMessages([]);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTask) return;
    
    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'Admin', // Replace with actual user name
      timestamp: new Date().toLocaleString(),
      taskId: selectedTask.id
    };
    
    const updatedMessages = [...chatMessages, message];
    setChatMessages(updatedMessages);
    
    // Save to localStorage
    localStorage.setItem(`taskChat_${selectedTask.id}`, JSON.stringify(updatedMessages));
    
    setNewMessage('');
  };

  const handleOpenTaskChat = (task, e) => {
    e.stopPropagation(); // Prevent task selection
    setSelectedTask(task);
    loadTaskChatMessages(task.id);
    setShowTaskChat(true);
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
                    
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
                      <div className="flex flex-wrap items-center gap-3">
                        <span>👤 {task.assignedTo}</span>
                        <span>📅 {task.dueDate}</span>
                        <span>🏷️ {task.category}</span>
                      </div>
                      <button
                        onClick={(e) => handleOpenTaskChat(task, e)}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                        title="Open Task Chat"
                      >
                        💬 Chat
                      </button>
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
                  {/* Task Chat Button */}
                  <div>
                    <button
                      onClick={() => setShowTaskChat(!showTaskChat)}
                      className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
                    >
                      💬 {showTaskChat ? 'Hide Task Chat' : 'Open Task Chat'}
                    </button>
                  </div>

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
                        {users.filter(user => user.isActive).map((user) => (
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

                {/* Task Chat Interface */}
                {showTaskChat && (
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      💬 Task Chat - {selectedTask.title}
                    </h3>
                    
                    {/* Chat Messages */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4 max-h-64 overflow-y-auto">
                      {chatMessages.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center py-4">
                          No messages yet. Start the conversation!
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {chatMessages.map((message) => (
                            <div key={message.id} className="bg-white rounded-lg p-3 shadow-sm">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-sm text-blue-600">
                                  {message.sender}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {message.timestamp}
                                </span>
                              </div>
                              <p className="text-sm text-gray-800">{message.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Message Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}
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
