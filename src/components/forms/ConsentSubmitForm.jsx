import { useState } from 'react';
import { 
  Button, Grid, FormControlLabel, Checkbox, Typography, 
  Box, Paper, Divider, Alert, Chip, CircularProgress
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormCard from '../ui/FormCard';
import { FactCheck, CheckCircle } from '@mui/icons-material';
import { doctors, specialties } from '../../data/mockData';

// Validation schema for consent form
const validationSchema = Yup.object({
  consentNotifications: Yup.boolean().oneOf([true], 'You must agree to receive notifications'),
  consentTerms: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
});

const ConsentSubmitForm = ({ onSubmit, onBack, patientDetails, appointmentDetails }) => {
  const [submitting, setSubmitting] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      consentNotifications: false,
      consentTerms: false,
    },
    validationSchema,
    onSubmit: (values) => {
      setSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        onSubmit(values);
        setSubmitting(false);
      }, 1000);
    },
  });

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <FormCard 
      title="Review & Consent" 
      subtitle="Please review your appointment details and provide consent"
      icon={<FactCheck fontSize="large" />}
    >
      <form onSubmit={formik.handleSubmit} className="consent-form">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" className="mb-2">Appointment Summary</Typography>
            <Paper elevation={0} className="summary-card">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">Patient Information</Typography>
                  <Typography variant="body1">{patientDetails.fullName}</Typography>
                  <Typography variant="body2">
                    {patientDetails.gender}, {patientDetails.age} years
                  </Typography>
                  <Typography variant="body2">{patientDetails.phone}</Typography>
                  <Typography variant="body2">{patientDetails.email}</Typography>
                  {patientDetails.insurance && (
                    <Typography variant="body2">Insurance: {patientDetails.insurance}</Typography>
                  )}
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">Appointment Information</Typography>
                  <Typography variant="body1">
                    {appointmentDetails.visitType === 'in-person' ? 'In-person Visit' : 'Video Consultation'}
                  </Typography>
                  <Typography variant="body2">
                    Date: {formatDate(appointmentDetails.appointmentDate)}
                  </Typography>
                  <Typography variant="body2">
                    Time: {appointmentDetails.timeSlot}
                  </Typography>
                  <Typography variant="body2">
                    Doctor: {doctors.find(d => d.id === appointmentDetails.doctorId)?.name}
                  </Typography>
                  <Typography variant="body2">
                    Specialty: {specialties.find(s => s.id === appointmentDetails.specialtyId)?.name}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider className="my-2" />
                  <Typography variant="subtitle2" color="text.secondary">Reason for Visit</Typography>
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
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h6" className="mb-2">Consent</Typography>
            <Box className="space-y-3">
              <FormControlLabel
                control={
                  <Checkbox
                    name="consentNotifications"
                    checked={formik.values.consentNotifications}
                    onChange={formik.handleChange}
                    color="primary"
                  />
                }
                label="I agree to receive SMS/Email notifications about my appointment *"
              />
              {formik.touched.consentNotifications && formik.errors.consentNotifications && (
                <Alert severity="error" className="mt-1">{formik.errors.consentNotifications}</Alert>
              )}
              
              <FormControlLabel
                control={
                  <Checkbox
                    name="consentTerms"
                    checked={formik.values.consentTerms}
                    onChange={formik.handleChange}
                    color="primary"
                  />
                }
                label="I agree to the terms and conditions of the medical service *"
              />
              {formik.touched.consentTerms && formik.errors.consentTerms && (
                <Alert severity="error" className="mt-1">{formik.errors.consentTerms}</Alert>
              )}
            </Box>
          </Grid>
          
          <Grid item xs={12} className="flex justify-between mt-4">
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={onBack}
              size="large"
              disabled={submitting}
            >
              Back
            </Button>
            <Box>
              <Button 
                variant="outlined" 
                color="secondary" 
                className="mr-2"
                size="large"
                type="reset"
                onClick={() => formik.resetForm()}
                disabled={submitting}
              >
                Reset
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                size="large"
                className="px-8"
                disabled={submitting || !formik.isValid}
                startIcon={submitting ? <CircularProgress size={20} /> : <CheckCircle />}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </FormCard>
  );
};

export default ConsentSubmitForm;
