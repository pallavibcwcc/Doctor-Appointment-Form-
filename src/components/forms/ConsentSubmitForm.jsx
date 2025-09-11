import { useState } from 'react';
import { 
  Button, Grid, FormControlLabel, Checkbox, Typography, 
  Box, Paper, Divider, Alert, Chip, CircularProgress, Card, CardContent
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormCard from '../ui/FormCard';
import { 
  FactCheck, CheckCircle, Person, CalendarToday, 
  AccessTime, LocationOn, Email, Phone, Shield, 
  Warning, CheckCircleOutline 
} from '@mui/icons-material';
import { doctors, specialties } from '../../data/mockData';

// Validation schema for consent form
const validationSchema = Yup.object({
  consentNotifications: Yup.boolean().oneOf([true], 'You must agree to receive notifications'),
});

const ConsentSubmitForm = ({ onSubmit, onBack, patientDetails, appointmentDetails }) => {
  const [submitting, setSubmitting] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      consentNotifications: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
      setSubmitting(true);
      setTimeout(() => {
        if (onSubmit) {
          onSubmit(values);
        } else {
          console.log('No onSubmit handler provided');
        }
        setSubmitting(false);
      }, 1000);
    },
  });

  // Format date
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box className="min-h-screen bg-gray-100 py-8 px-4">
      <Box className="max-w-5xl mx-auto">
        <form onSubmit={formik.handleSubmit}>
          {/* Header Section */}
          <Box className="text-center mb-8">
            <Box className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleOutline className="text-gray-600 text-3xl" />
            </Box>
            <Typography variant="h3" className="text-gray-800 font-bold mb-2">
              Review Your Appointment
            </Typography>
            <Typography variant="h6" className="text-gray-600 font-normal">
              Please review your details before confirming
            </Typography>
          </Box>

          <Box className="space-y-6" >
            {/* Patient Information Section */}
            <Card className="rounded-lg shadow-sm border-0 bg-white">
              <CardContent className="p-6">
                <Box className="flex items-center mb-6">
                  <Person className="text-gray-600 mr-3 text-xl" />
                  <Typography variant="h6" className="text-gray-800 font-medium">
                    Patient Information
                  </Typography>
                </Box>
                <Divider className="my-4" />

                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <Typography variant="body2" className="text-gray-500 mb-2 font-medium">Full Name</Typography>
                    <Typography variant="body1" className="text-gray-800">{patientDetails.fullName}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" className="text-gray-500 mb-2 font-medium">Age</Typography>
                    <Typography variant="body1" className="text-gray-800">{patientDetails.age} years old</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Box className="flex items-center mb-2">
                      <Email className="text-gray-600 mr-2 text-lg" />
                      <Typography variant="body2" className="text-gray-500 font-medium">Email</Typography>
                    </Box>
                    <Typography variant="body1" className="text-gray-800 ml-7">{patientDetails.email}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" className="text-gray-500 mb-2 font-medium">Gender</Typography>
                    <Typography variant="body1" className="text-gray-800">{patientDetails.gender}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Box className="flex items-center mb-2">
                      <Phone className="text-gray-600 mr-2 text-lg" />
                      <Typography variant="body2" className="text-gray-500 font-medium">Phone</Typography>
                    </Box>
                    <Typography variant="body1" className="text-gray-800 ml-7">{patientDetails.phone}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Box className="flex items-center mb-2">
                      <Shield className="text-gray-600 mr-2 text-lg" />
                      <Typography variant="body2" className="text-gray-500 font-medium">Insurance</Typography>
                    </Box>
                    <Typography variant="body1" className="text-gray-800 ml-7">{patientDetails.insurance || 'na'}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Appointment Details Section */}
            <Card className="rounded-lg shadow-sm border-0 bg-white">
              <CardContent className="p-6">
                <Box className="flex items-center mb-6">
                  <CalendarToday className="text-blue-400 mr-3 text-xl" />
                  <Typography variant="h6" className="text-gray-800 font-bold">
                    Appointment Details
                  </Typography>
                </Box>
                <Divider className="my-4" />
                
                {/* Doctor Information */}
                <Box className="flex items-center justify-between mb-6"  sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 2, mt: 3 }} >
                  <Box>
                    <Typography variant="h6" className="text-gray-800 font-bold mb-1">
                      {doctors.find(d => d.id === appointmentDetails.doctorId)?.name || 'Dr. Emily Rodriguez'}
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      {specialties.find(s => s.id === appointmentDetails.specialtyId)?.name || 'Dermatology'}
                    </Typography>
                  </Box>
                  <Chip 
                    icon={<LocationOn className="text-white" />}
                    label={appointmentDetails.visitType === 'in-person' ? 'In-Person' : 'Video'}
                    className="bg-blue-500 text-white"
                    size="small"
                  />
                </Box>

                {/* Date and Time */}
                <Grid container spacing={4} className="mb-6">
                  <Grid item xs={6}>
                    <Typography variant="body2" className="text-gray-400 mb-2">Date</Typography>
                    <Box className="flex items-center">
                      <CalendarToday className="text-gray-400 mr-2 text-sm" />
                      <Typography variant="body1" className="text-gray-800">
                        {formatDate(appointmentDetails.appointmentDate)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" className="text-gray-400 mb-2">Time</Typography>
                    <Box className="flex items-center">
                      <AccessTime className="text-gray-400 mr-2 text-sm" />
                      <Typography variant="body1" className="text-gray-800">
                        {appointmentDetails.timeSlot}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Reason for Visit */}
                <Box className="mb-4">
                  <Typography variant="body2" className="text-gray-400 mb-2">Reason for Visit</Typography>
                  <Typography variant="body1" className="text-gray-800">
                    {appointmentDetails.reasonForVisit || 'kjksjdksjdksjdksdjksdjksd'}
                  </Typography>
                </Box>

                {/* Symptoms */}
                <Box>
                  <Typography variant="body2" className="text-gray-400 mb-2">Symptoms</Typography>
                  <Box className="flex flex-wrap gap-2">
                    {appointmentDetails.symptoms?.map((symptom) => (
                      <Chip 
                        key={symptom} 
                        label={symptom} 
                        size="small" 
                        className="bg-gray-100 text-gray-700"
                      />
                    ))}
                    {(!appointmentDetails.symptoms || appointmentDetails.symptoms.length === 0) && (
                      <Chip 
                        label="Fatigue" 
                        size="small" 
                        className="bg-gray-100 text-gray-700"
                      />
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Consent & Terms Section */}
            <Card className="rounded-lg shadow-sm border-0 bg-white">
              <CardContent className="p-6">
                <Box className="flex items-center mb-6">
                  <Warning className="text-gray-600 mr-3 text-xl" />
                  <Typography variant="h6" className="text-gray-800 font-medium">
                    Consent & Terms
                  </Typography>
                </Box>
                
                <FormControlLabel
                  control={
                    <Checkbox
                      name="consentNotifications"
                      checked={formik.values.consentNotifications}
                      onChange={formik.handleChange}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" className="text-gray-800">
                        I agree to receive SMS/Email notifications regarding my appointment.
                      </Typography>
                      <Typography variant="body2" className="text-gray-500 mt-1">
                        You will receive appointment reminders, confirmations, and important updates via SMS and email. You can opt out at any time.
                      </Typography>
                    </Box>
                  }
                />
                {formik.touched.consentNotifications && formik.errors.consentNotifications && (
                  <Alert severity="error" className="mt-2">{formik.errors.consentNotifications}</Alert>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Box className="flex justify-between mt-8" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 2, mt: 3 }}  >
              <Button 
                variant="outlined" 
                onClick={onBack}
                size="large"
                disabled={submitting}
                className="px-6 py-3 border-gray-400 text-gray-700 hover:border-gray-500 bg-gray-50"
              >
                Back to Edit Details
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => formik.resetForm()}
                size="large"
                disabled={submitting}
                className="px-6 py-3 border-gray-400 text-gray-700 hover:border-gray-500 bg-gray-50"
              >
                Reset Form
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                disabled={submitting || !formik.isValid}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white"
                startIcon={submitting ? <CircularProgress size={20} /> : <CheckCircle />}
                onClick={() => {
                  console.log('Button clicked');
                  console.log('Form valid:', formik.isValid);
                  console.log('Form values:', formik.values);
                  console.log('Form errors:', formik.errors);
                }}
              >
                {submitting ? 'Confirming...' : 'Confirm Appointment'}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ConsentSubmitForm;
