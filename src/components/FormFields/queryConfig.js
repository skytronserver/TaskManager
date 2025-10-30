export const queryStatuses = {
  pending: {
    label: 'Pending',
    color: 'bg-red-100 text-red-700',
    icon: '⏳',
  },
  replied: {
    label: 'Replied',
    color: 'bg-green-100 text-green-700',
    icon: '✅',
  },
};

export const sampleQueries = [
  {
    id: 1,
    taskTitle: 'Update User Dashboard',
    queryBy: 'John Doe',
    queryDate: '2025-10-28',
    query: 'Need clarification on the color scheme for the dashboard',
    status: 'pending',
    reply: '',
  },
  {
    id: 2,
    taskTitle: 'Database Optimization',
    queryBy: 'Jane Smith',
    queryDate: '2025-10-27',
    query: 'Which tables should be prioritized for optimization?',
    status: 'pending',
    reply: '',
  },
  {
    id: 3,
    taskTitle: 'API Integration',
    queryBy: 'Mike Johnson',
    queryDate: '2025-10-26',
    query: 'Do we need authentication for all endpoints?',
    status: 'replied',
    reply: 'Yes, all endpoints require JWT authentication',
  },
];

export const getQueryStatusColor = (status) => {
  return queryStatuses[status]?.color || 'bg-gray-100 text-gray-700';
};
