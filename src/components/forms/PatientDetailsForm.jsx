import { TextField, Button, Grid, MenuItem, FormControl, FormHelperText, Box, InputLabel, Select, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormCard from '../ui/FormCard';
import { Person, LocalHospital } from '@mui/icons-material';
import './PatientDetailsForm.css'; // external CSS
// Using a remote doctor image instead of local file
import doctorImage from '../../assets/doctor.png'
// const doctorImage = 'https://t3.ftcdn.net/jpg/03/19/52/64/240_F_319526449_XOvMGnNoLlPKUgVqPNscEhDsZvlmBSbY.jpg';
<img src={doctorImage} alt="Doctor" className="doctor-image" />
// Validation schema
const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  gender: Yup.string().required('Gender is required'),
  age: Yup.number()
    .required('Age is required')
    .positive('Age must be positive')
    .integer('Age must be an integer')
    .max(120, 'Age must be less than 120'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Only digits allowed')
    .min(10, 'At least 10 digits'),
  email: Yup.string().required('Email is required').email('Enter a valid email'),
  insurance: Yup.string(),
});

const PatientDetailsForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      gender: '',
      age: '',
      phone: '',
      email: '',
      insurance: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <Box mt={{ xs: 1.5, sm: 2 }}>
      <FormCard
        title="Patient Details"
        subtitle="Please provide your personal information"
        icon={<Person fontSize="large" />}
      >
        <div className="doctor-image-section">
          <div className="doctor-image-container">
            <img src={doctorImage} alt="Doctor" className="doctor-image" />
          </div>
          <div className="doctor-info">
            <h2>New Patient Enrollment</h2>
          </div>
          <div className="doctor-decoration">
            <LocalHospital fontSize="large" />
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="modern-form">
        <Grid container spacing={3} direction="column">
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="fullName"
              name="fullName"
              label="Full Name *"
              variant="outlined"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl
              fullWidth
              variant="outlined"
              error={formik.touched.gender && Boolean(formik.errors.gender)}
            >
              <InputLabel id="gender-label">Gender *</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
                <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
              </Select>
              {formik.touched.gender && formik.errors.gender && (
                <FormHelperText>{formik.errors.gender}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="age"
              name="age"
              label="Age *"
              type="number"
              variant="outlined"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
              inputProps={{ min: 0, max: 120 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone Number *"
              variant="outlined"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>

          <Grid item xs={12}>
             <label>Email *</label>
            <TextField
              fullWidth
              id="email"
              name="email"
            placeholder='Email'
              type="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <label>Insurance (optional)</label>
            <TextField
              fullWidth
              id="insurance"
              name="insurance"
              variant="outlined"
              placeholder='Insurance (optional)'
              value={formik.values.insurance}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.insurance && Boolean(formik.errors.insurance)}
              helperText={formik.touched.insurance && formik.errors.insurance}
            />
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent={{ xs: 'center', sm: 'flex-end' }}>
              <Button type="submit" variant="contained" size="large" className="modern-button">
                Next
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </FormCard>
    </Box>
    </>
  );
};

export default PatientDetailsForm;
