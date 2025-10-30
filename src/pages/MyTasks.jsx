import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyTasks = () => {
  const navigate = useNavigate();
  const currentUser = 'John Doe'; // This would come from auth context

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Update User Dashboard',
      description: 'Redesign the user dashboard with new UI components',
      assignedBy: 'Admin',
      priority: 'High',
      dueDate: '2025-11-05',
      status: 'in-progress',
      type: 'oneTime',
      startDate: '2025-10-25',
    },
    {
      id: 2,
      title: 'Fix Login Bug',
      description: 'Users are unable to login with special characters in password',
      assignedBy: 'Team Leader',
      priority: 'Critical',
      dueDate: '2025-11-01',
      status: 'pending',
      type: 'oneTime',
      startDate: '2025-10-28',
    },
    {
      id: 3,
      title: 'Daily Standup Report',
      description: 'Submit daily standup report',
      assignedBy: 'Team Leader',
      priority: 'Medium',
      dueDate: '2025-10-31',
      status: 'completed',
      type: 'repetitive',
      startDate: '2025-10-01',
    },
    {
      id: 4,
      title: 'Code Review',
      description: 'Review pull requests from team members',
      assignedBy: 'Team Leader',
      priority: 'Medium',
      dueDate: '2025-11-03',
      status: 'pending',
      type: 'oneTime',
      startDate: '2025-10-29',
    },
  ]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [actionType, setActionType] = useState('');
  const [actionNote, setActionNote] = useState('');
  const [extensionDate, setExtensionDate] = useState('');
  const [queryText, setQueryText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showQueryModal, setShowQueryModal] = useState(false);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setActionType('');
    setActionNote('');
    setExtensionDate('');
    setQueryText('');
    setShowQueryModal(false);
  };

  const handleStartTask = () => {
    if (!selectedTask) return;
    
    setTasks(
      tasks.map((t) =>
        t.id === selectedTask.id ? { ...t, status: 'in-progress' } : t
      )
    );
    alert('Task started successfully!');
    setSelectedTask({ ...selectedTask, status: 'in-progress' });
  };

  const handleCompleteTask = () => {
    if (!selectedTask) return;

    setTasks(
      tasks.map((t) =>
        t.id === selectedTask.id ? { ...t, status: 'completed' } : t
      )
    );
    alert('Task marked as completed! Waiting for approval.');
    setSelectedTask(null);
  };

  const handleRequestExtension = () => {
    if (!extensionDate) {
      alert('Please select an extension date');
      return;
    }
    if (!actionNote.trim()) {
      alert('Please provide a reason for extension');
      return;
    }

    setTasks(
      tasks.map((t) =>
        t.id === selectedTask.id
          ? { ...t, status: 'extension-requested', dueDate: extensionDate }
          : t
      )
    );
    alert('Extension request submitted successfully!');
    setSelectedTask(null);
    setActionType('');
    setActionNote('');
    setExtensionDate('');
  };

  const handleRaiseQuery = () => {
    if (!queryText.trim()) {
      alert('Please enter your query');
      return;
    }

    alert('Query submitted successfully! You will receive a response soon.');
    setShowQueryModal(false);
    setQueryText('');
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
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'text-red-600';
      case 'High':
        return 'text-orange-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTaskStats = () => {
    return {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === 'pending').length,
      inProgress: tasks.filter((t) => t.status === 'in-progress').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
    };
  };

  const filteredTasks =
    filterStatus === 'all' ? tasks : tasks.filter((t) => t.status === filterStatus);

  const stats = getTaskStats();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-blue-600">My Tasks</h1>
            <p className="text-gray-600 mt-1">Assigned to: {currentUser}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-gray-600 mb-1">In Progress</p>
            <p className="text-3xl font-bold text-purple-600">{stats.inProgress}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="extension-requested">Extension Requested</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tasks List */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4 flex items-center">
              My Tasks
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
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800 flex-1">{task.title}</h3>
                      <span className={`text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {task.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                      <span>👤 Assigned by: {task.assignedBy}</span>
                      <span>📅 Due: {task.dueDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status.replace('-', ' ').toUpperCase()}
                      </span>
                      {task.type === 'repetitive' && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          🔄 Repetitive
                        </span>
                      )}
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
                  Task Details
                </h2>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {selectedTask.title}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Description:</span>
                      <p className="text-gray-800 mt-1 bg-gray-50 p-3 rounded">
                        {selectedTask.description}
                      </p>
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
                      <span className="font-medium text-gray-600">Start Date:</span>
                      <p className="text-gray-800">{selectedTask.startDate}</p>
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
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {selectedTask.status === 'pending' && (
                    <button
                      onClick={handleStartTask}
                      className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                    >
                      ▶️ Start Task
                    </button>
                  )}

                  {selectedTask.status === 'in-progress' && (
                    <button
                      onClick={handleCompleteTask}
                      className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                    >
                      ✓ Mark as Completed
                    </button>
                  )}

                  {(selectedTask.status === 'pending' || selectedTask.status === 'in-progress') && (
                    <>
                      <button
                        onClick={() => setActionType(actionType === 'extension' ? '' : 'extension')}
                        className="w-full px-4 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 font-medium"
                      >
                        ⏰ Request Extension
                      </button>

                      {actionType === 'extension' && (
                        <div className="bg-white rounded-lg p-4 space-y-3">
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
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Reason <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              value={actionNote}
                              onChange={(e) => setActionNote(e.target.value)}
                              rows="3"
                              placeholder="Explain why you need an extension..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setActionType('');
                                setActionNote('');
                                setExtensionDate('');
                              }}
                              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleRequestExtension}
                              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                            >
                              Submit Request
                            </button>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => setShowQueryModal(!showQueryModal)}
                        className="w-full px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium"
                      >
                        💬 Raise Query
                      </button>

                      {showQueryModal && (
                        <div className="bg-white rounded-lg p-4 space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Your Query <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              value={queryText}
                              onChange={(e) => setQueryText(e.target.value)}
                              rows="4"
                              placeholder="Type your query here..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setShowQueryModal(false);
                                setQueryText('');
                              }}
                              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleRaiseQuery}
                              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                            >
                              Submit Query
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <p className="text-lg mb-2">📋</p>
                  <p>Select a task to view details and take actions</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 justify-end mt-8">
          <button
            type="button"
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

export default MyTasks;
