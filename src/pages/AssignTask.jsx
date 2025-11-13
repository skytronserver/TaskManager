import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AssignTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    taskTitle: '',
    taskDescription: '',
    assignmentType: 'self', // self or others
    assignTo: '',
    priority: '',
    dueDate: '',
    taskType: 'oneTime', // oneTime or repetitive
    repetitiveType: '', // daily, weekly, monthly
    startDate: '',
    endDate: '',
    holidayInclusion: 'excluded', // included or excluded
  });

  const [errors, setErrors] = useState({});
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  // Load registered users from localStorage
  const loadRegisteredUsers = () => {
    const savedUsers = localStorage.getItem('allUsers');
    if (savedUsers) {
      const users = JSON.parse(savedUsers);
      // Only return active users for task assignment
      return users.filter(user => user.isActive);
    }
    // Default users if localStorage is empty
    return [
      { id: 1, firstName: 'Ankur', lastName: 'Sharma', employeeId: 'EMP001', designation: 'Team Leader', isActive: true },
      { id: 2, firstName: 'Nitul', lastName: 'Das', employeeId: 'EMP002', designation: 'Senior Developer', isActive: true },
      { id: 4, firstName: 'Kajal', lastName: 'Singh', employeeId: 'EMP004', designation: 'App Developer', isActive: true },
      { id: 5, firstName: 'Twinkle', lastName: 'Patel', employeeId: 'EMP005', designation: 'Developer', isActive: true },
    ];
  };

  const registeredUsers = loadRegisteredUsers();

  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.taskTitle.trim()) {
      newErrors.taskTitle = 'Task title is required';
    }
    if (!formData.taskDescription.trim()) {
      newErrors.taskDescription = 'Task description is required';
    }
    if (formData.assignmentType === 'others' && !formData.assignTo) {
      newErrors.assignTo = 'Please select who to assign this task to';
    }
    if (!formData.priority) {
      newErrors.priority = 'Priority is required';
    }
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    if (formData.taskType === 'repetitive') {
      if (!formData.repetitiveType) {
        newErrors.repetitiveType = 'Please select repetitive type';
      }
      if (!formData.startDate) {
        newErrors.startDate = 'Start date is required for repetitive tasks';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Task Data:', formData);
      alert('Task assigned successfully!');
      navigate('/');
    }
  };

  const generateInviteLink = () => {
    const baseUrl = window.location.origin;
    const inviteToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const link = `${baseUrl}/task-invite/${inviteToken}?expires=${Date.now() + 7 * 24 * 60 * 60 * 1000}`;
    setInviteLink(link);
    setShowInviteModal(true);
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert('Invite link copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy link. Please copy manually.');
    });
  };

  const sendInviteEmail = () => {
    if (!inviteEmail) {
      alert('Please enter an email address.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    console.log('Sending invite email to:', inviteEmail, 'with link:', inviteLink);
    alert(`Invite sent to ${inviteEmail}!`);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  const handleReset = () => {
    setFormData({
      taskTitle: '',
      taskDescription: '',
      assignmentType: 'self',
      assignTo: '',
      priority: '',
      dueDate: '',
      taskType: 'oneTime',
      repetitiveType: '',
      startDate: '',
      endDate: '',
      holidayInclusion: 'excluded',
    });
    setErrors({});
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600">
              Assign Task
            </h1>
            <p className="text-gray-600 mt-1">
              Create and assign individual tasks to registered users
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={generateInviteLink}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
            >
              📧 Generate Invite Link
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Assignment Type Selection */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Task Assignment Type
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Assign Task To <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="assignmentType"
                      value="self"
                      checked={formData.assignmentType === 'self'}
                      onChange={handleChange}
                      className="mr-2 w-4 h-4"
                    />
                    <span className="text-sm font-medium text-gray-700">Self</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="assignmentType"
                      value="others"
                      checked={formData.assignmentType === 'others'}
                      onChange={handleChange}
                      className="mr-2 w-4 h-4"
                    />
                    <span className="text-sm font-medium text-gray-700">Others</span>
                  </label>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {formData.assignmentType === 'self' 
                    ? 'Task will be assigned to yourself' 
                    : 'Assign task to registered users in the system'}
                </p>
              </div>

              {formData.assignmentType === 'others' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select User <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="assignTo"
                    value={formData.assignTo}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                      errors.assignTo ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select registered user</option>
                    {registeredUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName} - {user.designation} ({user.employeeId})
                      </option>
                    ))}
                  </select>
                  {errors.assignTo && (
                    <p className="text-sm text-red-500 mt-1">{errors.assignTo}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Task Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Task Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="taskTitle"
                  value={formData.taskTitle}
                  onChange={handleChange}
                  placeholder="Enter task title"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.taskTitle ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.taskTitle && (
                  <p className="text-sm text-red-500 mt-1">{errors.taskTitle}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="taskDescription"
                  value={formData.taskDescription}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe the task in detail..."
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.taskDescription ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.taskDescription && (
                  <p className="text-sm text-red-500 mt-1">{errors.taskDescription}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority <span className="text-red-500">*</span>
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                    errors.priority ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select priority</option>
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
                {errors.priority && (
                  <p className="text-sm text-red-500 mt-1">{errors.priority}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.dueDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.dueDate && (
                  <p className="text-sm text-red-500 mt-1">{errors.dueDate}</p>
                )}
              </div>
            </div>
          </div>


          {/* Task Type */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Task Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Frequency <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="taskType"
                      value="oneTime"
                      checked={formData.taskType === 'oneTime'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">One Time Task</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="taskType"
                      value="repetitive"
                      checked={formData.taskType === 'repetitive'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Repetitive Task</span>
                  </label>
                </div>
              </div>

              {formData.taskType === 'repetitive' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Repetitive Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="repetitiveType"
                      value={formData.repetitiveType}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                        errors.repetitiveType ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select frequency</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="annually">Annually</option>
                    </select>
                    {errors.repetitiveType && (
                      <p className="text-sm text-red-500 mt-1">{errors.repetitiveType}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.startDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.startDate && (
                      <p className="text-sm text-red-500 mt-1">{errors.startDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date (Optional)
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Leave empty for ongoing repetitive tasks
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Holiday Inclusion */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Holiday Settings
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Holiday Inclusion <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="holidayInclusion"
                      value="included"
                      checked={formData.holidayInclusion === 'included'}
                      onChange={handleChange}
                      className="mr-2 w-4 h-4"
                    />
                    <span className="text-sm font-medium text-gray-700">Included</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="holidayInclusion"
                      value="excluded"
                      checked={formData.holidayInclusion === 'excluded'}
                      onChange={handleChange}
                      className="mr-2 w-4 h-4"
                    />
                    <span className="text-sm font-medium text-gray-700">Excluded</span>
                  </label>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {formData.holidayInclusion === 'included' 
                    ? 'Task will be active on holidays' 
                    : 'Task will be skipped on holidays'}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Assign Task
            </button>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">📧 Invite to Task</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Invite Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inviteLink}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                  />
                  <button
                    onClick={copyInviteLink}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  >
                    📋 Copy
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Link expires in 7 days
                </p>
              </div>

              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or send via email
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Enter email address..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={sendInviteEmail}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignTask;
