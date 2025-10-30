export const alertInitialValues = {
  alertTitle: '',
  alertMessage: '',
  alertType: 'individual',
  recipient: '',
  priority: '',
  reportedBy: '',
};

export const alertFormFields = {
  alertTitle: {
    name: 'alertTitle',
    type: 'text',
    label: 'Alert Title',
    required: true,
    placeholder: 'Enter alert title',
  },
  alertMessage: {
    name: 'alertMessage',
    type: 'textarea',
    label: 'Alert Message',
    required: true,
    placeholder: 'Enter alert message',
    rows: 4,
  },
  alertType: {
    name: 'alertType',
    type: 'radio',
    label: 'Alert Type',
    required: true,
    options: [
      { value: 'individual', label: 'Individual' },
      { value: 'team', label: 'Team' },
    ],
  },
  recipient: {
    name: 'recipient',
    type: 'select',
    label: 'Recipient',
    required: true,
    options: [], // Will be populated based on alertType
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

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Critical':
      return 'bg-red-100 text-red-700 border-red-300';
    case 'High':
      return 'bg-orange-100 text-orange-700 border-orange-300';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    case 'Low':
      return 'bg-green-100 text-green-700 border-green-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};
