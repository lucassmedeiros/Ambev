import { useSession } from '@/context/SessionContext';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import employeesApi from '../../services/employeesApi';
import { Container } from './styles';

interface Employee {
  id: number;
  name: string;
  email: string;
  document: string;
  manager?: string;
}

const EmployeeList: React.FC = () => {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const {  handleLogout } = useSession()

  useEffect(() => {
    employeesApi
      .get('/employees')
      .then((response) => {
        setEmployees(response.data);
        const data = sessionStorage.getItem('@user-data');
        if (data) {
          const parsedData = JSON.parse(data);
          setIsAdmin(parsedData[0].role === 'admin');
        }
      })
      .catch((error) => {
        console.error(t('employeeList.error.fetchingEmployees'), error);
      });
  }, [t]);

  const handleDelete = async (id: number) => {
    try {
      await employeesApi.delete(`/employees/${id}`);
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error(t('employeeList.error.deletingEmployee'), error);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

 

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {t('employeeList.appBarTitle')}
          </Typography>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Avatar alt="User" src="/static/images/avatar/1.jpg" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ marginRight: 1 }} />
              {t('employeeList.menu.logout')}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box p={3}>
        <Typography variant="h4" align="center" gutterBottom>
          {t('employeeList.title')}
        </Typography>
        {isAdmin && (
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button onClick={() => navigate('/form')} variant="contained" color="primary">
              {t('employeeList.buttons.newUser')}
            </Button>
          </Box>
        )}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0px 4px 15px rgba(0,0,0,0.15)',
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {t('employeeList.tableHeaders.id')}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {t('employeeList.tableHeaders.name')}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {t('employeeList.tableHeaders.email')}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {t('employeeList.tableHeaders.document')}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {t('employeeList.tableHeaders.manager')}
                </TableCell>
                {isAdmin && (
                  <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {t('employeeList.tableHeaders.actions')}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <TableRow key={employee.id} hover>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ bgcolor: '#1976d2' }}>
                          {employee.name.charAt(0)}
                        </Avatar>
                        {employee.name}
                      </Box>
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.document}</TableCell>
                    <TableCell>{employee.manager || 'N/A'}</TableCell>
                    {isAdmin && (
                      <TableCell>
                        <IconButton color="error" onClick={() => handleDelete(employee.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    {t('employeeList.noEmployees')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default EmployeeList;
