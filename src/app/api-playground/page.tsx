"use client";


import { useEffect, useState } from "react";
import { PlayArrow, Terminal, Code } from "@mui/icons-material";
import { Box, Typography, Paper, Button, Select, MenuItem, FormControl, InputLabel, Grid, Chip, CircularProgress, AppBar, Toolbar, Container, ToggleButtonGroup, ToggleButton, Divider, TextField, Fade } from "@mui/material";

type OpenAPISchema = {
  paths: Record<string, Record<string, unknown>>;
};

export default function ApiPlaygroundPage() {
  const [schema, setSchema] = useState<OpenAPISchema | null>(null);
  const [endpoint, setEndpoint] = useState("");
  const [method, setMethod] = useState("GET");
  const [body] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/openapi.json")
      .then(res => res.json())
      .then(data => setSchema(data))
      .catch(() => setError("Failed to load OpenAPI schema. Ensure Backend is running on port 8000."));
  }, []);

  const handleTry = async () => {
    setResponse("");
    const url = `http://localhost:8000${endpoint}`;
    const options: RequestInit = { method };
    if (body && method !== "GET") {
      options.headers = { "Content-Type": "application/json" };
      options.body = body;
    }
    try {
      const res = await fetch(url, options);
      const text = await res.text();
      setResponse(text);
    } catch {
      setResponse("Error: Could not connect to endpoint.");
    }
  };


  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Terminal sx={{ mr: 2 }} />
          <Typography variant="h6" fontWeight={700} color="inherit">
            API Playground
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box mb={5}>
          <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
            Test your backend endpoints directly from the browser.
          </Typography>
        </Box>
        {error && (
          <Paper elevation={2} sx={{ p: 2, mb: 4, bgcolor: 'error.light', color: 'error.dark', border: 1, borderColor: 'error.main' }}>
            {error}
          </Paper>
        )}
        {schema && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="endpoint-select-label">Endpoint</InputLabel>
                  <Select
                    labelId="endpoint-select-label"
                    id="endpoint-select"
                    value={endpoint}
                    label="Endpoint"
                    onChange={e => setEndpoint(e.target.value)}
                  >
                    <MenuItem value="">Select an endpoint...</MenuItem>
                    {Object.entries(schema.paths).map(([path, methods]) => (
                      Object.keys(methods as object).map(m => (
                        <MenuItem key={path + m} value={path}>{`${m.toUpperCase()} ${path}`}</MenuItem>
                      ))
                    ))}
                  </Select>
                </FormControl>
                <Typography variant="subtitle2" fontWeight={600} mb={1}>Method</Typography>
                <ToggleButtonGroup
                  value={method}
                  exclusive
                  onChange={(_, val) => val && setMethod(val)}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  {['GET', 'POST', 'PUT', 'DELETE'].map(m => (
                    <ToggleButton key={m} value={m}>{m}</ToggleButton>
                  ))}
                </ToggleButtonGroup>
                <Button
                  onClick={handleTry}
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<PlayArrow />}
                  disabled={!endpoint}
                  sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
                >
                  Send Request
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ borderRadius: 3, minHeight: 350, display: 'flex', flexDirection: 'column', bgcolor: '#1e1e1e', color: 'green.400' }}>
                <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'grey.900', bgcolor: '#252526', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2" color="grey.300" fontFamily="monospace">Response</Typography>
                  <Chip label="JSON" size="small" color="default" />
                </Box>
                <Box sx={{ flex: 1, overflow: 'auto', p: 3, fontFamily: 'monospace', fontSize: 15, color: 'success.light' }}>
                  {response ? (
                    <Fade in={!!response}><pre>{response}</pre></Fade>
                  ) : (
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'grey.600', py: 6 }}>
                      <Code sx={{ fontSize: 48, opacity: 0.2, mb: 2 }} />
                      <Typography>Select an endpoint and send a request to see the response.</Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}