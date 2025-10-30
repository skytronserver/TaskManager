import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AssignTeamLeader = () => {
  const navigate = useNavigate();
  
  // Mock data - Replace with actual API calls
  const [teamMembers] = useState([
    { id: 1, name: 'Alice Johnson', employeeId: 'EMP001', department: 'Engineering', role: 'Senior Developer', currentLeader: null },
    { id: 2, name: 'Bob Smith', employeeId: 'EMP002', department: 'Sales', role: 'Sales Executive', currentLeader: 'John Doe' },
    { id: 3, name: 'Charlie Brown', employeeId: 'EMP003', department: 'Marketing', role: 'Marketing Specialist', currentLeader: null },
    { id: 4, name: 'Diana Prince', employeeId: 'EMP004', department: 'Engineering', role: 'Junior Developer', currentLeader: 'Jane Smith' },
    { id: 5, name: 'Eve Wilson', employeeId: 'EMP005', department: 'Finance', role: 'Financial Analyst', currentLeader: null },
  ]);

  const [teamLeaders] = useState([
    { id: 1, name: 'John Doe', department: 'Sales' },
    { id: 2, name: 'Jane Smith', department: 'Engineering' },
    { id: 3, name: 'Mike Johnson', department: 'Marketing' },
    { id: 4, name: 'Sarah Williams', department: 'Finance' },
    { id: 5, name: 'David Brown', department: 'Operations' },
  ]);

  const [assignments, setAssignments] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleLeaderChange = (memberId, leaderId) => {
    setAssignments((prev) => ({
      ...prev,
      [memberId]: leaderId,
    }));
  };

  const handleAssign = (memberId) => {
    const leaderId = assignments[memberId];
    if (!leaderId) {
      alert('Please select a team leader');
      return;
    }

    const leader = teamLeaders.find((l) => l.id === leaderId);
    const member = teamMembers.find((m) => m.id === memberId);

    console.log(`Assigning ${leader.name} to ${member.name}`);
    
    // Here you would make an API call to save the assignment
    setSuccessMessage(`Successfully assigned ${leader.name} as team leader for ${member.name}`);
    
    // Clear the assignment after success
    setAssignments((prev) => {
      const newAssignments = { ...prev };
      delete newAssignments[memberId];
      return newAssignments;
    });

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleBulkAssign = () => {
    if (Object.keys(assignments).length === 0) {
      alert('No assignments to save');
      return;
    }

    console.log('Bulk assignments:', assignments);
    
    // Here you would make an API call to save all assignments
    setSuccessMessage(`Successfully assigned team leaders to ${Object.keys(assignments).length} team member(s)`);
    
    // Clear all assignments after success
    setAssignments({});

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600">
            Assign Team Leader
          </h1>
          <button
            onClick={handleBulkAssign}
            disabled={Object.keys(assignments).length === 0}
            className={`w-full sm:w-auto px-6 py-2 rounded-md font-medium transition-colors ${
              Object.keys(assignments).length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Save All Assignments ({Object.keys(assignments).length})
          </button>
        </div>

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mb-4 sm:mb-6">
            {successMessage}
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-medium text-gray-700 mb-4">
            Team Members
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Employee ID</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Name</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Department</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Role</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Current Leader</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Assign New Leader</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap">{member.employeeId}</td>
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap">{member.name}</td>
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap">{member.department}</td>
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap">{member.role}</td>
                    <td className="px-3 sm:px-4 py-3">
                      {member.currentLeader ? (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 border border-blue-300 rounded-full text-xs font-medium whitespace-nowrap">
                          {member.currentLeader}
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium whitespace-nowrap">
                          Not Assigned
                        </span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <select
                        value={assignments[member.id] || ''}
                        onChange={(e) => handleLeaderChange(member.id, e.target.value)}
                        className="w-full min-w-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        <option value="">Select Team Leader</option>
                        {teamLeaders.map((leader) => (
                          <option key={leader.id} value={leader.id}>
                            {leader.name} ({leader.department})
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <button
                        onClick={() => handleAssign(member.id)}
                        disabled={!assignments[member.id]}
                        className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                          !assignments[member.id]
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex gap-4 justify-end mt-6 sm:mt-8">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTeamLeader;
