"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stepper, Step, StepLabel, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const steps = [
  {
    title: "Welcome to LivingDocs AI!",
    content: (
      <Box>
        <Typography mb={2}>This platform automates your documentation workflow using AI.</Typography>
        <List dense>
          <ListItem>
            <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Auto-generates and updates docs with every code change" />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Creates PRs for documentation updates" />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Lets you chat with your codebase and test APIs" />
          </ListItem>
        </List>
      </Box>
    ),
    icon: <RocketLaunchIcon color="primary" fontSize="large" />,
  },
  {
    title: "How to Get Started",
    content: (
      <Box>
        <List dense>
          <ListItem><ListItemText primary="Link your GitHub repository from the sidebar." /></ListItem>
          <ListItem><ListItemText primary="Push code changes to trigger doc updates." /></ListItem>
          <ListItem><ListItemText primary="Review and merge PRs for docs." /></ListItem>
          <ListItem><ListItemText primary="Use Chat and API Playground for more features." /></ListItem>
        </List>
      </Box>
    ),
    icon: <CheckCircleIcon color="primary" fontSize="large" />,
  },
  {
    title: "Need Help?",
    content: (
      <Box>
        <Typography mb={1}>Each page has a <b>help</b> button <HelpOutlineIcon fontSize="small" /> for quick tips.</Typography>
        <Typography variant="body2" color="text.secondary">You can revisit this onboarding anytime from the dashboard.</Typography>
      </Box>
    ),
    icon: <HelpOutlineIcon color="primary" fontSize="large" />,
  },
];

export default function OnboardingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.localStorage.getItem("ldocs-onboarded")) {
      setOpen(true);
    }
  }, []);

  const close = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("ldocs-onboarded", "1");
    }
  };

  if (!open) return null;
  return (
    <Dialog open={open} onClose={close} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 700, fontSize: 24, pb: 0 }}>
        {steps[step].icon}
        <Box mt={1}>{steps[step].title}</Box>
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={step} alternativeLabel sx={{ mb: 3 }}>
          {steps.map((s, i) => (
            <Step key={i} completed={step > i}>
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper>
        {steps[step].content}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Button onClick={close} color="inherit">Skip</Button>
        <Box>
          {step > 0 && (
            <Button onClick={() => setStep(s => s - 1)} sx={{ mr: 1 }}>Back</Button>
          )}
          {step < steps.length - 1 ? (
            <Button variant="contained" onClick={() => setStep(s => s + 1)}>Next</Button>
          ) : (
            <Button variant="contained" color="success" onClick={close}>Finish</Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}