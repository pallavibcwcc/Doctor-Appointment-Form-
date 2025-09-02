import { Stepper, Step, StepLabel, Box, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import { Person, EventNote, FactCheck, CheckCircle, CalendarMonth } from '@mui/icons-material';

const steps = [
  { label: 'Patient Details', icon: <Person /> },
  { label: 'Appointment', icon: <EventNote /> },
  { label: 'Consent & Submit', icon: <FactCheck /> },
  { label: 'Confirmation', icon: <CheckCircle /> },
];

const FormStepper = ({ activeStep }) => {
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box className="mb-10 md:mb-12 px-4">
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel={!isMobile}
        orientation={isMobile ? 'vertical' : 'horizontal'}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={() => (
              <Box className={`flex items-center justify-center w-8 h-8 rounded-full ${activeStep > index ? 'bg-primary-100 text-primary-600' : activeStep === index ? 'bg-primary-50 text-primary-600 ring-2 ring-primary-300' : 'bg-gray-200 text-gray-500'}`}>
                {step.icon}
              </Box>
            )}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default FormStepper;