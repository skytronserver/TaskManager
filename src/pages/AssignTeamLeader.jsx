import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AssignTeamLeader = () => {
  const navigate = useNavigate();
  
  // Mock data - Replace with actual API calls
  const [teamMembers] = useState([
    { id: 1, name: 'Alice Johnson', employeeId: 'EMP001', department: 'Engineering', role: 'Senior Developer', currentLeader: null },
    { id: 2, name: 'Bob Smith', employeeId: 'EMP002', department: 'Sales', role: 'Sales Executive', currentLeader: 'John Doe' },
    { id: 3, name: 'Charlie Brown', employeeId: 'EMP003', department: 'Marketing', role: 'Marketing Specialist', currentLeader: null },
    { id: 4, name: 'Diana Prince', employeeId: 'EMP004', department: 'Engineering', role: 'Junior Developer', currentLeader: 'Jane Smith' },
    { id: 5, name: 'Eve Wilson', employeeId: 'EMP005', department: 'Finance', role: 'Financial Analyst', currentLeader: null },
  ]);

  const [teamLeaders] = useState([
    { id: 1, name: 'John Doe', department: 'Sales' },
    { id: 2, name: 'Jane Smith', department: 'Engineering' },
    { id: 3, name: 'Mike Johnson', department: 'Marketing' },
    { id: 4, name: 'Sarah Williams', department: 'Finance' },
    { id: 5, name: 'David Brown', department: 'Operations' },
  ]);

  const [assignments, setAssignments] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleLeaderChange = (memberId, leaderId) => {
    setAssignments((prev) => ({
      ...prev,
      [memberId]: leaderId,
    }));
  };

  const handleAssign = (memberId) => {
    const leaderId = assignments[memberId];
    if (!leaderId) {
      alert('Please select a team leader');
      return;
    }

    const leader = teamLeaders.find((l) => l.id === leaderId);
    const member = teamMembers.find((m) => m.id === memberId);

    console.log(`Assigning ${leader.name} to ${member.name}`);
    
    // Here you would make an API call to save the assignment
    setSuccessMessage(`Successfully assigned ${leader.name} as team leader for ${member.name}`);
    
    // Clear the assignment after success
    setAssignments((prev) => {
      const newAssignments = { ...prev };
      delete newAssignments[memberId];
      return newAssignments;
    });

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleBulkAssign = () => {
    if (Object.keys(assignments).length === 0) {
      alert('No assignments to save');
      return;
    }

    console.log('Bulk assignments:', assignments);
    
    // Here you would make an API call to save all assignments
    setSuccessMessage(`Successfully assigned team leaders to ${Object.keys(assignments).length} team member(s)`);
    
    // Clear all assignments after success
    setAssignments({});

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2' }}>
            Assign Team Leader
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBulkAssign}
            disabled={Object.keys(assignments).length === 0}
            sx={{ px: 4 }}
          >
            Save All Assignments ({Object.keys(assignments).length})
          </Button>
        </Box>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, color: '#555' }}>
              Team Members
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Employee ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Current Leader</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Assign New Leader</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id} hover>
                      <TableCell>{member.employeeId}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        {member.currentLeader ? (
                          <Chip
                            label={member.currentLeader}
                            color="primary"
                            size="small"
                            variant="outlined"
                          />
                        ) : (
                          <Chip
                            label="Not Assigned"
                            color="default"
                            size="small"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <FormControl fullWidth size="small" sx={{ minWidth: 200 }}>
                          <InputLabel>Select Team Leader</InputLabel>
                          <Select
                            value={assignments[member.id] || ''}
                            onChange={(e) => handleLeaderChange(member.id, e.target.value)}
                            label="Select Team Leader"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {teamLeaders.map((leader) => (
                              <MenuItem key={leader.id} value={leader.id}>
                                {leader.name} ({leader.department})
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleAssign(member.id)}
                          disabled={!assignments[member.id]}
                        >
                          Assign
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/')}
            sx={{ px: 4 }}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AssignTeamLeader;
