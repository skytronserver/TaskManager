import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AssignTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    taskTitle: '',
    taskDescription: '',
    assignTo: '',
    assignToType: 'individual', // individual or team
    priority: '',
    dueDate: '',
    taskType: 'oneTime', // oneTime or repetitive
    repetitiveType: '', // daily, weekly, monthly
    startDate: '',
    endDate: '',
    reportedBy: '',
  });

  const [errors, setErrors] = useState({});

  const users = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams'];
  const teams = ['Development Team', 'Marketing Team', 'Sales Team', 'Support Team'];
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
    if (!formData.assignTo) {
      newErrors.assignTo = 'Please select who to assign this task to';
    }
    if (!formData.priority) {
      newErrors.priority = 'Priority is required';
    }
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    if (formData.taskType === 'repetitive' && !formData.repetitiveType) {
      newErrors.repetitiveType = 'Please select repetitive type';
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

  const handleReset = () => {
    setFormData({
      taskTitle: '',
      taskDescription: '',
      assignTo: '',
      assignToType: 'individual',
      priority: '',
      dueDate: '',
      taskType: 'oneTime',
      repetitiveType: '',
      startDate: '',
      endDate: '',
      reportedBy: '',
    });
    setErrors({});
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4 sm:mb-6">
          Assign Task
        </h1>

        <div className="space-y-6">
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

          {/* Assignment Details */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Assignment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign To Type <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="assignToType"
                      value="individual"
                      checked={formData.assignToType === 'individual'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Individual</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="assignToType"
                      value="team"
                      checked={formData.assignToType === 'team'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Team</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.assignToType === 'individual' ? 'Assign To User' : 'Assign To Team'}{' '}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="assignTo"
                  value={formData.assignTo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                    errors.assignTo ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">
                    Select {formData.assignToType === 'individual' ? 'user' : 'team'}
                  </option>
                  {(formData.assignToType === 'individual' ? users : teams).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.assignTo && (
                  <p className="text-sm text-red-500 mt-1">{errors.assignTo}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reported By
                </label>
                <select
                  name="reportedBy"
                  value={formData.reportedBy}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select reporter</option>
                  {users.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
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
                    </select>
                    {errors.repetitiveType && (
                      <p className="text-sm text-red-500 mt-1">{errors.repetitiveType}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
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
              type="submit"
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Assign Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignTask;
