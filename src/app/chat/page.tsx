"use client";


import { useState } from "react";
import { Send, Bot } from "lucide-react";
import { Box, Paper, Typography, TextField, IconButton, CircularProgress, AppBar, Toolbar, Container, Avatar, Fade, Stack } from "@mui/material";


export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setAnswer(data.answer || data.error);
    } catch {
      setAnswer("Error connecting to backend. Is FastAPI running?");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Avatar sx={{ bgcolor: 'white', color: 'primary.main', mr: 2 }}>
            <Bot className="h-6 w-6" />
          </Avatar>
          <Typography variant="h6" color="inherit" fontWeight={700}>
            Chat with Codebase
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ flex: 1, py: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
            Ask questions about your architecture, logic, or dependencies.
          </Typography>
          <Typography color="text.secondary">
            Get instant answers from your codebase documentation.
          </Typography>
        </Box>
        {answer && (
          <Fade in={!!answer}>
            <Stack direction="row" spacing={2} alignItems="flex-start" maxWidth="md" mx="auto" mb={4}>
              <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 40, height: 40 }}>
                <Bot className="h-6 w-6" />
              </Avatar>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper', flex: 1 }}>
                <Typography color="text.primary" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                  {answer}
                </Typography>
              </Paper>
            </Stack>
          </Fade>
        )}
        <Paper elevation={2} sx={{ mt: 4, p: 2, borderRadius: 3, position: 'sticky', bottom: 0, bgcolor: 'background.paper' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <TextField
              fullWidth
              variant="outlined"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ask a question (e.g., 'Where is the auth logic?')"
              required
              disabled={loading}
              InputProps={{
                style: { borderRadius: 16, paddingRight: 48 },
              }}
            />
            <IconButton
              type="submit"
              color="primary"
              disabled={loading || !query}
              aria-label="Send message"
              sx={{ ml: -6, bgcolor: 'primary.main', color: 'white', borderRadius: 2, '&:hover': { bgcolor: 'primary.dark' } }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : <Send className="h-5 w-5" />}
            </IconButton>
          </form>
          <Typography variant="caption" color="text.secondary" display="block" align="center" mt={2}>
            AI can make mistakes. Verify important information.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}