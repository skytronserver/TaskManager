import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AssignMembers = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  
  // Mock project data - Replace with API call
  const [project, setProject] = useState({
    id: projectId,
    projectName: 'SKYTRON BACK END',
    projectCode: 'PROJ-2024-001',
    currentMembers: ['Ankur', 'Nitul', 'Kishalay'],
  });

  const [availableMembers] = useState([
    { id: 1, name: 'Ankur', employeeId: 'EMP001', designation: 'Team Leader', department: 'Engineering' },
    { id: 2, name: 'Nitul', employeeId: 'EMP002', designation: 'Senior Developer', department: 'Engineering' },
    { id: 3, name: 'Kishalay', employeeId: 'EMP003', designation: 'Developer', department: 'Engineering' },
    { id: 4, name: 'Kajal', employeeId: 'EMP004', designation: 'App Developer', department: 'Mobile' },
    { id: 5, name: 'Twinkle', employeeId: 'EMP005', designation: 'Developer', department: 'Engineering' },
    { id: 6, name: 'Samudra', employeeId: 'EMP006', designation: 'App Developer', department: 'Mobile' },
    { id: 7, name: 'Rahul', employeeId: 'EMP007', designation: 'UI/UX Designer', department: 'Design' },
    { id: 8, name: 'Priya', employeeId: 'EMP008', designation: 'QA Engineer', department: 'Quality' },
  ]);

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  const departments = ['all', 'Engineering', 'Mobile', 'Design', 'Quality'];

  const filteredMembers = availableMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.designation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    const notCurrentMember = !project.currentMembers.includes(member.name);
    return matchesSearch && matchesDepartment && notCurrentMember;
  });

  const handleMemberToggle = (member) => {
    setSelectedMembers(prev => {
      const isSelected = prev.find(m => m.id === member.id);
      if (isSelected) {
        return prev.filter(m => m.id !== member.id);
      } else {
        return [...prev, member];
      }
    });
  };

  const handleAssignMembers = () => {
    if (selectedMembers.length === 0) {
      alert('Please select at least one member to assign.');
      return;
    }
    
    console.log('Assigning members to project:', {
      projectId,
      members: selectedMembers
    });
    
    alert(`Successfully assigned ${selectedMembers.length} member(s) to ${project.projectName}!`);
    navigate('/project-management');
  };

  const handleRemoveCurrentMember = (memberName) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove ${memberName} from this project?`);
    if (confirmDelete) {
      setProject(prevProject => ({
        ...prevProject,
        currentMembers: prevProject.currentMembers.filter(member => member !== memberName)
      }));
      alert(`${memberName} has been removed from the project.`);
    }
  };

  const generateInviteLink = () => {
    const baseUrl = window.location.origin;
    const inviteToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const link = `${baseUrl}/join-project/${projectId}?token=${inviteToken}&expires=${Date.now() + 7 * 24 * 60 * 60 * 1000}`;
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

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600">
              Assign Members
            </h1>
            <p className="text-gray-600 mt-1">
              Project: <span className="font-medium">{project.projectName}</span> ({project.projectCode})
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={generateInviteLink}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              📧 Generate Invite Link
            </button>
            <button
              onClick={() => navigate('/project-management')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              ← Back to Projects
            </button>
          </div>
        </div>

        {/* Current Members */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">👥 Current Team Members</h3>
          <div className="flex flex-wrap gap-2">
            {project.currentMembers.map((member, index) => (
              <div key={index} className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-full border border-blue-200">
                <span className="text-sm font-medium">{member}</span>
                <button
                  onClick={() => handleRemoveCurrentMember(member)}
                  className="text-red-500 hover:text-red-700 text-xs"
                  title="Remove member"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Members for Assignment */}
        {selectedMembers.length > 0 && (
          <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-3">✓ Selected for Assignment ({selectedMembers.length})</h3>
            <div className="flex flex-wrap gap-2">
              {selectedMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-full border border-green-200">
                  <span className="text-sm font-medium">{member.name}</span>
                  <button
                    onClick={() => handleMemberToggle(member)}
                    className="text-red-500 hover:text-red-700 text-xs"
                    title="Remove from selection"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Members
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, ID, or designation..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Department
              </label>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Available Members */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Members</h3>
          {filteredMembers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No available members found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMembers.map((member) => {
                const isSelected = selectedMembers.find(m => m.id === member.id);
                return (
                  <div
                    key={member.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                    }`}
                    onClick={() => handleMemberToggle(member)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{member.name}</h4>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-green-500 bg-green-500' : 'border-gray-300'
                      }`}>
                        {isSelected && <span className="text-white text-xs">✓</span>}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">ID: {member.employeeId}</p>
                    <p className="text-sm text-gray-600">{member.designation}</p>
                    <p className="text-sm text-blue-600 font-medium">{member.department}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <button
            onClick={() => navigate('/project-management')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleAssignMembers}
            disabled={selectedMembers.length === 0}
            className={`px-8 py-2 rounded-md font-semibold ${
              selectedMembers.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            ✓ Assign {selectedMembers.length} Member{selectedMembers.length !== 1 ? 's' : ''}
          </button>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">📧 Invite Members</h3>
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
                  Project Invite Link
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

export default AssignMembers;
