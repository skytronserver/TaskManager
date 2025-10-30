export const taskMethodologies = [
  {
    id: 'anyBodyToAnyone',
    title: 'Any Body To Anyone',
    description: 'Any user can assign tasks to any other user in the organization',
    icon: '🌐',
  },
  {
    id: 'adminToAnyone',
    title: 'Admin to Anyone',
    description: 'Only administrators can assign tasks to any user',
    icon: '👑',
  },
  {
    id: 'adminTeamLeaderToTeam',
    title: 'Admin/Team Leader to Team',
    description: 'Admins and Team Leaders can assign tasks to their team members',
    icon: '👥',
  },
  {
    id: 'adminToAnyoneTeamAnyTeam',
    title: 'Admin to Any one team/any team',
    description: 'Admins can assign tasks to specific team members or entire teams',
    icon: '🎯',
  },
  {
    id: 'teamLeaderToHisTeam',
    title: 'Team Leader to His Team',
    description: 'Team Leaders can only assign tasks to their own team members',
    icon: '👨‍💼',
  },
  {
    id: 'hierarchyBased',
    title: 'Hierarchy Based',
    description: 'Task assignment follows organizational hierarchy structure',
    icon: '📊',
  },
];

export const methodologyInitialValue = '';
