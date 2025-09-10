import { Stepper, Step, StepLabel, Box, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import { Person, EventNote, FactCheck, CheckCircle } from '@mui/icons-material';
import { useTheme as useAppTheme } from '../../context/ThemeContext'; // your ThemeProvider

const steps = [
  { label: 'Patient Details', icon: Person },
  { label: 'Appointment', icon: EventNote },
  { label: 'Consent & Submit', icon: FactCheck },
  { label: 'Confirmation', icon: CheckCircle },
];

const FormStepper = ({ activeStep, onStepChange, maxStep = activeStep }) => {
  const theme = useMuiTheme();
  const { mode } = useAppTheme(); // get light/dark mode
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Colors based on theme
  const colors = {
    pink: mode === 'dark' ? '#f48fb1' : 'pink',
    blue: mode === 'dark' ? '#90caf9' : '#1976d2',
    green: '#4caf50',
    purple: '#9c27b0',
    purpleBg: '#9c27b0',
  };

  const getStepIcon = (index, IconComponent) => {
    if (activeStep > index) {
      // Completed step → green
      return <CheckCircle sx={{ color: colors.green, fontSize: 22 }} />;
    } else if (activeStep === index) {
      // Active step → white on purple
      return <IconComponent sx={{ color: 'white', fontSize: 22 }} />;
    } else {
      // Upcoming steps
      if (index === 0) return <IconComponent sx={{ color: colors.pink, fontSize: 22 }} />;
      return <IconComponent sx={{ color: colors.blue, fontSize: 22 }} />;
    }
  };

  const getStepBg = (index) => {
    if (activeStep > index) return 'bg-green-100';
    if (activeStep === index) return `bg-${colors.purple} ring-2 ring-${colors.purple}`; // active
    if (index === 0) return 'bg-pink-100';
    return 'bg-blue-100';
  };

  return (
    <Box className={`${activeStep === 1 ? 'mb-14 md:mb-16' : 'mb-10 md:mb-12'} px-4`}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel={!isMobile}
        orientation={isMobile ? 'vertical' : 'horizontal'}
      >
        {steps.map((step, index) => {
          const isClickable = typeof onStepChange === 'function' && index <= maxStep;
          const IconComponent = step.icon;

          return (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={() => (
                  <Box
                    className={`flex items-center justify-center w-8 h-8 rounded-full`}
                    sx={{
                      cursor: isClickable ? 'pointer' : 'default',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        activeStep > index
                          ? '#C8E6C9' // green bg for completed
                          : activeStep === index
                          ? colors.purpleBg // purple bg for active
                          : index === 0
                          ? '#F8BBD0' // pink bg for first step
                          : '#BBDEFB', // blue bg for others
                    }}
                    onClick={isClickable ? () => onStepChange(index) : undefined}
                    role={isClickable ? 'button' : undefined}
                    tabIndex={isClickable ? 0 : -1}
                    aria-label={isClickable ? `Go to step: ${step.label}` : undefined}
                    onKeyDown={
                      isClickable
                        ? (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onStepChange(index);
                            }
                          }
                        : undefined
                    }
                  >
                    {getStepIcon(index, IconComponent)}
                  </Box>
                )}
              >
                {step.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default FormStepper;
