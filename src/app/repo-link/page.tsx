"use client";


import { Github } from "lucide-react";
import { Box, Paper, Typography, Button, Container, Avatar, Stack, Divider } from "@mui/material";

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 5, borderRadius: 4, textAlign: 'center', position: 'relative' }}>
          <Stack alignItems="center" spacing={3}>
            <Avatar sx={{ bgcolor: 'grey.900', width: 80, height: 80, boxShadow: 3 }}>
              <Github className="h-3/5 w-3/5" style={{ fontSize: 40, color: 'white' }} />
            </Avatar>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              Connect Repository
            </Typography>
            <Typography color="text.secondary" mb={2}>
              Grant LivingDocs AI access to your GitHub repositories to start automating documentation.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Github style={{ fontSize: 22 }} />}
              sx={{ bgcolor: '#24292F', color: 'white', fontWeight: 600, py: 1.5, '&:hover': { bgcolor: 'black' }, boxShadow: 2 }}
              fullWidth
            >
              Connect with GitHub
            </Button>
            <Divider sx={{ my: 2 }} />
            <Typography variant="caption" color="text.secondary">
              By connecting, you agree to our Terms of Service and Privacy Policy.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}