import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Step1CreateProject,
} from '../components/ProjectWizardSteps';

const CreateProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: '',
    projectCode: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: '',
    budget: '',
  });

  const [errors, setErrors] = useState({});

  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
    if (!formData.projectCode.trim()) newErrors.projectCode = 'Project code is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    else if (formData.endDate < formData.startDate) newErrors.endDate = 'End date must be after start date';
    if (!formData.priority) newErrors.priority = 'Priority is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateProject = () => {
    if (!validateForm()) return;
    console.log('Project Data:', formData);
    alert('🎉 Project created successfully! You can now assign tasks and members from Project Management.');
    navigate('/project-management');
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-6">
          Create New Project
        </h1>


        {/* Project Form */}
        <div className="mb-8">
          <Step1CreateProject
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            priorities={priorities}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate('/project-management')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleCreateProject}
            className="px-8 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold"
          >
            ✓ Create Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
