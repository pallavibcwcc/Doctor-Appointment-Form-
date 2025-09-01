import { useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import FormStepper from './components/ui/FormStepper';
import PatientDetailsForm from './components/forms/PatientDetailsForm';
import AppointmentDetailsForm from './components/forms/AppointmentDetailsForm';
import ConsentSubmitForm from './components/forms/ConsentSubmitForm';
import ConfirmationScreen from './components/forms/ConfirmationScreen';
import DoctorCalendarView from './components/forms/DoctorCalendarView';
import { generateAppointmentId } from './data/mockData';

function App() {
  // Form state
  const [activeStep, setActiveStep] = useState(0);
  const [patientDetails, setPatientDetails] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [appointmentId, setAppointmentId] = useState(null);
  const [showCalendarView, setShowCalendarView] = useState(false);

  // Handle patient details form submission
  const handlePatientDetailsSubmit = (values) => {
    setPatientDetails(values);
    setActiveStep(1);
  };

  // Handle appointment details form submission
  const handleAppointmentDetailsSubmit = (values) => {
    setAppointmentDetails(values);
    setActiveStep(2);
  };

  // Handle consent form submission
  const handleConsentSubmit = (values) => {
    // Generate appointment ID
    const newAppointmentId = generateAppointmentId();
    setAppointmentId(newAppointmentId);
    setActiveStep(3);
  };

  // Reset the form to start over
  const handleReset = () => {
    setPatientDetails(null);
    setAppointmentDetails(null);
    setAppointmentId(null);
    setActiveStep(0);
  };

  // Toggle calendar view
  const toggleCalendarView = () => {
    setShowCalendarView(!showCalendarView);
  };

  return (
    <ThemeProvider>
      <CssBaseline />
      <Layout onResetApp={handleReset}>
        <Container maxWidth="lg">
          {!showCalendarView ? (
            <Box className="max-w-4xl mx-auto">
              <FormStepper activeStep={activeStep} />
              
              {activeStep === 0 && (
                <PatientDetailsForm 
                  onSubmit={handlePatientDetailsSubmit} 
                  initialValues={patientDetails}
                />
              )}
              
              {activeStep === 1 && (
                <AppointmentDetailsForm 
                  onSubmit={handleAppointmentDetailsSubmit} 
                  onBack={() => setActiveStep(0)}
                  initialValues={appointmentDetails}
                />
              )}
              
              {activeStep === 2 && (
                <ConsentSubmitForm 
                  onSubmit={handleConsentSubmit} 
                  onBack={() => setActiveStep(1)}
                  patientDetails={patientDetails}
                  appointmentDetails={appointmentDetails}
                />
              )}
              
              {activeStep === 3 && (
                <ConfirmationScreen 
                  appointmentId={appointmentId}
                  patientDetails={patientDetails}
                  appointmentDetails={appointmentDetails}
                  onReset={handleReset}
                />
              )}
              
              <Box className="text-center mt-8">
                <button 
                  onClick={toggleCalendarView}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {showCalendarView ? 'Back to Appointment Form' : 'View Doctor Calendar'}
                </button>
              </Box>
            </Box>
          ) : (
            <Box className="max-w-4xl mx-auto">
              <DoctorCalendarView />
              
              <Box className="text-center mt-8">
                <button 
                  onClick={toggleCalendarView}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Back to Appointment Form
                </button>
              </Box>
            </Box>
          )}
        </Container>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
