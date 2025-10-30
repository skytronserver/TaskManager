import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTeam = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teamName: '',
    department: '',
    description: '',
    teamLeader: '',
    maxMembers: '',
    createdDate: '',
  });

  const [errors, setErrors] = useState({});

  const departments = [
    'Sales',
    'Marketing',
    'Engineering',
    'Human Resources',
    'Finance',
    'Operations',
    'Customer Support',
  ];

  const teamLeaders = [
    'John Doe',
    'Jane Smith',
    'Mike Johnson',
    'Sarah Williams',
    'David Brown',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    } else if (formData.teamName.trim().length < 3) {
      newErrors.teamName = 'Team name must be at least 3 characters';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.teamLeader) {
      newErrors.teamLeader = 'Team Leader is required';
    }

    if (!formData.maxMembers) {
      newErrors.maxMembers = 'Maximum members is required';
    } else if (formData.maxMembers < 1) {
      newErrors.maxMembers = 'Maximum members must be at least 1';
    } else if (formData.maxMembers > 100) {
      newErrors.maxMembers = 'Maximum members cannot exceed 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Team Data:', formData);
      // Add your API call here
      alert('Team created successfully!');
      // Reset form or navigate
      navigate('/');
    }
  };

  const handleReset = () => {
    setFormData({
      teamName: '',
      department: '',
      description: '',
      teamLeader: '',
      maxMembers: '',
      createdDate: '',
    });
    setErrors({});
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4 sm:mb-6">
          Create Team
        </h1>

        <div className="space-y-6">
          {/* Team Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Team Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.teamName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.teamName && (
                  <p className="text-sm text-red-500 mt-1">{errors.teamName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                    errors.department ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-sm text-red-500 mt-1">{errors.department}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe the team's purpose and responsibilities..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Team Configuration */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Team Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Leader <span className="text-red-500">*</span>
                </label>
                <select
                  name="teamLeader"
                  value={formData.teamLeader}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                    errors.teamLeader ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select team leader</option>
                  {teamLeaders.map((leader) => (
                    <option key={leader} value={leader}>
                      {leader}
                    </option>
                  ))}
                </select>
                {errors.teamLeader && (
                  <p className="text-sm text-red-500 mt-1">{errors.teamLeader}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Team Members <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="maxMembers"
                  value={formData.maxMembers}
                  onChange={handleChange}
                  required
                  min="1"
                  max="100"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.maxMembers ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.maxMembers && (
                  <p className="text-sm text-red-500 mt-1">{errors.maxMembers}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Creation Date
                </label>
                <input
                  type="date"
                  name="createdDate"
                  value={formData.createdDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Reset
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
