import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, DialogContent, DialogTitle, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import FormAppointmentStepper from './FormsStepper/FormAppointmentStepper';
import FormRouteStepper from './FormsStepper/FormRouteStepper';
import FormGatheringStepper from './FormsStepper/FormGatheringStepper';
import FormRawMaterialStepper from './FormsStepper/FormRawMaterialStepper';
import FormClassificationStepper from './FormsStepper/FormClassificationStepper';
import useRegisterContext from './context/useRegisterContext';
import { useState } from 'react';

const steps = ['Cita', 'Ruta', 'Recolección', 'Materia Prima', 'Clasificación'];
const componentsForms = [<FormAppointmentStepper/>, <FormRouteStepper/>, <FormGatheringStepper/>, <FormRawMaterialStepper/>, <FormClassificationStepper/>]

export default function CompleteRegister() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const navigate = useNavigate()

  const { dataRegisterAppointment, dataRegisterRoute, dataRegisterGathering, dataRegisterRawMaterial, dataRegisterClassification } = useRegisterContext()

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const submit = () => {
    console.log(dataRegisterAppointment, dataRegisterRoute, dataRegisterGathering, dataRegisterRawMaterial, dataRegisterClassification)
  }

  return (
    <Dialog open fullScreen>
      <DialogTitle>
        <Stack direction="row" spacing={2} padding={2} margin={1}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}></Button>
          <Typography>CREACIÓN DE REGISTRO</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                El registro se ha completado exitosamente
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>AÑADIR OTRO REGISTRO +</Button>
              </Box>
            </>
          ) : (
            <>
              {componentsForms[activeStep]}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                ← ATRÁS
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? <Button onClick={() => submit()}>TERMINAR REGISTRO</Button> : 'SIGUIENTE →'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}