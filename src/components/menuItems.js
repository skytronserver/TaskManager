export const menuItems = {
  main: [
    { text: 'Dashboard', icon: '📊', path: '/', roles: ['admin', 'user'] },
  ],

  Team: [
    { text: 'Create Team', icon: '👥', path: '/create-team', roles: ['admin'] },
    { text: 'Task Methodology', icon: '⚙️', path: '/task-methodology', roles: ['admin'] },
    { text: 'Designation', icon: '🏢', path: '/designation', roles: ['admin'] },
  ],

  CreateUsers: [
    { text: 'Create Team Leader', icon: '👤', path: '/create-team-leader', roles: ['admin'] },
    { text: 'Create Team Member', icon: '👥', path: '/create-team-member', roles: ['admin'] },
  ],

  Projects: [
    { text: 'Create Project', icon: '📁', path: '/create-project', roles: ['admin'] },
    { text: 'Project Management', icon: '📂', path: '/project-management', roles: ['admin'] },
  ],

  Tasks: [
    // { text: 'My Tasks', icon: '✅', path: '/my-tasks', roles: ['member'] },
    { text: 'Assign Task', icon: '📝', path: '/assign-task', roles: ['admin'] },
    { text: 'Task Management', icon: '📋', path: '/task-management', roles: ['admin'] },
    // { text: 'My Queries', icon: '💬', path: '/member-query', roles: ['member'] },
    // { text: 'Query & Reply', icon: '💬', path: '/query-reply', roles: ['admin', 'user'] },
  ],

  // Alerts: [
  //   { text: 'Alert Management', icon: '🔔', path: '/alert-management', roles: ['admin', 'user'] },
  // ],

  // Reports: [
  //   { text: 'View Reports', icon: '📈', path: '/reports', roles: ['admin', 'user'] },
  // ],
};
