export const reportTypes = {
  task: {
    id: 'task',
    title: 'Task Report',
    icon: '📋',
  },
  team: {
    id: 'team',
    title: 'Team Performance',
    icon: '👥',
  },
  query: {
    id: 'query',
    title: 'Query Report',
    icon: '💬',
  },
  alert: {
    id: 'alert',
    title: 'Alert Report',
    icon: '🔔',
  },
};

export const sampleTaskReportData = [
  {
    id: 1,
    task: 'Update Dashboard',
    assignedTo: 'John Doe',
    status: 'Completed',
    dueDate: '2025-10-28',
    completedDate: '2025-10-27',
  },
  {
    id: 2,
    task: 'Database Optimization',
    assignedTo: 'Jane Smith',
    status: 'In Progress',
    dueDate: '2025-11-02',
    completedDate: '-',
  },
  {
    id: 3,
    task: 'API Integration',
    assignedTo: 'Mike Johnson',
    status: 'Completed',
    dueDate: '2025-10-25',
    completedDate: '2025-10-25',
  },
  {
    id: 4,
    task: 'Bug Fixes',
    assignedTo: 'Sarah Williams',
    status: 'Pending',
    dueDate: '2025-11-05',
    completedDate: '-',
  },
];

export const sampleTeamPerformanceData = [
  {
    id: 1,
    team: 'Development Team',
    totalTasks: 25,
    completed: 20,
    inProgress: 3,
    pending: 2,
    efficiency: '80%',
  },
  {
    id: 2,
    team: 'Marketing Team',
    totalTasks: 15,
    completed: 12,
    inProgress: 2,
    pending: 1,
    efficiency: '80%',
  },
  {
    id: 3,
    team: 'Sales Team',
    totalTasks: 20,
    completed: 15,
    inProgress: 3,
    pending: 2,
    efficiency: '75%',
  },
  {
    id: 4,
    team: 'Support Team',
    totalTasks: 30,
    completed: 25,
    inProgress: 4,
    pending: 1,
    efficiency: '83%',
  },
];

export const sampleQueryReportData = [
  {
    id: 1,
    task: 'Update Dashboard',
    queryBy: 'John Doe',
    queryDate: '2025-10-28',
    status: 'Replied',
    repliedBy: 'Admin',
  },
  {
    id: 2,
    task: 'Database Optimization',
    queryBy: 'Jane Smith',
    queryDate: '2025-10-27',
    status: 'Pending',
    repliedBy: '-',
  },
  {
    id: 3,
    task: 'API Integration',
    queryBy: 'Mike Johnson',
    queryDate: '2025-10-26',
    status: 'Replied',
    repliedBy: 'Team Leader',
  },
];

export const sampleAlertReportData = [
  {
    id: 1,
    title: 'Server Maintenance',
    sentTo: 'Development Team',
    priority: 'High',
    date: '2025-10-29',
    status: 'Active',
  },
  {
    id: 2,
    title: 'Deadline Reminder',
    sentTo: 'John Doe',
    priority: 'Critical',
    date: '2025-10-28',
    status: 'Active',
  },
  {
    id: 3,
    title: 'Meeting Schedule',
    sentTo: 'All Teams',
    priority: 'Medium',
    date: '2025-10-27',
    status: 'Dismissed',
  },
];
