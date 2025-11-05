import React, { useState, useEffect, useRef } from 'react';

const Chat = ({ chatId, chatType, chatTitle, currentUser = 'Admin' }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load messages from localStorage
  useEffect(() => {
    const storageKey = `chat_${chatType}_${chatId}`;
    const savedMessages = localStorage.getItem(storageKey);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [chatId, chatType]);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      const storageKey = `chat_${chatType}_${chatId}`;
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, chatId, chatType]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !selectedFile) return;

    const message = {
      id: Date.now(),
      sender: currentUser,
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
      type: selectedFile ? 'file' : 'text',
      file: selectedFile ? {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        data: filePreview,
      } : null,
    };

    setMessages([...messages, message]);
    setNewMessage('');
    setIsTyping(false);
    setSelectedFile(null);
    setFilePreview(null);
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const timeStr = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${timeStr}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${timeStr}`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-teal-500',
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const handleDeleteMessage = (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter((msg) => msg.id !== messageId));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎥';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    if (fileType.includes('zip') || fileType.includes('rar')) return '📦';
    return '📎';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDownloadFile = (file) => {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{chatTitle}</h3>
            <p className="text-xs text-blue-100">
              {chatType === 'project' ? '👥 Group Chat' : '💬 Individual Chat'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-500 px-3 py-1 rounded-full">
              {messages.length} messages
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm">Start the conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isCurrentUser = message.sender === currentUser;
            const showAvatar =
              index === 0 || messages[index - 1].sender !== message.sender;

            return (
              <div
                key={message.id}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} ${
                  !showAvatar && !isCurrentUser ? 'ml-12' : ''
                }`}
              >
                <div
                  className={`flex gap-2 max-w-[75%] sm:max-w-[60%] ${
                    isCurrentUser ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar */}
                  {showAvatar && (
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0 ${getAvatarColor(
                        message.sender
                      )}`}
                    >
                      {getInitials(message.sender)}
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className="flex flex-col">
                    {showAvatar && !isCurrentUser && (
                      <span className="text-xs font-medium text-gray-600 mb-1 px-2">
                        {message.sender}
                      </span>
                    )}
                    <div
                      className={`relative group rounded-2xl px-4 py-2 ${
                        isCurrentUser
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                      }`}
                    >
                      {/* File Message */}
                      {message.type === 'file' && message.file && (
                        <div className="mb-2">
                          {message.file.type.startsWith('image/') ? (
                            <div className="mb-2">
                              <img
                                src={message.file.data}
                                alt={message.file.name}
                                className="max-w-full max-h-64 rounded-lg cursor-pointer"
                                onClick={() => window.open(message.file.data, '_blank')}
                              />
                            </div>
                          ) : (
                            <div
                              className={`flex items-center gap-2 p-3 rounded-lg ${
                                isCurrentUser
                                  ? 'bg-blue-500'
                                  : 'bg-gray-100'
                              }`}
                            >
                              <span className="text-2xl">
                                {getFileIcon(message.file.type)}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm font-medium truncate ${
                                    isCurrentUser ? 'text-white' : 'text-gray-800'
                                  }`}
                                >
                                  {message.file.name}
                                </p>
                                <p
                                  className={`text-xs ${
                                    isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                                  }`}
                                >
                                  {formatFileSize(message.file.size)}
                                </p>
                              </div>
                              <button
                                onClick={() => handleDownloadFile(message.file)}
                                className={`text-sm px-2 py-1 rounded ${
                                  isCurrentUser
                                    ? 'bg-blue-700 hover:bg-blue-800 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                }`}
                              >
                                ⬇️
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Text Message */}
                      {message.text && (
                        <p className="text-sm break-words whitespace-pre-wrap">
                          {message.text}
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-2 mt-1">
                        <span
                          className={`text-xs ${
                            isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </span>
                        {isCurrentUser && (
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-blue-100 hover:text-white"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicator */}
      {isTyping && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: '0.1s' }}
              ></span>
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              ></span>
            </div>
            <span>Typing...</span>
          </div>
        </div>
      )}

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 bg-white border-t border-gray-200"
      >
        {/* File Preview */}
        {selectedFile && (
          <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {filePreview ? (
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <span className="text-3xl">
                    {getFileIcon(selectedFile.type)}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-700 text-sm px-2 py-1"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          
          {/* File Upload Button */}
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept="*/*"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-2 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50 transition-all"
            title="Attach file"
          >
            📎
          </button>

          <button
            type="submit"
            disabled={!newMessage.trim() && !selectedFile}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
              newMessage.trim() || selectedFile
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Send 📤
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
