import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Reports = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('task');

  // Set active tab based on URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['project', 'employee'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  // Dummy project performance data for demo/reporting
  const projectPerformanceData = [
    {
      id: 1,
      project: 'SKYTRON BACK END (PROJ-2024-001)',
      totalTasks: 45,
      completed: 29,
      inProgress: 10,
      pending: 6,
      efficiency: '64%'
    },
    {
      id: 2,
      project: 'DWARPAL AI (PROJ-2024-002)',
      totalTasks: 38,
      completed: 21,
      inProgress: 9,
      pending: 8,
      efficiency: '55%'
    },
    {
      id: 3,
      project: 'PENDULUM (Task Management App) (PROJ-2024-003)',
      totalTasks: 32,
      completed: 22,
      inProgress: 6,
      pending: 4,
      efficiency: '69%'
    },
    {
      id: 4,
      project: 'ROUND THE CLOCK (PROJ-2024-004)',
      totalTasks: 28,
      completed: 17,
      inProgress: 7,
      pending: 4,
      efficiency: '61%'
    },
    {
      id: 5,
      project: 'MAPWALA MIS (PROJ-2024-005)',
      totalTasks: 40,
      completed: 18,
      inProgress: 12,
      pending: 10,
      efficiency: '45%'
    },
    {
      id: 6,
      project: 'MAPWALA / RAPIDYTARA / E-DISHA TRACKING PLATFORM (PROJ-2024-006)',
      totalTasks: 50,
      completed: 38,
      inProgress: 8,
      pending: 4,
      efficiency: '76%'
    },
    {
      id: 7,
      project: 'MINDGENIX & SKYTRACK WEBSITE (PROJ-2024-007)',
      totalTasks: 20,
      completed: 8,
      inProgress: 7,
      pending: 5,
      efficiency: '40%'
    },
  ];

  const queryReportData = [
    { id: 1, task: 'Update Dashboard', queryBy: 'John Doe', queryDate: '2025-10-28', status: 'Replied', repliedBy: 'Admin' },
    { id: 2, task: 'Database Optimization', queryBy: 'Jane Smith', queryDate: '2025-10-27', status: 'Pending', repliedBy: '-' },
    { id: 3, task: 'API Integration', queryBy: 'Mike Johnson', queryDate: '2025-10-26', status: 'Replied', repliedBy: 'Team Leader' },
  ];

  const alertReportData = [
    { id: 1, title: 'Server Maintenance', sentTo: 'Development Team', priority: 'High', date: '2025-10-29', status: 'Active' },
    { id: 2, title: 'Deadline Reminder', sentTo: 'John Doe', priority: 'Critical', date: '2025-10-28', status: 'Active' },
    { id: 3, title: 'Meeting Schedule', sentTo: 'All Teams', priority: 'Medium', date: '2025-10-27', status: 'Dismissed' },
  ];

  const handleExport = (type) => {
    alert(`Exporting ${type} report...`);
    // Implement export functionality here
  };

  // Employee Performance Report
  const employeePerformanceData = [
    {
      id: 1,
      employee: 'Ankur',
      designation: 'Team Leader',
      totalTasks: 28,
      completed: 20,
      inProgress: 5,
      pending: 3,
      onTime: 16,
      delayed: 4,
      efficiency: '71%',
    },
    {
      id: 2,
      employee: 'Nitul',
      designation: 'Senior Developer',
      totalTasks: 24,
      completed: 18,
      inProgress: 4,
      pending: 2,
      onTime: 15,
      delayed: 3,
      efficiency: '75%',
    },
    {
      id: 3,
      employee: 'Kishalay',
      designation: 'Developer',
      totalTasks: 18,
      completed: 12,
      inProgress: 3,
      pending: 3,
      onTime: 9,
      delayed: 3,
      efficiency: '67%',
    },
    {
      id: 4,
      employee: 'Twinkle',
      designation: 'Developer',
      totalTasks: 14,
      completed: 9,
      inProgress: 3,
      pending: 2,
      onTime: 7,
      delayed: 2,
      efficiency: '64%',
    },
  ];

  const renderEmployeePerformance = () => (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Employee Performance Report</h3>
        <button
          onClick={() => handleExport('Employee Performance')}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
        >
          📥 Export to Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Employee</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Designation</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Total Tasks</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Completed</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">In Progress</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Pending</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">On Time</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Delayed</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Efficiency</th>
            </tr>
          </thead>
          <tbody>
            {employeePerformanceData.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.employee}</td>
                <td className="px-4 py-3">{item.designation}</td>
                <td className="px-4 py-3">{item.totalTasks}</td>
                <td className="px-4 py-3 text-green-600 font-semibold">{item.completed}</td>
                <td className="px-4 py-3 text-blue-600">{item.inProgress}</td>
                <td className="px-4 py-3 text-orange-600">{item.pending}</td>
                <td className="px-4 py-3">{item.onTime}</td>
                <td className="px-4 py-3">{item.delayed}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {item.efficiency}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProjectPerformance = () => (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Project Performance Report</h3>
        <button
          onClick={() => handleExport('Project Performance')}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
        >
          📥 Export to Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Project</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Total Tasks</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Completed</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">In Progress</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Pending</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Efficiency</th>
            </tr>
          </thead>
          <tbody>
            {projectPerformanceData.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.project}</td>
                <td className="px-4 py-3">{item.totalTasks}</td>
                <td className="px-4 py-3 text-green-600 font-semibold">{item.completed}</td>
                <td className="px-4 py-3 text-blue-600">{item.inProgress}</td>
                <td className="px-4 py-3 text-orange-600">{item.pending}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {item.efficiency}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderQueryReport = () => (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Query Report</h3>
        <button
          onClick={() => handleExport('Query')}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
        >
          📥 Export to Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Task</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Query By</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Query Date</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Replied By</th>
            </tr>
          </thead>
          <tbody>
            {queryReportData.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">{item.task}</td>
                <td className="px-4 py-3">{item.queryBy}</td>
                <td className="px-4 py-3">{item.queryDate}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Replied'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3">{item.repliedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-yellow-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Pending Queries</p>
          <p className="text-2xl font-bold text-yellow-600">
            {queryReportData.filter((q) => q.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Replied Queries</p>
          <p className="text-2xl font-bold text-green-600">
            {queryReportData.filter((q) => q.status === 'Replied').length}
          </p>
        </div>
      </div>
    </div>
  );

  const renderAlertReport = () => (
    <div className="bg-white rounded-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Alert Report</h3>
        <button
          onClick={() => handleExport('Alert')}
          className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
        >
          📥 Export to Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Alert Title</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Sent To</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Priority</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {alertReportData.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">{item.title}</td>
                <td className="px-4 py-3">{item.sentTo}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.priority === 'Critical'
                        ? 'bg-red-100 text-red-700'
                        : item.priority === 'High'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {item.priority}
                  </span>
                </td>
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Active Alerts</p>
          <p className="text-2xl font-bold text-green-600">
            {alertReportData.filter((a) => a.status === 'Active').length}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Dismissed Alerts</p>
          <p className="text-2xl font-bold text-gray-600">
            {alertReportData.filter((a) => a.status === 'Dismissed').length}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4 sm:mb-6">
          Reports
        </h1>

        {/* Date Range Filter */}
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Date Range Filter</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) =>
                  setDateRange({ ...dateRange, startDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) =>
                  setDateRange({ ...dateRange, endDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Apply Filter
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-2 sm:gap-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('project')}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${
                activeTab === 'project'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Project Performance Report
            </button>
            <button
              onClick={() => setActiveTab('employee')}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${
                activeTab === 'employee'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Employee Performance Report
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'project' && renderProjectPerformance()}
          {activeTab === 'employee' && renderEmployeePerformance()}
        </div>

        <div className="flex gap-4 justify-end mt-6 sm:mt-8">
          <button
            type="button"
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

export default Reports;
