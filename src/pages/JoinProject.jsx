import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

const JoinProject = () => {
  const { projectId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [projectInfo, setProjectInfo] = useState(null);

  const token = searchParams.get('token');
  const expires = searchParams.get('expires');

  useEffect(() => {
    validateInviteLink();
  }, []);

  const validateInviteLink = () => {
    // Check if token exists
    if (!token) {
      setError('Invalid invite link: Missing token');
      setLoading(false);
      return;
    }

    // Check if link has expired
    const expirationTime = parseInt(expires);
    if (Date.now() > expirationTime) {
      setError('This invite link has expired. Please request a new one.');
      setLoading(false);
      return;
    }

    // Mock project validation - Replace with actual API call
    setTimeout(() => {
      setProjectInfo({
        id: projectId,
        name: 'SKYTRON BACK END',
        code: 'PROJ-2024-001',
        description: 'Backend development project for Skytron application'
      });
      setLoading(false);
    }, 1000);
  };

  const handleJoinProject = () => {
    setLoading(true);
    
    // Mock API call to join project
    setTimeout(() => {
      console.log('Joining project:', projectId, 'with token:', token);
      setSuccess(true);
      setLoading(false);
      
      // Redirect to project after 2 seconds
      setTimeout(() => {
        navigate(`/project/${projectId}/tasks`);
      }, 2000);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Validating invite link...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Invalid Invite Link</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/project-management')}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Go to Projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-green-500 text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to the Team!</h1>
            <p className="text-gray-600 mb-6">
              You have successfully joined <strong>{projectInfo.name}</strong>. 
              Redirecting to project dashboard...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="text-blue-500 text-6xl mb-4">🎯</div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Join Project</h1>
          
          {projectInfo && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-blue-800 mb-2">Project Details</h3>
              <p className="text-sm text-gray-700"><strong>Name:</strong> {projectInfo.name}</p>
              <p className="text-sm text-gray-700"><strong>Code:</strong> {projectInfo.code}</p>
              <p className="text-sm text-gray-700"><strong>Description:</strong> {projectInfo.description}</p>
            </div>
          )}
          
          <p className="text-gray-600 mb-6">
            You've been invited to join this project. Click the button below to accept the invitation.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/project-management')}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleJoinProject}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Join Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinProject;
