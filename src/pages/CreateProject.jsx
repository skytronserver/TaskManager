import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: '',
    projectCode: '',
    description: '',
    teamLeader: '',
    teamMembers: [],
    startDate: '',
    endDate: '',
    priority: '',
    status: 'planning',
    objectives: '',
  });

  const [errors, setErrors] = useState({});
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [newTeam, setNewTeam] = useState({
    teamName: '',
    department: '',
    teamLeader: '',
    maxMembers: '',
  });
  const [teamErrors, setTeamErrors] = useState({});
  const [selectedMember, setSelectedMember] = useState('');

  // Mock data - Replace with API calls
  const [teams, setTeams] = useState([
    { id: 1, name: 'Engineering Team', department: 'Engineering' },
    { id: 2, name: 'Marketing Team', department: 'Marketing' },
    { id: 3, name: 'Sales Team', department: 'Sales' },
    { id: 4, name: 'Support Team', department: 'Customer Support' },
    { id: 5, name: 'Finance Team', department: 'Finance' },
  ]);

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
    { id: 1, name: 'John Doe', employeeId: 'EMP001', designation: 'Team Leader' },
    { id: 2, name: 'Jane Smith', employeeId: 'EMP002', designation: 'Senior Team Leader' },
    { id: 3, name: 'Mike Johnson', employeeId: 'EMP003', designation: 'Team Leader' },
    { id: 4, name: 'Sarah Williams', employeeId: 'EMP004', designation: 'Team Leader' },
    { id: 5, name: 'David Brown', employeeId: 'EMP005', designation: 'Senior Team Leader' },
  ];

  const availableMembers = [
    { id: 6, name: 'Alice Johnson', employeeId: 'EMP006', designation: 'Senior Developer' },
    { id: 7, name: 'Bob Smith', employeeId: 'EMP007', designation: 'Junior Developer' },
    { id: 8, name: 'Charlie Brown', employeeId: 'EMP008', designation: 'Marketing Specialist' },
    { id: 9, name: 'Diana Prince', employeeId: 'EMP009', designation: 'Designer' },
    { id: 10, name: 'Eve Wilson', employeeId: 'EMP010', designation: 'QA Engineer' },
    { id: 11, name: 'Frank Miller', employeeId: 'EMP011', designation: 'DevOps Engineer' },
    { id: 12, name: 'Grace Lee', employeeId: 'EMP012', designation: 'Business Analyst' },
    { id: 13, name: 'Henry Davis', employeeId: 'EMP013', designation: 'Senior Developer' },
  ];

  const projectManagers = [
    'John Doe',
    'Jane Smith',
    'Mike Johnson',
    'Sarah Williams',
    'David Brown',
  ];

  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  const statuses = [
    { value: 'planning', label: 'Planning' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'on_hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

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

    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    } else if (formData.projectName.trim().length < 3) {
      newErrors.projectName = 'Project name must be at least 3 characters';
    }

    if (!formData.projectCode.trim()) {
      newErrors.projectCode = 'Project code is required';
    }

    // Team leader is optional - no validation needed

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.startDate && formData.endDate < formData.startDate) {
      newErrors.endDate = 'End date must be after start date';
    }

    if (!formData.priority) {
      newErrors.priority = 'Priority is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Project Data:', formData);
      // Add your API call here
      alert('Project created successfully!');
      navigate('/project-management');
    }
  };

  const handleReset = () => {
    setFormData({
      projectName: '',
      projectCode: '',
      description: '',
      teamLeader: '',
      teamMembers: [],
      startDate: '',
      endDate: '',
      priority: '',
      status: 'planning',
      objectives: '',
    });
    setErrors({});
    setSelectedMember('');
  };

  const handleTeamChange = (e) => {
    const { name, value } = e.target;
    setNewTeam((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (teamErrors[name]) {
      setTeamErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateTeam = () => {
    const newErrors = {};
    if (!newTeam.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    }
    if (!newTeam.department) {
      newErrors.department = 'Department is required';
    }
    if (!newTeam.teamLeader) {
      newErrors.teamLeader = 'Team leader is required';
    }
    if (!newTeam.maxMembers) {
      newErrors.maxMembers = 'Max members is required';
    }
    setTeamErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateTeam = () => {
    if (validateTeam()) {
      const team = {
        id: teams.length + 1,
        name: newTeam.teamName,
        department: newTeam.department,
      };
      setTeams([...teams, team]);
      setNewTeam({ teamName: '', department: '', teamLeader: '', maxMembers: '' });
      setShowCreateTeam(false);
      alert('Team created successfully!');
    }
  };

  const handleCancelTeam = () => {
    setNewTeam({ teamName: '', department: '', teamLeader: '', maxMembers: '' });
    setTeamErrors({});
    setShowCreateTeam(false);
  };

  const handleAddMember = () => {
    if (!selectedMember) {
      alert('Please select a team member');
      return;
    }

    const member = availableMembers.find((m) => m.id === parseInt(selectedMember));
    
    if (formData.teamMembers.find((m) => m.id === member.id)) {
      alert('This member is already added to the team');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, member],
    }));
    setSelectedMember('');
  };

  const handleRemoveMember = (memberId) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((m) => m.id !== memberId),
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4 sm:mb-6">
          Create Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Basic Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Project Information
            </h2>
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
                  placeholder="e.g., Mobile App Development"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.projectName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.projectName && (
                  <p className="text-sm text-red-500 mt-1">{errors.projectName}</p>
                )}
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
                {errors.projectCode && (
                  <p className="text-sm text-red-500 mt-1">{errors.projectCode}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe the project goals and scope..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Objectives
                </label>
                <textarea
                  name="objectives"
                  value={formData.objectives}
                  onChange={handleChange}
                  rows="2"
                  placeholder="List key objectives and deliverables..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Team & Management */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-700">
                Team & Management
              </h2>
              <button
                type="button"
                onClick={() => setShowCreateTeam(!showCreateTeam)}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
              >
                {showCreateTeam ? '✕ Cancel' : '+ Create New Team'}
              </button>
            </div>

            {/* Create Team Form */}
            {showCreateTeam && (
              <div className="mb-6 p-4 bg-white border-2 border-green-200 rounded-lg">
                <h3 className="text-lg font-medium text-gray-700 mb-3">New Team Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Team Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="teamName"
                      value={newTeam.teamName}
                      onChange={handleTeamChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        teamErrors.teamName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Mobile Development Team"
                    />
                    {teamErrors.teamName && (
                      <p className="text-sm text-red-500 mt-1">{teamErrors.teamName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="department"
                      value={newTeam.department}
                      onChange={handleTeamChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white ${
                        teamErrors.department ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                    {teamErrors.department && (
                      <p className="text-sm text-red-500 mt-1">{teamErrors.department}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Team Leader <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="teamLeader"
                      value={newTeam.teamLeader}
                      onChange={handleTeamChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white ${
                        teamErrors.teamLeader ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select team leader</option>
                      {projectManagers.map((manager) => (
                        <option key={manager} value={manager}>
                          {manager}
                        </option>
                      ))}
                    </select>
                    {teamErrors.teamLeader && (
                      <p className="text-sm text-red-500 mt-1">{teamErrors.teamLeader}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Members <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="maxMembers"
                      value={newTeam.maxMembers}
                      onChange={handleTeamChange}
                      min="1"
                      max="100"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        teamErrors.maxMembers ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 10"
                    />
                    {teamErrors.maxMembers && (
                      <p className="text-sm text-red-500 mt-1">{teamErrors.maxMembers}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={handleCreateTeam}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Save Team
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelTeam}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Leader <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <select
                  name="teamLeader"
                  value={formData.teamLeader}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select team leader (optional)</option>
                  {teamLeaders.map((leader) => (
                    <option key={leader.id} value={leader.id}>
                      {leader.name} - {leader.employeeId} ({leader.designation})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-600 mt-1">
                  You can assign a team leader or leave it empty to assign later
                </p>
              </div>
            </div>

            {/* Team Members Section */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Assign Team Members
              </h3>
              
              <div className="flex gap-3 mb-4">
                <select
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select a team member to add</option>
                  {availableMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} - {member.employeeId} ({member.designation})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 whitespace-nowrap"
                >
                  Add Member
                </button>
              </div>

              {formData.teamMembers.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Selected Team Members ({formData.teamMembers.length})
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded-md">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left font-semibold text-gray-700">Employee ID</th>
                          <th className="px-4 py-2 text-left font-semibold text-gray-700">Name</th>
                          <th className="px-4 py-2 text-left font-semibold text-gray-700">Designation</th>
                          <th className="px-4 py-2 text-left font-semibold text-gray-700">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.teamMembers.map((member) => (
                          <tr key={member.id} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-2">{member.employeeId}</td>
                            <td className="px-4 py-2">{member.name}</td>
                            <td className="px-4 py-2">{member.designation}</td>
                            <td className="px-4 py-2">
                              <button
                                type="button"
                                onClick={() => handleRemoveMember(member.id)}
                                className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {formData.teamMembers.length === 0 && (
                <p className="text-sm text-gray-500 italic">No team members added yet</p>
              )}
            </div>
          </div>

          {/* Timeline & Priority */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Timeline & Priority
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                {errors.endDate && (
                  <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>
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
                  Project Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
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
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
