const Dashboard = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', icon: '👥', color: 'bg-blue-500' },
    { label: 'Active Tasks', value: '56', icon: '✓', color: 'bg-green-500' },
    { label: 'Pending', value: '23', icon: '⏳', color: 'bg-yellow-500' },
    { label: 'Completed', value: '891', icon: '✅', color: 'bg-purple-500' },
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'Created new task', time: '2 minutes ago' },
    { user: 'Jane Smith', action: 'Completed task #234', time: '15 minutes ago' },
    { user: 'Mike Johnson', action: 'Updated profile', time: '1 hour ago' },
    { user: 'Sarah Williams', action: 'Added new user', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                {activity.user.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-slate-800 font-medium">{activity.user}</p>
                <p className="text-sm text-slate-600">{activity.action}</p>
              </div>
              <span className="text-sm text-slate-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
