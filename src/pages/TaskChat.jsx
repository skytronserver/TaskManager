import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from '../components/Chat';

const TaskChat = () => {
  const navigate = useNavigate();

  // All users in the system
  const [users] = useState([
    { id: 1, name: 'Ankur', designation: 'Team Leader', status: 'online' },
    { id: 2, name: 'Nitul', designation: 'Senior Developer', status: 'online' },
    { id: 3, name: 'Kishalay', designation: 'Developer', status: 'away' },
    { id: 4, name: 'Kajal', designation: 'App Developer', status: 'offline' },
    { id: 5, name: 'Twinkle', designation: 'Developer', status: 'online' },
    { id: 6, name: 'Samudra', designation: 'App Developer', status: 'online' },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'away':
        return 'Away';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-purple-600">
              Individual Chat
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Chat with anyone individually
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 text-sm whitespace-nowrap"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Users
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or designation..."
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Users List Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Users ({filteredUsers.length})
              </h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedUser?.id === user.id
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-white hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 ${
                            selectedUser?.id === user.id ? 'border-purple-600' : 'border-white'
                          } ${getStatusColor(user.status)}`}
                        ></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">
                          {user.name}
                        </h3>
                        <p className={`text-xs truncate ${
                          selectedUser?.id === user.id ? 'text-purple-100' : 'text-gray-500'
                        }`}>
                          {user.designation}
                        </p>
                        <p className={`text-xs ${
                          selectedUser?.id === user.id ? 'text-purple-200' : 'text-gray-400'
                        }`}>
                          {getStatusText(user.status)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            {selectedUser ? (
              <div>
                {/* User Info Card */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4 border-2 border-purple-200">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium">
                          {selectedUser.name.charAt(0)}
                        </span>
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(selectedUser.status)}`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {selectedUser.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {selectedUser.designation}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getStatusText(selectedUser.status)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chat Component */}
                <div className="h-[500px] sm:h-[600px]">
                  <Chat
                    chatId={`user-${selectedUser.id}`}
                    chatType="individual"
                    chatTitle={`Chat with ${selectedUser.name}`}
                    currentUser="Admin"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[600px] bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-6xl mb-4">👤</div>
                  <p className="text-lg text-gray-600 font-medium">
                    Select a user to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskChat;
