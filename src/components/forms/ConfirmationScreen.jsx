import { useState } from 'react';
import { 
  Button, Grid, Typography, Box, Paper, Divider, 
  Chip, Card, CardContent, IconButton, Tooltip
} from '@mui/material';
import { 
  CheckCircle, Print, GetApp, CalendarMonth, 
  ArrowBack, ContentCopy
} from '@mui/icons-material';
import FormCard from '../ui/FormCard';
import { doctors, specialties } from '../../data/mockData';

const ConfirmationScreen = ({ appointmentId, patientDetails, appointmentDetails, onReset }) => {
  const [copied, setCopied] = useState(false);

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Copy appointment ID to clipboard
  const copyAppointmentId = () => {
    navigator.clipboard.writeText(appointmentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Print appointment details
  const printAppointment = () => {
    window.print();
  };

  // Download appointment details as text file
  const downloadAppointment = () => {
    const doctor = doctors.find(d => d.id === appointmentDetails.doctorId);
    const specialty = specialties.find(s => s.id === appointmentDetails.specialtyId);
    
    const content = `
      APPOINTMENT CONFIRMATION
      -----------------------
      Appointment ID: ${appointmentId}
      Date: ${formatDate(appointmentDetails.appointmentDate)}
      Time: ${appointmentDetails.timeSlot}
      
      PATIENT INFORMATION
      ------------------
      Name: ${patientDetails.fullName}
      Gender: ${patientDetails.gender}
      Age: ${patientDetails.age}
      Phone: ${patientDetails.phone}
      Email: ${patientDetails.email}
      ${patientDetails.insurance ? `Insurance: ${patientDetails.insurance}` : ''}

      APPOINTMENT DETAILS
      ------------------
      Doctor: ${doctor?.name || ''}
      Specialty: ${specialty?.name || ''}
      Visit Type: ${appointmentDetails.visitType === 'in-person' ? 'In-person Visit' : 'Video Consultation'}
      Reason for Visit: ${appointmentDetails.reasonForVisit}
      Symptoms: ${appointmentDetails.symptoms.join(', ')}
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointment-${appointmentId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Box className="max-w-3xl mx-auto">
      <Box className="text-center mb-8">
        <CheckCircle color="success" style={{ fontSize: 64 }} className="mb-4" />
        <Typography variant="h4" component="h1" gutterBottom>
          Appointment Confirmed!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Your appointment has been successfully scheduled.
        </Typography>
      </Box>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h6">Appointment ID</Typography>
            <Box className="flex items-center">
              <Typography variant="h6" className="font-mono mr-2">
                {appointmentId}
              </Typography>
              <Tooltip title={copied ? "Copied!" : "Copy ID"}>
                <IconButton size="small" onClick={copyAppointmentId}>
                  <ContentCopy fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          
          <Divider className="my-4" />
          
          <Grid  container spacing={20}>
                <Grid item xs={12} >
                  <Box>
                
                    <Typography variant="subtitle2" color="text.secondary"sx={{ mb: 1 }} >Patient Information</Typography>
                    <Typography variant="body1" sx={{ mb: 1 }} >{patientDetails.fullName}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }} >
                      {patientDetails.gender}, {patientDetails.age} years
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{patientDetails.phone}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }} >{patientDetails.email}</Typography>
                    {patientDetails.insurance && (
                      <Typography variant="body2" sx={{ mb: 1 }} >Insurance: {patientDetails.insurance}</Typography>
                    )}
                  
                  </Box>
                </Grid>
                
                <Grid item xs={12} >
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Appointment Information</Typography>
                  <Typography variant="body1">
                    {appointmentDetails.visitType === 'in-person' ? 'In-person Visit' : 'Video Consultation'}
                  </Typography>
                  <Typography variant="body2" >
                    Date: {formatDate(appointmentDetails.appointmentDate)}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Time: {appointmentDetails.timeSlot}
                  </Typography>
                  <Typography variant="body2"  >
                    Doctor: {doctors.find(d => d.id === appointmentDetails.doctorId)?.name}
                  </Typography>
                  <Typography variant="body2">
                    Specialty: {specialties.find(s => s.id === appointmentDetails.specialtyId)?.name}
                  </Typography>
                </Grid>
            
            <Grid item xs={12}>
              <Divider className="my-2" />
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Reason for Visit</Typography>
              <Typography variant="body2">{appointmentDetails.reasonForVisit}</Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">Symptoms</Typography>
              <Box className="flex flex-wrap gap-1 mt-1">
                {appointmentDetails.symptoms.map((symptom) => (
                  <Chip key={symptom} label={symptom} size="small" />
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <Box className="flex flex-wrap justify-between gap-4" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 2, mt: 3 }} >
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          size="large"
          onClick={onReset}
        >
          Make Another Appointment
        </Button>
        
        <Box className="flex gap-2"  sx={{ display: 'flex', gap: 4}}>
          <Button
            variant="outlined"
            startIcon={<Print />}
            size="large"
            onClick={printAppointment}
          >
            Print
          </Button>
          
          <Button
            variant="contained"
            startIcon={<GetApp />}
            size="large"
            onClick={downloadAppointment}
          >
            Download
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmationScreen;