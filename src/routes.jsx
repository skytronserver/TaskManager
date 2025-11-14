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
import ProjectTaskManagement from './pages/ProjectTaskManagement'
import ProjectSpecificChat from './pages/ProjectSpecificChat'
import AssignMembers from './pages/AssignMembers'
import TaskMethodology from './pages/TaskMethodology'
import Designation from './pages/Designation'
import AssignTask from './pages/AssignTask'
import QueryReply from './pages/QueryReply'
import AlertManagement from './pages/AlertManagement'
import TaskManagement from './pages/TaskManagement'
import Reports from './pages/Reports'
import MyTasks from './pages/MyTasks'
import IndividualTasks from './pages/IndividualTasks'
import IndividualTasksManagement from './pages/IndividualTasksManagement'
import MemberQuery from './pages/MemberQuery'
import UserManagement from './pages/UserManagement'
import HolidayCalendar from './pages/HolidayCalendar'
import ProjectChat from './pages/ProjectChat'
import TaskChat from './pages/TaskChat'
import Login from './pages/Login'
import Register from './pages/Register'
import JoinProject from './pages/JoinProject'
import TodaysDeadlines from './pages/TodaysDeadlines'
import AdminTodaysDeadlines from './pages/AdminTodaysDeadlines'
import EmployeeTodaysDeadlines from './pages/EmployeeTodaysDeadlines'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/create-team" element={<CreateTeam />} />
      <Route path="/create-company" element={<CreateCompany />} />
      <Route path="/create-department" element={<CreateDepartment />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/create-team-leader" element={<CreateTeamLeader />} />
      <Route path="/create-team-member" element={<CreateTeamMember />} />
      <Route path="/create-project" element={<CreateProject />} />
      <Route path="/project-management" element={<ProjectManagement />} />
      <Route path="/project/:projectId/tasks" element={<ProjectTaskManagement />} />
      <Route path="/project/:projectId/chat" element={<ProjectSpecificChat />} />
      <Route path="/assign-members/:projectId" element={<AssignMembers />} />
      <Route path="/join-project/:projectId" element={<JoinProject />} />
      <Route path="/task-methodology" element={<TaskMethodology />} />
      <Route path="/designation" element={<Designation />} />
      <Route path="/assign-task" element={<AssignTask />} />
      <Route path="/my-tasks" element={<MyTasks />} />
      <Route path="/individual-tasks" element={<IndividualTasks />} />
      <Route path="/individual-tasks-management" element={<IndividualTasksManagement />} />
      <Route path="/member-query" element={<MemberQuery />} />
      <Route path="/query-reply" element={<QueryReply />} />
      <Route path="/alert-management" element={<AlertManagement />} />
      <Route path="/task-management" element={<TaskManagement />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/holiday-calendar" element={<HolidayCalendar />} />
      <Route path="/project-chat" element={<ProjectChat />} />
      <Route path="/task-chat" element={<TaskChat />} />
      <Route path="/todays-deadlines" element={<TodaysDeadlines />} />
      <Route path="/admin-todays-deadlines" element={<AdminTodaysDeadlines />} />
      <Route path="/employee-todays-deadlines" element={<EmployeeTodaysDeadlines />} />
    </Routes>
  )
}
