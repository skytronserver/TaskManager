export const designationInitialValues = {
  title: '',
  level: '',
  reportsTo: '',
};

export const designationFormFields = {
  title: {
    name: 'title',
    type: 'text',
    label: 'Designation Title',
    required: true,
    placeholder: 'e.g., Senior Developer',
  },
  level: {
    name: 'level',
    type: 'number',
    label: 'Hierarchy Level',
    required: true,
    placeholder: '1 = Highest',
    min: 1,
  },
  reportsTo: {
    name: 'reportsTo',
    type: 'select',
    label: 'Reports To',
    required: false,
    options: [], // Will be populated with existing designations
  },
};

export const defaultDesignations = [
  { id: 1, title: 'CEO', level: 1, reportsTo: null },
  { id: 2, title: 'CTO', level: 2, reportsTo: 'CEO' },
  { id: 3, title: 'Team Leader', level: 3, reportsTo: 'CTO' },
  { id: 4, title: 'Senior Developer', level: 4, reportsTo: 'Team Leader' },
  { id: 5, title: 'Junior Developer', level: 5, reportsTo: 'Senior Developer' },
];
