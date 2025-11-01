export const menuItems = {
  main: [
    { text: 'Dashboard', icon: '📊', path: '/', roles: ['admin', 'user'] },
  ],

  Company: [
    { text: 'Create Company', icon: '🏢', path: '/create-company', roles: ['admin'] },
  ],

  Department: [
    { text: 'Create Department(Optional)', icon: '🏛️', path: '/create-department', roles: ['admin'] },
  ],

   CreateUsers: [
    { text: 'Create User', icon: '👤', path: '/create-user', roles: ['admin'] },
  ],


  Organization: [
    { text: 'Task Methodology', icon: '⚙️', path: '/task-methodology', roles: ['admin'] },
    { text: 'Organisational Hierarchy', icon: '🎯', path: '/designation', roles: ['admin'] },
  ],

  CreateUsers: [
    { text: 'Create User', icon: '👤', path: '/create-user', roles: ['admin'] },
  ],

  // Assign: [
  //   { text: 'Task', icon: '📝', path: '/assign-task', roles: ['admin'] },
  //   { text: 'Project', icon: '📁', path: '/create-project', roles: ['admin'] },
  // ],

  // Management: [
  //   { text: 'Task Management', icon: '📋', path: '/task-management', roles: ['admin'] },
  //   { text: 'Project Management', icon: '📂', path: '/project-management', roles: ['admin'] },
  // ],

  // MyWork: [
  //   { text: 'My Tasks', icon: '✅', path: '/my-tasks', roles: ['member'] },
  //   { text: 'My Queries', icon: '💬', path: '/member-query', roles: ['member'] },
  //   { text: 'Query & Reply', icon: '💬', path: '/query-reply', roles: ['admin', 'user'] },
  // ],

  // Alerts: [
  //   { text: 'Alert Management', icon: '🔔', path: '/alert-management', roles: ['admin', 'user'] },
  // ],

  // Reports: [
  //   { text: 'View Reports', icon: '📈', path: '/reports', roles: ['admin', 'user'] },
  // ],
};
