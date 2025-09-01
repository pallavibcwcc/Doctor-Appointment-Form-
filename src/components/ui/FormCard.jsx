import { Card, CardContent, Typography, Box } from '@mui/material';

const FormCard = ({ title, subtitle, children, icon }) => {
  return (
    <Card className="w-full mb-6 overflow-visible">
      <CardContent className="p-6">
        <Box className="flex items-center mb-4">
          {icon && <Box className="mr-3 text-primary">{icon}</Box>}
          <Box>
            <Typography variant="h5" component="h2" className="font-medium">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" className="mt-1">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
        {children}
      </CardContent>
    </Card>
  );
};

export default FormCard;