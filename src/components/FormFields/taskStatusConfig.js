export const taskStatuses = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    icon: '⏳',
  },
  'in-progress': {
    label: 'In Progress',
    color: 'bg-blue-100 text-blue-700 border-blue-300',
    icon: '🔄',
  },
  completed: {
    label: 'Completed',
    color: 'bg-green-100 text-green-700 border-green-300',
    icon: '✅',
  },
  approved: {
    label: 'Approved',
    color: 'bg-purple-100 text-purple-700 border-purple-300',
    icon: '👍',
  },
  extended: {
    label: 'Extended',
    color: 'bg-orange-100 text-orange-700 border-orange-300',
    icon: '⏰',
  },
  abandoned: {
    label: 'Abandoned',
    color: 'bg-red-100 text-red-700 border-red-300',
    icon: '❌',
  },
  closed: {
    label: 'Closed',
    color: 'bg-gray-100 text-gray-700 border-gray-300',
    icon: '🔒',
  },
  'extension-requested': {
    label: 'Extension Requested',
    color: 'bg-orange-100 text-orange-700 border-orange-300',
    icon: '🕐',
  },
};

export const taskPriorities = {
  Critical: {
    label: 'Critical',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  High: {
    label: 'High',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  Medium: {
    label: 'Medium',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  Low: {
    label: 'Low',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
};

export const taskActions = [
  { value: 'approve', label: 'Approve', icon: '✓' },
  { value: 'extension', label: 'Request Extension', icon: '⏰' },
  { value: 'abandon', label: 'Abandon', icon: '❌' },
  { value: 'close', label: 'Close', icon: '🔒' },
  { value: 'completed', label: 'Mark as Completed', icon: '✅' },
];

export const getStatusColor = (status) => {
  return taskStatuses[status]?.color || 'bg-gray-100 text-gray-700 border-gray-300';
};

export const getPriorityColor = (priority) => {
  return taskPriorities[priority]?.color || 'text-gray-600';
};
