import { useState, useEffect } from 'react';
import './DoctorCalendarView.css'
import { 
  Box, Typography, Paper, Button, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem,
  IconButton
} from '@mui/material';
import { 
  CalendarMonth, ChevronLeft, ChevronRight, 
  AccessTime, Person, Videocam, MeetingRoom,
  Close
} from '@mui/icons-material';
import FormCard from '../ui/FormCard';
import { generateCalendarData } from '../../data/mockData';

const DoctorCalendarView = ({ onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [appointmentsOpen, setAppointmentsOpen] = useState(false);
  
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  useEffect(() => {
    const data = generateCalendarData(month, year);
    setCalendarData(data);
  }, [month, year]);
  
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  const showAppointments = (day) => {
    setSelectedDay(day);
    setAppointmentsOpen(true);
  };
  
  const closeAppointments = () => {
    setAppointmentsOpen(false);
  };
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  const generateCalendarGrid = () => {
    const grid = [];
    let dayCount = 1;
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    
    for (let week = 0; dayCount <= daysInMonth; week++) {
      const days = [];
      
      for (let i = 0; i < 7; i++) {
        if ((week === 0 && i < firstDayOfMonth) || dayCount > daysInMonth) {
          days.push(null);
        } else {
          const dayData = calendarData.find(d => d.day === dayCount) || {
            day: dayCount,
            appointmentCount: 0,
            appointments: []
          };
          
          // Check if this day is today
          const isToday = year === currentYear && month === currentMonth && dayCount === currentDay;
          
          // Check if this day is in the future
          const isFutureDate = (
            year > currentYear || 
            (year === currentYear && month > currentMonth) ||
            (year === currentYear && month === currentMonth && dayCount > currentDay)
          );
          
          // Add these properties to the dayData object
          dayData.isToday = isToday;
          dayData.isFutureDate = isFutureDate;
          
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
      <IconButton onClick={onClose} aria-label="close calendar">
        <Close />
      </IconButton>
      <Box className="mb-6">
        <Box className="flex justify-between items-center mb-4 mt-2">
          <Box sx={{ visibility: 'hidden' }}>
            <Button 
              startIcon={<ChevronLeft />} 
              onClick={prevMonth}
              variant="outlined"
              size="small"
              className="calendar-nav-btn"
            >
              Prev
            </Button>
          </Box>
          
          <Typography variant="h5" className="font-medium">
            {monthNames[month]} {year}
          </Typography>
          
          <Box>
            <Button 
              startIcon={<ChevronLeft />} 
              onClick={prevMonth}
              variant="outlined"
              size="small"
              className="calendar-nav-btn"
              sx={{ mr: 1 }}
            >
              Prev
            </Button>
            <Button 
              endIcon={<ChevronRight />} 
              onClick={nextMonth}
              variant="outlined"
              size="small"
              className="calendar-nav-btn"
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
      
      {/* Calendar Table */}
      <TableContainer component={Paper} elevation={0} className="border calendar-wrap">
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
                    className={`h-24 w-1/7 ${!day ? 'day-empty' : ''} ${day?.isFutureDate ? 'future-date' : ''} ${day?.isToday ? 'is-today' : ''}`}
                  >
                    {day && (
                      <Box className="h-full flex flex-col">
                        <Typography variant="subtitle1" className="day-number">
                          {day.day}
                        </Typography>
                        
                        {day.isFutureDate ? (
                          <Typography variant="body2" color="text.secondary" className="mt-2 future-text">
                            Future date
                          </Typography>
                        ) : day.appointmentCount > 0 ? (
                          <Box 
                            className="appt-chip"
                            onClick={() => showAppointments(day)}
                          >
                            <Typography variant="body2" className="appt-text">
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
      
      {/* Appointments Dialog */}
      <Dialog 
        open={appointmentsOpen} 
        onClose={closeAppointments}
        maxWidth="sm"
        fullWidth
        className="appt-dialog"
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
