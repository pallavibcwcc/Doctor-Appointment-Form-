import { Stepper, Step, StepLabel, Box, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import { Person, EventNote, FactCheck, CheckCircle } from '@mui/icons-material';

const steps = [
  { label: 'Patient Details', icon: <Person /> },
  { label: 'Appointment', icon: <EventNote /> },
  { label: 'Consent & Submit', icon: <FactCheck /> },
  { label: 'Confirmation', icon: <CheckCircle /> },
];

const FormStepper = ({ activeStep, onStepChange, maxStep = activeStep }) => {
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box className={`${activeStep === 1 ? 'mb-14 md:mb-16' : 'mb-10 md:mb-12'} px-4`}>
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel={!isMobile}
        orientation={isMobile ? 'vertical' : 'horizontal'}
      >
        {steps.map((step, index) => {
          const isClickable = typeof onStepChange === 'function' && index <= maxStep;
          return (
            <Step key={step.label}>
              <StepLabel StepIconComponent={() => (
                <Box
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    activeStep > index
                      ? 'bg-green-100 text-green-600' // completed steps -> green
                      : activeStep === index
                      ? 'bg-purple-600 text-white ring-2 ring-purple-500' // active step -> distinct purple highlight
                      : 'bg-gray-200 text-gray-500' // upcoming steps -> gray
                  }`}
                  sx={{ cursor: isClickable ? 'pointer' : 'default' }}
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
                  {step.icon}
                </Box>
              )}>
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