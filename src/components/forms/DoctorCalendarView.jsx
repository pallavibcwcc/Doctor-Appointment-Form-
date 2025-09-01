import { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Grid, Button, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText
} from '@mui/material';
import { 
  CalendarMonth, ChevronLeft, ChevronRight, 
  AccessTime, Person, Videocam, MeetingRoom
} from '@mui/icons-material';
import FormCard from '../ui/FormCard';
import { generateCalendarData } from '../../data/mockData';

const DoctorCalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [appointmentsOpen, setAppointmentsOpen] = useState(false);
  
  // Get month and year from current date
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  // Month names for display
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Days of the week for display
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Generate calendar grid
  useEffect(() => {
    const data = generateCalendarData(month, year);
    setCalendarData(data);
  }, [month, year]);
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  // Show appointments for a specific day
  const showAppointments = (day) => {
    setSelectedDay(day);
    setAppointmentsOpen(true);
  };
  
  // Close appointments dialog
  const closeAppointments = () => {
    setAppointmentsOpen(false);
  };
  
  // Get days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  // Generate calendar grid
  const generateCalendarGrid = () => {
    const grid = [];
    let dayCount = 1;
    
    // Generate weeks
    for (let week = 0; dayCount <= daysInMonth; week++) {
      const days = [];
      
      // Generate days in a week
      for (let i = 0; i < 7; i++) {
        if ((week === 0 && i < firstDayOfMonth) || dayCount > daysInMonth) {
          // Empty cell
          days.push(null);
        } else {
          // Day cell
          const dayData = calendarData.find(d => d.day === dayCount) || {
            day: dayCount,
            appointmentCount: 0,
            appointments: []
          };
          days.push(dayData);
          dayCount++;
        }
      }
      
      grid.push(days);
    }
    
    return grid;
  };
  
  const calendarGrid = generateCalendarGrid();
  
  return (
    <FormCard 
      title="Doctor's Calendar" 
      subtitle="View all scheduled appointments"
      icon={<CalendarMonth fontSize="large" />}
    >
      <Box className="mb-6">
        <Box className="flex justify-between items-center mb-4">
          <Button 
            startIcon={<ChevronLeft />} 
            onClick={prevMonth}
            variant="outlined"
          >
            Prev
          </Button>
          
          <Typography variant="h5" className="font-medium">
            {monthNames[month]} {year}
          </Typography>
          
          <Button 
            endIcon={<ChevronRight />} 
            onClick={nextMonth}
            variant="outlined"
          >
            Next
          </Button>
        </Box>
        
        <TableContainer component={Paper} elevation={0} className="border">
          <Table>
            <TableHead>
              <TableRow>
                {weekdays.map(day => (
                  <TableCell key={day} align="center" className="font-medium">
                    {day}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {calendarGrid.map((week, weekIndex) => (
                <TableRow key={weekIndex}>
                  {week.map((day, dayIndex) => (
                    <TableCell 
                      key={dayIndex} 
                      align="center" 
                      className={`h-24 w-1/7 ${!day ? 'bg-gray-50' : ''}`}
                    >
                      {day && (
                        <Box className="h-full flex flex-col">
                          <Typography variant="subtitle1" className="font-medium">
                            {day.day}
                          </Typography>
                          
                          {day.appointmentCount > 0 ? (
                            <Box 
                              className="mt-2 p-1 bg-blue-50 text-blue-700 rounded cursor-pointer hover:bg-blue-100 transition-colors"
                              onClick={() => showAppointments(day)}
                            >
                              <Typography variant="body2">
                                {day.appointmentCount} appointment{day.appointmentCount !== 1 ? 's' : ''}
                              </Typography>
                            </Box>
                          ) : (
                            <Typography variant="body2" color="text.secondary" className="mt-2">
                              No appointments
                            </Typography>
                          )}
                        </Box>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      
      {/* Appointments Dialog */}
      <Dialog 
        open={appointmentsOpen} 
        onClose={closeAppointments}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box className="flex items-center">
            <CalendarMonth className="mr-2" />
            <Typography variant="h6">
              Appointments for {monthNames[month]} {selectedDay?.day}, {year}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedDay?.appointments.length > 0 ? (
            <List>
              {selectedDay.appointments.map((appointment, index) => (
                <Box key={appointment.id}>
                  <ListItem>
                    <Box className="w-full">
                      <Box className="flex justify-between items-center">
                        <Box className="flex items-center">
                          <Person className="mr-2" />
                          <Typography variant="subtitle1">
                            {appointment.patientName}
                          </Typography>
                        </Box>
                        <Box className="flex items-center">
                          <AccessTime fontSize="small" className="mr-1" />
                          <Typography variant="body2">
                            {appointment.time}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box className="mt-2 flex items-center">
                        {appointment.visitType === 'In-person' ? (
                          <MeetingRoom fontSize="small" className="mr-1" />
                        ) : (
                          <Videocam fontSize="small" className="mr-1" />
                        )}
                        <Typography variant="body2" color="text.secondary">
                          {appointment.visitType} - {appointment.reason}
                        </Typography>
                      </Box>
                      
                      <Typography variant="caption" color="text.secondary" className="mt-1 block">
                        ID: {appointment.id}
                      </Typography>
                    </Box>
                  </ListItem>
                  {index < selectedDay.appointments.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          ) : (
            <Typography variant="body1" className="py-4 text-center">
              No appointments scheduled for this day.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAppointments} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </FormCard>
  );
};

export default DoctorCalendarView;