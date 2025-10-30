export const assignTaskInitialValues = {
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
};

export const assignTaskFormFields = {
  taskTitle: {
    name: 'taskTitle',
    type: 'text',
    label: 'Task Title',
    required: true,
    placeholder: 'Enter task title',
  },
  taskDescription: {
    name: 'taskDescription',
    type: 'textarea',
    label: 'Task Description',
    required: true,
    placeholder: 'Describe the task in detail...',
    rows: 4,
  },
  assignToType: {
    name: 'assignToType',
    type: 'radio',
    label: 'Assign To Type',
    required: true,
    options: [
      { value: 'individual', label: 'Individual' },
      { value: 'team', label: 'Team' },
    ],
  },
  assignTo: {
    name: 'assignTo',
    type: 'select',
    label: 'Assign To',
    required: true,
    options: [], // Will be populated based on assignToType
  },
  priority: {
    name: 'priority',
    type: 'select',
    label: 'Priority',
    required: true,
    options: [
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
      { value: 'High', label: 'High' },
      { value: 'Critical', label: 'Critical' },
    ],
  },
  dueDate: {
    name: 'dueDate',
    type: 'date',
    label: 'Due Date',
    required: true,
  },
  taskType: {
    name: 'taskType',
    type: 'radio',
    label: 'Task Frequency',
    required: true,
    options: [
      { value: 'oneTime', label: 'One Time Task' },
      { value: 'repetitive', label: 'Repetitive Task' },
    ],
  },
  repetitiveType: {
    name: 'repetitiveType',
    type: 'select',
    label: 'Repetitive Type',
    required: false,
    options: [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' },
    ],
  },
  startDate: {
    name: 'startDate',
    type: 'date',
    label: 'Start Date',
    required: false,
  },
  endDate: {
    name: 'endDate',
    type: 'date',
    label: 'End Date',
    required: false,
  },
  reportedBy: {
    name: 'reportedBy',
    type: 'select',
    label: 'Reported By',
    required: false,
    options: [], // Will be populated with users
  },
};

export const users = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams'];
export const teams = ['Development Team', 'Marketing Team', 'Sales Team', 'Support Team'];
