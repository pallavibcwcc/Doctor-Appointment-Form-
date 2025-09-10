import { useState } from 'react';
import { 
  Button, Grid, FormControlLabel, Checkbox, Typography, 
  Box, Paper, Divider, Alert, Chip, CircularProgress, TextField
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormCard from '../ui/FormCard';
import { FactCheck, CheckCircle, ContentCopy, ArrowBack, RestartAlt } from '@mui/icons-material';
import { doctors, specialties } from '../../data/mockData';

// Validation schema for consent form
const validationSchema = Yup.object({
  consentNotifications: Yup.boolean().oneOf([true], 'Please check this box to continue.'),
  consentTerms: Yup.boolean().oneOf([true], 'Please check this box to continue.'),
});

const ConsentSubmitForm = ({ onSubmit, onBack, patientDetails, appointmentDetails }) => {
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      consentNotifications: false,
      consentTerms: false,
      signatureName: ''
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      setSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        onSubmit(values);
        setSubmitting(false);
      }, 1000);
    },
  });

  // Disable submit until consents are checked
  const canSubmit = formik.values.consentNotifications && formik.values.consentTerms && !submitting;

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const copySummary = async () => {
    try {
      const doctorName = doctors.find(d => d.id === appointmentDetails.doctor)?.name || '';
      const specialtyName = specialties.find(s => s.id === appointmentDetails.specialty)?.name || '';
      const text = `Consent Summary\n\nPatient: ${patientDetails.fullName}\nPhone: ${patientDetails.phone}\nEmail: ${patientDetails.email}\n\nAppointment: ${specialtyName} with ${doctorName}\nWhen: ${formatDate(appointmentDetails.date)} at ${appointmentDetails.time}\nType: ${appointmentDetails.type}\nReason: ${appointmentDetails.reasonForVisit}\nSymptoms: ${(appointmentDetails.symptoms || []).join(', ')}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // no-op
    }
  };

  return (
    <FormCard 
      title="Consent Form Template" 
      subtitle="Review the information and confirm your consent"
      icon={<FactCheck fontSize="large" />}
    >
      <form onSubmit={formik.handleSubmit} className="consent-form">
        <Grid container spacing={3}>
          {/* Left column: small cards */}
          <Grid item xs={12} md={5}>
            <Box className="space-y-3">
              <Paper elevation={0} className="p-5 md:p-6 rounded-xl border shadow-sm bg-white/70">
                <Typography variant="subtitle1" className="mb-2">Patient Information</Typography>
                <Divider className="my-2" />
                <Typography variant="body1">{patientDetails.fullName}</Typography>
                <Typography variant="body2">{patientDetails.gender}, {patientDetails.age} years</Typography>
                <Typography variant="body2">{patientDetails.phone}</Typography>
                <Typography variant="body2">{patientDetails.email}</Typography>
                {patientDetails.insurance && (
                  <Typography variant="body2">Insurance: {patientDetails.insurance}</Typography>
                )}
              </Paper>

              <Paper elevation={0} className="p-5 md:p-6 rounded-xl border shadow-sm bg-white/70">
                <Typography variant="subtitle1" className="mb-2">Procedure Details</Typography>
                <Divider className="my-2" />
                <Typography variant="body1">
                  {specialties.find(s => s.id === appointmentDetails.specialty)?.name} with {doctors.find(d => d.id === appointmentDetails.doctor)?.name}
                </Typography>
                <Typography variant="body2">{formatDate(appointmentDetails.date)} at {appointmentDetails.time}</Typography>
                <Typography variant="body2">Type: {appointmentDetails.type}</Typography>
                <Divider className="my-2" />
                <Typography variant="subtitle2" color="text.secondary">Reason</Typography>
                <Typography variant="body2">{appointmentDetails.reasonForVisit}</Typography>
                {!!(appointmentDetails.symptoms && appointmentDetails.symptoms.length) && (
                  <>
                    <Typography variant="subtitle2" color="text.secondary" className="mt-2">Symptoms</Typography>
                    <Box className="flex flex-wrap gap-1 mt-1">
                      {appointmentDetails.symptoms.map((symptom) => (
                        <Chip key={symptom} label={symptom} size="small" />
                      ))}
                    </Box>
                  </>
                )}
              </Paper>

              <Paper elevation={0} className="p-5 md:p-6 rounded-xl border shadow-sm bg-white/70">
                <Typography variant="subtitle1" className="mb-2">Risks and Benefits</Typography>
                <Divider className="my-2" />
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  <li>Benefits: timely care and reminders to help you prepare.</li>
                  <li>Risks: rare schedule changes, telehealth limitations if selected.</li>
                  <li>Your data is protected and used only to manage your appointment.</li>
                </ul>
              </Paper>
            </Box>
          </Grid>
          
          {/* Right column: Signature Section */}
          <Grid item xs={12} md={7}>
            <Paper elevation={0} className="p-5 md:p-6 rounded-xl border shadow-sm bg-white/70 relative">
              <Box className="flex items-center justify-between mb-2">
                <Typography variant="subtitle1">Signature Section</Typography>
                <Button onClick={copySummary} size="small" startIcon={<ContentCopy />}> 
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </Box>
              <Divider className="my-2" />

              <Box className="space-y-3">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="consentNotifications"
                      checked={formik.values.consentNotifications}
                      onChange={formik.handleChange}
                      color="primary"
                      inputProps={{ 'aria-describedby': 'help-notifications' }}
                    />
                  }
                  label="Send me appointment updates by SMS/email"
                />
                {formik.touched.consentNotifications && formik.errors.consentNotifications && (
                  <Alert severity="error" className="mt-1">{formik.errors.consentNotifications}</Alert>
                )}
                <Typography id="help-notifications" variant="caption" color="text.secondary" className="block">
                  We only send reminders and important updates. You can opt out anytime.
                </Typography>
                
                <FormControlLabel
                  control={
                    <Checkbox
                      name="consentTerms"
                      checked={formik.values.consentTerms}
                      onChange={formik.handleChange}
                      color="primary"
                      inputProps={{ 'aria-describedby': 'help-terms' }}
                    />
                  }
                  label="I agree to the clinic’s terms of care and privacy policy"
                />
                {formik.touched.consentTerms && formik.errors.consentTerms && (
                  <Alert severity="error" className="mt-1">{formik.errors.consentTerms}</Alert>
                )}
                <Typography id="help-terms" variant="caption" color="text.secondary" className="block">
                  This allows us to provide your care and keep your data safe.
                </Typography>

                <Box className="mt-2">
                  <Typography variant="subtitle2" className="mb-1">Signature (optional)</Typography>
                  <TextField
                    fullWidth
                    name="signatureName"
                    value={formik.values.signatureName}
                    onChange={formik.handleChange}
                    placeholder="Type your full name"
                    size="medium"
                  />
                </Box>
              </Box>

              <Divider className="my-4" />

              <Box className="flex flex-col sm:flex-row justify-between gap-2">
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={onBack}
                  size="large"
                  startIcon={<ArrowBack />}
                  disabled={submitting}
                >
                  Back
                </Button>
                <Box className="flex items-center gap-2">
                  <Button 
                    variant="text" 
                    color="inherit" 
                    size="medium"
                    type="reset"
                    onClick={() => formik.resetForm()}
                    startIcon={<RestartAlt />}
                    disabled={submitting}
                  >
                    Start over
                  </Button>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    className="px-8 w-full sm:w-auto"
                    disabled={!canSubmit}
                    startIcon={submitting ? <CircularProgress size={20} /> : <CheckCircle />}
                  >
                    {submitting ? 'Booking...' : 'Confirm & Book'}
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </FormCard>
  );
};

export default ConsentSubmitForm;
