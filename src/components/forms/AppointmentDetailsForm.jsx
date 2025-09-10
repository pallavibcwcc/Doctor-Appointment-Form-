import { useState, useEffect } from 'react';
import { 
  TextField, Button, Grid, MenuItem, FormControl, FormHelperText, 
  Box, InputLabel, Select, Chip, Autocomplete, RadioGroup,
  FormControlLabel, Radio, Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormCard from '../ui/FormCard';
import { EventNote } from '@mui/icons-material';
import { specialties, doctors, commonSymptoms, getAvailableTimeSlots } from '../../data/mockData';

// ✅ Validation schema
const validationSchema = Yup.object({
  specialtyId: Yup.number().required('Specialty is required'),
  doctorId: Yup.number().required('Doctor is required'),
  visitType: Yup.string().required('Visit type is required'),
  appointmentDate: Yup.date().required('Appointment date is required'),
  timeSlot: Yup.string().required('Time slot is required'),
  reasonForVisit: Yup.string().required('Reason for visit is required'),
  symptoms: Yup.array().min(1, 'At least one symptom is required'),
});

const AppointmentDetailsForm = ({ onSubmit, onBack, initialValues }) => {
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  
  const formik = useFormik({
    initialValues: initialValues || {
      specialtyId: '',
      doctorId: '',
      visitType: 'in-person',
      appointmentDate: null,
      timeSlot: '',
      reasonForVisit: '',
      symptoms: [],
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  // ✅ Filter doctors when specialty changes
  useEffect(() => {
    if (formik.values.specialtyId) {
      const filteredDoctors = doctors.filter(
        (doctor) => doctor.specialtyId === formik.values.specialtyId
      );
      setAvailableDoctors(filteredDoctors);

      if (formik.values.doctorId && !filteredDoctors.find(d => d.id === formik.values.doctorId)) {
        formik.setFieldValue('doctorId', '');
      }
    } else {
      setAvailableDoctors([]);
    }
  }, [formik.values.specialtyId]);

  // ✅ Update slots when doctor/date changes
  useEffect(() => {
    if (formik.values.doctorId && formik.values.appointmentDate) {
      const slots = getAvailableTimeSlots(
        formik.values.doctorId,
        formik.values.appointmentDate
      );
      setAvailableTimeSlots(slots);

      if (formik.values.timeSlot && !slots.includes(formik.values.timeSlot)) {
        formik.setFieldValue('timeSlot', '');
      }
    } else {
      setAvailableTimeSlots([]);
    }
  }, [formik.values.doctorId, formik.values.appointmentDate]);

  return (
    <Box className="mt-6 md:mt-8">
      <FormCard 
        title="Appointment Details" 
        subtitle="Select your preferred doctor and appointment time"
        icon={<EventNote fontSize="large" />}
      >
        <form onSubmit={formik.handleSubmit} className="modern-form">
          <Grid container direction="column" spacing={3}>
          
          {/* Specialty */}
          <Grid item xs={12}>
            <FormControl fullWidth error={formik.touched.specialtyId && Boolean(formik.errors.specialtyId)}>
              <InputLabel id="specialty-label">Specialty *</InputLabel>
              <Select
                labelId="specialty-label"
                id="specialtyId"
                name="specialtyId"
                value={formik.values.specialtyId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {specialties.map((specialty) => (
                  <MenuItem key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.specialtyId && formik.errors.specialtyId && (
                <FormHelperText>{formik.errors.specialtyId}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Doctor */}
          <Grid item xs={12}>
            <FormControl 
              fullWidth 
              error={formik.touched.doctorId && Boolean(formik.errors.doctorId)}
              disabled={!formik.values.specialtyId}
            >
              <InputLabel id="doctor-label">Doctor *</InputLabel>
              <Select
                labelId="doctor-label"
                id="doctorId"
                name="doctorId"
                value={formik.values.doctorId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {availableDoctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.doctorId && formik.errors.doctorId && (
                <FormHelperText>{formik.errors.doctorId}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Visit Type */}
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <Typography variant="subtitle2" className="mb-2">Visit Type *</Typography>
              <RadioGroup
                row
                name="visitType"
                value={formik.values.visitType}
                onChange={formik.handleChange}
              >
                <FormControlLabel value="in-person" control={<Radio />} label="In-person" />
                <FormControlLabel value="video" control={<Radio />} label="Video" />
              </RadioGroup>
              {formik.touched.visitType && formik.errors.visitType && (
                <FormHelperText error>{formik.errors.visitType}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Date */}
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Preferred Date *"
                value={formik.values.appointmentDate}
                onChange={(date) => formik.setFieldValue('appointmentDate', date)}
                disablePast
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    fullWidth 
                    error={formik.touched.appointmentDate && Boolean(formik.errors.appointmentDate)}
                    helperText={formik.touched.appointmentDate && formik.errors.appointmentDate}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          {/* Time Slot */}
          <Grid item xs={12}>
            <FormControl 
              fullWidth 
              error={formik.touched.timeSlot && Boolean(formik.errors.timeSlot)}
              disabled={!formik.values.doctorId || !formik.values.appointmentDate}
            >
              <InputLabel id="time-slot-label">Available Time Slot *</InputLabel>
              <Select
                labelId="time-slot-label"
                id="timeSlot"
                name="timeSlot"
                value={formik.values.timeSlot}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {availableTimeSlots.map((slot) => (
                  <MenuItem key={slot} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.timeSlot && formik.errors.timeSlot && (
                <FormHelperText>{formik.errors.timeSlot}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Reason */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="reasonForVisit"
              name="reasonForVisit"
              label="Reason for Visit *"
              multiline
              rows={3}
              value={formik.values.reasonForVisit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.reasonForVisit && Boolean(formik.errors.reasonForVisit)}
              helperText={formik.touched.reasonForVisit && formik.errors.reasonForVisit}
            />
          </Grid>

          {/* Symptoms */}
          <Grid item xs={12}>
            <Autocomplete
              multiple
              freeSolo
              id="symptoms"
              options={commonSymptoms}
              value={formik.values.symptoms}
              onChange={(event, newValue) => formik.setFieldValue('symptoms', newValue)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip key={index} label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Symptoms *"
                  placeholder="Add symptoms"
                  error={formik.touched.symptoms && Boolean(formik.errors.symptoms)}
                  helperText={formik.touched.symptoms && formik.errors.symptoms}
                />
              )}
            />
          </Grid>

          {/* Buttons */}
          <Grid item xs={12}>
            <Box 
              display="flex" 
              flexDirection={{ xs: 'column', sm: 'row' }} 
              justifyContent="space-between" 
              gap={2}
            >
              <Button variant="outlined" onClick={onBack} size="large" className="modern-button-outline">
                Back
              </Button>
              <Button type="submit" variant="contained" size="large" className="modern-button">
                Next
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </FormCard>
    </Box>
  );
};

export default AppointmentDetailsForm;
