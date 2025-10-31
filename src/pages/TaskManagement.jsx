import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskManagement = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Update User Dashboard',
      description: 'Redesign the user dashboard with new UI components',
      assignedTo: 'John Doe',
      assignedBy: 'Admin',
      priority: 'High',
      dueDate: '2025-11-05',
      status: 'in-progress',
      type: 'oneTime',
    },
    {
      id: 2,
      title: 'Database Optimization',
      description: 'Optimize database queries for better performance',
      assignedTo: 'Jane Smith',
      assignedBy: 'Team Leader',
      priority: 'Critical',
      dueDate: '2025-11-02',
      status: 'pending',
      type: 'oneTime',
    },
    {
      id: 3,
      title: 'Daily Standup Report',
      description: 'Submit daily standup report',
      assignedTo: 'Mike Johnson',
      assignedBy: 'Team Leader',
      priority: 'Medium',
      dueDate: '2025-10-31',
      status: 'completed',
      type: 'repetitive',
    },
  ]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [actionType, setActionType] = useState('');
  const [actionNote, setActionNote] = useState('');
  const [extensionDate, setExtensionDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setActionType('');
    setActionNote('');
    setExtensionDate('');
  };

  const handleAction = () => {
    if (!actionType) {
      alert('Please select an action');
      return;
    }

    if ((actionType === 'extension' || actionType === 'abandon') && !actionNote.trim()) {
      alert('Please provide a note for this action');
      return;
    }

    if (actionType === 'extension' && !extensionDate) {
      alert('Please select an extension date');
      return;
    }

    let newStatus = selectedTask.status;
    switch (actionType) {
      case 'approve':
        newStatus = 'approved';
        break;
      case 'extension':
        newStatus = 'extended';
        break;
      case 'abandon':
        newStatus = 'abandoned';
        break;
      case 'close':
        newStatus = 'closed';
        break;
      case 'completed':
        newStatus = 'completed';
        break;
      default:
        break;
    }

    setTasks(
      tasks.map((t) =>
        t.id === selectedTask.id
          ? {
              ...t,
              status: newStatus,
              ...(actionType === 'extension' && { dueDate: extensionDate }),
            }
          : t
      )
    );

    alert(`Task ${actionType} successfully!`);
    setSelectedTask(null);
    setActionType('');
    setActionNote('');
    setExtensionDate('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'approved':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'extended':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'abandoned':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'closed':
        return 'bg-gray-100 text-gray-700 border-gray-300';
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

  const filteredTasks =
    filterStatus === 'all' ? tasks : tasks.filter((t) => t.status === filterStatus);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4 sm:mb-6">
          Task Management
        </h1>

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
            <option value="approved">Approved</option>
            <option value="extended">Extended</option>
            <option value="abandoned">Abandoned</option>
            <option value="closed">Closed</option>
          </select>
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
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{task.title}</h3>
                      <span className={`text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {task.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>👤 {task.assignedTo}</span>
                      <span>📅 {task.dueDate}</span>
                    </div>
                    <div className="mt-2">
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
                        <option value="approve">Approve Task</option>
                      )}
                      {selectedTask.status === 'extension-requested' && (
                        <option value="extension">Grant Extension</option>
                      )}
                      {(selectedTask.status === 'pending' || selectedTask.status === 'in-progress') && (
                        <>
                          <option value="abandon">Abandon Task</option>
                          <option value="completed">Mark as Completed</option>
                        </>
                      )}
                      <option value="close">Close Task</option>
                    </select>
                  </div>

                  {(actionType === 'extension' || actionType === 'abandon') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Note <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={actionNote}
                        onChange={(e) => setActionNote(e.target.value)}
                        rows="3"
                        placeholder="Provide a reason..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {actionType === 'extension' && (
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

                  <div className="flex gap-3 pt-2">
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
                      Submit Action
                    </button>
                  </div>
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

export default TaskManagement;
