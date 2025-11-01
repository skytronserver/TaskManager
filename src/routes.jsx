import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import CreateTeam from './pages/CreateTeam'
import CreateTeamLeader from './pages/CreateTeamLeader'
import CreateTeamMember from './pages/CreateTeamMember'
import CreateUser from './pages/CreateUser'
import CreateCompany from './pages/CreateCompany'
import CreateDepartment from './pages/CreateDepartment'
import CreateProject from './pages/CreateProject'
import ProjectManagement from './pages/ProjectManagement'
import TaskMethodology from './pages/TaskMethodology'
import Designation from './pages/Designation'
import AssignTask from './pages/AssignTask'
import QueryReply from './pages/QueryReply'
import AlertManagement from './pages/AlertManagement'
import TaskManagement from './pages/TaskManagement'
import Reports from './pages/Reports'
import MyTasks from './pages/MyTasks'
import MemberQuery from './pages/MemberQuery'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create-team" element={<CreateTeam />} />
      <Route path="/create-company" element={<CreateCompany />} />
      <Route path="/create-department" element={<CreateDepartment />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/create-team-leader" element={<CreateTeamLeader />} />
      <Route path="/create-team-member" element={<CreateTeamMember />} />
      <Route path="/create-project" element={<CreateProject />} />
      <Route path="/project-management" element={<ProjectManagement />} />
      <Route path="/task-methodology" element={<TaskMethodology />} />
      <Route path="/designation" element={<Designation />} />
      <Route path="/assign-task" element={<AssignTask />} />
      <Route path="/my-tasks" element={<MyTasks />} />
      <Route path="/member-query" element={<MemberQuery />} />
      <Route path="/query-reply" element={<QueryReply />} />
      <Route path="/alert-management" element={<AlertManagement />} />
      <Route path="/task-management" element={<TaskManagement />} />
      <Route path="/reports" element={<Reports />} />
      <Route
        path="/users"
        element={
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-slate-800">Users List</h2>
            <p className="text-slate-600 mt-2">User management coming soon...</p>
          </div>
        }
      />
    </Routes>
  )
}


