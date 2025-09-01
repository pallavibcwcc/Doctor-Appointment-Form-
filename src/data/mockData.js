// Mock data for the doctor appointment form application

export const specialties = [
  { id: 1, name: 'Cardiology' },
  { id: 2, name: 'Dermatology' },
  { id: 3, name: 'Neurology' },
  { id: 4, name: 'Orthopedics' },
  { id: 5, name: 'Pediatrics' },
  { id: 6, name: 'Psychiatry' },
  { id: 7, name: 'Gynecology' },
  { id: 8, name: 'Ophthalmology' },
  { id: 9, name: 'Oncology' },
  { id: 10, name: 'General Medicine' },
];

export const doctors = [
  { id: 1, name: 'Dr. John Smith', specialtyId: 1, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, name: 'Dr. Sarah Johnson', specialtyId: 1, image: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 3, name: 'Dr. Michael Brown', specialtyId: 2, image: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: 4, name: 'Dr. Emily Davis', specialtyId: 2, image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 5, name: 'Dr. Robert Wilson', specialtyId: 3, image: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: 6, name: 'Dr. Jennifer Lee', specialtyId: 3, image: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: 7, name: 'Dr. William Taylor', specialtyId: 4, image: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { id: 8, name: 'Dr. Amanda Martinez', specialtyId: 4, image: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: 9, name: 'Dr. James Anderson', specialtyId: 5, image: 'https://randomuser.me/api/portraits/men/5.jpg' },
  { id: 10, name: 'Dr. Elizabeth Thomas', specialtyId: 5, image: 'https://randomuser.me/api/portraits/women/5.jpg' },
  { id: 11, name: 'Dr. David Rodriguez', specialtyId: 6, image: 'https://randomuser.me/api/portraits/men/6.jpg' },
  { id: 12, name: 'Dr. Jessica White', specialtyId: 6, image: 'https://randomuser.me/api/portraits/women/6.jpg' },
  { id: 13, name: 'Dr. Richard Harris', specialtyId: 7, image: 'https://randomuser.me/api/portraits/men/7.jpg' },
  { id: 14, name: 'Dr. Michelle Clark', specialtyId: 7, image: 'https://randomuser.me/api/portraits/women/7.jpg' },
  { id: 15, name: 'Dr. Thomas Lewis', specialtyId: 8, image: 'https://randomuser.me/api/portraits/men/8.jpg' },
  { id: 16, name: 'Dr. Laura Walker', specialtyId: 8, image: 'https://randomuser.me/api/portraits/women/8.jpg' },
  { id: 17, name: 'Dr. Joseph Young', specialtyId: 9, image: 'https://randomuser.me/api/portraits/men/9.jpg' },
  { id: 18, name: 'Dr. Patricia Allen', specialtyId: 9, image: 'https://randomuser.me/api/portraits/women/9.jpg' },
  { id: 19, name: 'Dr. Charles King', specialtyId: 10, image: 'https://randomuser.me/api/portraits/men/10.jpg' },
  { id: 20, name: 'Dr. Karen Scott', specialtyId: 10, image: 'https://randomuser.me/api/portraits/women/10.jpg' },
];

export const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
];

export const commonSymptoms = [
  'Fever', 'Headache', 'Cough', 'Fatigue', 'Nausea', 'Dizziness',
  'Shortness of breath', 'Chest pain', 'Back pain', 'Joint pain',
  'Abdominal pain', 'Rash', 'Sore throat', 'Runny nose', 'Muscle ache',
  'Loss of appetite', 'Insomnia', 'Anxiety', 'Depression', 'Blurred vision'
];

// Function to generate available time slots for a specific doctor and date
export const getAvailableTimeSlots = (doctorId, date) => {
  // In a real app, this would be an API call to get available slots
  // For mock purposes, we'll randomly make some slots unavailable
  return timeSlots.filter(() => Math.random() > 0.3);
};

// Function to generate a random appointment ID
export const generateAppointmentId = () => {
  const prefix = 'APPT';
  const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const timestamp = Date.now().toString().slice(-4);
  return `${prefix}-${randomDigits}-${timestamp}`;
};

// Mock calendar data for doctor view
export const generateCalendarData = (month, year) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarData = [];
  
  for (let day = 1; day <= daysInMonth; day++) {
    const appointmentCount = Math.floor(Math.random() * 5);
    const appointments = [];
    
    for (let i = 0; i < appointmentCount; i++) {
      const randomTimeSlot = timeSlots[Math.floor(Math.random() * timeSlots.length)];
      const randomPatientId = Math.floor(Math.random() * 1000);
      
      appointments.push({
        id: generateAppointmentId(),
        patientName: `Patient ${randomPatientId}`,
        time: randomTimeSlot,
        visitType: Math.random() > 0.5 ? 'In-person' : 'Video',
        reason: 'Regular checkup'
      });
    }
    
    calendarData.push({
      day,
      appointmentCount,
      appointments
    });
  }
  
  return calendarData;
};