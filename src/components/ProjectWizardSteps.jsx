import React from 'react';

// Step 1: Create Project
export const Step1CreateProject = ({ formData, errors, handleChange, priorities }) => (
  <div className="bg-gray-50 rounded-lg p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Project Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          placeholder="e.g., SKYTRON BACK END"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.projectName ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.projectName && <p className="text-sm text-red-500 mt-1">{errors.projectName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Code <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="projectCode"
          value={formData.projectCode}
          onChange={handleChange}
          placeholder="e.g., PROJ-2024-001"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.projectCode ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.projectCode && <p className="text-sm text-red-500 mt-1">{errors.projectCode}</p>}
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Describe the project..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
        {errors.startDate && <p className="text-sm text-red-500 mt-1">{errors.startDate}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          End Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.endDate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.endDate && <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>}
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
          {priorities.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        {errors.priority && <p className="text-sm text-red-500 mt-1">{errors.priority}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="e.g., 150000"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  </div>
);
